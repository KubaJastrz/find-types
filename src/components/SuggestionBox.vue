<template>
    <ul class="suggestion-box">
        <li v-for="suggestion of suggestions" :key="suggestion.package.name">
            <slot name="item" :suggestion="suggestion"></slot>
        </li>
    </ul>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { SuggestionsResponseData } from '@/api/ApiTypes';

export default Vue.extend({
    props: {
        suggestions: Array as PropType<SuggestionsResponseData[]>,
    },
});
</script>
