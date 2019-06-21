<template>
    <div class="results-entry">
        <div :class="{ '-green': green, '-orange': orange, '-gray': gray }" class="status">
            <div class="status-icon">
                <slot name="icon"></slot>
            </div>
            <strong class="status-text">
                <slot name="status"></slot>
            </strong>
        </div>
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    props: {
        green: {
            type: Boolean,
            default: false,
        },
        orange: {
            type: Boolean,
            default: false,
        },
        gray: {
            type: Boolean,
            default: false,
        },
    },
});
</script>

<style lang="scss" scoped>
.results-entry {
    display: flex;
    flex-direction: column;
}

.status {
    display: flex;
    align-items: center;

    &.-green {
        color: green;
    }

    &.-orange {
        color: goldenrod;
    }

    &.-gray {
        color: #505050;
    }
}

.status-icon {
    height: 24px;
    width: 24px;

    svg {
        width: 100%;
        height: 100%;
    }
}

.status-text {
    margin-left: 8px;
    font-size: 14px;
}

.content {
    margin-top: 10px;
    margin-left: 24px + 8px;
}
</style>
