<template>
    <div class="EditorController">
        <LiveEditor :editor="editor" editable />
        <transition name="modal">
            <div v-if="editor.locked" class="modal">
                <h1>Editor Is Locked</h1>
                <button v-if="isModerator(user)" @click="onUnlock">Unlock</button>
            </div>
            <div v-else-if="!hasControl" class="modal">
                <h1>Editor Control Lost</h1>
                <p v-if="editorUser && editorUser.id !== user.id">
                    <span class="username">{{ editorUser.username }}</span> is currently controlling this editor.
                </p>
                <button :disabled="isEditorUserHigherRank" @click="takeControl">Take Control</button>
            </div>
        </transition>
    </div>
</template>


<script>
import { mapState } from 'vuex';
import * as api from '../../api';
import LiveEditor from './LiveEditor.vue';

export default {
    components: { LiveEditor },

    props: {
        editor: { type: Object, required: true },
        autoControl: { type: Boolean, default: true },
    },

    computed: {
        ...mapState('app', ['user', 'socketId']),

        editorUser() {
            return this.editor.connection?.user;
        },

        hasControl() {
            const socketId = this.editor.connection?.socketId;
            return socketId && socketId === this.socketId;
        },

        isEditorUserHigherRank() {
            return this.editorUser && this.isModerator(this.editorUser) && !this.isModerator(this.user);
        },
    },

    mounted() {
        if (this.autoControl) this.takeControl();
    },

    methods: {
        isModerator(user) {
            return user.role === 'ADMIN' || user.role === 'MODERATOR';
        },

        takeControl() {
            this.$socket.emit('e.control', { id: this.editor.id });
        },

        async onUnlock() {
            await api.patchEditor(this.editor.id, { locked: false });
        },
    },
};
</script>


<style lang="scss" scoped>
.EditorController {
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

            &:disabled {
                background-color: var(--bg20);
            }
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
</style>
