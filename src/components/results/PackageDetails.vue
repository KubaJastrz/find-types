<template>
    <div class="package-details">
        <div class="package-meta">
            <h4 class="name">{{ packageData.name }}</h4>
            <div class="version">{{ packageData.version }}</div>
            <div class="links">
                <external-link
                    v-if="packageData.links.npm"
                    :href="packageData.links.npm"
                    class="link -npm"
                >
                    <NpmIcon />
                </external-link>
                <external-link
                    v-if="packageData.links.repository"
                    :href="packageData.links.repository"
                    class="link -repo"
                >
                    <GithubIcon />
                </external-link>
            </div>
        </div>
        <p class="description">{{ packageData.description }}</p>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

import { PackageResponseData } from '@/api/ApiTypes';
import GithubIcon from '@/components/common/icons/GithubIcon.vue';
import NpmIcon from '@/components/common/icons/NpmIcon.vue';

type PackageDetails = PackageResponseData['collected']['metadata'];

export default Vue.extend({
    components: {
        GithubIcon,
        NpmIcon,
    },
    props: {
        packageData: {
            type: Object as PropType<PackageDetails>,
            required: true,
        },
    },
});
</script>

<style lang="scss" scoped>
.package-meta {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.name {
    font-weight: bold;
}

.version {
    display: inline-block;
    padding: 1px 6px;
    font-size: 0.7em;
    font-weight: bold;
    background: #778798;
    color: #fff;
    border-radius: 2px;
    margin-left: 1em;
}

.description {
    font-size: 0.9em;
}

.links {
    display: flex;
    align-items: center;
    margin-left: 1.6em;
}

.link {
    $icon-color: #7b93ad;
    width: 28px;
    height: 1.1em;
    margin-right: 0.3em;
    color: $icon-color;

    &:last-child {
        margin-right: 0;
    }

    &:hover {
        &.-npm {
            color: #cb3837;
        }

        color: darken($icon-color, 40);
    }

    svg {
        width: 100%;
        height: 100%;
    }
}
</style>
