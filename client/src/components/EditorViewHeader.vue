<template>
    <div class="EditorViewHeader">
        <h1 class="username" :class="{ connection }">{{ username }}</h1>
        <h2 class="language">{{ language }}</h2>
    </div>
</template>


<script>
export default {
    props: {
        player: { type: Object },
        language: { type: String, required: true },
        connection: { type: Object },
    },

    computed: {
        username() {
            return this.connection?.user.username ?? this.player?.username;
        },
    },
};
</script>


<style lang="scss" scoped>
.EditorViewHeader {
    display: flex;
    padding: 0 .75rem;
    height: 2.5rem;
    align-items: center;

    .username {
        font-size: 1.25rem;

        &:not(.connection) {
            opacity: .33;
        }
    }

    .language {
        font-size: 1.25rem;
        text-transform: uppercase;
        margin-left: auto;
    }
}
</style>
