<template>
    <div class="PlayerTabEditor">
        <nav class="tabBar">
            <div
                v-for="editor in editors"
                :key="editor.id"
                :class="['tab', { selected: editor.id === curEditorId }]"
                @click="onSelectEditor(editor)"
            >{{ editor.fileName }}</div>
        </nav>
        <EditorController v-if="curEditor" :key="curEditor.id" :editor="curEditor"/>
        <PlayerObjectives v-if="showObjectives"/>
        <div v-if="curEditor" class="actions">
            <button @click="onSave">Save</button>
            <button @click="showObjectives = !showObjectives">{{ showObjectives ? 'Hide' : 'Show' }} Objectives</button>
        </div>
    </div>
</template>


<script>
import { mapState } from 'vuex';
import EditorController from '../../../components/editor/EditorController';
import PlayerObjectives from './PlayerObjectives';

export default {
    components: { EditorController, PlayerObjectives },

    data: () => ({
        curEditorId: null,
        showObjectives: false,
    }),

    computed: {
        ...mapState('app', ['user', 'socketId']),

        editors() {
            return this.$store.getters['game/editorsByUser'](this.user.id);
        },

        curEditor() {
            return this.editors.find(editor => editor.id === this.curEditorId);
        },
    },

    mounted() {
        this.curEditorId = this.editors[0]?.id ?? null;
    },

    methods: {
        onSelectEditor(editor) {
            this.curEditorId = editor.id;
            this.$socket.emit('e.control', { id: this.curEditorId });
        },

        onSave() {
            this.$socket.emit('e.save', { id: this.curEditorId });
        },
    },
};
</script>


<style lang="scss" scoped>
.PlayerTabEditor {
    display: flex;
    flex-flow: column nowrap;
    position: relative;

    .tabBar {
        display: flex;
        height: 2.5rem;
        background-color: var(--bg20);

        .tab {
            display: flex;
            min-width: 8rem;
            align-items: center;
            justify-content: center;
            user-select: none;
            cursor: pointer;

            color: var(--fg20);

            &.selected {
                color: var(--fg00);
                background-color: var(--bg00);
            }
        }
    }

    .actions {
        display: flex;
        button {
            margin: .5rem;
            &:not(:first-child) {
                margin-left: 0;
            }
        }
    }
}
</style>
