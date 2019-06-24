<template>
    <div class="search">
        <form @submit.prevent="handleSearch(packageName)">
            <Autosuggest
                :initial-value="parsedInitialQuery"
                :can-be-opened="handleOpen"
                :on-select="handleSelect"
                :on-input="handleInput"
                :items-key="suggestions.forPackage"
                :items="suggestions.list"
                :get-value-from-item="extractPackageNameFromSuggestion"
                placeholder="look for npm package"
            >
                <template v-slot:button-right>
                    <button aria-label="Search" type="submit" class="search-button">
                        <SearchIcon />
                    </button>
                </template>
            </Autosuggest>
        </form>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { debounce } from 'lodash';
import { stringify } from 'query-string';

import Autosuggest from './Autosuggest.vue';
import SearchIcon from '@/assets/icons/search.svg';
import API from '@/api/Api';
import { parsePackageString } from '@/helpers';
import { Suggestion } from '@/types';

interface Data {
    packageName: string;
    suggestions: {
        forPackage: string;
        list: Suggestion[];
    };
    canSuggestionsBeShown: boolean;
}

export default Vue.extend({
    components: {
        Autosuggest,
        SearchIcon,
    },
    props: {
        onSearch: {
            type: Function,
            required: true,
        },
        initialQuery: {
            type: String,
            default: undefined,
        },
    },
    data(): Data {
        return {
            packageName: '',
            suggestions: {
                forPackage: '',
                list: [],
            },
            canSuggestionsBeShown: true,
        };
    },
    computed: {
        parsedInitialQuery(): string | undefined {
            if (!this.initialQuery) {
                return;
            }
            const { name } = parsePackageString(this.initialQuery);
            return name;
        },
    },
    created() {
        this.debouncedFetchSuggestions = debounce(this.fetchSuggestions, 200);
        if (this.parsedInitialQuery) {
            this.handleSearch(this.parsedInitialQuery);
            this.packageName = this.parsedInitialQuery;
        }
    },
    methods: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        debouncedFetchSuggestions(packageName: string) {},

        async fetchSuggestions(packageName: string) {
            if (packageName) {
                const { name } = parsePackageString(packageName);
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

        handleSearch(packageName: string) {
            if (!packageName) {
                return;
            }
            this.canSuggestionsBeShown = false;
            this.onSearch(packageName);
            this.pushHistory(packageName);
        },

        pushHistory(packageName: string) {
            const url = stringify({ q: packageName });
            window.history.pushState(null, '', `/?${url}`);
        },

        handleSelect(inputText: string) {
            this.updatePackageName(inputText);
            this.handleSearch(this.packageName);
            this.suggestions.forPackage = this.packageName;
        },

        handleInput(inputText: string) {
            this.canSuggestionsBeShown = true;
            this.updatePackageName(inputText);
            this.debouncedFetchSuggestions(this.packageName);
        },

        handleOpen(inputText: string): boolean {
            const { forPackage } = this.suggestions;
            return this.canSuggestionsBeShown && inputText.toLowerCase().startsWith(forPackage);
        },

        extractPackageNameFromSuggestion(suggestion: Suggestion): string {
            return suggestion ? suggestion.package.name : '';
        },

        updatePackageName(inputText: string) {
            const { name } = parsePackageString(inputText.toLowerCase());
            this.packageName = name;
        },
    },
});
</script>

<style lang="scss" scoped>
@import 'helpers';

.search {
    position: relative;
    width: 300px;

    @include respond-from(mobile-large) {
        width: 340px;
    }

    @include respond-from(tablet) {
        width: 420px;
    }
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
