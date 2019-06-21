<template>
    <ul :class="{ '-open': isVisible }" class="suggestion-box">
        <li v-for="(suggestion, index) of suggestions" :key="suggestion.package.name" class="item">
            <slot :suggestion="suggestion" :index="index" name="item"></slot>
        </li>
    </ul>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

import { Suggestion } from '@/types';

export default Vue.extend({
    props: {
        suggestions: {
            type: Array as PropType<Suggestion[]>,
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
