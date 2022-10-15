<template>
  <div class="relative min-h-screen" :class="padTop ? 'pt-20' : ''">
    <SharedTopNav :class="navClass" class="bg-gray-800/10 py-2 backdrop-blur-lg z-20"  />
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  navClass?: string,
  padTop?: boolean
}

withDefaults(defineProps<Props>(), {
  navClass: 'absolute w-full top-0 left-0',
  padTop: true
})
</script>