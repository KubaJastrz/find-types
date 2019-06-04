<template>
    <div class="search">
        <input v-model="packageName" />
        <button v-on:click="search">Search</button>
        <ul>
            <li
                v-for="suggestion in suggestions"
                v-bind:key="suggestion.package.name"
                v-html="suggestion.highlight"
            />
        </ul>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import API from '@/api/Api';
import { SuggestionsResponseResult } from '@/api/ApiTypes';

interface Data {
    packageName: string;
    suggestions: SuggestionsResponseResult[];
}

export default Vue.extend({
    data(): Data {
        return {
            packageName: '',
            suggestions: [],
        };
    },
    methods: {
        async search() {
            const suggestions = await API.getSuggestions(this.packageName);
            this.suggestions = suggestions;
        },
    },
});
</script>
