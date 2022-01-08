<template>
    <section class="AdminPanel">
        <header class="header">
            <h1 class="title">{{ title }}</h1>
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

    .header {
        display: flex;
        height: 3rem;
        align-items: center;
        background-color: var(--bg20);

        .title {
            margin-left: 1rem;
            margin-right: auto;
            text-transform: capitalize;
            font-size: 1.5rem;
        }

        .actions {
            display: flex;
            margin-right: 0.5rem;
        }
    }
}
</style>
