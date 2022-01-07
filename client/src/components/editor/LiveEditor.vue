<template>
    <BaseEditor
        ref="editor"
        class="LiveEditor"
        :language="editor.language"
        :editable="editable"
        :readOnly="readOnly"
        @focus="focused = true"
        @blur="focused = false"
        @loaded="onEditorLoaded"
        @change="onEditorChange"
        @selection="onEditorSelection"
        @save="onEditorSave"
    />
</template>


<script>
import { mapState, mapGetters } from 'vuex';
import { TextOperation } from '../../../../server/src/modules/document/TextOperation';
import { CursorSelection } from '../../../../server/src/modules/document/CursorSelection';
import eventBus from '../../services/eventBus';
import BaseEditor from './BaseEditor.vue';

export default {
    components: { BaseEditor },

    props: {
        editor: { type: Object, required: true },
        editable: { type: Boolean, default: false },
    },

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
            return !this.editable || !this.hasControl || !this.inSync || this.locked;
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
            this.$emit('hasControl', this.hasControl);
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

    beforeDestroy() {
        eventBus.$off(`editor.${this.editor.id}.text`, this.onSocketText);
        eventBus.$off(`editor.${this.editor.id}.o`, this.onSocketOperation);
        eventBus.$off(`editor.${this.editor.id}.s`, this.onSocketSelection);
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
                this.$socket.emit('e.o', {
                    id: this.editor.id,
                    o: TextOperation.fromMonacoChange(change).toDto(),
                });
            }
        },

        onEditorSelection(selectionChange) {
            if (!this.hasControl) return;

            const selections = [
                selectionChange.selection,
                ...selectionChange.secondarySelections
            ];

            this.$socket.emit('e.s', {
                id: this.editor.id,
                s: selections.map(selection => CursorSelection.fromMonacoSelection(selection).toDto())
            });
        },

        onEditorSave() {
            if (this.hasControl) {
                this.$socket.emit('e.save', { id: this.editor.id });
            }
        },



        onSocketText(text) {
            const editor = this.$refs.editor;
            if (!editor) return;

            this.ignoreChanges = true;
            editor.setText(text);
            this.inSync = true;
            this.ignoreChanges = false;
        },

        onSocketOperation(textOperationDto) {
            if (this.readOnly && !this.hasControl) {
                const editor = this.$refs.editor;
                if (!editor) return;

                editor.applyTextOperation(TextOperation.fromDto(textOperationDto));
            }
        },

        onSocketSelection(cursorSelectionsDto) {
            if (!this.hasControl) {
                const cursorSelections = cursorSelectionsDto.map(selection => {
                    return CursorSelection.fromDto(selection);
                })

                this.$refs.editor.applySelectionDecorators(cursorSelections, !this.focused);
            }
        },
    },
};
</script>
