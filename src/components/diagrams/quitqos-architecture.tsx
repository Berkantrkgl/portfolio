/**
 * QuitQOS — system architecture. Geometry ported verbatim from the design
 * handoff (`docs/design/website/Diagrams.dc.html`); coordinates are hand-tuned
 * and verified free of overlap. Don't re-lay-out.
 */
export function QuitqosArchitecture() {
  return (
    <svg
      viewBox="0 0 1160 840"
      className="block h-auto w-full font-sans"
      role="img"
      aria-label="QuitQOS system architecture: React Native app and Firebase Auth above a Spring Boot backend, which owns the filter chain, REST API, services, scheduler, repositories and Flyway migrations, writing to PostgreSQL and pushing through Firebase Cloud Messaging."
    >
      <g data-node style={{ animationDelay: ".02s" }}>
        <rect
          x="60"
          y="34"
          width="440"
          height="150"
          rx="12"
          fill="oklch(0.975 0.005 88)"
          stroke="oklch(0.86 0.01 80)"
          strokeWidth="1"
          strokeDasharray="5 4"
        />
        <text
          x="80"
          y="60"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10.5"
          letterSpacing="1.1"
          fill="oklch(0.55 0.01 60)"
        >
          MOBILE · REACT NATIVE 0.85 · EXPO 56
        </text>
      </g>

      <g data-node style={{ animationDelay: ".1s" }}>
        <rect
          x="84"
          y="76"
          width="190"
          height="88"
          rx="8"
          fill="oklch(1 0 0)"
          stroke="oklch(0.86 0.01 80)"
        />
        <text x="100" y="104" fontSize="14.5" fontWeight="700" fill="oklch(0.24 0.012 60)">
          Guest mode
        </text>
        <text
          x="100"
          y="126"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10.5"
          fill="oklch(0.52 0.01 60)"
        >
          AsyncStorage · no backend
        </text>
        <text
          x="100"
          y="144"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10.5"
          fill="oklch(0.52 0.01 60)"
        >
          13 local notifications
        </text>
      </g>

      <g data-node style={{ animationDelay: ".16s" }}>
        <rect
          x="290"
          y="76"
          width="186"
          height="88"
          rx="8"
          fill="oklch(1 0 0)"
          stroke="oklch(0.86 0.01 80)"
        />
        <text x="306" y="104" fontSize="14.5" fontWeight="700" fill="oklch(0.24 0.012 60)">
          Registered
        </text>
        <text
          x="306"
          y="126"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10.5"
          fill="oklch(0.52 0.01 60)"
        >
          server-synced
        </text>
        <text
          x="306"
          y="144"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10.5"
          fill="oklch(0.52 0.01 60)"
        >
          leaderboard + FCM token
        </text>
      </g>

      <g data-node style={{ animationDelay: ".24s" }}>
        <rect
          x="700"
          y="52"
          width="400"
          height="88"
          rx="10"
          fill="oklch(1 0 0)"
          stroke="oklch(0.86 0.01 80)"
        />
        <text x="722" y="82" fontSize="15" fontWeight="700" fill="oklch(0.24 0.012 60)">
          Firebase Auth
        </text>
        <text
          x="722"
          y="106"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10.5"
          fill="oklch(0.52 0.01 60)"
        >
          answers one question: is this really their account?
        </text>
        <text
          x="722"
          y="124"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10.5"
          fill="oklch(0.52 0.01 60)"
        >
          called exactly once per login
        </text>
      </g>

      <path
        data-edge
        style={{ animationDelay: ".3s" }}
        d="M476,110 H588 V96 H692"
        fill="none"
        stroke="oklch(0.78 0.012 70)"
        strokeWidth="1.4"
        markerEnd="url(#arw)"
      />
      <g data-elabel style={{ animationDelay: "1s" }}>
        <rect
          x="512"
          y="86"
          width="66"
          height="20"
          rx="5"
          fill="oklch(1 0 0)"
          stroke="oklch(0.9 0.008 80)"
        />
        <text
          x="545"
          y="100"
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10"
          fill="oklch(0.5 0.01 60)"
        >
          sign-in
        </text>
      </g>

      <path
        data-edge
        style={{ animationDelay: ".44s" }}
        d="M900,140 V206 H262 V266"
        fill="none"
        stroke="oklch(0.78 0.012 70)"
        strokeWidth="1.4"
        markerEnd="url(#arw)"
      />
      <g data-elabel style={{ animationDelay: "1.2s" }}>
        <rect
          x="576"
          y="196"
          width="168"
          height="20"
          rx="5"
          fill="oklch(1 0 0)"
          stroke="oklch(0.9 0.008 80)"
        />
        <text
          x="660"
          y="210"
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10"
          fill="oklch(0.5 0.01 60)"
        >
          ID token · verified once
        </text>
      </g>

      <path
        data-edge
        style={{ animationDelay: ".5s" }}
        d="M340,184 V226 H586 V266"
        fill="none"
        stroke="oklch(0.6 0.16 44)"
        strokeWidth="1.6"
        markerEnd="url(#arwA)"
      />
      <path
        data-pulse
        style={{ animationDelay: "1.3s" }}
        d="M340,184 V226 H586 V266"
        fill="none"
        stroke="oklch(0.6 0.16 44)"
        strokeWidth="3"
        strokeDasharray="4 18"
        strokeLinecap="round"
        opacity=".55"
      />
      <g data-elabel style={{ animationDelay: "1.25s" }}>
        <rect
          x="377"
          y="216"
          width="210"
          height="20"
          rx="5"
          fill="oklch(1 0 0)"
          stroke="oklch(0.88 0.04 60)"
        />
        <text
          x="482"
          y="230"
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10"
          fill="oklch(0.55 0.14 44)"
        >
          Authorization: Bearer &lt;our JWT&gt;
        </text>
      </g>

      <g data-node style={{ animationDelay: ".34s" }}>
        <rect
          x="60"
          y="266"
          width="1040"
          height="404"
          rx="14"
          fill="oklch(0.975 0.005 88)"
          stroke="oklch(0.86 0.01 80)"
          strokeDasharray="5 4"
        />
        <text
          x="82"
          y="292"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10.5"
          letterSpacing="1.1"
          fill="oklch(0.55 0.14 44)"
        >
          SPRING BOOT 4.1 · JAVA 21 · com.dayzerosoft.quitqos.backend
        </text>
      </g>

      <g data-node style={{ animationDelay: ".5s" }}>
        <rect
          x="88"
          y="312"
          width="304"
          height="166"
          rx="10"
          fill="oklch(1 0 0)"
          stroke="oklch(0.86 0.01 80)"
        />
        <text
          x="106"
          y="338"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10"
          letterSpacing="1"
          fill="oklch(0.58 0.01 60)"
        >
          SECURITY/ — FILTER CHAIN · STATELESS
        </text>
        <rect
          x="106"
          y="352"
          width="268"
          height="52"
          rx="7"
          fill="oklch(0.985 0.004 90)"
          stroke="oklch(0.9 0.008 80)"
        />
        <text x="120" y="374" fontSize="13" fontWeight="700" fill="oklch(0.24 0.012 60)">
          JwtAuthenticationFilter
        </text>
        <text
          x="120"
          y="392"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10"
          fill="oklch(0.52 0.01 60)"
        >
          identifies — never rejects
        </text>
        <rect
          x="106"
          y="412"
          width="268"
          height="52"
          rx="7"
          fill="oklch(0.985 0.004 90)"
          stroke="oklch(0.9 0.008 80)"
        />
        <text x="120" y="434" fontSize="13" fontWeight="700" fill="oklch(0.24 0.012 60)">
          SecurityConfig
        </text>
        <text
          x="120"
          y="452"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10"
          fill="oklch(0.52 0.01 60)"
        >
          public vs authenticated
        </text>
      </g>

      <g data-node style={{ animationDelay: ".58s" }}>
        <rect
          x="428"
          y="312"
          width="304"
          height="166"
          rx="10"
          fill="oklch(1 0 0)"
          stroke="oklch(0.86 0.04 60)"
          strokeWidth="1.4"
        />
        <text
          x="446"
          y="338"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10"
          letterSpacing="1"
          fill="oklch(0.55 0.14 44)"
        >
          WEB/ — REST API · /api/v1
        </text>
        <text
          x="446"
          y="366"
          fontSize="22"
          fontWeight="800"
          letterSpacing="-0.5"
          fill="oklch(0.24 0.012 60)"
        >
          19 endpoints
        </text>
        <text
          x="446"
          y="394"
          fontFamily="JetBrains Mono, monospace"
          fontSize="11"
          fill="oklch(0.45 0.01 60)"
        >
          /auth · /users · /quit-attempts
        </text>
        <text
          x="446"
          y="414"
          fontFamily="JetBrains Mono, monospace"
          fontSize="11"
          fill="oklch(0.45 0.01 60)"
        >
          /milestones · /badges · /leaderboard
        </text>
        <rect
          x="446"
          y="428"
          width="220"
          height="24"
          rx="6"
          fill="oklch(0.97 0.02 150)"
          stroke="oklch(0.9 0.02 150)"
        />
        <text
          x="458"
          y="444"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10"
          fill="oklch(0.45 0.09 150)"
        >
          /leaderboard/summary — public, no userId
        </text>
      </g>

      <g data-node style={{ animationDelay: ".66s" }}>
        <rect
          x="768"
          y="312"
          width="304"
          height="166"
          rx="10"
          fill="oklch(1 0 0)"
          stroke="oklch(0.86 0.01 80)"
        />
        <text
          x="786"
          y="338"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10"
          letterSpacing="1"
          fill="oklch(0.58 0.01 60)"
        >
          SERVICE/ — BUSINESS LOGIC
        </text>
        <text
          x="786"
          y="366"
          fontSize="22"
          fontWeight="800"
          letterSpacing="-0.5"
          fill="oklch(0.24 0.012 60)"
        >
          7 services · 42 tests
        </text>
        <text
          x="786"
          y="394"
          fontFamily="JetBrains Mono, monospace"
          fontSize="11"
          fill="oklch(0.45 0.01 60)"
        >
          Auth · User · QuitAttempt
        </text>
        <text
          x="786"
          y="414"
          fontFamily="JetBrains Mono, monospace"
          fontSize="11"
          fill="oklch(0.45 0.01 60)"
        >
          Achievement · Leaderboard · Sync
        </text>
        <text
          x="786"
          y="444"
          fontFamily="JetBrains Mono, monospace"
          fontSize="11"
          fill="oklch(0.45 0.01 60)"
        >
          MilestoneNotification
        </text>
      </g>

      <g data-node style={{ animationDelay: ".76s" }}>
        <rect
          x="88"
          y="512"
          width="304"
          height="132"
          rx="10"
          fill="oklch(1 0 0)"
          stroke="oklch(0.86 0.04 60)"
          strokeWidth="1.4"
        />
        <text
          x="106"
          y="538"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10"
          letterSpacing="1"
          fill="oklch(0.55 0.14 44)"
        >
          @SCHEDULED · EVERY 60s
        </text>
        <text x="106" y="562" fontSize="14.5" fontWeight="700" fill="oklch(0.24 0.012 60)">
          MilestoneNotificationScheduler
        </text>
        <text
          x="106"
          y="586"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10.5"
          fill="oklch(0.52 0.01 60)"
        >
          1 · scan ACTIVE attempts
        </text>
        <text
          x="106"
          y="604"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10.5"
          fill="oklch(0.52 0.01 60)"
        >
          2 · persist achievement + badge
        </text>
        <text
          x="106"
          y="622"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10.5"
          fill="oklch(0.52 0.01 60)"
        >
          3 · then send push (never before)
        </text>
      </g>

      <g data-node style={{ animationDelay: ".82s" }}>
        <rect
          x="428"
          y="512"
          width="304"
          height="132"
          rx="10"
          fill="oklch(1 0 0)"
          stroke="oklch(0.86 0.01 80)"
        />
        <text
          x="446"
          y="538"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10"
          letterSpacing="1"
          fill="oklch(0.58 0.01 60)"
        >
          REPOSITORY/ — SPRING DATA JPA
        </text>
        <text x="446" y="564" fontSize="14.5" fontWeight="700" fill="oklch(0.24 0.012 60)">
          Entities
        </text>
        <text
          x="446"
          y="588"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10.5"
          fill="oklch(0.52 0.01 60)"
        >
          User · QuitAttempt · Milestone
        </text>
        <text
          x="446"
          y="606"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10.5"
          fill="oklch(0.52 0.01 60)"
        >
          Badge · UserMilestone · RefreshToken
        </text>
        <text
          x="446"
          y="628"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10.5"
          fill="oklch(0.55 0.14 44)"
        >
          ddl-auto = validate
        </text>
      </g>

      <g data-node style={{ animationDelay: ".88s" }}>
        <rect
          x="768"
          y="512"
          width="304"
          height="132"
          rx="10"
          fill="oklch(1 0 0)"
          stroke="oklch(0.86 0.01 80)"
        />
        <text
          x="786"
          y="538"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10"
          letterSpacing="1"
          fill="oklch(0.58 0.01 60)"
        >
          FLYWAY — SCHEMA OWNER
        </text>
        <text x="786" y="564" fontSize="14.5" fontWeight="700" fill="oklch(0.24 0.012 60)">
          7 versioned migrations
        </text>
        <text
          x="786"
          y="588"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10.5"
          fill="oklch(0.52 0.01 60)"
        >
          V1 schema → V7 locale + en content
        </text>
        <text
          x="786"
          y="612"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10.5"
          fill="oklch(0.55 0.14 44)"
        >
          partial unique index:
        </text>
        <text
          x="786"
          y="630"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10.5"
          fill="oklch(0.55 0.14 44)"
        >
          one ACTIVE attempt per user
        </text>
      </g>

      <path
        data-edge
        style={{ animationDelay: ".9s" }}
        d="M392,395 H420"
        fill="none"
        stroke="oklch(0.78 0.012 70)"
        strokeWidth="1.4"
        markerEnd="url(#arw)"
      />
      <path
        data-edge
        style={{ animationDelay: ".96s" }}
        d="M732,395 H760"
        fill="none"
        stroke="oklch(0.78 0.012 70)"
        strokeWidth="1.4"
        markerEnd="url(#arw)"
      />
      <path
        data-edge
        style={{ animationDelay: "1.02s" }}
        d="M920,478 V494 H586 V504"
        fill="none"
        stroke="oklch(0.78 0.012 70)"
        strokeWidth="1.4"
        markerEnd="url(#arw)"
      />
      <path
        data-edge
        style={{ animationDelay: "1.06s" }}
        d="M392,578 H420"
        fill="none"
        stroke="oklch(0.78 0.012 70)"
        strokeWidth="1.4"
        markerEnd="url(#arw)"
      />
      <path
        data-edge
        style={{ animationDelay: "1.1s" }}
        d="M732,578 H760"
        fill="none"
        stroke="oklch(0.78 0.012 70)"
        strokeWidth="1.4"
        markerEnd="url(#arw)"
        strokeDasharray="4 4"
      />

      <g data-node style={{ animationDelay: "1.06s" }}>
        <rect
          x="428"
          y="712"
          width="304"
          height="88"
          rx="10"
          fill="oklch(1 0 0)"
          stroke="oklch(0.86 0.01 80)"
        />
        <text x="448" y="744" fontSize="15" fontWeight="700" fill="oklch(0.24 0.012 60)">
          PostgreSQL
        </text>
        <text
          x="448"
          y="768"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10.5"
          fill="oklch(0.52 0.01 60)"
        >
          app_user · quit_attempt · milestone
        </text>
        <text
          x="448"
          y="786"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10.5"
          fill="oklch(0.52 0.01 60)"
        >
          badge · user_milestone · refresh_token
        </text>
      </g>

      <g data-node style={{ animationDelay: "1.14s" }}>
        <rect
          x="790"
          y="712"
          width="282"
          height="88"
          rx="10"
          fill="oklch(1 0 0)"
          stroke="oklch(0.86 0.01 80)"
        />
        <text x="810" y="744" fontSize="15" fontWeight="700" fill="oklch(0.24 0.012 60)">
          Firebase Cloud Messaging
        </text>
        <text
          x="810"
          y="768"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10.5"
          fill="oklch(0.52 0.01 60)"
        >
          milestone push to device
        </text>
        <text
          x="810"
          y="786"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10.5"
          fill="oklch(0.52 0.01 60)"
        >
          stub / real sender seam
        </text>
      </g>

      <path
        data-edge
        style={{ animationDelay: "1.12s" }}
        d="M586,644 V712"
        fill="none"
        stroke="oklch(0.78 0.012 70)"
        strokeWidth="1.4"
        markerEnd="url(#arw)"
      />
      <path
        data-pulse
        style={{ animationDelay: "1.9s" }}
        d="M586,644 V712"
        fill="none"
        stroke="oklch(0.6 0.16 44)"
        strokeWidth="3"
        strokeDasharray="4 18"
        strokeLinecap="round"
        opacity=".5"
      />
      <path
        data-edge
        style={{ animationDelay: "1.18s" }}
        d="M240,644 V680 H931 V712"
        fill="none"
        stroke="oklch(0.6 0.16 44)"
        strokeWidth="1.6"
        markerEnd="url(#arwA)"
      />
      <path
        data-pulse
        style={{ animationDelay: "2s" }}
        d="M240,644 V680 H931 V712"
        fill="none"
        stroke="oklch(0.6 0.16 44)"
        strokeWidth="3"
        strokeDasharray="4 18"
        strokeLinecap="round"
        opacity=".5"
      />

      <path
        data-edge
        style={{ animationDelay: "1.24s" }}
        d="M1072,756 H1130 V18 H340 V34"
        fill="none"
        stroke="oklch(0.82 0.012 70)"
        strokeWidth="1.3"
        strokeDasharray="5 5"
        markerEnd="url(#arw)"
      />
      <g data-elabel style={{ animationDelay: "2.1s" }}>
        <rect
          x="640"
          y="8"
          width="126"
          height="20"
          rx="5"
          fill="oklch(1 0 0)"
          stroke="oklch(0.9 0.008 80)"
        />
        <text
          x="703"
          y="22"
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10"
          fill="oklch(0.5 0.01 60)"
        >
          push notification
        </text>
      </g>
    </svg>
  );
}
