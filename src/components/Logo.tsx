/** A disc with a rewind arc: games brought back to where they started */
export function Logo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="14" fill="var(--logo-disc)" />
      <circle cx="16" cy="16" r="4.5" fill="var(--bg)" />
      <circle cx="16" cy="16" r="1.6" fill="var(--logo-disc)" />
      <path
        d="M16 7.5a8.5 8.5 0 1 1-7.4 4.3"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path d="M5.6 8.6l3.3 3.9 3.8-3.1" fill="none" stroke="var(--accent)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
