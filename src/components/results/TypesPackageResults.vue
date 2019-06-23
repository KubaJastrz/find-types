<template>
    <ResultsEntry v-if="parsedPackageData && !parsedPackageData.deprecated" :green="true">
        <template v-slot:icon>
            <SuccessIcon />
        </template>

        <template v-slot:status>
            DefinitelyTyped Package
        </template>

        <PackageDetails :package-data="parsedPackageData" :hide-description="true" :small="true" />
    </ResultsEntry>

    <ResultsEntry v-else-if="parsedPackageData && parsedPackageData.deprecated" :orange="true">
        <template v-slot:icon>
            <WarningIcon />
        </template>

        <template v-slot:status>
            Deprecated DefinitelyTyped Package
        </template>

        <PackageDetails :package-data="parsedPackageData" :hide-description="true" :small="true" />
    </ResultsEntry>

    <ResultsEntry v-else :gray="true">
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
import { cloneDeep, set } from 'lodash';

import ResultsEntry from './ResultsEntry.vue';
import PackageDetails from './PackageDetails.vue';
import SuccessIcon from '@/assets/icons/check-circle.svg';
import WarningIcon from '@/assets/icons/alert-triangle.svg';
import ErrorIcon from '@/assets/icons/x.svg';
import { PackageData } from '@/types';

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
            type: Object as PropType<PackageData>,
            default: undefined,
        },
    },
    computed: {
        parsedPackageData(): PackageData | undefined {
            if (!this.packageData) {
                return;
            }

            if (this.packageData.links.repository) {
                return this.packageData;
            }

            const clonedPackageData = cloneDeep(this.packageData);

            return set(
                clonedPackageData,
                ['links', 'repository'],
                this.getRepositoryLink(clonedPackageData.readme),
            );
        },
    },
    methods: {
        getRepositoryLink(readme?: string): string | undefined {
            if (!readme) {
                return undefined;
            }

            const match = /^(?:Files were exported from )(.+)$/gm.exec(readme);
            const repositoryLink = (match && match[1]) || undefined;

            return repositoryLink;
        },
    },
});
</script>
