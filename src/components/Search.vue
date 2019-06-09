<template>
    <div class="search">
        <input v-model="packageString" @input="getSuggestions" />
        <button @click="onSearch">Search</button>
        <SuggestionBox :suggestions="suggestions">
            <template v-slot:item="{ suggestion }">
                <button
                    @click.prevent="selectPackage(suggestion.package)"
                    v-html="suggestion.highlight || suggestion.package.name"
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
import { parsePackageString, makePackageString } from '@/helpers';

type NpmPackage = SuggestionsResponseData['package'];

interface Data {
    /**
     * eg. vue@2.6.10
     */
    packageString: string;
    suggestions: SuggestionsResponseData[];
}

export default Vue.extend({
    data(): Data {
        return {
            packageString: '',
            suggestions: [],
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
            } else {
                this.suggestions = [];
            }
        },
        async onSearch() {
            const { name } = parsePackageString(this.packageString);
            const npmPackage = await API.getPackageDetails(name);
        },
        selectPackage(npmPackage: NpmPackage) {
            this.packageString = makePackageString(npmPackage.name, npmPackage.version);
            this.suggestions = [];
        },
    },
    components: {
        SuggestionBox,
    },
});
</script>
