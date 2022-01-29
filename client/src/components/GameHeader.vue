<template>
    <div class="GameHeader">
        <div class="left">
            <slot name="left"></slot>
        </div>
        <div class="center">
            <GameHeaderStatus />
        </div>
        <div class="right">
            <slot name="right"></slot>
        </div>
    </div>
</template>


<script>
import GameHeaderStatus from './GameHeaderStatus.vue';

export default {
    components: { GameHeaderStatus },
};
</script>


<style lang="scss" scoped>
.GameHeader {
    position: relative;
    display: flex;
    height: 3.5rem;
    min-height: 3.5rem;
    align-items: center;
    background-color: var(--bg30);

    .left,
    .right {
        flex: 1 1;
    }
}
</style>
