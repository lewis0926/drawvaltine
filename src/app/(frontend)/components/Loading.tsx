import './Loading.css'

interface LoadingProps {
  label?: string
}

export function Loading({ label = 'Loading…' }: LoadingProps) {
  return (
    <div className="loading" role="status" aria-label={label}>
      <svg
        className="loading-spinner"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="2"
          strokeOpacity="0.2"
        />
        <path
          d="M12 2a10 10 0 0 1 10 10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}
