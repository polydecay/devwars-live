<template>
    <div class="GameApplicationView">
        <div class="form" v-if="inQueue !== null">
            <h1>Game Application</h1>

            <fieldset>
                <h2>Language Preferences</h2>
                <p>We'll try our best to match you to your preferd languages. Choose "<strong>NEVER</strong>" to ensure that you won't be picked for that language.</p>
                <div class="languages">
                    <label>HTML</label>
                    <select v-model="preferences.html">
                        <option value="never">NEVER</option>
                        <option value="bad">Bad</option>
                        <option value="good" selected>Good</option>
                        <option value="best">Best</option>
                    </select>
                    <label>CSS</label>
                    <select v-model="preferences.css">
                        <option value="never">NEVER</option>
                        <option value="bad">Bad</option>
                        <option value="good" selected>Good</option>
                        <option value="best">Best</option>
                    </select>
                    <label>JS</label>
                    <select v-model="preferences.js">
                        <option value="never">NEVER</option>
                        <option value="bad">Bad</option>
                        <option value="good" selected>Good</option>
                        <option value="best">Best</option>
                    </select>
                </div>
            </fieldset>

            <textarea v-model="message" rows="3" placeholder="Enter short message here. (optional)"></textarea>

            <div class="actions">
                <span class="status" v-if="inQueue">You're in queue, please hold...</span>
                <button class="ghost" v-if="inQueue" @click="onCancel">Cancel</button>
                <button class="primary" @click="onSubmit">{{ inQueue ? 'Update' : 'Submit' }}</button>
            </div>
        </div>
    </div>
</template>


<script>
import * as api from '../../../api';
import { mapState } from 'vuex';

export default {
    data: () => ({
        inQueue: null,
        message: '',
        preferences: {
            html: 'good',
            css: 'good',
            js: 'good',
        },
    }),

    computed: mapState('app', ['user']),

    mounted() {
        this.fetchApplication();
    },

    methods: {
        async fetchApplication() {
            const res = await api.getApplication(this.user.id);
            if (res.error) {
                this.inQueue = false;
                return;
            }

            this.inQueue = true;
            this.preferences = res.body.preferences;
            this.message = res.body.message;
        },

        async onSubmit() {
            const { user, preferences, message } = this;
            const res = await api.createApplication({ ...user, preferences, message });
            if (res.error) return;

            this.inQueue = true;
        },

        async onCancel() {
            const res = await api.deleteApplication(this.user.id);
            if (res.error) return;

            this.inQueue = false;
        },
    },
};
</script>


<style lang="scss" scoped>
.GameApplicationView {
    display: flex;
    width: 100%;
    height: 100vh;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    .form {
        display: flex;
        flex-flow: column nowrap;
        padding: 2rem;
        width: 48rem;
        background-color: var(--bg10);

        h1 {
            margin-bottom: 1rem;
            padding-bottom: 1rem;
            border-bottom: 2px solid var(--primary);
        }

        h2 {
            color: var(--fg20);
        }

        p {
            margin: 0.5rem 0 1rem 0;
            color: var(--fg40);
        }

        fieldset {
            margin-bottom: 2rem;
            padding: 0;
            border: none;
        }

        .languages {
            display: flex;
            align-items: center;

            select {
                height: 2.5rem;
                width: 100%;
            }

            label {
                padding: 0 1rem;
                line-height: 2.5rem;
                font-weight: 700;
                background-color: var(--bg40);

                &:not(:first-child) {
                    margin-left: 2rem;
                }
            }
        }

        .actions {
            margin-top: 1rem;
            display: flex;
            justify-content: flex-end;

            .status {
                margin-right: auto;
                align-self: center;
                font-size: 1.125rem;
            }

            button {
                width: 6rem;
                height: 2.5rem;
                margin-left: 1rem;

                &.ghost {
                    background-color: transparent;
                }

                &.primary {
                    background-color: var(--primary);
                }
            }
        }
    }
}
</style>
