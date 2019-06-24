<template>
    <div :class="{ '-small': small }" class="package-details">
        <div class="package-meta">
            <h4 class="name">{{ packageData.name }}</h4>
            <div class="version">{{ packageData.version }}</div>
            <div class="links">
                <external-link
                    v-if="packageData.links.npm"
                    :href="packageData.links.npm"
                    class="link -npm"
                >
                    <span title="Npm registry"><NpmIcon /></span>
                </external-link>
                <external-link
                    v-if="packageData.links.repository"
                    :href="packageData.links.repository"
                    class="link -repo"
                >
                    <span title="Source code repository">
                        <GithubIcon v-if="isRepoGithub" />
                        <GitlabIcon v-else-if="isRepoGitlab" />
                        <BitbucketIcon v-else-if="isRepoBitbucket" />
                        <GithubIcon v-else />
                    </span>
                </external-link>
            </div>
        </div>
        <p v-if="!hideDescription" class="description">{{ packageData.description }}</p>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

import NpmIcon from '@/assets/icons/npm.svg';
import GithubIcon from '@/assets/icons/github.svg';
import GitlabIcon from '@/assets/icons/gitlab.svg';
import BitbucketIcon from '@/assets/icons/bitbucket.svg';
import { PackageData } from '@/types';

export default Vue.extend({
    components: {
        NpmIcon,
        GithubIcon,
        GitlabIcon,
        BitbucketIcon,
    },
    props: {
        packageData: {
            type: Object as PropType<PackageData>,
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
    computed: {
        isRepoGithub(): boolean {
            return this.matchRepoDomain('github.com');
        },
        isRepoGitlab(): boolean {
            return this.matchRepoDomain('gitlab.com');
        },
        isRepoBitbucket(): boolean {
            return this.matchRepoDomain('bitbucket.org');
        },
    },
    methods: {
        matchRepoDomain(domain: string): boolean {
            return (
                this.packageData &&
                this.packageData.links.repository !== undefined &&
                !!this.packageData.links.repository.match(domain)
            );
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
    height: 1.1em;
    margin-right: 0.9em;
    color: $icon-color;
    transition: 100ms ease-in-out;

    &:last-child {
        margin-right: 0;
    }

    &:focus,
    &:hover {
        &.-npm {
            color: #cb3837;
        }

        .gitlab-1 {
            fill: #fc6d26;
        }

        .gitlab-2 {
            fill: #e24329;
        }

        .gitlab-3 {
            fill: #fca326;
        }

        .bitbucket-icon-color {
            fill: #2684ff;
        }

        .bitbucket-icon-gradient-stop-1 {
            stop-color: #2684ff;
        }

        .bitbucket-icon-gradient-stop-2 {
            stop-color: #0052cc;
        }

        color: darken($icon-color, 40);
    }

    svg {
        height: 100%;
        width: auto;
        max-width: 28px;
    }
}

.gitlab-1,
.gitlab-2,
.gitlab-3,
.bitbucket-icon-color,
.bitbucket-icon-gradient-stop-1,
.bitbucket-icon-gradient-stop-2 {
    transition: 100ms ease-in-out;
}

.gitlab-1 {
    fill: lighten(#768ea8, 5);
}

.gitlab-2 {
    fill: lighten(#647c96, 7);
}

.gitlab-3 {
    fill: lighten(#8199b3, 10);
}

.bitbucket-icon-color {
    fill: lighten(#637b95, 10);
}

.bitbucket-icon-gradient-stop-1 {
    stop-color: lighten(#637b95, 10);
}

.bitbucket-icon-gradient-stop-2 {
    stop-color: lighten(#364e68, 10);
}
</style>
