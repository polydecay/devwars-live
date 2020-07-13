<template>
    <div class="TeamSlotItem" :class="[{ flip }, team.name]">
        <template v-if="player">
            <div class="avatar"></div>
            <div class="info">
                <div class="username">{{ player.username }}</div>
                <div class="language">{{ editor.language }}</div>
            </div>
            <div v-if="player.ready" class="ready">Ready</div>
        </template>
        <template v-else>
            <div class="empty">{{ editor.language }}</div>
        </template>
    </div>
</template>


<script>
export default {
    props: {
        team: { type: Object, required: true },
        editor: { type: Object, required: true },
        flip: { type: Boolean, default: false },
    },

    computed: {
        player() {
            return this.$store.getters['game/playerById'](this.editor.playerId);
        },
    },
};
</script>


<style lang="scss" scoped>
.TeamSlotItem {
    display: flex;
    width: 28rem;
    height: 5rem;
    background: var(--bg10);

    &:not(:last-child) {
        margin-bottom: 1rem;
    }

    &:not(.flip) {
        padding-left: 4px;
        border-left: 2px solid var(--fg00);
    }

    &.flip {
        padding-right: 4px;
        text-align: right;
        border-right: 2px solid var(--fg00);

        .avatar { order: 1; }
        .ready { order: -1; }
    }

    &.blue {
        border-color: var(--blue);
        .username { color: var(--blue); }
    }

    &.red {
        border-color: var(--red);
        .username { color: var(--red); }
    }

    .avatar {
        position: relative;
        width: 5rem;
        height: 5rem;
        background-color: var(--bg30);

        &:after {
            z-index: 1;
            content: "";
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background: linear-gradient(to top right, rgba(#ff007d, .25), rgba(#00c9ff, .25));
            // mix-blend-mode: color;
        }
    }

    .info {
        display: flex;
        margin: 0 1rem;
        flex: 1 1;
        flex-flow: column nowrap;
        justify-content: center;

        .username {
            font-size: 1.25rem;
        }

        .language {
            text-transform: uppercase;
            font-size: 1rem;
            color: var(--fg20);
        }
    }

    .ready {
        margin: 0 1rem;
        align-self: center;
        text-transform: uppercase;
        color: var(--success);
        font-size: 1rem;
    }

    .empty {
        flex: 1 1;
        display: flex;
        flex-flow: column nowrap;
        // align-items: center;
        justify-content: center;
        margin: 1rem;

        text-transform: uppercase;
        font-size: 1.25rem;
        color: var(--fg20);
    }
}
</style>
