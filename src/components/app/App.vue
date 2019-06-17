<template>
    <div id="app">
        <Search :handle-search="handlePackageSearch" />
        <Results :package-data="packageSearchResults.data" />
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
        };
    },
    methods: {
        async handlePackageSearch(packageName: string) {
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

                if (error.response.status === 404) {
                    this.packageSearchResults = {
                        status: PackageSearchStatus.NotFound,
                    };
                } else {
                    this.packageSearchResults = {
                        status: PackageSearchStatus.GenericError,
                    };
                }
            }
        },
    },
});
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
