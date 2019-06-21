<template>
    <div class="autocomplete" @mouseenter="ignoreBlur = true" @mouseleave="ignoreBlur = false">
        <div :class="{ '-focus': isFocused }" class="autocomplete-bar">
            <input
                v-model="inputText"
                :placeholder="placeholder"
                spellcheck="false"
                autocomplete="off"
                @input="handleInput"
                @focus="handleFocus"
                @blur="handleBlur"
                @keydown.enter="handleKeydownEnter($event)"
                @keydown.tab="handleKeydownTab"
                @keydown.escape="handleKeydownEscape"
                @keydown.up="handleKeydownUp($event)"
                @keydown.down="handleKeydownDown($event)"
            />
            <slot name="button-right"></slot>
        </div>
        <SuggestionBox :suggestions="items" :is-visible="isVisible">
            <template v-slot:item="{ suggestion, index }">
                <div
                    :class="{ '-highlight': highlightedIndex === index }"
                    class="suggestion"
                    @click="selectItemFromMouse(index)"
                    @mouseenter="highlightItemFromMouse(index)"
                    v-html="suggestion.highlight || suggestion.package.name"
                />
            </template>
        </SuggestionBox>
    </div>
</template>

<script lang="ts">
/* eslint-disable vue/require-default-prop */
import Vue, { PropType } from 'vue';

import SuggestionBox from './SuggestionBox.vue';
import { Suggestion } from '@/types';

interface Data {
    inputText: string;
    isOpen: boolean;
    isFocused: boolean;
    highlightedIndex: number | null;
    ignoreBlur: boolean;
}

export default Vue.extend({
    components: {
        SuggestionBox,
    },
    props: {
        placeholder: String,
        value: String,
        onSelect: Function,
        onInput: Function,
        items: Array as PropType<Suggestion[]>,
        getValueFromItem: Function,
    },
    data(): Data {
        return {
            inputText: '',
            isOpen: false,
            isFocused: false,
            highlightedIndex: null,
            ignoreBlur: false,
        };
    },
    computed: {
        isVisible(): boolean {
            return this.isOpen && this.items.length > 0;
        },
    },
    methods: {
        handleSelect(item: Suggestion) {
            const value = this.getValueFromItem(item);
            this.onSelect(value);
            this.isOpen = false;
            this.highlightedIndex = null;
            this.inputText = value;
        },

        handleInput() {
            this.onInput(this.inputText);
        },

        handleFocus() {
            this.isOpen = true;
            this.isFocused = true;
        },

        handleBlur() {
            if (this.ignoreBlur) {
                return;
            }
            this.isOpen = false;
            this.isFocused = false;
            this.highlightedIndex = null;
        },

        handleKeydownEnter(event: KeyboardEvent) {
            this.ignoreBlur = false;
            if (!this.isOpen) {
                return;
            } else if (this.highlightedIndex === null) {
                // TODO: select input text
                this.isOpen = false;
            } else {
                // TODO: select input text
                event.preventDefault();
                this.selectHighlightedItem();
            }
        },

        handleKeydownTab() {
            this.ignoreBlur = false;
            if (this.highlightedIndex !== null) {
                const item = this.getItemByIndex(this.highlightedIndex);
                const value = this.getValueFromItem(item);
                if (value) {
                    this.inputText = value;
                }
                this.isOpen = false;
                this.highlightedIndex = null;
            }
        },

        handleKeydownEscape() {
            this.ignoreBlur = false;
            this.isOpen = false;
            this.highlightedIndex = null;
        },

        handleKeydownUp(event: KeyboardEvent) {
            if (!this.isOpen || this.highlightedIndex === null) {
                return;
            }
            event.preventDefault();
            if (this.highlightedIndex === 0) {
                this.highlightedIndex = this.items.length - 1;
            } else {
                this.highlightedIndex--;
            }
        },

        handleKeydownDown(event: KeyboardEvent) {
            event.preventDefault();
            if (!this.isOpen || this.highlightedIndex === null) {
                this.isOpen = true;
                this.highlightedIndex = 0;
                return;
            }
            if (this.highlightedIndex === this.items.length - 1) {
                this.highlightedIndex = 0;
            } else {
                this.highlightedIndex++;
            }
        },

        selectHighlightedItem() {
            if (this.highlightedIndex !== null) {
                const item = this.getItemByIndex(this.highlightedIndex);
                this.handleSelect(item);
            }
        },

        highlightItemFromMouse(index: number) {
            this.highlightedIndex = index;
        },

        selectItemFromMouse(index: number) {
            this.ignoreBlur = false;
            const item = this.getItemByIndex(index);
            this.handleSelect(item);
        },

        getItemByIndex(index: number) {
            return this.items[index];
        },
    },
});
</script>

<style lang="scss" scoped>
@import 'helpers';

.autocomplete-bar {
    display: inline-flex;
    align-items: center;
    width: 100%;
    padding-right: 0.4em;
    padding-left: 0.8em;
    border-radius: 4px;
    border: 1px solid #ccc;

    &.-focus {
        border-color: #377acc;
        box-shadow: 0 0 0 1px #377acc;
    }

    input {
        border: 0;
        padding: 0.6em 0;
        background: transparent;
        flex: 1;
        outline: 0;
        caret-color: #377acc;
    }
}

/deep/ .suggestion-box {
    margin-top: 8px;
    position: absolute;
    left: 0;
    right: 0;
}

/deep/ .suggestion {
    @extend %button-unstyled;

    flex: 1;
    padding: 0.4em 0.8em;
    cursor: pointer;

    &.-highlight {
        background: #eee;
    }

    /deep/ em {
        font-style: normal;
        font-weight: bold;
    }
}
</style>
