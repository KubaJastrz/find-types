<script lang="tsx">
import Vue, { PropType } from 'vue';

import { getCdnFileLink } from '@/helpers';
import { PackageJson } from '@/types';

export default Vue.extend({
    props: {
        packageJson: {
            type: Object as PropType<PackageJson>,
            required: true,
        },
    },
    computed: {
        typesEntries(): { key: string; value?: string }[] {
            const { types, typings } = this.packageJson;
            return [{ key: 'types', value: types }, { key: 'typings', value: typings }];
        },
    },
    methods: {
        getFileLink(pathname: string) {
            const { name } = this.packageJson;
            return getCdnFileLink(name, pathname);
        },
    },
    render() {
        return (
            <pre class="json">
                <span>{'{\n'}</span>
                {this.typesEntries
                    .filter(({ value }) => value)
                    .map(({ value, key }) => {
                        return (
                            <span>
                                {`  "${key}": `}"
                                <external-link href={this.getFileLink(value!)}>
                                    {value}
                                </external-link>
                                "
                            </span>
                        );
                    })}
                <span>{'\n}'}</span>
            </pre>
        );
    },
});
</script>

<style lang="scss" scoped>
@import 'helpers';

.json {
    margin: 0;
}

/deep/ .external-link {
    @extend %link-unstyled;

    text-decoration: underline;
    font-weight: bold;
}
</style>
