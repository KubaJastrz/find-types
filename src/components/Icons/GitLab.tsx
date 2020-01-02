import React from 'react';
import styled from 'styled-components';

export const Part1 = styled.g`
  fill: #fc6d26;
`;

export const Part2 = styled.g`
  fill: #e24329;
`;

export const Part3 = styled.path`
  fill: #fca326;
`;

function GitLab(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 360" width="24" height="24" {...props}>
      <Part1>
        <path d="M348.172 202.326l-18.91-58.12-37.42-115.28a6.47 6.47 0 0 0-12.27 0l-37.42 115.21h-124.33l-37.42-115.21a6.46 6.46 0 0 0-12.26 0l-37.36 115.21-18.91 58.19a12.88 12.88 0 0 0 4.66 14.39l163.47 118.78 163.44-118.78a12.9 12.9 0 0 0 4.73-14.39" />
        <path d="M180.002 335.406l-62.18-191.28h-87zm0 0l62.16-191.28h87.14z" />
      </Part1>
      <Part2>
        <path d="M180.002 335.406l62.16-191.28h-124.29z" />
        <path d="M30.782 144.186h87.11l-37.49-115.2a6.47 6.47 0 0 0-12.27 0zm298.5 0h-87.1l37.42-115.2a6.46 6.46 0 0 1 12.26 0z" />
      </Part2>
      <Part3 d="M30.752 144.186l-18.91 58.12a12.88 12.88 0 0 0 4.66 14.39l163.5 118.8zm298.49 0l18.91 58.12a12.85 12.85 0 0 1-4.66 14.39l-163.49 118.71 149.2-191.22z" />
    </svg>
  );
}

export default GitLab;
