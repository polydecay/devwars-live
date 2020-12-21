<template>
    <section class="AdminPanel">
        <header>
            <slot name="title"><h1>{{ title }}</h1></slot>
            <div class="actions">
                <slot name="actions"/>
            </div>
        </header>
        <slot/>
    </section>
</template>


<script>
export default {
    props: {
        title: { type: String, required: false },
    },
};
</script>


<style lang="scss" scoped>
.AdminPanel {
    background-color: var(--bg10);

    > header {
        display: flex;
        height: 3rem;
        align-items: center;
        background-color: var(--bg20);

        h1 {
            margin-left: 1rem;
            margin-right: auto;
            font-size: 1.5rem;
        }

        .actions {
            margin-right: 0.5rem;
        }
    }
}
</style>
