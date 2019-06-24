<template>
    <footer class="footer">
        <div class="links">
            <external-link href="https://github.com/KubaJastrz/find-types">
                <GithubIcon />
            </external-link>
        </div>
        <span class="powered-by">
            Powered by <external-link href="https://npms.io/">npms.io</external-link> and
            <external-link href="https://unpkg.com/">unpkg</external-link>
        </span>
    </footer>
</template>

<script lang="ts">
import Vue from 'vue';
import GithubIcon from '@/assets/icons/github.svg';

export default Vue.extend({
    components: {
        GithubIcon,
    },
});
</script>

<style lang="scss" scoped>
@import 'helpers';

.footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 0.85em;
    color: #666;
    padding: 8px;
    transition: 100ms ease-in-out;

    @include respond-from(mobile-large) {
        font-size: 0.9em;
    }

    &:hover {
        color: #333;
    }
}

.links {
    margin-bottom: 8px;

    .external-link {
        @extend %link-unstyled;
    }
}

.powered-by .external-link {
    @extend %link-default;
}
</style>
