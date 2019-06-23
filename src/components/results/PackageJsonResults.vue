<template>
    <ResultsEntry v-if="hasTypesOrTypings" :green="true">
        <template v-slot:icon>
            <SuccessIcon />
        </template>

        <template v-slot:status>
            Types in package.json
        </template>

        <ParsedPackageJsonTypes :package-json="packageJsonData" />
    </ResultsEntry>

    <ResultsEntry v-else :gray="true">
        <template v-slot:icon>
            <ErrorIcon />
        </template>

        <template v-slot:status>
            No types in package.json
        </template>
    </ResultsEntry>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

import ResultsEntry from './ResultsEntry.vue';
import ParsedPackageJsonTypes from './ParsedPackageJsonTypes.vue';
import SuccessIcon from '@/assets/icons/check-circle.svg';
import ErrorIcon from '@/assets/icons/x.svg';
import { PackageJson } from '@/types';

export default Vue.extend({
    components: {
        ResultsEntry,
        ParsedPackageJsonTypes,
        SuccessIcon,
        ErrorIcon,
    },
    props: {
        packageJsonData: {
            type: Object as PropType<PackageJson>,
            default: undefined,
        },
    },
    computed: {
        hasTypesOrTypings(): boolean {
            return (
                this.packageJsonData &&
                ('types' in this.packageJsonData || 'typings' in this.packageJsonData)
            );
        },
    },
});
</script>
