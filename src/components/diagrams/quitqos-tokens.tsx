/**
 * QuitQOS — two identities, never mixed. Token issue and rotation.
 * Geometry ported verbatim from the design handoff.
 */
export function QuitqosTokens() {
  return (
    <svg
      viewBox="0 0 1160 400"
      className="block h-auto w-full font-sans"
      role="img"
      aria-label="Token flow: the app signs in with Google or Apple and posts a Firebase ID token; the backend verifies it once and issues its own short-lived access JWT plus a long-lived refresh token stored as a hash, which rotates one-time on refresh so the user never sees a login screen again."
    >
      <g data-node style={{ animationDelay: ".02s" }}>
        <rect
          x="30"
          y="60"
          width="220"
          height="96"
          rx="10"
          fill="oklch(1 0 0)"
          stroke="oklch(0.86 0.01 80)"
        />
        <text x="50" y="90" fontSize="14.5" fontWeight="700" fill="oklch(0.24 0.012 60)">
          App
        </text>
        <text
          x="50"
          y="114"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10.5"
          fill="oklch(0.52 0.01 60)"
        >
          Google / Apple sign-in
        </text>
        <text
          x="50"
          y="132"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10.5"
          fill="oklch(0.52 0.01 60)"
        >
          → Firebase ID token
        </text>
      </g>

      <path
        data-edge
        style={{ animationDelay: ".2s" }}
        d="M250,108 H322"
        fill="none"
        stroke="oklch(0.78 0.012 70)"
        strokeWidth="1.4"
        markerEnd="url(#arw)"
      />
      <g data-elabel style={{ animationDelay: ".9s" }}>
        <text
          x="286"
          y="98"
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10"
          fill="oklch(0.5 0.01 60)"
        >
          POST
        </text>
      </g>

      <g data-node style={{ animationDelay: ".24s" }}>
        <rect
          x="330"
          y="46"
          width="280"
          height="124"
          rx="10"
          fill="oklch(0.99 0.008 60)"
          stroke="oklch(0.86 0.04 60)"
          strokeWidth="1.4"
        />
        <text
          x="350"
          y="74"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10.5"
          fill="oklch(0.55 0.14 44)"
        >
          POST /auth/firebase
        </text>
        <text x="350" y="100" fontSize="14.5" fontWeight="700" fill="oklch(0.24 0.012 60)">
          Backend verifies once
        </text>
        <text
          x="350"
          y="124"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10.5"
          fill="oklch(0.52 0.01 60)"
        >
          upsert User · derive username
        </text>
        <text
          x="350"
          y="142"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10.5"
          fill="oklch(0.52 0.01 60)"
        >
          Firebase is never called again
        </text>
      </g>

      <path
        data-edge
        style={{ animationDelay: ".42s" }}
        d="M610,86 H660 V70 H712"
        fill="none"
        stroke="oklch(0.6 0.16 44)"
        strokeWidth="1.5"
        markerEnd="url(#arwA)"
      />
      <path
        data-edge
        style={{ animationDelay: ".48s" }}
        d="M610,130 H660 V214 H712"
        fill="none"
        stroke="oklch(0.6 0.16 44)"
        strokeWidth="1.5"
        markerEnd="url(#arwA)"
      />

      <g data-node style={{ animationDelay: ".56s" }}>
        <rect
          x="720"
          y="30"
          width="410"
          height="80"
          rx="10"
          fill="oklch(1 0 0)"
          stroke="oklch(0.86 0.01 80)"
        />
        <text x="740" y="58" fontSize="14.5" fontWeight="700" fill="oklch(0.24 0.012 60)">
          Access JWT · ~1 hour
        </text>
        <text
          x="740"
          y="82"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10.5"
          fill="oklch(0.52 0.01 60)"
        >
          self-contained, HMAC-signed — stored nowhere
        </text>
        <text
          x="740"
          y="100"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10.5"
          fill="oklch(0.52 0.01 60)"
        >
          short-lived, so a leak stays cheap
        </text>
      </g>

      <g data-node style={{ animationDelay: ".62s" }}>
        <rect
          x="720"
          y="174"
          width="410"
          height="80"
          rx="10"
          fill="oklch(1 0 0)"
          stroke="oklch(0.86 0.01 80)"
        />
        <text x="740" y="202" fontSize="14.5" fontWeight="700" fill="oklch(0.24 0.012 60)">
          Refresh token · ~180 days
        </text>
        <text
          x="740"
          y="226"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10.5"
          fill="oklch(0.52 0.01 60)"
        >
          stored in DB as SHA-256 hash — raw value never kept
        </text>
        <text
          x="740"
          y="244"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10.5"
          fill="oklch(0.52 0.01 60)"
        >
          long-lived but revocable on logout
        </text>
      </g>

      <g data-node style={{ animationDelay: ".74s" }}>
        <rect
          x="330"
          y="250"
          width="280"
          height="112"
          rx="10"
          fill="oklch(1 0 0)"
          stroke="oklch(0.86 0.01 80)"
        />
        <text
          x="350"
          y="278"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10.5"
          fill="oklch(0.55 0.14 44)"
        >
          POST /auth/refresh
        </text>
        <text x="350" y="304" fontSize="14.5" fontWeight="700" fill="oklch(0.24 0.012 60)">
          One-time rotation
        </text>
        <text
          x="350"
          y="328"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10.5"
          fill="oklch(0.52 0.01 60)"
        >
          look up by hash → delete old row
        </text>
        <text
          x="350"
          y="346"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10.5"
          fill="oklch(0.52 0.01 60)"
        >
          → issue a fresh pair
        </text>
      </g>

      <path
        data-edge
        style={{ animationDelay: ".86s" }}
        d="M900,254 V306 H618"
        fill="none"
        stroke="oklch(0.78 0.012 70)"
        strokeWidth="1.4"
        markerEnd="url(#arw)"
      />
      <path
        data-pulse
        style={{ animationDelay: "1.5s" }}
        d="M900,254 V306 H618"
        fill="none"
        stroke="oklch(0.6 0.16 44)"
        strokeWidth="3"
        strokeDasharray="4 18"
        strokeLinecap="round"
        opacity=".5"
      />
      <path
        data-edge
        style={{ animationDelay: ".94s" }}
        d="M330,306 H140 V166"
        fill="none"
        stroke="oklch(0.78 0.012 70)"
        strokeWidth="1.4"
        markerEnd="url(#arw)"
      />
      <g data-elabel style={{ animationDelay: "1.5s" }}>
        <rect
          x="146"
          y="296"
          width="168"
          height="20"
          rx="5"
          fill="oklch(1 0 0)"
          stroke="oklch(0.9 0.008 80)"
        />
        <text
          x="230"
          y="310"
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10"
          fill="oklch(0.5 0.01 60)"
        >
          user never sees login again
        </text>
      </g>
    </svg>
  );
}
