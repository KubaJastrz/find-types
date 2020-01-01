import styled, { css } from 'styled-components';
import { em } from 'polished';

import { fontMono } from '@/components/Framework';

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
  ${({ type }) => type === ResultType.warning && 'color: golderrod'};
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
