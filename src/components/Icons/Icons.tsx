import React from 'react'

export type IconProps = React.SVGAttributes<SVGSVGElement>

export const AlertTriangle = React.forwardRef<SVGSVGElement, IconProps>(function AlertTriangle(
  props,
  ref,
) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      ref={ref}
      {...props}
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
      <line x1="12" y1="9" x2="12" y2="13"></line>
      <line x1="12" y1="17" x2="12" y2="17"></line>
    </svg>
  )
})

export const Bitbucket = React.forwardRef<SVGSVGElement, IconProps>(function Bitbucket(props, ref) {
  return (
    <svg viewBox="0 0 72 72" width="72" height="72" ref={ref} {...props}>
      <defs>
        <linearGradient
          id="bitbucket-icon-gradient"
          x1="64.01"
          y1="30.27"
          x2="32.99"
          y2="54.48"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(4.79 -7.935)"
        >
          <stop offset=".18" fill="#0052cc" stopColor="#0052cc" />
          <stop offset="1" fill="#2684ff" stopColor="#2684ff" />
        </linearGradient>
      </defs>
      <g transform="translate(.026 9.61)">
        <g transform="matrix(1.15345 0 0 1.15345 -5.52 -4.05)">
          <path
            transform="translate(4.79 -7.935)"
            fill="none"
            d="M21.23 25.12l3.47 18.39h13.05l3.15-18.39z"
          />
          <path
            fill="#2684ff"
            d="M6.79-1.675a2 2 0 0 0-2 2.32l8.49 51.54a2.72 2.72 0 0 0 2.66 2.27h40.73a2 2 0 0 0 2-1.68L67.16.655a2 2 0 0 0-2-2.32zm35.75 37.25h-13l-3.52-18.39h19.67z"
          />
          <path
            fill="url(#bitbucket-icon-gradient)"
            d="M64.46 17.185H45.69l-3.15 18.39h-13l-15.35 18.22a2.71 2.71 0 0 0 1.75.66h40.74a2 2 0 0 0 2-1.68z"
          />
        </g>
      </g>
    </svg>
  )
})

export const CheckCircle = React.forwardRef<SVGSVGElement, IconProps>(function CheckCircle(
  props,
  ref,
) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      ref={ref}
      {...props}
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  )
})

export const Git = React.forwardRef<SVGSVGElement, IconProps>(function Git(props, ref) {
  return (
    <svg width="97" height="97" viewBox="0 0 97 97" fill="currentColor" ref={ref} {...props}>
      <path d="M92.71 44.408L52.591 4.291a5.918 5.918 0 00-8.369 0l-8.33 8.332L46.459 23.19a7.022 7.022 0 017.229 1.685 7.03 7.03 0 011.67 7.275l10.186 10.185a7.028 7.028 0 017.275 1.671 7.043 7.043 0 01-9.961 9.958 7.043 7.043 0 01-1.531-7.658l-9.5-9.499v24.997a7.042 7.042 0 11-8.096 11.291 7.042 7.042 0 012.307-11.496v-25.23a7.041 7.041 0 01-3.823-9.235L31.798 16.715 4.288 44.222a5.92 5.92 0 000 8.371l40.121 40.118a5.918 5.918 0 008.369 0L92.71 52.779a5.92 5.92 0 000-8.371z" />
    </svg>
  )
})

export const GitHub = React.forwardRef<SVGSVGElement, IconProps>(function GitHub(props, ref) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" ref={ref} {...props}>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  )
})

export const GitLab = React.forwardRef<SVGSVGElement, IconProps>(function GitLab(props, ref) {
  return (
    <svg viewBox="0 0 360 360" width="24" height="24" ref={ref} {...props}>
      <g fill="#fc6d26">
        <path d="M348.172 202.326l-18.91-58.12-37.42-115.28a6.47 6.47 0 0 0-12.27 0l-37.42 115.21h-124.33l-37.42-115.21a6.46 6.46 0 0 0-12.26 0l-37.36 115.21-18.91 58.19a12.88 12.88 0 0 0 4.66 14.39l163.47 118.78 163.44-118.78a12.9 12.9 0 0 0 4.73-14.39" />
        <path d="M180.002 335.406l-62.18-191.28h-87zm0 0l62.16-191.28h87.14z" />
      </g>
      <g fill="#e24329">
        <path d="M180.002 335.406l62.16-191.28h-124.29z" />
        <path d="M30.782 144.186h87.11l-37.49-115.2a6.47 6.47 0 0 0-12.27 0zm298.5 0h-87.1l37.42-115.2a6.46 6.46 0 0 1 12.26 0z" />
      </g>
      <path
        fill="#fca326"
        d="M30.752 144.186l-18.91 58.12a12.88 12.88 0 0 0 4.66 14.39l163.5 118.8zm298.49 0l18.91 58.12a12.85 12.85 0 0 1-4.66 14.39l-163.49 118.71 149.2-191.22z"
      />
    </svg>
  )
})

export const Search = React.forwardRef<SVGSVGElement, IconProps>(function Search(props, ref) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      ref={ref}
      {...props}
    >
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  )
})

export const X = React.forwardRef<SVGSVGElement, IconProps>(function X(props, ref) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      ref={ref}
      {...props}
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  )
})
