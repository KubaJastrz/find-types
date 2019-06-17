<template>
    <div class="package-details">
        <div class="package-string">
            <h4 class="name">{{ packageData.name }}</h4>
            <span class="version">{{ packageData.version }}</span>
        </div>
        <p class="description">{{ packageData.description }}</p>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

import { PackageResponseData } from '@/api/ApiTypes';

type PackageDetails = PackageResponseData['collected']['metadata'];

export default Vue.extend({
    props: {
        packageData: {
            type: Object as PropType<PackageDetails>,
            required: true,
        },
    },
});
</script>

<style scoped>
.package-string {
    margin-bottom: 10px;
}

.name {
    font-weight: bold;
    display: inline;
}

.version {
    display: inline-block;
    padding: 1px 6px;
    font-size: 0.7em;
    font-weight: bold;
    background: #778798;
    color: #fff;
    border-radius: 2px;
    margin-left: 1em;
}

.description {
    font-size: 0.9em;
}
</style>
