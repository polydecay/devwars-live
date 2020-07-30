<template>
    <div class="ProgressBar">
        <div :class="['bar', { flip }]" :style="{ width: value + '%' }"></div>
    </div>
</template>


<script>
export default {
    props: {
        value: { type: Number, required: true },
        flip: { type: Boolean, default: false },
    }
};
</script>


<style lang="scss" scoped>
.ProgressBar {
    width: 100%;
    height: 1rem;
    background-color: var(--bg20);
    transform: skew(-24deg);

    .bar {
        height: 100%;
        background-color: currentColor;
        transition: width 250ms ease-out;

        &.flip { margin-left: auto; }
    }
}
</style>
