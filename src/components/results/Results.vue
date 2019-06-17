<template>
    <div class="results">
        <PackageDetails v-if="packageData" :package-data="packageData.collected.metadata" />
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

import { PackageResponseData } from '@/api/ApiTypes';
import PackageDetails from './PackageDetails.vue';

export default Vue.extend({
    components: {
        PackageDetails,
    },
    props: {
        packageData: {
            type: Object as PropType<PackageResponseData | null>,
            default: null,
        },
    },
});
</script>

<style scoped>
.results {
    margin-top: 50px;
    width: 500px;
}
</style>
