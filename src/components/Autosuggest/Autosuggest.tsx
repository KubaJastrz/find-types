import React from 'react';

import * as Styled from './Autosuggest.styles';
import SuggestionBox from './SuggestionBox';
import { Suggestion } from '@/types';

export interface Props {
  initialValue: string;
  items: Suggestion[];
  placeholder?: string;
  autoFocus?: boolean;
  onChange: (textInput: string) => void;
  onSelect: (textInput: string) => void;
  getValueFromItem: (item: Suggestion) => string;
}

interface State {
  inputText: string;
  isOpen: boolean;
  isFocused: boolean;
  highlightedIndex?: number;
  itemsKey: string;
  canSuggestionsBeShown: boolean;
}

class Autosuggest extends React.Component<Props, State> {
  state: Readonly<State> = {
    inputText: this.props.initialValue,
    isOpen: false,
    isFocused: false,
    highlightedIndex: undefined,
    itemsKey: '',
    canSuggestionsBeShown: true,
  };

  private inputRef = React.createRef<HTMLInputElement>();

  private ignoreBlur = false;

  canBeOpened = () => {
    const { inputText, itemsKey, canSuggestionsBeShown } = this.state;

    return canSuggestionsBeShown && inputText.toLowerCase().startsWith(itemsKey);
  };

  maybeOpen = () => {
    if (this.state.isOpen) {
      return;
    }

    this.setState(state => ({ isOpen: state.isFocused && this.canBeOpened() }));
  };

  close = () => {
    this.setState({
      isOpen: false,
      highlightedIndex: undefined,
    });
  };

  handleSelect(item: Suggestion) {
    const value = this.props.getValueFromItem(item);
    this.props.onSelect(value);
    this.close();
    this.setState({
      inputText: value,
      itemsKey: value,
      canSuggestionsBeShown: false,
    });
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    this.setState({
      inputText: value,
      canSuggestionsBeShown: true,
    });
    this.props.onChange(value);
    this.maybeOpen();
    if (value.length === 0) {
      this.close();
    }
  };

  handleFocus = () => {
    this.setState({ isFocused: true });
    this.maybeOpen();
  };

  handleBlur = () => {
    if (this.ignoreBlur && this.inputRef.current) {
      this.inputRef.current.focus();
      return;
    }
    this.setState({ isFocused: false });
    this.close();
  };

  handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;
    const { isOpen, highlightedIndex } = this.state;

    if (key === 'Enter') {
      this.ignoreBlur = false;
      if (!isOpen) {
        return;
      } else if (highlightedIndex === undefined) {
        this.setState({ isOpen: false });
      } else {
        event.preventDefault();
        this.selectHighlightedItem();
      }
    } else if (key === 'Tab') {
      this.ignoreBlur = false;
      if (highlightedIndex !== undefined) {
        const item = this.getItemByIndex(highlightedIndex);
        const value = this.props.getValueFromItem(item);
        if (value) {
          this.setState({ inputText: value });
        }
        this.close();
      }
    } else if (key === 'Escape') {
      this.ignoreBlur = false;
      this.close();
    } else if (key === 'ArrowUp') {
      if (!isOpen || highlightedIndex === undefined) {
        return;
      }
      event.preventDefault();
      if (highlightedIndex === 0) {
        this.setState({ highlightedIndex: this.props.items.length - 1 });
      } else {
        this.setState({ highlightedIndex: highlightedIndex - 1 });
      }
    } else if (key === 'ArrowDown') {
      if (!isOpen || highlightedIndex === undefined) {
        this.setState({ highlightedIndex: 0 });
        this.maybeOpen();
        return;
      }
      event.preventDefault();
      if (highlightedIndex === this.props.items.length - 1) {
        this.setState({ highlightedIndex: 0 });
      } else {
        this.setState({ highlightedIndex: highlightedIndex + 1 });
      }
    }
  };

  selectHighlightedItem = () => {
    const { highlightedIndex } = this.state;
    if (highlightedIndex !== undefined) {
      const item = this.getItemByIndex(highlightedIndex);
      this.handleSelect(item);
    }
  };

  highlightItemFromMouse = (index: number) => {
    this.setState({ highlightedIndex: index });
  };

  selectItemFromMouse = (index: number) => {
    this.ignoreBlur = false;
    const item = this.getItemByIndex(index);
    this.handleSelect(item);
  };

  getItemByIndex = (index: number) => {
    return this.props.items[index];
  };

  componentDidUpdate(prevProps: Props, prevState: State) {
    const { itemsKey } = this.state;
    const { items } = this.props;

    if (items !== prevProps.items) {
      this.setState(state => ({ itemsKey: state.inputText }));
    }

    if (itemsKey !== prevState.itemsKey) {
      this.maybeOpen();
    }
  }

  render = () => {
    const { inputText, isFocused, isOpen, highlightedIndex } = this.state;
    const { placeholder, autoFocus, items } = this.props;

    const isVisible = isOpen && items.length > 0;

    return (
      <div
        onMouseEnter={() => {
          this.ignoreBlur = true;
        }}
        onMouseLeave={() => {
          this.ignoreBlur = false;
        }}
      >
        <Styled.SuggestionBar isFocused={isFocused}>
          <Styled.TextInput
            ref={this.inputRef}
            value={inputText}
            placeholder={placeholder}
            autoFocus={autoFocus}
            spellCheck={false}
            autoComplete="off"
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onKeyDown={this.handleKeyDown}
          />
        </Styled.SuggestionBar>
        <SuggestionBox
          suggestions={items}
          isVisible={isVisible}
          highlightedIndex={highlightedIndex}
        />
      </div>
    );
  };
}

export default Autosuggest;
