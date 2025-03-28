<template>
    <transition
        enter-active-class="transition-transform duration-200 ease"
        enter-from-class="translate-x-full"
        enter-to-class="translate-x-0"
        leave-active-class="transition-transform duration-200 ease"
        leave-from-class="translate-x-0"
        leave-to-class="translate-x-full"
    >
        <slot />
    </transition>
</template>
