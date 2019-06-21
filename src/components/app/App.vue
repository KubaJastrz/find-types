<template>
    <div id="app">
        <h1 class="title"><a href="/">Find Types</a></h1>
        <Search :on-search="handlePackageSearch" :initial-query="initialQuery" />
        <div class="results-wrapper">
            <Results
                v-if="isPackageSuccess"
                :package-data="packageSearchResults.data"
                :types-package-data="typesPackageResults.data"
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
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { HTTPError } from 'ky';
import { parse } from 'query-string';

import API from '@/api/Api';
import Search from '@/components/search/Search.vue';
import Results from '@/components/results/Results.vue';
import { getTypesPackageName } from '@/helpers';
import { PackageData } from '@/types';
import { PackageSearchStatus } from '@/types/enums';

interface Data {
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
    initialQuery?: string | null;
}

export default Vue.extend({
    components: {
        Search,
        Results,
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
        };
    },
    computed: {
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
    },
});
</script>

<style>
#app {
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>

<style lang="scss" scoped>
@import 'helpers';

.title {
    font-size: 2.33em;
    margin-bottom: 1em;

    a {
        @extend %link-unstyled;
    }
}

.results-wrapper {
    margin-top: 50px;
}
</style>
