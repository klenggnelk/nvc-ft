/**
 * The app's crest: a navy shield with a one-line giraffe (its neck flows into a heart)
 * and a small owl perched against its neck. Empathy and learning, university style.
 * Colours are fixed (navy shield), so it reads the same in light and dark mode.
 */
export default function Logo({ className = "h-10 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 140" className={className} aria-hidden>
      <path d="M8 8 H112 V68 C112 104 88 124 60 136 C32 124 8 104 8 68 Z" fill="#1d3767" />
      <path
        d="M14 14 H106 V68 C106 100 84 118 60 129 C36 118 14 100 14 68 Z"
        fill="none"
        stroke="#9db8e6"
        strokeWidth={1.4}
      />
      <g
        transform="translate(18 32.8) scale(1.4)"
        fill="none"
        stroke="#ffffff"
        strokeWidth={2.9}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 58 C12 52 6 46 6 40 C6 34 12 31 16 34 C18 35.5 20 38 20 38 C22 31 26 24 31 17 C31 11 31 8 32 6 C33 4 36 5 35 8 C34.5 10 35 12 36 13 C37 10 38 7 40 7 C42 7 42 10 40 13 C45 14 52 18 55 23 C57 26 54 29 51 28 C47 27 43 25 41 25 C37 30 34 34 32 37 C34 34.5 38 35 38 40 C38 46 28 52 20 58" />
        <circle cx="43" cy="18" r="1.5" fill="#ffffff" stroke="none" />
      </g>
      <g transform="translate(48.5 58)">
        <path d="M-7 -9 L-6.5 -16 L-2 -11 Z M7 -9 L6.5 -16 L2 -11 Z" fill="#dbe7f8" />
        <ellipse cx="0" cy="0" rx="9" ry="11.5" fill="#dbe7f8" />
        <circle cx="-3.9" cy="-3.2" r="3.7" fill="#ffffff" stroke="#1d3767" strokeWidth={1.1} />
        <circle cx="3.9" cy="-3.2" r="3.7" fill="#ffffff" stroke="#1d3767" strokeWidth={1.1} />
        <circle cx="-3.6" cy="-3" r="1.6" fill="#1d3767" />
        <circle cx="3.6" cy="-3" r="1.6" fill="#1d3767" />
        <path d="M-1.3 0.6 L1.3 0.6 L0 3.4 Z" fill="#1d3767" />
        <path
          d="M-4 5 Q0 8 4 5 M-3 8.2 Q0 10.6 3 8.2"
          fill="none"
          stroke="#1d3767"
          strokeWidth={0.9}
          strokeLinecap="round"
        />
        <path
          d="M-3.5 11 v2.6 M-1.8 11.3 v2.4 M1.8 11.3 v2.4 M3.5 11 v2.6"
          stroke="#dbe7f8"
          strokeWidth={1.3}
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
