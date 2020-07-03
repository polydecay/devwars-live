<template>
    <div class="MainPage">
        <h1>Create Game</h1>

        <select v-model="mode">
            <option value="classic">Classic</option>
            <option value="zen" selected>Zen Garden</option>
        </select>

        <button @click="onCreate">Create</button>
    </div>
</template>


<script>
import * as api from '../../../api';

export default {
    data: () => ({
        mode: 'classic',
    }),

    methods: {
        async onCreate() {
            await api.createGame({
                mode: this.mode,
                title: 'Title',
                runtime: 30 * 60 * 1000,
                objectives: [
                    { id: 1, description: 'first' },
                    { id: 2, description: 'second' },
                    { id: 3, description: 'third', bonus: true },
                ],
            });
        },
    },
};
</script>


<style lang="scss" scoped>
</style>
