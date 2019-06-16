import Vue, { VNode } from 'vue';

declare global {
    type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

    namespace JSX {
        // tslint:disable no-empty-interface
        interface Element extends VNode {}
        // tslint:disable no-empty-interface
        interface ElementClass extends Vue {}
        interface IntrinsicElements {
            [elem: string]: any;
        }
    }
}
