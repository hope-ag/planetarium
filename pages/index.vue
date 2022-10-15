<template>
  <NuxtLayout name="nav-layout">
    <div class="container">
      welcome
      <button class="btn btn-primary">
      <Icon name="carbon:3d-curve-manual" />
      {{ _UpperCase('yayyyy') }}
      </button>
      <p>{{ data }}</p>
      <NuxtImg provider="cloudinary" src="/Activities-1_lj2544.jpg" loading="lazy" />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">

const data = ref({})

const planetData = await useFetch('/api/planets')
data.value = planetData.data.value

</script>

<style scoped>

</style>