<template>
    <div id="app">
        <h1 class="title">Find Types</h1>
        <Search :handle-search="searchPackageDetails" />
        <Results v-if="!isPackageLoading" :package-data="packageSearchResults.data" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { HTTPError } from 'ky';

import API from '@/api/Api';
import Search from '@/components/search/Search.vue';
import Results from '@/components/results/Results.vue';
import { PackageResponseData } from '@/api/ApiTypes';
import { PackageSearchStatus } from '@/types';

interface Data {
    packageSearchResults: {
        status: PackageSearchStatus;
        data?: PackageResponseData;
    };
    isPackageLoading: boolean;
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
        };
    },
    methods: {
        async searchPackageDetails(packageName: string) {
            try {
                this.isPackageLoading = true;

                const data = await API.getPackageDetails(packageName);

                this.packageSearchResults = {
                    status: PackageSearchStatus.Success,
                    data,
                };
            } catch (error) {
                if (!(error instanceof HTTPError)) {
                    return;
                }

                if (error.response.status === 404) {
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

<style scoped>
.title {
    margin-bottom: 1em;
}
</style>
