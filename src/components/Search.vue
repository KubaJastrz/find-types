<template>
    <div class="search">
        <input v-model="packageName" @input="getSuggestions" />
        <button @click="search">Search</button>
        <ul>
            <li v-for="suggestion in suggestions" v-bind:key="suggestion.package.name">
                <a
                    :href="getPackageUrl(suggestion.package)"
                    @click.prevent="selectPackage(suggestion.package)"
                    v-html="suggestion.highlight || suggestion.package.name"
                />
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import debounce from 'debounce';
import API from '@/api/Api';
import { SuggestionsResponseData } from '@/api/ApiTypes';

type NpmPackage = SuggestionsResponseData['package'];

interface Data {
    packageName: string;
    suggestions: SuggestionsResponseData[];
    isSuggestionsOpen: boolean;
}

export default Vue.extend({
    data(): Data {
        return {
            packageName: '',
            suggestions: [],
            isSuggestionsOpen: false,
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
        async search() {
            const npmPackage = await API.getPackageDetails(this.packageName);
        },
        getPackageUrl(npmPackage: NpmPackage) {
            return `/?package=${npmPackage.name}@${npmPackage.version}`;
        },
        selectPackage(npmPackage: NpmPackage) {
            console.log(npmPackage);
        },
    },
});
</script>
