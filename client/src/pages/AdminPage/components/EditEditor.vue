<template>
    <section class="EditEditor">
        <div class="row header">
            <h1>{{ `${editor.id}. ${editor.language}` }}</h1>
            <h2>
                <a :href="fileUrl" target="_blank">{{ editor.fileName }}</a>
            </h2>
        </div>
        <div class="row actions">
            <button @click="onToggleLocked">{{ editor.locked ? 'Unlock' : 'Lock' }}</button>
            <button @click="onReset" disabled>Reset</button>
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

    props: { editor: { type: Object, required: true } },

    computed: {
        player() {
            return this.$store.getters['game/playerById'](this.editor.playerId);
        },

        fileUrl() {
            return `/api/teams/${this.editor.teamId}/files/${this.editor.fileName}`;
        },
    },

    methods: {
        async onToggleLocked() {
            await api.patchEditor(this.editor.id, { locked: !this.editor.locked });
        },

        async onReset() {
            await api.resetEditor(this.editor.id);
        },

        async onSelectUser(sparseUser) {
            if (!sparseUser) {
                return await api.deleteEditorPlayer(this.editor.id);
            }

            const res = await api.getUserById(sparseUser.id);
            if (!res.ok) throw new Error(res.body);

            const player = res.body;

            await api.createPlayer({ ...player, teamId: this.editor.teamId });
            await api.setEditorPlayer(this.editor.id, player.id);
        },
    },
};
</script>


<style lang="scss" scoped>
.EditEditor {
    padding: 1rem;

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
            color: var(--fg20);
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
