<template>
  <NuxtLayout name="nav-layout">
    <p>Planet info for {{route.params.id}}</p>
  </NuxtLayout>
</template>

<script setup lang="ts">
const route = useRoute()
</script>

<style scoped>

</style>