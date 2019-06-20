<template>
    <div class="results">
        <PackageDetails v-if="packageData" :package-data="packageData" />
        <PackageDetails
            v-if="typesPackageData"
            :package-data="typesPackageData"
            style="margin-top: 20px"
        />
    </div>
</template>

<script lang="ts">
import Vue, { PropType, PropOptions } from 'vue';

import { PackageResponseData } from '@/api/ApiTypes';
import PackageDetails from './PackageDetails.vue';

type PackageData = PackageResponseData['collected']['metadata'];

const packageProp: PropOptions = {
    type: Object as PropType<PackageData | null>,
    default: null,
};

export default Vue.extend({
    components: {
        PackageDetails,
    },
    props: {
        packageData: packageProp,
        typesPackageData: packageProp,
    },
});
</script>

<style scoped>
.results {
    margin-top: 50px;
    width: 500px;
}
</style>
