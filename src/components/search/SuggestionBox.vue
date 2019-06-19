<template>
    <ul class="suggestion-box" :class="{ '-open': isVisible }">
        <li v-for="(suggestion, index) of suggestions" :key="suggestion.package.name" class="item">
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
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 4px 11px;
    background: #fff;

    &.-open {
        display: block;
    }
}

.item {
    display: flex;
}
</style>
