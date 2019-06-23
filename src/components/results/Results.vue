<template>
    <div class="results">
        <PackageDetails :package-data="packageData" />
        <ul v-if="didLoadTypes" class="types-results">
            <li><TypesPackageResults :package-data="typesPackageData" /></li>
            <li><PackageJsonResults :package-json-data="packageJsonData" /></li>
        </ul>
        <div v-else-if="loaderTimeoutId === null" class="types-loader">
            loading...
        </div>
    </div>
</template>

<script lang="ts">
import Vue, { PropType, PropOptions } from 'vue';

import PackageDetails from './PackageDetails.vue';
import TypesPackageResults from './TypesPackageResults.vue';
import PackageJsonResults from './PackageJsonResults.vue';
import { PackageData, PackageJson } from '@/types';

const packageProp: PropOptions = {
    type: Object as PropType<PackageData>,
    default: undefined,
};

interface Data {
    loaderTimeoutId: number | null;
    didLoadTypes: boolean;
}

export default Vue.extend({
    components: {
        PackageDetails,
        TypesPackageResults,
        PackageJsonResults,
    },
    props: {
        packageData: packageProp,
        typesPackageData: packageProp,
        packageJsonData: {
            type: Object as PropType<PackageJson>,
            default: undefined,
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
.results {
    width: 500px;
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
