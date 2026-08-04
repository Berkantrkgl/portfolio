/**
 * PaceUp — one save, four independent effects. The Django signal chain.
 * Geometry ported verbatim from the design handoff.
 */
export function PaceupSignals() {
  return (
    <svg
      viewBox="0 0 1160 440"
      className="block h-auto w-full font-sans"
      role="img"
      aria-label="Signal chain: saving one WorkoutResult marks the workout complete, increments the program counter atomically, recalculates user stats, and triggers an achievement check that cascades into a notification and a device push. Deleting the result unwinds the same chain."
    >
      <g data-node style={{ animationDelay: ".02s" }}>
        <rect
          x="30"
          y="150"
          width="252"
          height="104"
          rx="10"
          fill="oklch(0.99 0.008 60)"
          stroke="oklch(0.86 0.04 60)"
          strokeWidth="1.4"
        />
        <text
          x="52"
          y="180"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10"
          letterSpacing="1"
          fill="oklch(0.55 0.14 44)"
        >
          POST_SAVE
        </text>
        <text
          x="52"
          y="208"
          fontSize="16"
          fontWeight="800"
          letterSpacing="-0.3"
          fill="oklch(0.24 0.012 60)"
        >
          WorkoutResult saved
        </text>
        <text
          x="52"
          y="232"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10.5"
          fill="oklch(0.52 0.01 60)"
        >
          the user finishes one run
        </text>
      </g>

      <path
        data-edge
        style={{ animationDelay: ".18s" }}
        d="M282,202 H332 V64 H372"
        fill="none"
        stroke="oklch(0.78 0.012 70)"
        strokeWidth="1.4"
        markerEnd="url(#arw)"
      />
      <path
        data-edge
        style={{ animationDelay: ".24s" }}
        d="M282,202 H332 V148 H372"
        fill="none"
        stroke="oklch(0.78 0.012 70)"
        strokeWidth="1.4"
        markerEnd="url(#arw)"
      />
      <path
        data-edge
        style={{ animationDelay: ".3s" }}
        d="M282,202 H332 V232 H372"
        fill="none"
        stroke="oklch(0.78 0.012 70)"
        strokeWidth="1.4"
        markerEnd="url(#arw)"
      />
      <path
        data-edge
        style={{ animationDelay: ".36s" }}
        d="M282,202 H332 V316 H372"
        fill="none"
        stroke="oklch(0.6 0.16 44)"
        strokeWidth="1.5"
        markerEnd="url(#arwA)"
      />
      <path
        data-pulse
        style={{ animationDelay: "1.3s" }}
        d="M282,202 H332 V316 H372"
        fill="none"
        stroke="oklch(0.6 0.16 44)"
        strokeWidth="3"
        strokeDasharray="4 18"
        strokeLinecap="round"
        opacity=".5"
      />

      <g data-node style={{ animationDelay: ".3s" }}>
        <rect
          x="380"
          y="32"
          width="330"
          height="64"
          rx="9"
          fill="oklch(1 0 0)"
          stroke="oklch(0.86 0.01 80)"
        />
        <text x="400" y="58" fontSize="13.5" fontWeight="700" fill="oklch(0.24 0.012 60)">
          Workout marked completed
        </text>
        <text
          x="400"
          y="78"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10"
          fill="oklch(0.52 0.01 60)"
        >
          is_completed = True · status = completed
        </text>
      </g>

      <g data-node style={{ animationDelay: ".38s" }}>
        <rect
          x="380"
          y="116"
          width="330"
          height="64"
          rx="9"
          fill="oklch(1 0 0)"
          stroke="oklch(0.86 0.01 80)"
        />
        <text x="400" y="142" fontSize="13.5" fontWeight="700" fill="oklch(0.24 0.012 60)">
          Program counter incremented
        </text>
        <text
          x="400"
          y="162"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10"
          fill="oklch(0.55 0.14 44)"
        >
          F() expression — atomic, race-proof
        </text>
      </g>

      <g data-node style={{ animationDelay: ".46s" }}>
        <rect
          x="380"
          y="200"
          width="330"
          height="64"
          rx="9"
          fill="oklch(1 0 0)"
          stroke="oklch(0.86 0.01 80)"
        />
        <text x="400" y="226" fontSize="13.5" fontWeight="700" fill="oklch(0.24 0.012 60)">
          User stats recalculated
        </text>
        <text
          x="400"
          y="246"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10"
          fill="oklch(0.52 0.01 60)"
        >
          distance · duration · current + longest streak
        </text>
      </g>

      <g data-node style={{ animationDelay: ".54s" }}>
        <rect
          x="380"
          y="284"
          width="330"
          height="64"
          rx="9"
          fill="oklch(0.99 0.008 60)"
          stroke="oklch(0.86 0.04 60)"
          strokeWidth="1.4"
        />
        <text x="400" y="310" fontSize="13.5" fontWeight="700" fill="oklch(0.24 0.012 60)">
          Achievement check
        </text>
        <text
          x="400"
          y="330"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10"
          fill="oklch(0.52 0.01 60)"
        >
          post_save on User · gamification app
        </text>
      </g>

      <path
        data-edge
        style={{ animationDelay: ".66s" }}
        d="M710,316 H772"
        fill="none"
        stroke="oklch(0.6 0.16 44)"
        strokeWidth="1.5"
        markerEnd="url(#arwA)"
      />
      <g data-node style={{ animationDelay: ".72s" }}>
        <rect
          x="780"
          y="284"
          width="170"
          height="64"
          rx="9"
          fill="oklch(1 0 0)"
          stroke="oklch(0.86 0.01 80)"
        />
        <text x="798" y="310" fontSize="13.5" fontWeight="700" fill="oklch(0.24 0.012 60)">
          Notification
        </text>
        <text
          x="798"
          y="330"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10"
          fill="oklch(0.52 0.01 60)"
        >
          post_save on Achievement
        </text>
      </g>
      <path
        data-edge
        style={{ animationDelay: ".8s" }}
        d="M950,316 H1012"
        fill="none"
        stroke="oklch(0.6 0.16 44)"
        strokeWidth="1.5"
        markerEnd="url(#arwA)"
      />
      <path
        data-pulse
        style={{ animationDelay: "1.6s" }}
        d="M710,316 H772 M950,316 H1012"
        fill="none"
        stroke="oklch(0.6 0.16 44)"
        strokeWidth="3"
        strokeDasharray="4 18"
        strokeLinecap="round"
        opacity=".5"
      />
      <g data-node style={{ animationDelay: ".86s" }}>
        <rect
          x="1020"
          y="284"
          width="118"
          height="64"
          rx="9"
          fill="oklch(1 0 0)"
          stroke="oklch(0.86 0.01 80)"
        />
        <text x="1038" y="310" fontSize="13.5" fontWeight="700" fill="oklch(0.24 0.012 60)">
          Push
        </text>
        <text
          x="1038"
          y="330"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10"
          fill="oklch(0.52 0.01 60)"
        >
          to device
        </text>
      </g>

      <g data-node style={{ animationDelay: ".96s" }}>
        <rect
          x="30"
          y="360"
          width="1108"
          height="52"
          rx="9"
          fill="oklch(0.975 0.005 88)"
          stroke="oklch(0.88 0.008 80)"
          strokeDasharray="5 4"
        />
        <text
          x="52"
          y="382"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10"
          letterSpacing="1"
          fill="oklch(0.58 0.01 60)"
        >
          POST_DELETE
        </text>
        <text
          x="52"
          y="400"
          fontFamily="JetBrains Mono, monospace"
          fontSize="11"
          fill="oklch(0.45 0.01 60)"
        >
          Deleting the result unwinds the same chain in reverse — counters, stats and streaks stay
          honest.
        </text>
      </g>
    </svg>
  );
}
