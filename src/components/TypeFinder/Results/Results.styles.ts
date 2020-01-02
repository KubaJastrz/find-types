import styled, { css } from 'styled-components';
import { em, darken, lighten } from 'polished';

import { fontMono } from '@/components/Framework';
import * as BitbucketParts from '@/components/Icons/BitBucket';
import * as GitLabParts from '@/components/Icons/GitLab';

export const Results = styled.div`
  margin: 0 auto;
`;

export const ResultEntry = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

export enum ResultType {
  success = 'success',
  warning = 'warning',
  neutral = 'neutral',
}

interface ResultStatusProps {
  type: ResultType;
}

export const ResultStatus = styled.div<ResultStatusProps>`
  display: flex;
  align-items: center;

  ${({ type }) => type === ResultType.success && 'color: green'};
  ${({ type }) => type === ResultType.warning && 'color: goldenrod'};
  ${({ type }) => type === ResultType.neutral && 'color: #505050'};
`;

export const StatusIcon = styled.div`
  height: 24px;
  width: 24px;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const StatusText = styled.strong`
  margin-left: 8px;
  font-size: 14px;
`;

export const StatusContent = styled.div`
  margin-left: 32px;

  &:not(:empty) {
    margin-top: 10px;
  }
`;

const BASE_FONT_SIZE = 16;

export const PackageName = styled.h4`
  font-weight: bold;
  font-size: ${em(20, BASE_FONT_SIZE)};

  ${fontMono};
`;

export const PackageVersion = styled.div`
  display: inline-block;
  padding: 1px 6px;
  font-size: 12px;
  font-weight: bold;
  background: #778798;
  color: #fff;
  border-radius: 2px;
  margin-left: 1.6em;
`;

export const PackageDescription = styled.div`
  margin-top: 10px;
  font-size: ${em(15, BASE_FONT_SIZE)};
`;

interface PackageDetailsProps {
  small: boolean;
}

export const PackageDetails = styled.div<PackageDetailsProps>`
  font-size: ${BASE_FONT_SIZE}px;

  ${({ small }) =>
    small &&
    css`
      font-size: 13.5px;

      ${PackageVersion} {
        font-size: 11px;
      }
    `};
`;

export const PackageMeta = styled.div`
  display: flex;
  align-items: center;
`;

export const PackageMetaLinks = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1.6em;
`;

const ICON_COLOR = '#7b93ad';

export const PackageMetaLink = styled.a`
  height: 1.1em;
  margin-right: 0.9em;
  color: ${ICON_COLOR};
  transition: 100ms ease-in-out;

  &:last-child {
    margin-right: 0;
  }

  &:focus,
  &:hover {
    &.-npm {
      color: #cb3837;
    }

    ${GitLabParts.Part1} {
      fill: #fc6d26;
    }

    ${GitLabParts.Part2} {
      fill: #e24329;
    }

    ${GitLabParts.Part3} {
      fill: #fca326;
    }

    ${BitbucketParts.Part1} {
      fill: #2684ff;
    }

    ${BitbucketParts.Part2} {
      stop-color: #0052cc;
    }

    ${BitbucketParts.Part3} {
      stop-color: #2684ff;
    }

    color: ${darken(0.4, ICON_COLOR)};
  }

  svg {
    height: 100%;
    width: auto;
    max-width: 28px;
  }

  ${GitLabParts.Part1},
  ${GitLabParts.Part2},
  ${GitLabParts.Part3},
  ${BitbucketParts.Part1},
  ${BitbucketParts.Part2},
  ${BitbucketParts.Part3} {
    transition: 100ms ease-in-out;
  }

  ${GitLabParts.Part1} {
    fill: ${lighten(0.05, '#768ea8')};
  }

  ${GitLabParts.Part2} {
    fill: ${lighten(0.07, '#647c96')};
  }

  ${GitLabParts.Part3} {
    fill: ${lighten(0.1, '#8199b3')};
  }

  ${BitbucketParts.Part1} {
    fill: ${lighten(0.1, '#637b95')};
  }

  ${BitbucketParts.Part2} {
    stop-color: ${lighten(0.1, '#364e68')};
  }

  ${BitbucketParts.Part3} {
    stop-color: ${lighten(0.1, '#637b95')};
  }
`;
