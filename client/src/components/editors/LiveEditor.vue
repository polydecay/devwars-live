<template>
    <BaseEditor
        ref="editor"
        :language="editor.language"
        :text="editor.fileText"
        :readOnly="readOnly"
        @focus="focused = true"
        @blur="focused = false"
        @loaded="onEditorLoaded"
        @change="onEditorChange"
        @selection="onEditorSelection"
        @save="onEditorSave"
    />
</template>

<!-- TODO: Remove editor.fileText (should also not be sent from the server anyway.) -->

<script>
import { mapState, mapGetters } from 'vuex';
import TextOperation from '../../utils/TextOperation';
import eventBus from '../../services/eventBus';
import BaseEditor from './BaseEditor';

export default {
    components: { BaseEditor },

    props: { editor: { type: Object, required: true } },

    data: () => ({
        inSync: false,
        ignoreChanges: false,
        focused: false,
    }),

    computed: {
        ...mapState('app', ['socketId']),
        ...mapGetters('app', ['isConnected']),

        locked() {
            return this.editor.locked;
        },

        hasControl() {
            return this.socketId && this.socketId === this.editor.connection?.socketId;
        },

        readOnly() {
            return !this.hasControl || !this.inSync || this.locked;
        },
    },

    watch: {
        isConnected(isConnected) {
            if (isConnected) {
                this.fetchText();
            }
        },

        hasControl() {
            this.inSync = false;
        },

        locked() {
            if (this.hasControl) {
                this.inSync = false;
            }
        },

        inSync(inSync) {
            if (this.isConnected && !inSync) {
                this.fetchText();
            }
        },
    },

    mounted() {
        setTimeout(() => {
            this.$socket.emit('e.control', { id: this.editor.id });
        }, 1000);
    },

    beforeDestroy() {
        eventBus.$off(`editor.${this.editor.id}.text`, this.onSocketText);
        eventBus.$off(`editor.${this.editor.id}.o`, this.onSocketOperation);
        eventBus.$off(`editor.${this.editor.id}.s`, this.onSocketSelection);
        if (this.hasControl) this.onRelease();
    },

    methods: {
        fetchText() {
            this.$socket.emit('e.getText', { id: this.editor.id });
        },

        onControl() {
            this.$socket.emit('e.control', { id: this.editor.id });
        },

        onRelease() {
            this.$socket.emit('e.release', { id: this.editor.id });
        },



        onEditorLoaded() {
            eventBus.$on(`editor.${this.editor.id}.text`, this.onSocketText);
            eventBus.$on(`editor.${this.editor.id}.o`, this.onSocketOperation);
            eventBus.$on(`editor.${this.editor.id}.s`, this.onSocketSelection);

            this.fetchText();
        },

        onEditorChange(contentChange) {
            if (this.ignoreChanges || this.locked || !this.hasControl) return;

            for (const change of contentChange.changes) {
                console.log('change', change);
                this.$socket.emit('e.o', {
                    id: this.editor.id,
                    o: TextOperation.fromMonacoChange(change).toDto(),
                });
            }
        },

        onEditorSelection() {
            // TODO: implement.
        },

        onEditorSave() {
            if (this.hasControl) {
                this.$socket.emit('e.save', { id: this.editor.id });
            }
        },



        onSocketText(text) {
            this.ignoreChanges = true;

            this.$refs.editor.setText(text);

            this.inSync = true;
            this.ignoreChanges = false;
        },

        onSocketOperation(textOperationDto) {
            if (this.readOnly && !this.hasControl) {
                this.$refs.editor.applyTextOperation(TextOperation.fromDto(textOperationDto));
            }
        },

        onSocketSelection(selection) {
            if (!this.hasControl) {
                console.log(selection);
                // TODO: Implement.
            }
        },
    },
};
</script>
