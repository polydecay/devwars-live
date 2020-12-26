<template>
    <div class="AdminObjectivesPage">
        <div class="form">
            <h1>Objectives</h1>
            <div class="objectives">
                <div v-for="obj in formObjectives" :key="obj.id" class="objective">
                    <span class="id">{{ obj.id }}.</span>
                    <input v-model="obj.description" type="text">
                    <button @click="onToggleBonus(obj)">
                        <CheckAllIcon v-if="obj.bonus" class="bonus"/>
                        <CheckIcon v-else/>
                    </button>
                    <button class="delete" @click="onDelete(obj)">
                        <CloseIcon/>
                    </button>
                </div>
                <button class="add" @click="onAdd">Add Objective</button>
            </div>
            <hr>
            <div class="actions">
                <button class="primary" @click="onSave">Save</button>
            </div>
        </div>
    </div>
</template>


<script>
import { mapState } from 'vuex';
import cloneDeep from 'lodash/cloneDeep';
import * as api from '../../api';
import CheckIcon from 'vue-material-design-icons/Check';
import CheckAllIcon from 'vue-material-design-icons/CheckAll';
import CloseIcon from 'vue-material-design-icons/Close';

export default {
    name: 'AdminObjectivesPage',

    components: { CheckIcon, CheckAllIcon, CloseIcon },

    data: () => ({
        formObjectives: [],
    }),

    computed: {
        ...mapState('game', ['isActive', 'objectives']),

        gameObjectives() {
            return this.$store.state.game.objectives;
        },
    },

    watch: {
        objectives() {
            this.syncObjectives();
        },
    },

    mounted() {
        this.syncObjectives();
    },

    methods: {
        syncObjectives() {
            this.formObjectives = cloneDeep(this.objectives);
        },

        onToggleBonus(objective) {
            objective.bonus = !objective.bonus;
        },

        onDelete(objective) {
            this.formObjectives = this.formObjectives
                .filter(obj => obj !== objective)
                .map((obj, index) => {
                    obj.id = index + 1;
                    return obj;
                });
        },

        onAdd(objective) {
            this.formObjectives.push({
                id: this.formObjectives.length + 1,
                description: '',
                bonus: false,
            });
        },

        async onSave() {
            await api.patchGame({ objectives: this.formObjectives });
        },
    },
};
</script>


<style lang="scss" scoped>
.AdminObjectivesPage {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    .form {
        width: 48rem;
        padding: 2rem;
        background: var(--bg10);

        h1 {
            margin-bottom: 1rem;
            padding-bottom: 1rem;
            border-bottom: 2px solid var(--primary);
        }

        hr {
            margin-top: 1rem;
            border: none;
            border-bottom: 2px solid var(--bg20);
        }

        .objectives {
            display: flex;
            flex-flow: column nowrap;
            align-items: center;

            .objective {
                display: flex;
                margin-bottom: 1rem;
                width: 100%;
                align-items: center;

                input {
                    width: 100%;
                }

                button {
                    padding: 0;
                    width: 2.5rem;
                    margin-left: 0.5rem;

                    &.delete {
                        background-color: var(--error);
                    }

                    .bonus {
                        color: var(--bonus);
                    }

                    .material-design-icon__svg {
                        margin-top: 4px;
                    }
                }

                .id {
                    margin-right: 0.5em;
                }
            }
        }

        .actions {
            display: flex;
            margin-top: 1rem;
            align-items: flex-end;

            button {
                margin-left: auto;
                height: 2.5rem;
                &.primary {
                    background-color: var(--primary);
                }
            }
        }
    }
}
</style>
