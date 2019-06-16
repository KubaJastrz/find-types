<template>
    <div class="results">
        <p v-if="packageName">
            Package: <strong>{{ packageName }}</strong>
        </p>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

import { PackageResponseData } from '@/api/ApiTypes';

export default Vue.extend({
    props: {
        packageData: {
            type: Object as PropType<PackageResponseData | null>,
            default: null,
        },
    },
    computed: {
        packageName(): string | false {
            return this.packageData !== null && this.packageData.collected.metadata.name;
        },
    },
});
</script>

<style scoped>
.results {
    margin-top: 40px;
}
</style>
