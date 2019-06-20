<template>
    <div class="package-details" :class="{ '-small': small }">
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
        <p v-if="!hideDescription" class="description">{{ packageData.description }}</p>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

import { PackageResponseData } from '@/api/ApiTypes';
import GithubIcon from '@/assets/icons/github.svg';
import NpmIcon from '@/assets/icons/npm.svg';

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
        hideDescription: {
            type: Boolean,
            default: false,
        },
        small: {
            type: Boolean,
            default: false,
        },
    },
});
</script>

<style lang="scss" scoped>
@import 'helpers';

$base: 16px;

.package-details {
    font-size: $base;

    &.-small {
        font-size: 13.5px;

        .version {
            font-size: 11px;
        }
    }
}

.package-meta {
    display: flex;
    align-items: center;
}

.name {
    font-weight: bold;
    font-family: $font-mono;
    font-size: em(20px, $base);
}

.version {
    display: inline-block;
    padding: 1px 6px;
    font-size: 12px;
    font-weight: bold;
    background: #778798;
    color: #fff;
    border-radius: 2px;
    margin-left: 1.6em;
}

.description {
    margin-top: 10px;
    font-size: em(15px, $base);
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
