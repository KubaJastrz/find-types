import React from 'react';

import * as Styled from './Results.styles';

interface Props {
  children?: React.ReactChild;
  icon: React.ReactChild;
  title: React.ReactChild;
  type: Styled.ResultType;
}

function ResultEntry({ children, icon, title, type }: Props) {
  return (
    <Styled.ResultEntry>
      <Styled.ResultStatus type={type}>
        <Styled.StatusIcon>{icon}</Styled.StatusIcon>
        <Styled.StatusText>{title}</Styled.StatusText>
      </Styled.ResultStatus>
      {children && <Styled.StatusContent>{children}</Styled.StatusContent>}
    </Styled.ResultEntry>
  );
}

export default ResultEntry;
