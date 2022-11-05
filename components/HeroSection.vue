<template>
  <section class="min-h-[70vh] w-full flex flex-col h-screen relative">
    <canvas ref="canvas" class="hero-canvas absolute top-0 left-0 w-full h-full bg-black/50" />
    <div class="absolute -top-20 -left-20 h-[500px] w-[500px] rounded-full bg-warning-400/10 blur-[80px]" />
    <span aria-hidden class="mt-auto" />
    <div class="text-content z-10 mt-auto max-w-5xl mx-auto text-center">
      <h1
        class="hero-text text-6xl sm:text-9xl font-extrabold text-transparent mb-4 bg-gradient-to-br from-warning-500 to-primary bg-clip-text">
          Welcome to the Planetarium
        </h1>
      <p class="text-xl leading-relaxed tracking-wider">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto doloremque pariatur, consequuntur unde cupiditate et dolore deleniti, atque repellendus vel nostrum natus.</p>
    </div>
    <span aria-hidden class="mb-auto" />
    <div class="absolute bottom-0 h-[400px] w-full bg-gradient-to-t from-gray-900 via-black/40 to-transparent" />
  </section>
</template>

<script setup lang="ts">
import { configureScene } from '@/utils/threejs/particles'

const canvas = ref<HTMLCanvasElement>(null)
onMounted(() => {
    configureScene(canvas.value)
})
</script>

<style scoped>

.hero-text {
  background-size: 180%;
  animation: move-bg 8s ease-in-out infinite alternate;
}
</style>