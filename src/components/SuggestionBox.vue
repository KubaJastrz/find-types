<template>
    <ul class="suggestion-box" :class="{ '-open': isVisible }">
        <li v-for="(suggestion, index) of suggestions" :key="suggestion.package.name">
            <slot name="item" :suggestion="suggestion" :index="index"></slot>
        </li>
    </ul>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { SuggestionsResponseData } from '@/api/ApiTypes';

export default Vue.extend({
    props: {
        suggestions: {
            type: Array as PropType<SuggestionsResponseData[]>,
            required: true,
        },
        isVisible: {
            type: Boolean,
            required: true,
        },
    },
});
</script>

<style lang="scss" scoped>
.suggestion-box {
    display: none;

    &.-open {
        display: block;
    }
}
</style>
