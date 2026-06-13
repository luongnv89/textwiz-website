import { MAC_APP_STORE_URL } from '../lib/appStore';

/**
 * Mac App Store download badge (Apple-style). Links to the live listing.
 * @param {{ className?: string, height?: number }} props
 */
export default function MacAppStoreBadge({ className = '', height = 44 }) {
  return (
    <a
      href={MAC_APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 transition opacity-95 hover:opacity-100 ${className}`}
      aria-label="Download TextWiz on the Mac App Store"
    >
      <svg
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 156 40"
        height={height}
        width={Math.round((height * 156) / 40)}
        className="block"
      >
        <title>Download on the Mac App Store</title>
        <rect width="156" height="40" rx="6" fill="#000" />
        <path
          fill="#fff"
          d="M24.77 20.3c-.03-3.2 2.61-4.74 2.73-4.81-1.49-2.17-3.8-2.47-4.62-2.5-1.97-.2-3.84 1.16-4.84 1.16-.99 0-2.53-1.13-4.16-1.1-2.14.03-4.12 1.24-5.22 3.15-2.23 3.87-.57 9.6 1.6 12.74 1.06 1.53 2.32 3.25 3.98 3.19 1.6-.06 2.2-1.03 4.13-1.03 1.93 0 2.47 1.03 4.16.99 1.72-.03 2.81-1.56 3.85-3.1 1.21-1.77 1.71-3.48 1.74-3.57-.04-.02-3.35-1.28-3.38-5.12zM21.4 11.2c.87-1.05 1.46-2.52 1.3-3.98-1.26.05-2.78.84-3.68 1.89-.8.93-1.5 2.42-1.31 3.85 1.39.11 2.81-.71 3.69-1.76z"
        />
        <text
          x="44"
          y="14"
          fill="#fff"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
          fontSize="8"
          fontWeight="500"
        >
          Download on the
        </text>
        <text
          x="44"
          y="28"
          fill="#fff"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
          fontSize="13"
          fontWeight="600"
        >
          Mac App Store
        </text>
      </svg>
    </a>
  );
}