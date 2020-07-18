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
        <div v-if="curEditor" :key="curEditor.id" class="editor">
            <LiveEditor :editor="curEditor" editable/>
            <transition name="modal">
                <div v-if="!hasControl" class="modal">
                    <h1>Editor Control Lost</h1>
                    <p v-if="curEditorUser && curEditorUser.id !== user.id">
                        <span class="username">{{ curEditorUser.username }}</span> is currently controlling this editor.
                    </p>
                    <button @click="takeControl">Take Control</button>
                </div>
                <div v-else-if="curEditor.locked" class="modal">
                    <h1>Editor Is Locked</h1>
                </div>
            </transition>
        </div>
    </div>
</template>


<script>
import { mapState } from 'vuex';
import LiveEditor from '../../../components/editors/LiveEditor';

export default {
    components: { LiveEditor },

    data: () => ({
        curEditorId: null,
    }),

    computed: {
        ...mapState('app', ['user', 'socketId']),

        editors() {
            return this.$store.getters['game/editorsByUser'](this.user.id);
        },

        curEditor() {
            return this.editors.find(e => e.id === this.curEditorId);
        },

        curEditorUser() {
            return this.curEditor?.connection?.user;
        },

        hasControl() {
            const socketId = this.curEditor?.connection?.socketId;
            return socketId ? socketId === this.socketId : false;
        },
    },

    mounted() {
        this.curEditorId = this.editors[0]?.id ?? null;
        this.takeControl();
    },

    methods: {
        onSelectEditor(editor) {
            this.curEditorId = editor.id;
            this.takeControl();
        },

        takeControl() {
            this.$socket.emit('e.control', { id: this.curEditorId });
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

    .editor {
        position: relative;
        display: flex;
        flex: 1 1;
        flex-flow: column nowrap;

        .LiveEditor {
            flex: 1 1;
        }

        .modal {
            position: absolute;
            padding: 2rem;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: var(--bg10);

            h1 {
                margin-bottom: .5rem;
                padding-bottom: 1rem;
                border-bottom: 2px solid var(--primary);
            }

            p {
                margin-bottom: 1rem;
                color: var(--fg40);

                .username {
                    font-weight: 700;
                    color: var(--fg00);
                }
            }

            button {
                width: 100%;
                margin-left: auto;
                height: 2.5rem;
                background-color: var(--primary);
            }

            &.modal-enter-active {
                transition: opacity 175ms cubic-bezier(.65, .05, .36, 1) 150ms;
            }

            &.modal-leave-active {
                transition: opacity 175ms cubic-bezier(.65, .05, .36, 1);
            }

            &.modal-enter, &.modal-leave-to {
                opacity: 0;
            }
        }
    }
}
</style>
