<template>
    <section class="EditEditor">
        <div class="row header">
            <h1>{{ `${editor.id}. ${editor.language}` }}</h1>
            <h2>
                <a :href="fileUrl" target="_blank">{{ editor.fileName }}</a>
            </h2>
        </div>
        <div class="row actions">
            <button v-if="editor.locked" class="small danger" @click="onToggleLocked"><LockIcon title="Unlock Editor"/></button>
            <button v-else class="small" @click="onToggleLocked"><LockOpenIcon title="Lock Editor"/></button>
            <button class="small" @click="onOpenEditor"><OpenInNewIcon title="Open Editor"/></button>

            <button @click="onReset">Reset</button>
        </div>
        <div class="row userActions">
            <h3 v-if="editor.hidden">Disabled</h3>
            <SelectUser v-else @input="onSelectUser" :value="player"/>
        </div>
    </section>
</template>


<script>
import * as api from '../../../api';
import { mapState } from 'vuex';
import SelectUser from './SelectUser';
import LockIcon from 'vue-material-design-icons/Lock';
import LockOpenIcon from 'vue-material-design-icons/LockOpenVariant';
import OpenInNewIcon from 'vue-material-design-icons/OpenInNew';

export default {
    components: { SelectUser, LockIcon, LockOpenIcon, OpenInNewIcon },

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

        onOpenEditor() {
            window.open(`/admin/editors/${this.editor.id}`, '_blank');
        },

        async onReset() {
            this.$awn.confirm('Are you sure you want to reset this editor?', () => {
                api.resetEditor(this.editor.id);
            }, null, { labels: { confirm: 'Warning' } });
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
    padding: 0.5rem;
    width: 14rem;

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

        &.small {
            padding: 0;
            max-width: 3rem;
        }

        &.danger {
            color: var(--error);
        }

        .material-design-icon {
            display: inline-block;
            margin-top: 4px;
        }

        &:not(:first-child) {
            margin-left: .5rem;
        }
    }

    .userActions {
        h3 {
            flex: 1 1;
            text-align: center;
            line-height: 2.5rem;
            color: var(--fg40);
        }

        .SelectUser {
            width: 100%;
        }
    }
}
</style>
