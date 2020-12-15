<template>
    <div class="MainPage">
        <h1>Create Game</h1>

        <select v-model="mode">
            <option value="classic" selected>Classic</option>
            <option value="duel">Duel</option>
            <option value="zen">Zen Garden</option>
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
                    { id: 1, description: 'Easy first objective.' },
                    { id: 2, description: 'Slightly harder secondary objective.' },
                    { id: 3, description: 'Awesome bonus objective, for the brave!', bonus: true },
                ],
            });
        },
    },
};
</script>


<style lang="scss" scoped>
</style>
