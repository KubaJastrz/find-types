<template>
    <div class="results">
        <PackageDetails :package-data="packageData" />
        <ul class="types-results">
            <li><TypesPackageResults :package-data="typesPackageData" /></li>
            <li><PackageJsonResults :package-json-data="packageJsonData" /></li>
        </ul>
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
    },
});
</script>

<style lang="scss" scoped>
.results {
    width: 500px;
}

.types-results {
    margin-top: 30px;

    li {
        margin-top: 25px;
    }
}
</style>
