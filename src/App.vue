<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <header class="bg-blue-800 text-white shadow-md">
    <div class="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
      <!-- Logo -->
      <h1 class="text-2xl font-bold">📚 Library System</h1>

      <!-- Navigation -->
      <nav class="space-x-6">
        <RouterLink 
          to="/" 
          class="hover:text-yellow-300" 
          :class="{ 'text-yellow-300 font-semibold': route.path === '/' }"
        >
          Home
        </RouterLink>
        <RouterLink 
          to="/books" 
          class="hover:text-yellow-300" 
          :class="{ 'text-yellow-300 font-semibold': route.path === '/books' }"
        >
          Books
        </RouterLink>
        <RouterLink 
          to="/members" 
          class="hover:text-yellow-300" 
          :class="{ 'text-yellow-300 font-semibold': route.path === '/members' }"
        >
          Members
        </RouterLink>
        <RouterLink 
          to="/borrowings" 
          class="hover:text-yellow-300" 
          :class="{ 'text-yellow-300 font-semibold': route.path === '/borrowings' }"
        >
          Borrowings
        </RouterLink>
        <RouterLink 
          to="/about" 
          class="hover:text-yellow-300" 
          :class="{ 'text-yellow-300 font-semibold': route.path === '/about' }"
        >
          About
        </RouterLink>
      </nav>
    </div>
  </header>

  <!-- Page Content -->
  <RouterView />
</template>

<style scoped>
/* Optional: Customize the font or transition */
</style>

