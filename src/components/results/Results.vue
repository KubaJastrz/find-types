<template>
    <div class="results">
        <PackageDetails :package-data="packageData" />
        <ul class="types-results">
            <li><TypesPackageResults :package-data="typesPackageData" /></li>
        </ul>
    </div>
</template>

<script lang="ts">
import Vue, { PropType, PropOptions } from 'vue';

import { PackageResponseData } from '@/api/ApiTypes';
import PackageDetails from './PackageDetails.vue';
import TypesPackageResults from './TypesPackageResults.vue';

type PackageData = PackageResponseData['collected']['metadata'];

const packageProp: PropOptions = {
    type: Object as PropType<PackageData | null>,
    default: null,
};

export default Vue.extend({
    components: {
        PackageDetails,
        TypesPackageResults,
    },
    props: {
        packageData: packageProp,
        typesPackageData: packageProp,
    },
});
</script>

<style lang="scss" scoped>
.results {
    width: 500px;
}

.types-results {
    margin-top: 30px;
}
</style>
