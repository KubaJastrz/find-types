<template>
    <div id="app">
        <h1 class="title"><a href="/">Find Types</a></h1>
        <Search :on-search="handlePackageSearch" :initial-query="initialQuery" />
        <div class="results-wrapper">
            <Results
                v-if="isPackageSuccess"
                :package-data="packageSearchResults.data"
                :types-package-data="typesPackageResults.data"
                :package-json-data="packageJsonResults.data"
                :has-index-d-file="hasIndexDFile"
                :is-types-data-loading="isTypesDataLoading"
            />
            <div v-else-if="isPackageTypesPackage">
                DefinitelyTyped package detected, enter valid package name
            </div>
            <div v-else-if="isPackageNotFound">
                Package not found
            </div>
            <div v-else-if="isPackageError">
                Unexpected error happened, try again
            </div>
        </div>
        <Footer />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { HTTPError } from 'ky';
import { parse } from 'query-string';

import API from '@/api/Api';
import Search from '@/components/search/Search.vue';
import Results from '@/components/results/Results.vue';
import Footer from './Footer.vue';
import { getTypesPackageName } from '@/helpers';
import { PackageData, PackageJson } from '@/types';
import { PackageSearchStatus } from '@/types/enums';

interface Data {
    initialQuery?: string | null;
    packageSearchResults: {
        status: PackageSearchStatus;
        data?: PackageData;
    };
    isPackageLoading: boolean;
    typesPackageResults: {
        status: PackageSearchStatus;
        data?: PackageData;
    };
    isTypesPackageLoading: boolean;
    packageJsonResults: {
        status: PackageSearchStatus;
        data?: PackageJson;
    };
    isPackageJsonLoading: boolean;
    hasIndexDFile: boolean | null;
    isDeclarationIndexFileLoading: boolean;
}

export default Vue.extend({
    components: {
        Search,
        Results,
        Footer,
    },
    data(): Data {
        return {
            packageSearchResults: {
                status: PackageSearchStatus.Init,
                data: undefined,
            },
            isPackageLoading: false,
            typesPackageResults: {
                status: PackageSearchStatus.Init,
                data: undefined,
            },
            isTypesPackageLoading: false,
            packageJsonResults: {
                status: PackageSearchStatus.Init,
                data: undefined,
            },
            isPackageJsonLoading: false,
            hasIndexDFile: null,
            isDeclarationIndexFileLoading: false,
        };
    },
    computed: {
        isTypesDataLoading(): boolean {
            return (
                this.isTypesPackageLoading ||
                this.isPackageJsonLoading ||
                this.isDeclarationIndexFileLoading
            );
        },
        // TODO: check if there is a better solution for enums in <template>
        isPackageSuccess(): boolean {
            return this.isPackageOfStatus(PackageSearchStatus.Success);
        },
        isPackageNotFound(): boolean {
            return this.isPackageOfStatus(PackageSearchStatus.NotFound);
        },
        isPackageError(): boolean {
            return this.isPackageOfStatus(PackageSearchStatus.GenericError);
        },
        isPackageTypesPackage(): boolean {
            return this.isPackageOfStatus(PackageSearchStatus.TypesPackage);
        },
    },
    created() {
        const { q } = parse(location.search);
        this.initialQuery = Array.isArray(q) ? q[0] : q;
    },
    methods: {
        isPackageOfStatus(status: PackageSearchStatus) {
            return !this.isPackageLoading && this.packageSearchResults.status === status;
        },

        async handlePackageSearch(packageName: string) {
            const success = await this.getPackageDetails(packageName);
            if (success) {
                this.getTypesPackage(packageName);
                this.getPackageJson(packageName);
                this.getDeclarationIndexFile(packageName);
            }
        },

        async getPackageDetails(packageName: string) {
            if (packageName.startsWith('@types/')) {
                this.packageSearchResults = {
                    status: PackageSearchStatus.TypesPackage,
                    data: undefined,
                };
                return false;
            }

            this.isPackageLoading = true;
            this.packageSearchResults = {
                status: PackageSearchStatus.Init,
                data: undefined,
            };

            try {
                const data = await API.getPackageDetails(packageName);

                this.packageSearchResults = {
                    status: PackageSearchStatus.Success,
                    data,
                };
            } catch (error) {
                if (!(error instanceof HTTPError)) {
                    return;
                }

                if (error.response.status === 400 || error.response.status === 404) {
                    this.packageSearchResults = {
                        status: PackageSearchStatus.NotFound,
                    };
                } else {
                    this.packageSearchResults = {
                        status: PackageSearchStatus.GenericError,
                    };
                }
            } finally {
                this.isPackageLoading = false;
            }

            return this.packageSearchResults.status === PackageSearchStatus.Success;
        },

        async getTypesPackage(packageName: string) {
            const typesPackage = getTypesPackageName(packageName);

            this.isTypesPackageLoading = true;
            this.typesPackageResults = {
                status: PackageSearchStatus.Init,
                data: undefined,
            };

            try {
                const data = await API.getPackageDetails(typesPackage);

                this.typesPackageResults = {
                    status: PackageSearchStatus.Success,
                    data,
                };
            } catch (error) {
                if (!(error instanceof HTTPError)) {
                    return;
                }

                if (error.response.status === 400 || error.response.status === 404) {
                    this.typesPackageResults = {
                        status: PackageSearchStatus.NotFound,
                    };
                } else {
                    this.typesPackageResults = {
                        status: PackageSearchStatus.GenericError,
                    };
                }
            } finally {
                this.isTypesPackageLoading = false;
            }
        },

        async getPackageJson(packageName: string) {
            this.isPackageJsonLoading = true;

            this.packageJsonResults = {
                status: PackageSearchStatus.Init,
                data: undefined,
            };

            try {
                const data = await API.getPackageJson(packageName);

                this.packageJsonResults = {
                    status: PackageSearchStatus.Success,
                    data,
                };
            } catch (error) {
                if (!(error instanceof HTTPError)) {
                    return;
                }

                this.typesPackageResults = {
                    status: PackageSearchStatus.GenericError,
                };
            } finally {
                this.isPackageJsonLoading = false;
            }
        },

        async getDeclarationIndexFile(packageName: string) {
            this.isDeclarationIndexFileLoading = true;
            this.hasIndexDFile = null;

            try {
                const data = await API.getDeclarationIndex(packageName);

                this.hasIndexDFile = !!data;
            } catch (error) {
                if (!(error instanceof HTTPError)) {
                    return;
                }

                if (error.response.status === 404) {
                    this.hasIndexDFile = false;
                } else {
                    this.hasIndexDFile = null;
                }
            } finally {
                this.isDeclarationIndexFileLoading = false;
            }
        },
    },
});
</script>

<style>
#app {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
}
</style>

<style lang="scss" scoped>
@import 'helpers';

.title {
    font-size: 1.67em;
    margin-top: 1.33em;
    margin-bottom: 1em;

    @include respond-from(mobile-large) {
        font-size: 2.33em;
    }

    a {
        @extend %link-unstyled;
    }
}

.results-wrapper {
    margin-top: 50px;
    width: 100%;
    padding: 0 20px;

    @include respond-from(mobile-large) {
        width: 400px;
        padding: 0;
    }

    @include respond-from(tablet) {
        width: 520px;
    }
}

.footer {
    margin-top: auto;
    margin-bottom: 12px;
}
</style>
