<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
    <!-- Hero Section -->
    <div class="relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-indigo-600/10"></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div class="text-center">
          <div class="flex justify-center mb-8">
            <div class="w-24 h-24 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl">
              <BookOpenIcon class="w-14 h-14 text-white" />
            </div>
          </div>
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            <span class="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              About Our Library
            </span>
            <br />
            <span class="text-gray-700 dark:text-gray-300">Management System</span>
          </h1>
          <p class="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed">
            A comprehensive, modern solution designed to revolutionize how libraries operate, 
            manage resources, and serve their communities with cutting-edge technology.
          </p>
        </div>
      </div>
    </div>

    <!-- Mission Statement -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 lg:p-12">
        <div class="text-center mb-12">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Our Mission
          </h2>
          <div class="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8"></div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="space-y-6">
            <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              We believe that libraries are the cornerstone of knowledge and community learning. 
              Our Library Management System is designed to empower librarians and enhance the 
              experience of every library visitor through innovative technology.
            </p>
            <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              By streamlining operations, automating routine tasks, and providing powerful 
              analytics, we help libraries focus on what matters most: serving their communities 
              and fostering a love for learning.
            </p>
            <div class="flex items-center gap-4 pt-4">
              <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <CheckCircleIcon class="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 dark:text-white">Trusted by Libraries Worldwide</h3>
                <p class="text-gray-600 dark:text-gray-400">Serving communities across the globe</p>
              </div>
            </div>
          </div>
          <div class="relative">
            <div class="w-full h-80 bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100 dark:from-gray-700 dark:via-gray-700 dark:to-gray-600 rounded-2xl flex items-center justify-center shadow-inner">
              <div class="text-center">
                <LibraryIcon class="w-24 h-24 text-blue-500 mx-auto mb-4" />
                <p class="text-gray-600 dark:text-gray-400 font-medium">Empowering Libraries</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Key Features -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="text-center mb-16">
        <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Powerful Features for Modern Libraries
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Our comprehensive suite of tools is designed to handle every aspect of library management
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Book Management -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300">
          <div class="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg mb-6">
            <BookIcon class="w-8 h-8 text-white" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Smart Book Management</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Comprehensive catalog management with advanced search, categorization, and availability tracking.
          </p>
          <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li class="flex items-center gap-2">
              <CheckIcon class="w-4 h-4 text-green-500" />
              ISBN-based book identification
            </li>
            <li class="flex items-center gap-2">
              <CheckIcon class="w-4 h-4 text-green-500" />
              Multi-category classification
            </li>
            <li class="flex items-center gap-2">
              <CheckIcon class="w-4 h-4 text-green-500" />
              Real-time availability status
            </li>
          </ul>
        </div>

        <!-- Member Services -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 hover:shadow-xl hover:border-green-300 dark:hover:border-green-600 transition-all duration-300">
          <div class="w-16 h-16 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg mb-6">
            <UsersIcon class="w-8 h-8 text-white" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Member Management</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Complete member lifecycle management with profiles, history tracking, and communication tools.
          </p>
          <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li class="flex items-center gap-2">
              <CheckIcon class="w-4 h-4 text-green-500" />
              Digital member profiles
            </li>
            <li class="flex items-center gap-2">
              <CheckIcon class="w-4 h-4 text-green-500" />
              Borrowing history tracking
            </li>
            <li class="flex items-center gap-2">
              <CheckIcon class="w-4 h-4 text-green-500" />
              Automated notifications
            </li>
          </ul>
        </div>

        <!-- Borrowing System -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 hover:shadow-xl hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300">
          <div class="w-16 h-16 bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 rounded-2xl flex items-center justify-center shadow-lg mb-6">
            <CalendarIcon class="w-8 h-8 text-white" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Advanced Borrowing</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Streamlined borrowing process with automated due date tracking and return management.
          </p>
          <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li class="flex items-center gap-2">
              <CheckIcon class="w-4 h-4 text-green-500" />
              Quick checkout process
            </li>
            <li class="flex items-center gap-2">
              <CheckIcon class="w-4 h-4 text-green-500" />
              Overdue notifications
            </li>
            <li class="flex items-center gap-2">
              <CheckIcon class="w-4 h-4 text-green-500" />
              Renewal management
            </li>
          </ul>
        </div>

        <!-- Analytics -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 hover:shadow-xl hover:border-orange-300 dark:hover:border-orange-600 transition-all duration-300">
          <div class="w-16 h-16 bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg mb-6">
            <BarChartIcon class="w-8 h-8 text-white" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Smart Analytics</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Comprehensive reporting and analytics to understand library usage patterns and trends.
          </p>
          <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li class="flex items-center gap-2">
              <CheckIcon class="w-4 h-4 text-green-500" />
              Usage statistics
            </li>
            <li class="flex items-center gap-2">
              <CheckIcon class="w-4 h-4 text-green-500" />
              Popular books tracking
            </li>
            <li class="flex items-center gap-2">
              <CheckIcon class="w-4 h-4 text-green-500" />
              Custom reports
            </li>
          </ul>
        </div>

        <!-- Multi-Library Support -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-300">
          <div class="w-16 h-16 bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg mb-6">
            <BuildingIcon class="w-8 h-8 text-white" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Multi-Library Network</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Manage multiple library locations with centralized administration and resource sharing.
          </p>
          <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li class="flex items-center gap-2">
              <CheckIcon class="w-4 h-4 text-green-500" />
              Centralized management
            </li>
            <li class="flex items-center gap-2">
              <CheckIcon class="w-4 h-4 text-green-500" />
              Resource sharing
            </li>
            <li class="flex items-center gap-2">
              <CheckIcon class="w-4 h-4 text-green-500" />
              Cross-library transfers
            </li>
          </ul>
        </div>

        <!-- Security & Access -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 hover:shadow-xl hover:border-red-300 dark:hover:border-red-600 transition-all duration-300">
          <div class="w-16 h-16 bg-gradient-to-br from-red-500 via-pink-500 to-rose-500 rounded-2xl flex items-center justify-center shadow-lg mb-6">
            <ShieldCheckIcon class="w-8 h-8 text-white" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Security & Access Control</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Role-based access control and data security to protect sensitive library information.
          </p>
          <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li class="flex items-center gap-2">
              <CheckIcon class="w-4 h-4 text-green-500" />
              Role-based permissions
            </li>
            <li class="flex items-center gap-2">
              <CheckIcon class="w-4 h-4 text-green-500" />
              Data encryption
            </li>
            <li class="flex items-center gap-2">
              <CheckIcon class="w-4 h-4 text-green-500" />
              Audit trails
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Technology Stack -->
    <div class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Built with Modern Technology
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Our system leverages cutting-edge technologies to deliver exceptional performance and reliability
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4">
              <CodeIcon class="w-10 h-10 text-white" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Vue.js 3</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              Modern, reactive frontend framework with Composition API
            </p>
          </div>

          <div class="text-center">
            <div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4">
              <DatabaseIcon class="w-10 h-10 text-white" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">RESTful API</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              Robust backend API with comprehensive data management
            </p>
          </div>

          <div class="text-center">
            <div class="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4">
              <SmartphoneIcon class="w-10 h-10 text-white" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Responsive Design</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              Optimized for desktop, tablet, and mobile devices
            </p>
          </div>

          <div class="text-center">
            <div class="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4">
              <CloudIcon class="w-10 h-10 text-white" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Cloud Ready</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              Scalable architecture ready for cloud deployment
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Statistics -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl shadow-2xl p-8 lg:p-12 text-white">
        <div class="text-center mb-12">
          <h2 class="text-3xl sm:text-4xl font-bold mb-6">
            Trusted by Libraries Worldwide
          </h2>
          <p class="text-xl text-blue-100 max-w-3xl mx-auto">
            Join thousands of libraries that have transformed their operations with our system
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="text-4xl sm:text-5xl font-bold mb-2">1000+</div>
            <div class="text-blue-200">Libraries Served</div>
          </div>
          <div class="text-center">
            <div class="text-4xl sm:text-5xl font-bold mb-2">50M+</div>
            <div class="text-blue-200">Books Managed</div>
          </div>
          <div class="text-center">
            <div class="text-4xl sm:text-5xl font-bold mb-2">2M+</div>
            <div class="text-blue-200">Active Members</div>
          </div>
          <div class="text-center">
            <div class="text-4xl sm:text-5xl font-bold mb-2">99.9%</div>
            <div class="text-blue-200">Uptime</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Call to Action -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 lg:p-12 text-center">
        <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Ready to Transform Your Library?
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
          Experience the power of modern library management. Start your journey towards 
          more efficient operations and better member services today.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button class="px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-3 justify-center">
            <RocketIcon class="w-6 h-6" />
            Get Started Today
          </button>
          <button class="px-8 py-4 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-500 dark:hover:border-blue-400 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-3 justify-center">
            <PlayIcon class="w-6 h-6" />
            Watch Demo
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  BookOpenIcon, 
  BookIcon, 
  UsersIcon, 
  CalendarIcon, 
  BuildingIcon,
  BarChartIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  CheckIcon,
  LibraryIcon,
  CodeIcon,
  DatabaseIcon,
  SmartphoneIcon,
  CloudIcon,
  RocketIcon,
  PlayIcon
} from 'lucide-vue-next'
</script>