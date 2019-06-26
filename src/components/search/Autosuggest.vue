<template>
    <div class="autosuggest" @mouseenter="ignoreBlur = true" @mouseleave="ignoreBlur = false">
        <div :class="{ '-focus': isFocused }" class="autosuggest-bar">
            <input
                ref="input"
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
        initialValue: {
            type: String,
            default: undefined,
        },
        placeholder: {
            type: String,
            default: undefined,
        },
        onSelect: {
            type: Function,
            required: true,
        },
        onInput: {
            type: Function,
            required: true,
        },
        items: {
            type: Array as PropType<Suggestion[]>,
            required: true,
        },
        itemsKey: {
            type: String,
            required: true,
        },
        getValueFromItem: {
            type: Function,
            required: true,
        },
        canBeOpened: {
            type: Function,
            required: true,
        },
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
    watch: {
        itemsKey() {
            // Every time items key changes, trigger the opening event.
            // This forces the parent to re-evaluate if suggestions can be visible
            // without "controlled" isOpen prop.
            // Another solution would be to emit events from child to parent,
            // but this is considered an anti-pattern.
            this.maybeOpen();
        },
    },
    created() {
        if (this.initialValue) {
            this.inputText = this.initialValue;
        }
    },
    methods: {
        maybeOpen() {
            if (this.isOpen) {
                return;
            }
            this.isOpen = this.isFocused && this.canBeOpened(this.inputText);
        },

        close() {
            this.isOpen = false;
            this.highlightedIndex = null;
        },

        handleSelect(item: Suggestion) {
            const value = this.getValueFromItem(item);
            this.onSelect(value);
            this.close();
            this.inputText = value;
        },

        handleInput() {
            this.onInput(this.inputText);
            this.maybeOpen();
            if (!this.inputText) {
                this.close();
            }
        },

        handleFocus() {
            this.isFocused = true;
            this.maybeOpen();
        },

        handleBlur() {
            if (this.ignoreBlur) {
                (this.$refs.input as HTMLInputElement).focus();
                return;
            }
            this.isFocused = false;
            this.close();
        },

        handleKeydownEnter(event: KeyboardEvent) {
            this.ignoreBlur = false;
            if (!this.isOpen) {
                return;
            } else if (this.highlightedIndex === null) {
                this.isOpen = false;
            } else {
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
                this.close();
            }
        },

        handleKeydownEscape() {
            this.ignoreBlur = false;
            this.close();
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
            if (!this.isOpen || this.highlightedIndex === null) {
                this.highlightedIndex = 0;
                this.maybeOpen();
                return;
            }
            event.preventDefault();
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

.autosuggest-bar {
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
        line-height: 2.2em;
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
