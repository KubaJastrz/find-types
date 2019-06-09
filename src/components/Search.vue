<template>
    <div class="search">
        <input v-model="packageName" @input="getSuggestions" />
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

type NpmPackage = SuggestionsResponseData['package'];

interface Data {
    packageName: string;
    suggestions: SuggestionsResponseData[];
}

export default Vue.extend({
    data(): Data {
        return {
            packageName: '',
            suggestions: [],
        };
    },
    created() {
        this.getSuggestions = debounce(this.fetchSuggestions, 150);
    },
    methods: {
        getSuggestions() {},
        async fetchSuggestions() {
            if (this.packageName) {
                const suggestions = await API.getSuggestions(this.packageName);
                this.suggestions = suggestions;
            } else {
                this.suggestions = [];
            }
        },
        async onSearch() {
            const npmPackage = await API.getPackageDetails(this.packageName);
        },
        selectPackage(npmPackage: NpmPackage) {
            this.packageName = npmPackage.name;
            this.suggestions = [];
        },
    },
    components: {
        SuggestionBox,
    },
});
</script>
