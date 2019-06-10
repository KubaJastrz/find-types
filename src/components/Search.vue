<template>
    <div class="search" @mouseenter="toggleIgnoreBlur(true)" @mouseleave="toggleIgnoreBlur(false)">
        <input
            v-model="packageString"
            @input="getSuggestions"
            @keydown.enter="selectPackageAt(highlightedItem)"
            @keydown.up="moveSuggestionHighlight('up')"
            @keydown.down="moveSuggestionHighlight('down')"
            @focus="toggleSuggestionBox(true)"
            @blur="toggleSuggestionBox(false)"
        />
        <button @click="onSearch" tabindex="-1">Search</button>
        <SuggestionBox :suggestions="suggestions" :isVisible="isSuggestionBoxVisible">
            <template v-slot:item="{ suggestion, index }">
                <button
                    @click.prevent="selectPackageAt(index)"
                    @mouseenter="moveSuggestionHighlightTo(index)"
                    v-html="suggestion.highlight || suggestion.package.name"
                    tabindex="-1"
                    :class="{
                        '-highlight': highlightedItem === index,
                    }"
                />
            </template>
        </SuggestionBox>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { debounce } from 'lodash';

import SuggestionBox from './SuggestionBox.vue';
import API from '@/api/Api';
import { SuggestionsResponseData } from '@/api/ApiTypes';
import { parsePackageString, createPackageString } from '@/helpers';

type NpmPackage = SuggestionsResponseData['package'];

interface Data {
    /**
     * eg. vue@2.6.10
     */
    packageString: string;
    suggestions: SuggestionsResponseData[];
    isSuggestionBoxVisible: boolean;
    highlightedItem: number;
    /**
     * temporarily disable blur event on input to prevent hiding menu before interaction
     */
    ignoreBlur: boolean;
}

export default Vue.extend({
    data(): Data {
        return {
            packageString: '',
            suggestions: [],
            isSuggestionBoxVisible: false,
            highlightedItem: 0,
            ignoreBlur: false,
        };
    },
    created() {
        this.getSuggestions = debounce(this.fetchSuggestions, 150);
    },
    methods: {
        getSuggestions() {},
        async fetchSuggestions() {
            if (this.packageString) {
                const { name } = parsePackageString(this.packageString);
                const suggestions = await API.getSuggestions(name);
                this.suggestions = suggestions;
                this.toggleSuggestionBox(!!suggestions.length);
            } else {
                this.suggestions = [];
                this.toggleSuggestionBox(false);
            }
        },
        async onSearch() {
            const { name } = parsePackageString(this.packageString);
            const npmPackage = await API.getPackageDetails(name);
        },
        selectPackageAt(index: number) {
            const npmPackage = this.suggestions[index].package;
            this.packageString = createPackageString(npmPackage.name, npmPackage.version);
            this.suggestions = [];
            this.toggleIgnoreBlur(false);
            this.toggleSuggestionBox(false);
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
    },
    components: {
        SuggestionBox,
    },
});
</script>

<style>
.-highlight {
    color: red;
}
</style>
