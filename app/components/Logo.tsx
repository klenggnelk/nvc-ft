/**
 * The app's logo: a giraffe drawn in one line, its neck flowing into a heart.
 * Uses currentColor, so it follows the text colour (and dark mode) of its parent.
 */
export default function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M20 58 C12 52 6 46 6 40 C6 34 12 31 16 34 C18 35.5 20 38 20 38 C22 31 26 24 30 19 C28 18.5 25.5 18 23 17 C25.5 15 29 15 32 15.5 C31 11 31 8 32 6 C33 4 36 5 35 8 C34.5 10 35 12 36 13 C37 10 38 7 40 7 C42 7 42 10 40 13 C45 14 52 18 55 23 C57 26 54 29 51 28 C47 27 43 25 41 25 C37 30 34 34 32 37 C34 34.5 38 35 38 40 C38 46 28 52 20 58" />
      <circle cx="43" cy="18" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}
