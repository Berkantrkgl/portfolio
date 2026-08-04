/**
 * PaceUp — three services, one monorepo. Geometry ported verbatim from the
 * design handoff.
 */
export function PaceupArchitecture() {
  return (
    <svg
      viewBox="0 0 1280 800"
      className="block h-auto w-full font-sans"
      role="img"
      aria-label="PaceUp architecture: an Expo mobile app talks REST to Django and streams chat over SSE from a FastAPI LangGraph service, both behind Caddy on a Hetzner box, sharing one Aiven managed PostgreSQL and one JWT secret, with GitHub Actions rebuilding only the changed service."
    >
      <g data-node style={{ animationDelay: ".02s" }}>
        <rect
          x="470"
          y="24"
          width="340"
          height="92"
          rx="10"
          fill="oklch(1 0 0)"
          stroke="oklch(0.86 0.01 80)"
        />
        <text x="492" y="54" fontSize="15" fontWeight="700" fill="oklch(0.24 0.012 60)">
          mobile — Expo / React Native
        </text>
        <text
          x="492"
          y="78"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10.5"
          fill="oklch(0.52 0.01 60)"
        >
          TypeScript · Expo Router · RevenueCat
        </text>
        <text
          x="492"
          y="96"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10.5"
          fill="oklch(0.52 0.01 60)"
        >
          calendar plans · AI coach chat · reminders
        </text>
      </g>

      <path
        data-edge
        style={{ animationDelay: ".16s" }}
        d="M560,116 V160 H470 V214"
        fill="none"
        stroke="oklch(0.78 0.012 70)"
        strokeWidth="1.4"
        markerEnd="url(#arw)"
      />
      <g data-elabel style={{ animationDelay: ".9s" }}>
        <rect
          x="330"
          y="150"
          width="126"
          height="20"
          rx="5"
          fill="oklch(1 0 0)"
          stroke="oklch(0.9 0.008 80)"
        />
        <text
          x="393"
          y="164"
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10"
          fill="oklch(0.5 0.01 60)"
        >
          REST · api.paceup
        </text>
      </g>

      <path
        data-edge
        style={{ animationDelay: ".22s" }}
        d="M720,116 V160 H610 V214"
        fill="none"
        stroke="oklch(0.6 0.16 44)"
        strokeWidth="1.5"
        markerEnd="url(#arwA)"
      />
      <path
        data-pulse
        style={{ animationDelay: "1.4s" }}
        d="M720,116 V160 H610 V214"
        fill="none"
        stroke="oklch(0.6 0.16 44)"
        strokeWidth="3"
        strokeDasharray="4 18"
        strokeLinecap="round"
        opacity=".5"
      />
      <g data-elabel style={{ animationDelay: ".95s" }}>
        <rect
          x="740"
          y="150"
          width="146"
          height="20"
          rx="5"
          fill="oklch(1 0 0)"
          stroke="oklch(0.88 0.04 60)"
        />
        <text
          x="813"
          y="164"
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10"
          fill="oklch(0.55 0.14 44)"
        >
          SSE stream · chatbot.
        </text>
      </g>

      <g data-node style={{ animationDelay: ".3s" }}>
        <rect
          x="60"
          y="178"
          width="960"
          height="420"
          rx="14"
          fill="oklch(0.975 0.005 88)"
          stroke="oklch(0.86 0.01 80)"
          strokeDasharray="5 4"
        />
        <text
          x="82"
          y="204"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10.5"
          letterSpacing="1.1"
          fill="oklch(0.55 0.01 60)"
        >
          HETZNER · paceup-prod-1 — docker compose -p paceup (moved off AWS ECS Fargate)
        </text>
      </g>

      <g data-node style={{ animationDelay: ".4s" }}>
        <rect
          x="350"
          y="214"
          width="360"
          height="78"
          rx="10"
          fill="oklch(1 0 0)"
          stroke="oklch(0.86 0.01 80)"
        />
        <text x="372" y="244" fontSize="14.5" fontWeight="700" fill="oklch(0.24 0.012 60)">
          Caddy — automatic HTTPS
        </text>
        <text
          x="372"
          y="268"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10.5"
          fill="oklch(0.52 0.01 60)"
        >
          certs issued + renewed automatically
        </text>
        <text
          x="372"
          y="284"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10.5"
          fill="oklch(0.55 0.14 44)"
        >
          TLS volume survives deploys via -p paceup
        </text>
      </g>

      <path
        data-edge
        style={{ animationDelay: ".5s" }}
        d="M430,292 V322 H275 V352"
        fill="none"
        stroke="oklch(0.78 0.012 70)"
        strokeWidth="1.4"
        markerEnd="url(#arw)"
      />
      <g data-elabel style={{ animationDelay: "1.1s" }}>
        <text
          x="212"
          y="316"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10"
          fill="oklch(0.5 0.01 60)"
        >
          django:8000
        </text>
      </g>
      <path
        data-edge
        style={{ animationDelay: ".56s" }}
        d="M630,292 V322 H785 V352"
        fill="none"
        stroke="oklch(0.78 0.012 70)"
        strokeWidth="1.4"
        markerEnd="url(#arw)"
      />
      <g data-elabel style={{ animationDelay: "1.15s" }}>
        <text
          x="806"
          y="316"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10"
          fill="oklch(0.5 0.01 60)"
        >
          graph-api:8001
        </text>
      </g>

      <g data-node style={{ animationDelay: ".64s" }}>
        <rect
          x="100"
          y="352"
          width="350"
          height="212"
          rx="10"
          fill="oklch(1 0 0)"
          stroke="oklch(0.86 0.04 60)"
          strokeWidth="1.4"
        />
        <text
          x="120"
          y="378"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10"
          letterSpacing="1"
          fill="oklch(0.55 0.14 44)"
        >
          BACKEND/ — DJANGO 6 + DRF
        </text>
        <text x="120" y="404" fontSize="15" fontWeight="700" fill="oklch(0.24 0.012 60)">
          6 apps
        </text>
        <text
          x="120"
          y="430"
          fontFamily="JetBrains Mono, monospace"
          fontSize="11"
          fill="oklch(0.45 0.01 60)"
        >
          users · programs · activity
        </text>
        <text
          x="120"
          y="450"
          fontFamily="JetBrains Mono, monospace"
          fontSize="11"
          fill="oklch(0.45 0.01 60)"
        >
          gamification · notifications · analytics
        </text>
        <text
          x="120"
          y="480"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10.5"
          fill="oklch(0.52 0.01 60)"
        >
          SimpleJWT · Google / Apple sign-in
        </text>
        <text
          x="120"
          y="500"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10.5"
          fill="oklch(0.52 0.01 60)"
        >
          django-q2 async tasks · S3 media
        </text>
        <rect
          x="120"
          y="514"
          width="310"
          height="30"
          rx="7"
          fill="oklch(0.985 0.004 90)"
          stroke="oklch(0.9 0.008 80)"
        />
        <text
          x="134"
          y="534"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10.5"
          fill="oklch(0.42 0.01 60)"
        >
          4 signal receivers — the event-driven core
        </text>
      </g>

      <g data-node style={{ animationDelay: ".72s" }}>
        <rect
          x="610"
          y="352"
          width="350"
          height="212"
          rx="10"
          fill="oklch(1 0 0)"
          stroke="oklch(0.86 0.01 80)"
        />
        <text
          x="630"
          y="378"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10"
          letterSpacing="1"
          fill="oklch(0.58 0.01 60)"
        >
          CHATAPI/ — FASTAPI + LANGGRAPH
        </text>
        <text x="630" y="404" fontSize="15" fontWeight="700" fill="oklch(0.24 0.012 60)">
          AI running coach
        </text>
        <text
          x="630"
          y="430"
          fontFamily="JetBrains Mono, monospace"
          fontSize="11"
          fill="oklch(0.45 0.01 60)"
        >
          POST /chat-stream (SSE) · GET /health
        </text>
        <text
          x="630"
          y="450"
          fontFamily="JetBrains Mono, monospace"
          fontSize="11"
          fill="oklch(0.45 0.01 60)"
        >
          checkpointer — survives redeploy
        </text>
        <rect
          x="630"
          y="466"
          width="148"
          height="78"
          rx="7"
          fill="oklch(0.985 0.004 90)"
          stroke="oklch(0.9 0.008 80)"
        />
        <text
          x="642"
          y="486"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10"
          fill="oklch(0.58 0.01 60)"
        >
          UI TOOLS
        </text>
        <text
          x="642"
          y="506"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10"
          fill="oklch(0.45 0.01 60)"
        >
          opens a typed form
        </text>
        <text
          x="642"
          y="524"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10"
          fill="oklch(0.45 0.01 60)"
        >
          in the app, not text
        </text>
        <rect
          x="792"
          y="466"
          width="148"
          height="78"
          rx="7"
          fill="oklch(0.99 0.008 60)"
          stroke="oklch(0.88 0.04 60)"
        />
        <text
          x="804"
          y="486"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10"
          fill="oklch(0.55 0.14 44)"
        >
          BACKEND TOOLS
        </text>
        <text
          x="804"
          y="506"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10"
          fill="oklch(0.45 0.01 60)"
        >
          create_workout_plan
        </text>
        <text
          x="804"
          y="524"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10"
          fill="oklch(0.45 0.01 60)"
        >
          the only side effect
        </text>
      </g>

      <path
        data-edge
        style={{ animationDelay: ".86s" }}
        d="M450,458 H602"
        fill="none"
        stroke="oklch(0.78 0.012 70)"
        strokeWidth="1.4"
        strokeDasharray="5 4"
        markerStart="url(#arw)"
        markerEnd="url(#arw)"
      />
      <g data-elabel style={{ animationDelay: "1.3s" }}>
        <rect
          x="452"
          y="424"
          width="156"
          height="30"
          rx="6"
          fill="oklch(1 0 0)"
          stroke="oklch(0.9 0.008 80)"
        />
        <text
          x="530"
          y="438"
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
          fontSize="9.5"
          fill="oklch(0.5 0.01 60)"
        >
          same DJANGO_SECRET_KEY
        </text>
        <text
          x="530"
          y="450"
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
          fontSize="9.5"
          fill="oklch(0.5 0.01 60)"
        >
          HS256 — one auth system
        </text>
      </g>

      <g data-node style={{ animationDelay: ".8s" }}>
        <rect
          x="1040"
          y="404"
          width="200"
          height="108"
          rx="10"
          fill="oklch(1 0 0)"
          stroke="oklch(0.86 0.01 80)"
        />
        <text x="1060" y="434" fontSize="14.5" fontWeight="700" fill="oklch(0.24 0.012 60)">
          AWS Bedrock
        </text>
        <text
          x="1060"
          y="458"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10.5"
          fill="oklch(0.52 0.01 60)"
        >
          LLM inference
        </text>
        <text
          x="1060"
          y="476"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10.5"
          fill="oklch(0.52 0.01 60)"
        >
          via LangChain
        </text>
      </g>
      <path
        data-edge
        style={{ animationDelay: ".94s" }}
        d="M960,458 H1032"
        fill="none"
        stroke="oklch(0.78 0.012 70)"
        strokeWidth="1.4"
        markerEnd="url(#arw)"
      />

      <g data-node style={{ animationDelay: ".98s" }}>
        <rect
          x="350"
          y="666"
          width="380"
          height="92"
          rx="10"
          fill="oklch(1 0 0)"
          stroke="oklch(0.86 0.01 80)"
        />
        <text x="372" y="696" fontSize="15" fontWeight="700" fill="oklch(0.24 0.012 60)">
          Aiven managed PostgreSQL
        </text>
        <text
          x="372"
          y="720"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10.5"
          fill="oklch(0.52 0.01 60)"
        >
          external — no database container on the box
        </text>
        <text
          x="372"
          y="740"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10.5"
          fill="oklch(0.52 0.01 60)"
        >
          shared by django and graph-api
        </text>
      </g>
      <path
        data-edge
        style={{ animationDelay: "1.04s" }}
        d="M275,564 V622 H470 V658"
        fill="none"
        stroke="oklch(0.78 0.012 70)"
        strokeWidth="1.4"
        markerEnd="url(#arw)"
      />
      <path
        data-edge
        style={{ animationDelay: "1.1s" }}
        d="M785,564 V622 H610 V658"
        fill="none"
        stroke="oklch(0.78 0.012 70)"
        strokeWidth="1.4"
        markerEnd="url(#arw)"
      />

      <g data-node style={{ animationDelay: "1.16s" }}>
        <rect
          x="1040"
          y="600"
          width="200"
          height="158"
          rx="10"
          fill="oklch(0.975 0.005 88)"
          stroke="oklch(0.86 0.01 80)"
          strokeDasharray="5 4"
        />
        <text
          x="1058"
          y="626"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10"
          letterSpacing="1"
          fill="oklch(0.55 0.14 44)"
        >
          CI/CD
        </text>
        <text x="1058" y="650" fontSize="13.5" fontWeight="700" fill="oklch(0.24 0.012 60)">
          GitHub Actions
        </text>
        <text
          x="1058"
          y="674"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10"
          fill="oklch(0.5 0.01 60)"
        >
          push to main
        </text>
        <text
          x="1058"
          y="692"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10"
          fill="oklch(0.5 0.01 60)"
        >
          → paths-filter
        </text>
        <text
          x="1058"
          y="710"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10"
          fill="oklch(0.5 0.01 60)"
        >
          → ssh to host
        </text>
        <text
          x="1058"
          y="728"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10"
          fill="oklch(0.5 0.01 60)"
        >
          → rebuild only the
        </text>
        <text
          x="1058"
          y="746"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10"
          fill="oklch(0.5 0.01 60)"
        >
          {"   changed service"}
        </text>
      </g>
      <path
        data-edge
        style={{ animationDelay: "1.22s" }}
        d="M1040,672 H1000 V598"
        fill="none"
        stroke="oklch(0.82 0.012 70)"
        strokeWidth="1.3"
        strokeDasharray="4 4"
        markerEnd="url(#arw)"
      />
    </svg>
  );
}
