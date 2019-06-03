<template>
    <div id="app">
        <Search />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Search from './components/Search.vue';

export default Vue.extend({
    components: {
        Search,
    },
});
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
