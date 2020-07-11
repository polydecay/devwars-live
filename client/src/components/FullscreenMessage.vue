<template>
    <div class="FullscreenMessage">
        <h1>{{ title }}</h1>
        <slot/>
    </div>
</template>


<script>
export default {
    props: {
        title: { type: String, required: true }
    },
};
</script>


<style lang="scss" scoped>
.FullscreenMessage {
    display: flex;
    height: 100vh;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    h1 {
        margin-bottom: 1rem;
    }
}
</style>
