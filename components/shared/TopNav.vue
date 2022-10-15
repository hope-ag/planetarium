<template>
  <nav>
    <div class="container flex items-center">
      <div class="text-primary font-black text-lg">/P</div>
      <ul class="flex items-center ml-auto gap-8">
        <li v-for="link in navLinks" :key="link.name">
          <NuxtLink
            :data-link="link.name"
            class="nav-link py-2 px-1 rounded block"
            :to="link.path">
             <span class="block">
              {{ link.name }}
             </span>
            </NuxtLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
const navLinks = [
    { name: 'Home', path: '/'},
    { name: 'Planets', path: '/planets'},
    { name: 'About', path: '/about'},
    { name: 'Contact', path: '/contact'},
  ]
</script>

<style scoped lang="scss">
  .nav-link {
    position: relative;
    overflow: hidden;
    top: 120%;
    
    span, &::before {
      transition: all 300ms ease-in-out;
    }
    
    &::after {
      content: "";
      height: 4px;
      width: 100%;
      bottom: -120%;
      transition: all 300ms cubic-bezier(0.68, -0.6, 0.32, 1.6);
      @apply absolute left-0 rounded-full bg-primary;
    }
    &::before {
      content: attr(data-link);
      width: 100%;
      height: 100%;
      bottom: 150%;
      @apply absolute py-2 left-1 text-base;
    }

    &:hover {
      span {
        transform: translateY(120%);
        opacity: 0;
      }

      &::before {
        bottom: 0;
      }
      &::after {
        bottom: 0;
      }
    }
  }
</style>