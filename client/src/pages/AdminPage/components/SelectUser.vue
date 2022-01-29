<template>
    <vSelect
        :modelValue="value"
        class="SelectUser"
        :options="options"
        :filterable="false"
        :getOptionLabel="x => x.username"
        :getOptionKey="x => x.id"
        placeholder="User Search..."
        @search="onSearch"
        @update:modelValue="$emit('selected', $event)"
    >
        <template #no-options>
            Sorry, no users found.
        </template>
    </vSelect>
</template>


<script>
import vSelect from 'vue-select';
import debounce from 'lodash/debounce';
import * as api from '../../../api';
import 'vue-select/dist/vue-select.css';

export default {
    emits: ['selected'],

    props: {
        value: { type: Object, default: null },
    },

    components: { vSelect },

    data: () => ({
        options: [],
    }),

    methods: {
        onSearch(search, loading) {
            loading(true);
            this.search(this, search, loading);
        },

        search: debounce(async (vm, search, loading) => {
            const res = await api.searchUsers(search);
            // TODO: Error message?
            vm.options = res.ok ? res.body : [];
            loading(false);
        }, 250),
    },
};
</script>


<style lang="scss" scoped>
.SelectUser {
    min-width: 12rem;
}
</style>


<style lang="scss">
.vs__search,
.vs__selected {
    color: var(--fg00);
}

.vs__selected-options {
    flex-wrap: nowrap;
    overflow: hidden;
}

.vs__dropdown-option {
    color: var(--fg00);

    &--highlight {
        color: var(--fg00);
        background: var(--bg40);
    }
}

.vs__search::placeholder,
.vs__dropdown-toggle,
.vs__dropdown-menu {
    border: none;
    color: var(--fg00);
    background: var(--bg30);
}

.vs__search::placeholder {
    color: var(--fg40);
    opacity: .5;
}

.vs__actions {
    padding-right: .75rem;
}

.vs__clear,
.vs__open-indicator {
    fill: var(--fg10);
}

.vs__spinner {
    border-color: var(--bg20);
    border-left-color: var(--fg20);
}
</style>
