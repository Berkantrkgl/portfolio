# CloudFront routing for the static export

Two things the export needs from the edge, both handled by one viewer-request
function:

1. **`/` → `/en/`.** A static export has no server, so the root can't redirect
   itself. (The site ships a fallback page at `/` with an inline
   `location.replace`, but the edge redirect means no HTML is downloaded at all.)
2. **Directory URLs → `index.html`.** `next build` with `trailingSlash: true`
   writes `en/index.html`, `tr/projects/quitqos/index.html` and so on. A browser
   asking for `/en/` gets a **404** from CloudFront unless the URI is rewritten,
   because the S3 REST endpoint only resolves exact keys — it appends
   `index.html` for the root object and nothing else.

> If CloudFront points at the bucket's **website** endpoint instead of the REST
> endpoint, S3 resolves directory indexes on its own and only part 1 is needed.
> With OAC (the recommended setup) it's the REST endpoint, so both apply.

## The function

Console → **CloudFront** → **Functions** → **Create function**

- Name: `site-routing`
- Runtime: **cloudfront-js-2.0**

```js
function handler(event) {
  var request = event.request;
  var uri = request.uri;

  // 1. Bare root → default locale.
  if (uri === "/" || uri === "") {
    return {
      statusCode: 302,
      statusDescription: "Found",
      headers: {
        location: { value: "/en/" },
        "cache-control": { value: "public, max-age=3600" },
      },
    };
  }

  // 2. Directory URL → the index.html S3 actually stores.
  if (uri.endsWith("/")) {
    request.uri = uri + "index.html";
  } else if (!uri.includes(".")) {
    // No trailing slash and no file extension: /en/projects/quitqos
    request.uri = uri + "/index.html";
  }

  return request;
}
```

Then: **Publish** tab → **Publish function**.

## Attach it

CloudFront → your distribution → **Behaviors** → select the `Default (*)` behavior
→ **Edit** → **Function associations**:

| Field | Value |
|---|---|
| Viewer request — Function type | CloudFront Functions |
| Viewer request — Function ARN | `site-routing` |

Save, then invalidate so the cached 404s are dropped:

```bash
aws cloudfront create-invalidation --distribution-id <ID> --paths "/*"
```

## Verify

```bash
curl -sI https://berkan.link/            # 302 → location: /en/
curl -sI https://berkan.link/en/         # 200
curl -sI https://berkan.link/tr/         # 200
curl -sI https://berkan.link/en/projects/quitqos/   # 200
curl -sI https://berkan.link/tr/projects/pegasos/   # 200
```

All five must pass. `/en/` returning 404 while `/en/index.html` returns 200 is the
signature of the rewrite being missing.

## Error pages

Set the distribution's custom error response for **404** to `/404.html` with
response code 404 — the export writes that file, and it keeps the site's own
styling instead of CloudFront's default XML.

## After every deploy

```bash
aws s3 sync out/ s3://<bucket>/ --delete
aws cloudfront create-invalidation --distribution-id <ID> --paths "/*"
```
