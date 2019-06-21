<template>
    <ResultsEntry v-if="typesOrTypings" :green="true">
        <template v-slot:icon>
            <SuccessIcon />
        </template>

        <template v-slot:status>
            Types in package.json
        </template>

        <pre class="json">{{ typesOrTypings }}</pre>
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
import SuccessIcon from '@/assets/icons/check-circle.svg';
import ErrorIcon from '@/assets/icons/x.svg';
import { PackageJson } from '@/types';

export default Vue.extend({
    components: {
        ResultsEntry,
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
        typesOrTypings(): string | undefined {
            if (
                !this.packageJsonData ||
                !('types' in this.packageJsonData || 'typings' in this.packageJsonData)
            ) {
                return;
            }

            const { types, typings } = this.packageJsonData;

            return JSON.stringify({ types, typings }, null, 2);
        },
    },
});
</script>

<style lang="scss" scoped>
.json {
    margin: 0;
}
</style>
