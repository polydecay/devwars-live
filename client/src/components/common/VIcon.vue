<template>
    <svg
        class="VIcon"
        role="img"
        :aria-label="title"
        :width="size"
        :height="size"
        fill="currentColor"
        viewBox="0 0 24 24"
    >
        <title v-if="title">{{ title }}</title>
        <path :d="icons[icon]"/>
    </svg>
</template>


<script>
import {
    mdiMonitorCellphone as Monitor,
    mdiCheckAll as CheckAll,
    mdiCheck as Check,
    mdiClose as Close,
    mdiCodeTags as CodeTags,
    mdiLock as Lock,
    mdiLockOpen as LockOpen,
    mdiOpenInNew as OpenInNew,
    mdiRefresh as Refresh,
} from '@mdi/js';

export default {
    props: {
        icon: { type: String, required: true },
        title: { type: String, required: false },
        size: { type: Number, default: 24 },
    },

    data: () => ({
        icons: {
            Monitor,
            CheckAll,
            Check,
            Close,
            CodeTags,
            Lock,
            LockOpen,
            OpenInNew,
            Refresh,
        },
    }),
};
</script>


<style lang="scss" scoped>
.VIcon {
    display: inline-block;
    vertical-align: middle;
    user-select: none;
}
</style>
