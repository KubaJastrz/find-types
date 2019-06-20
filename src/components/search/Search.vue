<template>
    <div class="search">
        <form @submit.prevent="handleSearch">
            <Autocomplete
                placeholder="look for npm package"
                :on-select="handleSelect"
                :on-input="handleInput"
                :items="suggestions.list"
                :get-value-from-item="extractNameFromSuggestion"
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
import { SuggestionsResponseData } from '@/api/ApiTypes';

type Suggestion = SuggestionsResponseData;

interface Data {
    packageString: string;
    suggestions: {
        forPackage: string;
        list: Suggestion[];
    };
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
        };
    },
    created() {
        this.getSuggestions = debounce(this.fetchSuggestions, 350);
    },
    methods: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        getSuggestions(packageString: string) {},
        async fetchSuggestions(packageString: string) {
            if (packageString) {
                const { name } = parsePackageString(packageString);
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
            this.onSearch(this.packageString);
        },
        handleSelect(inputText: string) {
            const { name } = parsePackageString(inputText);
            this.packageString = name;
            this.handleSearch();
        },
        handleInput(inputText: string) {
            const { name } = parsePackageString(inputText);
            this.packageString = name;
            this.getSuggestions(name);
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
