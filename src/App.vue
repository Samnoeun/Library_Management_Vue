<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { 
  Home, 
  Book, 
  Users, 
  RefreshCw, 
  FolderOpen, 
  Building, 
  UserCheck, 
  Calendar,
  Info,
  Search,
  X,
  Menu,
  Sun,
  Moon,
  Bell,
  Settings
} from 'lucide-vue-next'

const route = useRoute()
const searchQuery = ref('')
const sidebarOpen = ref(false)
const darkMode = ref(false)

const navigationItems = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Books', path: '/books', icon: Book },
  { name: 'Members', path: '/members', icon: Users },
  { name: 'Borrowings', path: '/borrowings', icon: RefreshCw },
  { name: 'Categories', path: '/categories', icon: FolderOpen },
  { name: 'Libraries', path: '/libraries', icon: Building },
  { name: 'Librarians', path: '/librarians', icon: UserCheck },
  { name: 'Bookings', path: '/bookings', icon: Calendar },
  { name: 'About', path: '/about', icon: Info }
]

const isActiveRoute = (path) => {
  return route.path === path
}

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const toggleDarkMode = () => {
  darkMode.value = !darkMode.value
  document.documentElement.classList.toggle('dark', darkMode.value)
}

const clearSearch = () => {
  searchQuery.value = ''
}
</script>

<template>
  <div class="flex h-screen bg-gray-50 dark:bg-gray-900" :class="{ 'dark': darkMode }">
    <!-- Mobile Sidebar Overlay -->
    <div 
      v-if="sidebarOpen" 
      class="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
      @click="toggleSidebar"
    ></div>

    <!-- Sidebar -->
    <aside 
      class="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0"
      :class="{ 'translate-x-0': sidebarOpen, '-translate-x-full': !sidebarOpen }"
    >
      <!-- Logo Section -->
      <div class="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Book class="w-5 h-5 text-white" />
          </div>
          <h1 class="text-xl font-bold text-gray-900 dark:text-white">
            LibraryOS
          </h1>
        </div>
        <button 
          @click="toggleSidebar"
          class="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        <div class="mb-6">
          <h3 class="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Navigation
          </h3>
        </div>
        
        <router-link
          v-for="item in navigationItems"
          :key="item.name"
          :to="item.path"
          class="group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200"
          :class="{
            'bg-blue-50 text-blue-700 border-r-2 border-blue-700 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-400': isActiveRoute(item.path),
            'text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white': !isActiveRoute(item.path)
          }"
          @click="sidebarOpen = false"
        >
          <component 
            :is="item.icon" 
            class="mr-3 h-5 w-5 flex-shrink-0"
            :class="{
              'text-blue-600 dark:text-blue-400': isActiveRoute(item.path),
              'text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300': !isActiveRoute(item.path)
            }"
          />
          {{ item.name }}
        </router-link>
      </nav>

      <!-- Sidebar Footer -->
      <div class="p-4 border-t border-gray-200 dark:border-gray-700">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
            <UserCheck class="w-4 h-4 text-gray-600 dark:text-gray-300" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
              Admin User
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400 truncate">
              admin@library.com
            </p>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Content Area -->
    <div class="flex flex-col flex-1 lg:ml-0">
      <!-- Top Navigation Bar -->
      <header class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div class="flex items-center justify-between px-4 py-4">
          <!-- Left Section -->
          <div class="flex items-center space-x-4">
            <button
              @click="toggleSidebar"
              class="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Menu class="w-5 h-5" />
            </button>
            
            <!-- Search Bar -->
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search class="h-4 w-4 text-gray-400" />
              </div>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search library..."
                class="block w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                v-if="searchQuery"
                @click="clearSearch"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <X class="h-4 w-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
              </button>
            </div>
          </div>

          <!-- Right Section -->
          <div class="flex items-center space-x-3">
            <!-- Dark Mode Toggle -->
            <button
              @click="toggleDarkMode"
              class="p-2 rounded-lg text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              :title="darkMode ? 'Switch to light mode' : 'Switch to dark mode'"
            >
              <Sun v-if="darkMode" class="w-5 h-5" />
              <Moon v-else class="w-5 h-5" />
            </button>

            <!-- Notifications -->
            <button class="p-2 rounded-lg text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative">
              <Bell class="w-5 h-5" />
              <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <!-- Settings -->
            <button class="p-2 rounded-lg text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <Settings class="w-5 h-5" />
            </button>

            <!-- User Profile -->
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span class="text-sm font-medium text-white">A</span>
              </div>
              <div class="hidden md:block">
                <p class="text-sm font-medium text-gray-900 dark:text-white">Admin</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">Administrator</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
        <div class="p-6">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
/* Custom scrollbar for sidebar */
nav::-webkit-scrollbar {
  width: 4px;
}

nav::-webkit-scrollbar-track {
  background: transparent;
}

nav::-webkit-scrollbar-thumb {
  background: rgba(156, 163, 175, 0.3);
  border-radius: 2px;
}

nav::-webkit-scrollbar-thumb:hover {
  background: rgba(156, 163, 175, 0.5);
}

.dark nav::-webkit-scrollbar-thumb {
  background: rgba(75, 85, 99, 0.3);
}

.dark nav::-webkit-scrollbar-thumb:hover {
  background: rgba(75, 85, 99, 0.5);
}
</style>