<template>
    <div class="search" @mouseenter="toggleIgnoreBlur(true)" @mouseleave="toggleIgnoreBlur(false)">
        <form class="search-bar" :class="{ '-focus': isSearchFocused }" @submit.prevent="onSearch">
            <input
                v-model="packageString"
                placeholder="look for npm package"
                spellcheck="false"
                @input="getSuggestions"
                @keydown.prevent.enter="selectPackageAt(highlightedItem)"
                @keydown.up="moveSuggestionHighlight('up')"
                @keydown.down="moveSuggestionHighlight('down')"
                @focus="onInputFocus"
                @blur="onInputBlur"
            />
            <button tabindex="-1" aria-label="Search" type="submit"></button>
        </form>
        <SuggestionBox :suggestions="suggestions.list" :is-visible="isSuggestionBoxVisible">
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
        </SuggestionBox>
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

type Suggestion = SuggestionsResponseData;

interface Data {
    packageString: PackageString;
    suggestions: {
        forPackage: string;
        list: Suggestion[];
    };
    isSuggestionBoxVisible: boolean;
    highlightedItem: number;
    /**
     * temporarily disable blur event on input to prevent hiding menu before interaction
     */
    ignoreBlur: boolean;
    isSearchFocused: boolean;
    canSuggestionsBeShown: boolean;
}

export default Vue.extend({
    components: {
        SuggestionBox,
    },
    props: {
        handleSearch: {
            type: Function,
            required: true,
        },
    },
    data(): Data {
        return {
            packageString: '',
            suggestions: {
                forPackage: '',
                list: [],
            },
            isSuggestionBoxVisible: false,
            highlightedItem: 0,
            ignoreBlur: false,
            isSearchFocused: false,
            canSuggestionsBeShown: true,
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
                this.suggestions = {
                    forPackage: name,
                    list: suggestions,
                };
                this.toggleSuggestionBox(!!suggestions.length);
            } else {
                this.resetSuggestions();
                this.toggleSuggestionBox(false, true);
            }
        },
        onSearch() {
            const { name } = parsePackageString(this.packageString);
            if (!name) {
                return;
            }
            this.canSuggestionsBeShown = false;
            this.handleSearch(name);
        },
        selectPackageAt(index: number) {
            if (!(index in this.suggestions.list)) {
                return;
            }
            const { name } = this.suggestions.list[index].package;
            this.packageString = createPackageString(name /*, version */);
            this.onSearch();
            this.ignoreBlur = false;
            this.toggleSuggestionBox(false, true);
        },
        moveSuggestionHighlight(direction: 'up' | 'down') {
            const lastSuggestionIndex = this.suggestions.list.length - 1;
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
        toggleSuggestionBox(isVisible: boolean, forceClose: boolean = false) {
            if (this.ignoreBlur && !forceClose && !isVisible) {
                return;
            }
            this.isSuggestionBoxVisible = this.canSuggestionsBeShown && isVisible;
            if (this.isSuggestionBoxVisible) {
                this.highlightedItem = 0;
            } else {
                this.highlightedItem = -1;
            }
        },
        toggleIgnoreBlur(shouldIgnore: boolean) {
            this.ignoreBlur = shouldIgnore;
        },
        resetSuggestions() {
            this.suggestions = {
                forPackage: '',
                list: [],
            };
        },
        onInputFocus() {
            this.isSearchFocused = true;
            this.canSuggestionsBeShown = true;
            const { name } = parsePackageString(this.packageString);
            if (!name) {
                return;
            }

            const { forPackage, list } = this.suggestions;
            if (forPackage === name && list.length) {
                this.toggleSuggestionBox(true);
            } else {
                this.getSuggestions();
            }
        },
        onInputBlur() {
            this.isSearchFocused = false;
            this.toggleSuggestionBox(false);
            this.toggleIgnoreBlur(false);
            this.canSuggestionsBeShown = true;
        },
    },
});
</script>
