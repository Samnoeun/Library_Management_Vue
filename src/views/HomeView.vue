<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
    <!-- Hero Section -->
    <div class="relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-indigo-600/10"></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div class="text-center">
          <div class="flex justify-center mb-8">
            <div class="w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <BookOpenIcon class="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            <span class="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Library Management
            </span>
            <br />
            <span class="text-gray-700 dark:text-gray-300">System</span>
          </h1>
          <p class="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed">
            Streamline your library operations with our comprehensive management platform. 
            Track books, manage members, and monitor activities with ease and efficiency.
          </p>
          
          <!-- Quick Action Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              @click="navigateTo('/books')"
              class="px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-3 justify-center"
            >
              <BookIcon class="w-6 h-6" />
              Browse Books
            </button>
            <button
              @click="navigateTo('/members')"
              class="px-8 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-500 dark:hover:border-blue-400 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-3 justify-center"
            >
              <UsersIcon class="w-6 h-6" />
              Manage Members
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Overview -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
      <div v-if="loading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
      
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transform hover:scale-105 transition-all duration-200">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Books</p>
              <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ books.length }}</p>
              <p class="text-sm text-blue-600 dark:text-blue-400 mt-1">
                <BookIcon class="w-4 h-4 inline mr-1" />
                In collection
              </p>
            </div>
            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <BookIcon class="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transform hover:scale-105 transition-all duration-200">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Active Members</p>
              <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ members.length }}</p>
              <p class="text-sm text-green-600 dark:text-green-400 mt-1">
                <UsersIcon class="w-4 h-4 inline mr-1" />
                Registered
              </p>
            </div>
            <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <UsersIcon class="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transform hover:scale-105 transition-all duration-200">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Active Bookings</p>
              <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ bookings.length }}</p>
              <p class="text-sm text-purple-600 dark:text-purple-400 mt-1">
                <CalendarIcon class="w-4 h-4 inline mr-1" />
                Current
              </p>
            </div>
            <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <CalendarIcon class="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transform hover:scale-105 transition-all duration-200">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Libraries</p>
              <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ libraries.length }}</p>
              <p class="text-sm text-indigo-600 dark:text-indigo-400 mt-1">
                <BuildingIcon class="w-4 h-4 inline mr-1" />
                {{ categories.length }} categories
              </p>
            </div>
            <div class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <BuildingIcon class="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Features Grid -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div class="text-center mb-12">
        <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Comprehensive Library Management
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Everything you need to run a modern library efficiently, from inventory management to member services.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Books Management -->
        <div 
          @click="navigateTo('/books')"
          class="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 hover:shadow-2xl hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 cursor-pointer transform hover:scale-105"
        >
          <div class="flex items-center justify-between mb-6">
            <div class="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
              <BookOpenIcon class="w-8 h-8 text-white" />
            </div>
            <ArrowRightIcon class="w-6 h-6 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
          </div>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">Books Collection</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            Manage your entire book inventory with advanced search, categorization, and availability tracking. 
            Add new books, update information, and monitor borrowing status.
          </p>
          <div class="flex items-center gap-4 text-sm">
            <span class="flex items-center gap-1 text-green-600 dark:text-green-400">
              <CheckCircleIcon class="w-4 h-4" />
              {{ getAvailableBooks() }} Available
            </span>
            <span class="flex items-center gap-1 text-orange-600 dark:text-orange-400">
              <ClockIcon class="w-4 h-4" />
              {{ getBorrowedBooks() }} Borrowed
            </span>
          </div>
        </div>

        <!-- Members Management -->
        <div 
          @click="navigateTo('/members')"
          class="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 hover:shadow-2xl hover:border-green-300 dark:hover:border-green-600 transition-all duration-300 cursor-pointer transform hover:scale-105"
        >
          <div class="flex items-center justify-between mb-6">
            <div class="w-16 h-16 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
              <UsersIcon class="w-8 h-8 text-white" />
            </div>
            <ArrowRightIcon class="w-6 h-6 text-gray-400 group-hover:text-green-500 group-hover:translate-x-1 transition-all" />
          </div>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">Member Services</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            Comprehensive member management system to handle registrations, profile updates, 
            and track member activity across your library network.
          </p>
          <div class="flex items-center gap-4 text-sm">
            <span class="flex items-center gap-1 text-blue-600 dark:text-blue-400">
              <UserIcon class="w-4 h-4" />
              {{ members.length }} Members
            </span>
            <span class="flex items-center gap-1 text-purple-600 dark:text-purple-400">
              <BuildingIcon class="w-4 h-4" />
              {{ libraries.length }} Locations
            </span>
          </div>
        </div>

        <!-- Bookings Management -->
        <div 
          @click="navigateTo('/bookings')"
          class="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 hover:shadow-2xl hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300 cursor-pointer transform hover:scale-105"
        >
          <div class="flex items-center justify-between mb-6">
            <div class="w-16 h-16 bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
              <CalendarIcon class="w-8 h-8 text-white" />
            </div>
            <ArrowRightIcon class="w-6 h-6 text-gray-400 group-hover:text-purple-500 group-hover:translate-x-1 transition-all" />
          </div>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">Booking System</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            Streamlined booking and reservation system to track book borrowings, 
            due dates, and returns with automated notifications and reminders.
          </p>
          <div class="flex items-center gap-4 text-sm">
            <span class="flex items-center gap-1 text-green-600 dark:text-green-400">
              <CheckCircleIcon class="w-4 h-4" />
              {{ bookings.length }} Active
            </span>
            <span class="flex items-center gap-1 text-orange-600 dark:text-orange-400">
              <CalendarIcon class="w-4 h-4" />
              Current
            </span>
          </div>
        </div>

        <!-- Categories Management -->
        <div 
          @click="navigateTo('/categories')"
          class="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 hover:shadow-2xl hover:border-pink-300 dark:hover:border-pink-600 transition-all duration-300 cursor-pointer transform hover:scale-105"
        >
          <div class="flex items-center justify-between mb-6">
            <div class="w-16 h-16 bg-gradient-to-br from-pink-500 via-rose-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
              <FolderIcon class="w-8 h-8 text-white" />
            </div>
            <ArrowRightIcon class="w-6 h-6 text-gray-400 group-hover:text-pink-500 group-hover:translate-x-1 transition-all" />
          </div>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">Categories</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            Organize your book collection with a flexible categorization system. 
            Create, manage, and assign categories to improve discoverability.
          </p>
          <div class="flex items-center gap-4 text-sm">
            <span class="flex items-center gap-1 text-indigo-600 dark:text-indigo-400">
              <FolderIcon class="w-4 h-4" />
              {{ categories.length }} Categories
            </span>
            <span class="flex items-center gap-1 text-blue-600 dark:text-blue-400">
              <BookIcon class="w-4 h-4" />
              {{ getAverageBooksPerCategory() }} Avg/Category
            </span>
          </div>
        </div>

        <!-- Libraries Management -->
        <div 
          @click="navigateTo('/libraries')"
          class="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 hover:shadow-2xl hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-300 cursor-pointer transform hover:scale-105"
        >
          <div class="flex items-center justify-between mb-6">
            <div class="w-16 h-16 bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
              <BuildingIcon class="w-8 h-8 text-white" />
            </div>
            <ArrowRightIcon class="w-6 h-6 text-gray-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
          </div>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">Library Network</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            Manage multiple library locations with centralized administration. 
            Track resources, staff, and operations across your entire network.
          </p>
          <div class="flex items-center gap-4 text-sm">
            <span class="flex items-center gap-1 text-green-600 dark:text-green-400">
              <BuildingIcon class="w-4 h-4" />
              {{ libraries.length }} Locations
            </span>
            <span class="flex items-center gap-1 text-purple-600 dark:text-purple-400">
              <MapPinIcon class="w-4 h-4" />
              {{ getUniqueLocations() }} Cities
            </span>
          </div>
        </div>

        <!-- Analytics & Reports -->
        <div class="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 hover:shadow-2xl hover:border-orange-300 dark:hover:border-orange-600 transition-all duration-300 cursor-pointer transform hover:scale-105">
          <div class="flex items-center justify-between mb-6">
            <div class="w-16 h-16 bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
              <BarChartIcon class="w-8 h-8 text-white" />
            </div>
            <ArrowRightIcon class="w-6 h-6 text-gray-400 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
          </div>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">Analytics & Reports</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            Comprehensive analytics dashboard with detailed reports on library usage, 
            popular books, member activity, and operational insights.
          </p>
          <div class="flex items-center gap-4 text-sm">
            <span class="flex items-center gap-1 text-green-600 dark:text-green-400">
              <TrendingUpIcon class="w-4 h-4" />
              Live Data
            </span>
            <span class="flex items-center gap-1 text-blue-600 dark:text-blue-400">
              <BarChartIcon class="w-4 h-4" />
              Smart Insights
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activity Section -->
    <div class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
          <p class="text-xl text-gray-600 dark:text-gray-400">Stay updated with the latest library activities</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Recent Bookings -->
          <div class="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <CalendarIcon class="w-6 h-6 text-purple-500" />
                Recent Bookings
              </h3>
              <button 
                @click="navigateTo('/bookings')"
                class="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 text-sm font-medium"
              >
                View All
              </button>
            </div>
            <div v-if="recentBookings.length > 0" class="space-y-4">
              <div 
                v-for="booking in recentBookings.slice(0, 4)" 
                :key="booking.id"
                class="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl"
              >
                <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <BookIcon class="w-5 h-5 text-white" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900 dark:text-white truncate">{{ booking.book?.title || 'Unknown Book' }}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">by {{ booking.member?.user?.name || 'Unknown Member' }}</p>
                </div>
                <span class="text-xs text-gray-500 dark:text-gray-400">{{ formatTimeAgo(booking.created_at) }}</span>
              </div>
            </div>
            <div v-else class="text-center py-8">
              <CalendarIcon class="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
              <p class="text-gray-500 dark:text-gray-400">No recent bookings</p>
            </div>
          </div>

          <!-- System Overview -->
          <div class="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <TrendingUpIcon class="w-6 h-6 text-blue-500" />
                System Overview
              </h3>
            </div>
            <div class="space-y-4">
              <div class="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                    <BookOpenIcon class="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-900 dark:text-white">Books Available</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Ready for borrowing</p>
                  </div>
                </div>
                <span class="text-lg font-bold text-blue-600 dark:text-blue-400">{{ getAvailableBooks() }}</span>
              </div>
              
              <div class="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <UsersIcon class="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-900 dark:text-white">Active Members</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Registered users</p>
                  </div>
                </div>
                <span class="text-lg font-bold text-green-600 dark:text-green-400">{{ members.length }}</span>
              </div>
              
              <div class="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <CalendarIcon class="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-900 dark:text-white">Current Bookings</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Active reservations</p>
                  </div>
                </div>
                <span class="text-lg font-bold text-purple-600 dark:text-purple-400">{{ bookings.length }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { 
  BookOpenIcon, 
  BookIcon, 
  UsersIcon, 
  UserIcon,
  CalendarIcon, 
  BuildingIcon,
  FolderIcon,
  TrendingUpIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ClockIcon,
  MapPinIcon,
  BarChartIcon
} from 'lucide-vue-next'
import api from "../plugins/axios"

// Reactive data
const books = ref([])
const members = ref([])
const bookings = ref([])
const libraries = ref([])
const categories = ref([])
const loading = ref(true)

// Computed properties for recent bookings
const recentBookings = computed(() => {
  return bookings.value
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 4)
})

// Helper functions
const getAvailableBooks = () => {
  return books.value.filter(book => book.status === 'available').length
}

const getBorrowedBooks = () => {
  return books.value.filter(book => book.status === 'borrowed').length
}

const getAverageBooksPerCategory = () => {
  if (categories.value.length === 0) return 0
  return Math.round(books.value.length / categories.value.length)
}

const getUniqueLocations = () => {
  const uniqueLocations = new Set(libraries.value.map(lib => lib.location?.toLowerCase()))
  return uniqueLocations.size
}

const formatTimeAgo = (dateString) => {
  if (!dateString) return 'Unknown'
  
  const now = new Date()
  const date = new Date(dateString)
  const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))
  
  if (diffInHours < 1) return 'Just now'
  if (diffInHours < 24) return `${diffInHours}h ago`
  
  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) return `${diffInDays}d ago`
  
  return date.toLocaleDateString()
}

// Navigation function
const navigateTo = (path) => {
  // Replace with your actual router navigation
  console.log(`Navigating to: ${path}`)
  // Example: router.push(path)
}

// API calls
const fetchBooks = async () => {
  try {
    const response = await api.get('/books')
    books.value = response.data
  } catch (error) {
    console.error('Error fetching books:', error)
  }
}

const fetchMembers = async () => {
  try {
    const response = await api.get('/members')
    members.value = response.data
  } catch (error) {
    console.error('Error fetching members:', error)
  }
}

const fetchBookings = async () => {
  try {
    const response = await api.get('/booking')
    bookings.value = response.data
  } catch (error) {
    console.error('Error fetching bookings:', error)
  }
}

const fetchLibraries = async () => {
  try {
    const response = await api.get('/libraries')
    libraries.value = response.data
  } catch (error) {
    console.error('Error fetching libraries:', error)
  }
}

const fetchCategories = async () => {
  try {
    const response = await api.get('/categories')
    categories.value = response.data
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
}

// Fetch all data on component mount
onMounted(async () => {
  loading.value = true
  try {
    await Promise.all([
      fetchBooks(),
      fetchMembers(),
      fetchBookings(),
      fetchLibraries(),
      fetchCategories()
    ])
  } catch (error) {
    console.error('Error loading dashboard data:', error)
  } finally {
    loading.value = false
  }
})
</script>
