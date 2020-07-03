<template>
    <section class="EditEditor">
        <div class="row header">
            <h1>{{ `${editor.id}. ${editor.language}` }}</h1>
            <h2>
                <a :href="fileUrl" target="_blank">{{ editor.filename }}</a>
            </h2>
        </div>
        <div class="row actions">
            <button @click="onToggleLocked">{{ editor.locked ? 'Unlock' : 'Lock' }}</button>
            <button @click="onReset">Reset</button>
        </div>
        <div class="row">
            <SelectUser @input="onSelectUser" :value="player"/>
        </div>
    </section>
</template>


<script>
import * as api from '../../../api';
import { mapState } from 'vuex';
import SelectUser from './SelectUser';

export default {
    components: { SelectUser },

    props: { editorId: { type: Number, required: true } },

    computed: {
        editor() {
            return this.$store.state.game.editors[this.editorId];
        },
        player() {
            return this.$store.state.game.players[this.editor.player];
        },
        fileUrl() {
            return `/api/editors/files/${this.editor.team}/${this.editor.filename}`;
        },
    },

    methods: {
        async onToggleLocked() {
            await api.patchEditor(this.editorId, { locked: !this.editor.locked });
        },
        async onReset() {
            await api.resetEditor(this.editorId);
        },
        async onSelectUser(player) {
            if (player && !this.$store.state.game.players[player.id]) {
                await api.addPlayer({ ...player, team: this.editor.team });
            }

            await api.patchEditor(this.editorId, {
                player: player ? player.id : null,
            });
        },
    },
};
</script>


<style lang="scss" scoped>
.EditEditor {
    padding: 1rem;
    background-color: var(--bg10);

    .row {
        display: flex;
        margin-bottom: .5rem;
        align-items: center;

        &:last-child {
            margin-bottom: 0;
        }
    }

    .header {
        h1 {
            margin-right: auto;
            text-transform: uppercase;
            font-size: 1.25rem;
        }

        h2 {
            font-size: 1rem;
        }
    }

    .actions button {
        width: 100%;
        &:not(:first-child) {
            margin-left: .5rem;
        }
    }
}
</style>
