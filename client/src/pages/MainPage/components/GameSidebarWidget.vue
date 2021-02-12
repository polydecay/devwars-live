<template>
    <iframe
        v-if="src"
        v-show="loaded"
        class="GameSidebarWidget"
        :src="src"
        @load="loaded = true"
    ></iframe>
</template>


<script>
export default {
    data: () => ({
        src: process.env.VUE_APP_WIDGET_URL,
        loaded: false,
    }),

    watch: {
        src: () => this.loaded = false,
    },
};
</script>


<style lang="scss" scoped>
.GameSidebarWidget {
    border: none;
    min-height: 20rem;
}
</style>
