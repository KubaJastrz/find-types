<template>
    <footer class="footer">
        <div class="links">
            <a href="https://github.com/KubaJastrz/find-types" class="link" title="Source code">
                <GithubIcon />
            </a>
        </div>
        <span class="powered-by">
            Powered by <a href="https://npms.io/" class="link">npms.io</a> and
            <a href="https://unpkg.com/" class="link">unpkg</a>
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

    .link {
        @extend %link-unstyled;
    }
}

.powered-by .link {
    @extend %link-default;
}
</style>
