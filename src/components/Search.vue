<template>
    <div class="search">
        <input v-model="packageName" />
        <button v-on:click="search">Search</button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    data() {
        return {
            packageName: '',
        };
    },
    methods: {
        search() {
            console.log(this.packageName);
        },
    },
});
</script>
