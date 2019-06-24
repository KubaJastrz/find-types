<template>
    <div class="results">
        <PackageDetails :package-data="packageData" />
        <ul v-if="didLoadTypes" class="types-results">
            <li><TypesPackageResults :package-data="typesPackageData" /></li>
            <li><PackageJsonResults :package-json-data="packageJsonData" /></li>
            <li>
                <IndexDFileResults :has-index-d-file="hasIndexDFile" :package-name="packageName" />
            </li>
        </ul>
        <div v-else-if="loaderTimeoutId === null" class="types-loader">
            loading...
        </div>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

import PackageDetails from './PackageDetails.vue';
import TypesPackageResults from './TypesPackageResults.vue';
import PackageJsonResults from './PackageJsonResults.vue';
import IndexDFileResults from './IndexDFileResults.vue';
import { PackageData, PackageJson } from '@/types';

interface Data {
    loaderTimeoutId: number | null;
    didLoadTypes: boolean;
}

export default Vue.extend({
    components: {
        PackageDetails,
        TypesPackageResults,
        PackageJsonResults,
        IndexDFileResults,
    },
    props: {
        packageData: {
            type: Object as PropType<PackageData>,
            default: undefined,
        },
        typesPackageData: {
            type: Object as PropType<PackageData>,
            default: undefined,
        },
        packageJsonData: {
            type: Object as PropType<PackageJson>,
            default: undefined,
        },
        hasIndexDFile: {
            type: Boolean as PropType<boolean | null>,
            default: null,
        },
        isTypesDataLoading: {
            type: Boolean,
            required: true,
        },
    },
    data(): Data {
        return {
            loaderTimeoutId: null,
            didLoadTypes: false,
        };
    },
    computed: {
        packageName(): string | undefined {
            return this.packageData && this.packageData.name;
        },
    },
    watch: {
        isTypesDataLoading(willBeLoading, wasLoading) {
            if (wasLoading && !willBeLoading) {
                this.didLoadTypes = true;
            } else if (willBeLoading && !wasLoading) {
                this.didLoadTypes = false;
            }
        },
    },
    created() {
        this.loaderTimeoutId = setTimeout(() => {
            this.loaderTimeoutId = null;
        }, 200);
    },
});
</script>

<style lang="scss" scoped>
@import 'helpers';

.results {
    margin: 0 auto;
}

.types-loader {
    margin-top: 50px;
    text-align: center;
}

.types-results {
    margin-top: 30px;

    li {
        margin-top: 25px;
    }
}
</style>
