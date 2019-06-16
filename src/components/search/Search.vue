<template>
    <div class="search" @mouseenter="toggleIgnoreBlur(true)" @mouseleave="toggleIgnoreBlur(false)">
        <form class="search-bar" :class="{ '-focus': isSearchFocused }" @submit.prevent="onSearch">
            <input
                v-model="packageString"
                placeholder="look for npm package"
                spellcheck="false"
                @input="getSuggestions"
                @keydown.enter="selectPackageAt(highlightedItem)"
                @keydown.up="moveSuggestionHighlight('up')"
                @keydown.down="moveSuggestionHighlight('down')"
                @focus="onInputFocus"
                @blur="onInputBlur"
            />
            <button tabindex="-1" aria-label="Search" type="submit"></button>
        </form>
        <suggestion-box :suggestions="suggestions" :is-visible="isSuggestionBoxVisible">
            <template v-slot:item="{ suggestion, index }">
                <button
                    tabindex="-1"
                    class="suggestion"
                    :class="{ '-highlight': highlightedItem === index }"
                    @click.prevent="selectPackageAt(index)"
                    @mouseenter="moveSuggestionHighlightTo(index)"
                    @blur="onInputBlur"
                    v-html="suggestion.highlight || suggestion.package.name"
                />
            </template>
        </suggestion-box>
    </div>
</template>

<script lang="ts">
import './Search.scss';

import Vue from 'vue';
import { debounce } from 'lodash';

import SuggestionBox from './SuggestionBox.vue';
import API from '@/api/Api';
import { SuggestionsResponseData } from '@/api/ApiTypes';
import { parsePackageString, createPackageString } from '@/helpers';
import { PackageString } from '@/types';

interface Data {
    packageString: PackageString;
    suggestions: SuggestionsResponseData[];
    isSuggestionBoxVisible: boolean;
    highlightedItem: number;
    /**
     * temporarily disable blur event on input to prevent hiding menu before interaction
     */
    ignoreBlur: boolean;
    isSearchFocused: boolean;
}

export default Vue.extend({
    components: {
        'suggestion-box': SuggestionBox,
    },
    props: {
        handleSearchResponse: {
            type: Function,
            required: true,
        },
    },
    data(): Data {
        return {
            packageString: '',
            suggestions: [],
            isSuggestionBoxVisible: false,
            highlightedItem: 0,
            ignoreBlur: false,
            isSearchFocused: false,
        };
    },
    created() {
        this.getSuggestions = debounce(this.fetchSuggestions, 250);
    },
    methods: {
        getSuggestions() {},
        async fetchSuggestions() {
            if (this.packageString) {
                const { name } = parsePackageString(this.packageString);
                const suggestions = await API.getSuggestions(name);
                this.suggestions = suggestions;
                this.isSuggestionBoxVisible = !!suggestions.length;
            } else {
                this.suggestions = [];
                this.isSuggestionBoxVisible = false;
            }
        },
        onSearch() {
            const { name } = parsePackageString(this.packageString);
            if (!name) {
                return;
            }
            API.getPackageDetails(name)
                .then(response => {
                    this.handleSearchResponse({ data: response });
                })
                .catch(error => {
                    this.handleSearchResponse({ error });
                });
        },
        selectPackageAt(index: number) {
            if (!(index in this.suggestions)) {
                return;
            }
            const { name } = this.suggestions[index].package;
            this.packageString = createPackageString(name /*, version */);
            // TODO: don't clear suggestions after package selection
            this.suggestions = [];
            this.ignoreBlur = false;
            this.isSuggestionBoxVisible = false;
            this.highlightedItem = 0;
        },
        moveSuggestionHighlight(direction: 'up' | 'down') {
            const lastSuggestionIndex = this.suggestions.length - 1;
            if (direction === 'up') {
                if (this.highlightedItem === 0) {
                    this.highlightedItem = lastSuggestionIndex;
                } else {
                    this.highlightedItem--;
                }
            } else if (direction === 'down') {
                if (this.highlightedItem === lastSuggestionIndex) {
                    this.highlightedItem = 0;
                } else {
                    this.highlightedItem++;
                }
            }
        },
        moveSuggestionHighlightTo(index: number) {
            this.highlightedItem = index;
        },
        toggleSuggestionBox(isVisible: boolean) {
            if (this.ignoreBlur && !isVisible) {
                return;
            }
            this.isSuggestionBoxVisible = isVisible;
        },
        toggleIgnoreBlur(shouldIgnore: boolean) {
            this.ignoreBlur = shouldIgnore;
        },
        onInputFocus() {
            this.isSearchFocused = true;
            if (this.suggestions.length) {
                this.toggleSuggestionBox(true);
            }
        },
        onInputBlur() {
            this.isSearchFocused = false;
            this.toggleSuggestionBox(false);
            this.toggleIgnoreBlur(false);
        },
    },
});
</script>
