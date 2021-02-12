<template>
    <div class="CreateGameView">
        <h1>Create Game</h1>

        <div class="field">
            <label>Game Mode</label>
            <select v-model="mode">
                <option value="classic" selected>Classic</option>
                <option value="duel">Duel</option>
                <option value="zen">Zen Garden</option>
            </select>
        </div>

        <div class="field">
            <label>Title</label>
            <input type="text" v-model="title">
        </div>

        <div class="field">
            <label>Runtime (min)</label>
            <input type="number" v-model="runtime">
        </div>

        <button @click="onCreate">Create</button>
    </div>
</template>


<script>
import * as api from '../../../api';

export default {
    data: () => ({
        mode: 'classic',
        title: '',
        runtime: 30,
    }),

    methods: {
        async onCreate() {
            await api.createGame({
                mode: this.mode,
                title: this.title,
                runtime: this.runtime * 60 * 1000,
            });
        },
    },
};
</script>


<style lang="scss" scoped>
.CreateGameView {
    margin: 2rem;
    width: 16rem;

    h1 {
        margin-bottom: 1rem;
    }

    button {
        margin-top: 2rem;
        background-color: var(--primary);
        width: 100%;
    }

    .field {
        margin-bottom: 1rem;

        label {
            color: var(--fg20);
        }

        input, select {
            width: 100%;
        }
    }
}
</style>
