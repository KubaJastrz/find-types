<template>
    <ResultsEntry v-if="packageData && !packageData.deprecated" :green="true">
        <template v-slot:icon>
            <SuccessIcon />
        </template>

        <template v-slot:status>
            DefinitelyTyped Package
        </template>

        <PackageDetails :package-data="packageData" :hide-description="true" :small="true" />
    </ResultsEntry>

    <ResultsEntry v-else-if="packageData && packageData.deprecated" :orange="true">
        <template v-slot:icon>
            <WarningIcon />
        </template>

        <template v-slot:status>
            Deprecated DefinitelyTyped Package
        </template>

        <PackageDetails :package-data="packageData" :hide-description="true" :small="true" />
    </ResultsEntry>

    <ResultsEntry v-else-if="packageData" :gray="true">
        <template v-slot:icon>
            <ErrorIcon />
        </template>

        <template v-slot:status>
            No DefinitelyTyped Package
        </template>
    </ResultsEntry>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

import ResultsEntry from './ResultsEntry.vue';
import PackageDetails from './PackageDetails.vue';
import SuccessIcon from '@/assets/icons/check-circle.svg';
import WarningIcon from '@/assets/icons/alert-triangle.svg';
import ErrorIcon from '@/assets/icons/x.svg';
import { PackageResponseData } from '@/api/ApiTypes';

type PackageData = PackageResponseData['collected']['metadata'];

export default Vue.extend({
    components: {
        ResultsEntry,
        PackageDetails,
        SuccessIcon,
        WarningIcon,
        ErrorIcon,
    },
    props: {
        packageData: {
            type: Object as PropType<PackageData | null>,
            default: null,
        },
    },
});
</script>
