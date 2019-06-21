<template>
    <div class="search">
        <form @submit.prevent="handleSearch">
            <Autocomplete
                :can-be-opened="handleOpen"
                :on-select="handleSelect"
                :on-input="handleInput"
                :on-focus="handleFocus"
                :items-key="suggestions.forPackage"
                :items="suggestions.list"
                :get-value-from-item="extractNameFromSuggestion"
                placeholder="look for npm package"
            >
                <template v-slot:button-right>
                    <button aria-label="Search" type="submit" class="search-button">
                        <SearchIcon />
                    </button>
                </template>
            </Autocomplete>
        </form>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { debounce } from 'lodash';

import Autocomplete from './Autocomplete.vue';
import SearchIcon from '@/assets/icons/search.svg';
import API from '@/api/Api';
import { parsePackageString, createPackageString } from '@/helpers';
import { Suggestion } from '@/types';

interface Data {
    packageString: string;
    suggestions: {
        forPackage: string;
        list: Suggestion[];
    };
    canSuggestionsBeShown: boolean;
}

export default Vue.extend({
    components: {
        Autocomplete,
        SearchIcon,
    },
    props: {
        onSearch: {
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
            canSuggestionsBeShown: true,
        };
    },
    created() {
        this.debouncedFetchSuggestions = debounce(this.fetchSuggestions, 350);
    },
    methods: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        debouncedFetchSuggestions(packageString: string) {},

        async fetchSuggestions(packageString: string) {
            if (packageString) {
                const { name } = parsePackageString(packageString);
                // use cache if possible
                if (name === this.suggestions.forPackage) {
                    return;
                }
                const suggestions = await API.getSuggestions(name);
                this.suggestions = {
                    forPackage: name,
                    list: suggestions,
                };
            } else {
                this.suggestions = {
                    forPackage: '',
                    list: [],
                };
            }
        },

        handleSearch() {
            if (!this.packageString) {
                return;
            }
            this.canSuggestionsBeShown = false;
            this.onSearch(this.packageString);
        },

        handleSelect(inputText: string) {
            const { name } = parsePackageString(inputText);
            this.packageString = name;
            this.handleSearch();
        },

        handleInput(inputText: string) {
            this.canSuggestionsBeShown = true;
            const { name } = parsePackageString(inputText);
            this.packageString = name;
            this.debouncedFetchSuggestions(name);
        },

        handleFocus(wasOpened: boolean) {
            if (!wasOpened) {
                this.debouncedFetchSuggestions(this.packageString);
            }
        },

        handleOpen(inputText: string): boolean {
            const { forPackage } = this.suggestions;
            if (this.canSuggestionsBeShown && inputText.startsWith(forPackage)) {
                return true;
            } else {
                this.debouncedFetchSuggestions(inputText);
                return false;
            }
        },

        extractNameFromSuggestion(suggestion: Suggestion): string {
            return suggestion ? createPackageString(suggestion.package.name) : '';
        },
    },
});
</script>

<style lang="scss" scoped>
@import 'helpers';

.search {
    position: relative;
    width: 400px;
}

.search-button {
    @extend %button-unstyled;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;

    svg {
        width: 20px;
        height: 20px;
    }
}
</style>
