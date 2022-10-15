<template>
  <section class="min-h-[70vh] w-full flex flex-col">
    <canvas class="hero-canvas absolute top-0 left-0 w-full h-full" />
    <div class="text-content z-10 mt-auto max-w-5xl mx-auto text-center">
      <h1
        class="hero-text text-6-xl sm:text-9xl font-extrabold text-transparent mb-4 bg-gradient-to-r from-primary to-danger-500 bg-clip-text">
          Welcome to the Planetarium
        </h1>
      <p class="text-xl leading-relaxed tracking-wider">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto doloremque pariatur, consequuntur unde cupiditate et dolore deleniti, atque repellendus vel nostrum natus.</p>
    </div>
  </section>
</template>

<script setup lang="ts">

</script>

<style scoped>

.hero-text {
  background-size: 180%;
  animation: move-bg 8s ease-in-out infinite alternate;
}
</style>