import React from 'react';
import styled from 'styled-components';

export const Part1 = styled.path`
  fill: #2684ff;
`;

export const Part2 = styled.stop`
  fill: #0052cc;
`;

export const Part3 = styled.stop`
  fill: #2684ff;
`;

function GitLab(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72" width="72" height="72" {...props}>
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
          <Part2 offset=".18" stop-color="#0052cc" />
          <Part3 offset="1" stop-color="#2684ff" />
        </linearGradient>
      </defs>
      <g transform="translate(.026 9.61)">
        <g transform="matrix(1.15345 0 0 1.15345 -5.52 -4.05)">
          <path
            transform="translate(4.79 -7.935)"
            fill="none"
            d="M21.23 25.12l3.47 18.39h13.05l3.15-18.39z"
          />
          <Part1 d="M6.79-1.675a2 2 0 0 0-2 2.32l8.49 51.54a2.72 2.72 0 0 0 2.66 2.27h40.73a2 2 0 0 0 2-1.68L67.16.655a2 2 0 0 0-2-2.32zm35.75 37.25h-13l-3.52-18.39h19.67z" />
          <path
            d="M64.46 17.185H45.69l-3.15 18.39h-13l-15.35 18.22a2.71 2.71 0 0 0 1.75.66h40.74a2 2 0 0 0 2-1.68z"
            fill="url(#bitbucket-icon-gradient)"
          />
        </g>
      </g>
    </svg>
  );
}

export default GitLab;