<template>
    <ResultsEntry v-if="hasIndexDFile" :green="true">
        <template v-slot:icon>
            <SuccessIcon />
        </template>

        <template v-slot:status>
            Root directory declaration file
        </template>

        <ul class="declaration-files">
            <li><external-link :href="indexDLink">index.d.ts</external-link></li>
        </ul>
    </ResultsEntry>

    <ResultsEntry v-else :gray="true">
        <template v-slot:icon>
            <ErrorIcon />
        </template>

        <template v-slot:status>
            No index.d.ts in root directory
        </template>
    </ResultsEntry>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

import ResultsEntry from './ResultsEntry.vue';
import SuccessIcon from '@/assets/icons/check-circle.svg';
import ErrorIcon from '@/assets/icons/x.svg';
import { getCdnFileLink } from '@/helpers';

export default Vue.extend({
    components: {
        ResultsEntry,
        SuccessIcon,
        ErrorIcon,
    },
    props: {
        hasIndexDFile: {
            type: Boolean as PropType<boolean | null>,
            default: null,
        },
        packageName: {
            type: String,
            default: undefined,
        },
    },
    computed: {
        indexDLink(): string | undefined {
            return this.packageName && getCdnFileLink(this.packageName, 'index.d.ts');
        },
    },
});
</script>

<style lang="scss" scoped>
@import 'helpers';

.declaration-files {
    list-style-type: disc;
    padding-left: 1.25em;
}

.external-link {
    @extend %link-default;
    font-family: $font-mono;
}
</style>
