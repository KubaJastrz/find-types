import React from 'react';
import DOMPurify from 'dompurify';

import * as Styled from './SuggestionBox.styles';
import { Suggestion } from '@/types';

function sanitizeSuggestion(html: string) {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['em'],
  });
}

interface Props {
  suggestions: Suggestion[];
  isVisible: boolean;
  highlightedIndex?: number;
}

function SuggestionBox({ suggestions, isVisible, highlightedIndex }: Props) {
  return (
    <Styled.List isVisible={isVisible}>
      {suggestions.map((suggestion, index) => (
        <Styled.Item key={suggestion.package.name}>
          <Styled.Button
            isHighlighted={highlightedIndex === index}
            dangerouslySetInnerHTML={{
              __html: sanitizeSuggestion(suggestion.highlight || suggestion.package.name),
            }}
          />
        </Styled.Item>
      ))}
    </Styled.List>
  );
}

export default SuggestionBox;
