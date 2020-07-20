<template>
    <div class="GameHeader">
        <div class="left"></div>
        <div class="center">
            <GameHeaderStatus/>
        </div>
        <div class="right"></div>
    </div>
</template>


<script>
import GameHeaderStatus from './GameHeaderStatus';
export default {
    components: { GameHeaderStatus },
};
</script>


<style lang="scss" scoped>
.GameHeader {
    display: flex;
    height: 3.5rem;
    min-height: 3.5rem;
    align-items: center;
    background-color: var(--bg30);

    .left {
        margin-right: auto;
    }

    .right {
        margin-left: auto;
    }
}
</style>
