<template>
    <a :target="openInNewTab && '_blank'" rel="noopener noreferrer" class="external-link">
        <slot />
    </a>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    props: {
        openInNewTab: {
            type: Boolean,
            default: false,
        },
    },
});
</script>
