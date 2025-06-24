<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 p-4 sm:p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Enhanced Header Section -->
      <div class="mb-8">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div class="space-y-2">
            <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <div class="w-12 h-12 bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <CalendarIcon class="w-7 h-7 text-white" />
              </div>
              <span class="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Bookings Hub
              </span>
            </h1>
            <p class="text-gray-600 dark:text-gray-400 text-lg">
              Manage library reservations with ease
            </p>
          </div>
          
          <div class="flex flex-col sm:flex-row gap-3">
            <button
              @click="toggleView"
              class="px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 text-gray-700 dark:text-gray-300"
            >
              <component :is="viewMode === 'grid' ? ListIcon : GridIcon" class="w-4 h-4" />
              {{ viewMode === 'grid' ? 'List View' : 'Grid View' }}
            </button>
            <button
              @click="openModal('add')"
              class="px-6 py-2.5 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
            >
              <PlusIcon class="w-5 h-5" />
              <span class="hidden sm:inline">Add New</span> Booking
            </button>
          </div>
        </div>
      </div>

      <!-- Enhanced Search and Filter Section -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Search Input -->
          <div class="lg:col-span-2">
            <div class="relative">
              <SearchIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search bookings, books, or members..."
                class="w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <button
                v-if="searchQuery"
                @click="clearSearch"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <XIcon class="w-5 h-5" />
              </button>
            </div>
          </div>

          <!-- Book Filter -->
          <div>
            <select
              v-model="selectedBook"
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Books</option>
              <option v-for="book in books" :key="book.id" :value="book.id">
                {{ book.title }}
              </option>
            </select>
          </div>

          <!-- Member Filter -->
          <div>
            <select
              v-model="selectedMember"
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Members</option>
              <option v-for="member in members" :key="member.id" :value="member.id">
                {{ member.user.name }}
              </option>
            </select>
          </div>
        </div>

        <!-- Filter Tags -->
        <div v-if="hasActiveFilters" class="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <span class="text-sm text-gray-600 dark:text-gray-400 mr-2">Active filters:</span>
          <span v-if="searchQuery" class="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm">
            Search: "{{ searchQuery }}"
            <button @click="searchQuery = ''" class="hover:text-blue-600">
              <XIcon class="w-3 h-3" />
            </button>
          </span>
          <span v-if="selectedBook" class="inline-flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm">
            Book: {{ getBookTitle(selectedBook) }}
            <button @click="selectedBook = ''" class="hover:text-green-600">
              <XIcon class="w-3 h-3" />
            </button>
          </span>
          <span v-if="selectedMember" class="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm">
            Member: {{ getMemberName(selectedMember) }}
            <button @click="selectedMember = ''" class="hover:text-purple-600">
              <XIcon class="w-3 h-3" />
            </button>
          </span>
          <button
            @click="clearAllFilters"
            class="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            Clear all
          </button>
        </div>
      </div>

      <!-- Enhanced Stats Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-blue-100 text-sm font-medium">Total Bookings</p>
              <p class="text-3xl font-bold">{{ filteredBookings.length }}</p>
              <p class="text-blue-200 text-xs mt-1">{{ bookings.length }} total</p>
            </div>
            <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <CalendarIcon class="w-6 h-6" />
            </div>
          </div>
        </div>
        
        <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg p-6 text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-green-100 text-sm font-medium">Available Books</p>
              <p class="text-3xl font-bold">{{ books.length }}</p>
              <p class="text-green-200 text-xs mt-1">Ready to book</p>
            </div>
            <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <BookIcon class="w-6 h-6" />
            </div>
          </div>
        </div>
        
        <div class="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-purple-100 text-sm font-medium">Active Members</p>
              <p class="text-3xl font-bold">{{ members.length }}</p>
              <p class="text-purple-200 text-xs mt-1">Registered users</p>
            </div>
            <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <UsersIcon class="w-6 h-6" />
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg p-6 text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-orange-100 text-sm font-medium">This Month</p>
              <p class="text-3xl font-bold">{{ getThisMonthBookings() }}</p>
              <p class="text-orange-200 text-xs mt-1">New bookings</p>
            </div>
            <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <TrendingUpIcon class="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      <!-- Results Summary -->
      <div v-if="filteredBookings.length > 0" class="mb-6">
        <p class="text-gray-600 dark:text-gray-400 text-sm">
          Showing {{ filteredBookings.length }} of {{ bookings.length }} bookings
          <span v-if="hasActiveFilters" class="text-blue-600 dark:text-blue-400">
            (filtered)
          </span>
        </p>
      </div>

      <!-- Enhanced Bookings Display -->
      <div v-if="filteredBookings.length > 0">
        <!-- Grid View -->
        <div v-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          <div
            v-for="booking in paginatedBookings"
            :key="booking.id"
            class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 overflow-hidden group"
          >
            <!-- Card Header -->
            <div class="bg-gradient-to-r from-blue-50 via-purple-50 to-indigo-50 dark:from-gray-700 dark:via-gray-700 dark:to-gray-700 p-4 border-b border-gray-200 dark:border-gray-600">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                    <BookOpenIcon class="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900 dark:text-white text-sm">
                      Booking #{{ booking.id }}
                    </h3>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                      {{ formatDate(booking.created_at) }}
                    </p>
                  </div>
                </div>
                <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    @click="openModal('edit', booking)"
                    class="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                    title="Edit booking"
                  >
                    <EditIcon class="w-4 h-4" />
                  </button>
                  <button
                    @click="deleteBooking(booking.id)"
                    class="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                    title="Delete booking"
                  >
                    <TrashIcon class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <!-- Card Content -->
            <div class="p-4 space-y-4">
              <div class="flex items-start gap-3">
                <BookIcon class="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div class="min-w-0 flex-1">
                  <p class="text-sm font-medium text-gray-900 dark:text-white truncate" :title="booking.book.title">
                    {{ booking.book.title }}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">Book Title</p>
                </div>
              </div>
              
              <div class="flex items-start gap-3">
                <UserIcon class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div class="min-w-0 flex-1">
                  <p class="text-sm font-medium text-gray-900 dark:text-white truncate" :title="booking.member.user.name">
                    {{ booking.member.user.name }}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">Member Name</p>
                </div>
              </div>
              
              <div class="flex items-start gap-3">
                <ClockIcon class="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                <div class="min-w-0 flex-1">
                  <p class="text-sm font-medium text-gray-900 dark:text-white">
                    {{ formatDateTime(booking.created_at) }}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">Created At</p>
                </div>
              </div>
            </div>

            <!-- Card Footer -->
            <div class="px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-600">
              <div class="flex items-center justify-between">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  <div class="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5"></div>
                  Active
                </span>
                <div class="flex items-center gap-2">
                  <button
                    @click="openModal('edit', booking)"
                    class="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
                  >
                    Edit
                  </button>
                  <span class="text-gray-300 dark:text-gray-600">|</span>
                  <button
                    @click="deleteBooking(booking.id)"
                    class="text-xs text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 font-medium transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- List View -->
        <div v-else class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Booking
                  </th>
                  <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Book
                  </th>
                  <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Member
                  </th>
                  <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Created
                  </th>
                  <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th class="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <tr
                  v-for="booking in paginatedBookings"
                  :key="booking.id"
                  class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <span class="text-white text-xs font-bold">#{{ booking.id }}</span>
                      </div>
                      <div>
                        <p class="text-sm font-medium text-gray-900 dark:text-white">
                          Booking #{{ booking.id }}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-2">
                      <BookIcon class="w-4 h-4 text-blue-500" />
                      <p class="text-sm text-gray-900 dark:text-white truncate max-w-xs" :title="booking.book.title">
                        {{ booking.book.title }}
                      </p>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-2">
                      <UserIcon class="w-4 h-4 text-green-500" />
                      <p class="text-sm text-gray-900 dark:text-white">
                        {{ booking.member.user.name }}
                      </p>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <p class="text-sm text-gray-900 dark:text-white">
                      {{ formatDateTime(booking.created_at) }}
                    </p>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      <div class="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5"></div>
                      Active
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div class="flex items-center justify-end gap-2">
                      <button
                        @click="openModal('edit', booking)"
                        class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 p-1 rounded"
                        title="Edit booking"
                      >
                        <EditIcon class="w-4 h-4" />
                      </button>
                      <button
                        @click="deleteBooking(booking.id)"
                        class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 p-1 rounded"
                        title="Delete booking"
                      >
                        <TrashIcon class="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Enhanced Pagination -->
        <div v-if="totalPages > 1" class="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="text-sm text-gray-700 dark:text-gray-300">
            Showing {{ ((currentPage - 1) * itemsPerPage) + 1 }} to {{ Math.min(currentPage * itemsPerPage, filteredBookings.length) }} of {{ filteredBookings.length }} results
          </div>
          <div class="flex items-center gap-2">
            <button
              @click="currentPage = Math.max(1, currentPage - 1)"
              :disabled="currentPage === 1"
              class="px-3 py-2 text-sm font-medium text-gray-500 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeftIcon class="w-4 h-4" />
            </button>
            
            <div class="flex items-center gap-1">
              <button
                v-for="page in visiblePages"
                :key="page"
                @click="currentPage = page"
                :class="[
                  'px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                  page === currentPage
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                ]"
              >
                {{ page }}
              </button>
            </div>
            
            <button
              @click="currentPage = Math.min(totalPages, currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="px-3 py-2 text-sm font-medium text-gray-500 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRightIcon class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <!-- Enhanced Empty State -->
      <div v-else class="text-center py-16">
        <div class="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
          <CalendarIcon class="w-16 h-16 text-gray-400" />
        </div>
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          {{ hasActiveFilters ? 'No matching bookings found' : 'No bookings yet' }}
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto text-lg">
          {{ hasActiveFilters 
            ? 'Try adjusting your search criteria or filters to find what you\'re looking for.' 
            : 'Get started by creating your first booking. Connect books with members to manage library reservations.' 
          }}
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            v-if="hasActiveFilters"
            @click="clearAllFilters"
            class="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 justify-center"
          >
            <XIcon class="w-5 h-5" />
            Clear Filters
          </button>
          <button
            @click="openModal('add')"
            class="px-8 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2 justify-center"
          >
            <PlusIcon class="w-5 h-5" />
            {{ hasActiveFilters ? 'Create New Booking' : 'Create First Booking' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Enhanced Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      @click.self="closeModal"
    >
      <div
        class="bg-white dark:bg-gray-800 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 scale-100 max-h-[90vh] overflow-y-auto"
        @click.stop
      >
        <!-- Modal Header -->
        <div class="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 px-6 py-6">
          <div class="flex items-center justify-between">
            <h3 class="text-xl font-bold text-white flex items-center gap-3">
              <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <CalendarIcon class="w-6 h-6 text-white" />
              </div>
              {{ modalMode === "add" ? "Create New Booking" : "Edit Booking" }}
            </h3>
            <button
              @click="closeModal"
              class="text-white/80 hover:text-white p-2 hover:bg-white/10 rounded-xl transition-colors"
            >
              <XIcon class="w-6 h-6" />
            </button>
          </div>
        </div>

        <!-- Modal Content -->
        <form
          @submit.prevent="modalMode === 'add' ? createBooking() : updateBooking()"
          class="p-6 space-y-6"
        >
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                <BookIcon class="w-5 h-5 inline mr-2 text-blue-500" />
                Select Book
              </label>
              <select
                v-model="formBooking.book_id"
                class="w-full px-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
                required
              >
                <option value="" disabled>Choose a book...</option>
                <option v-for="book in books" :key="book.id" :value="book.id">
                  {{ book.title }}
                </option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                <UserIcon class="w-5 h-5 inline mr-2 text-green-500" />
                Select Member
              </label>
              <select
                v-model="formBooking.member_id"
                class="w-full px-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
                required
              >
                <option value="" disabled>Choose a member...</option>
                <option
                  v-for="member in members"
                  :key="member.id"
                  :value="member.id"
                >
                  {{ member.user.name }}
                </option>
              </select>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="flex items-center justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-600">
            <button
              type="button"
              @click="closeModal"
              class="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-8 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              {{ modalMode === "add" ? "Create Booking" : "Update Booking" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { 
  CalendarIcon, 
  PlusIcon, 
  BookOpenIcon, 
  BookIcon, 
  UsersIcon, 
  UserIcon, 
  ClockIcon, 
  EditIcon, 
  TrashIcon, 
  XIcon,
  SearchIcon,
  GridIcon,
  ListIcon,
  TrendingUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from 'lucide-vue-next'
import api from "../plugins/axios"

// Reactive data
const bookings = ref([])
const books = ref([])
const members = ref([])
const showModal = ref(false)
const modalMode = ref('add')
const formBooking = ref({
  id: null,
  book_id: null,
  member_id: null
})

// Search and filter states
const searchQuery = ref('')
const selectedBook = ref('')
const selectedMember = ref('')
const viewMode = ref('grid')

// Pagination
const currentPage = ref(1)
const itemsPerPage = ref(12)

// Computed properties
const filteredBookings = computed(() => {
  let filtered = bookings.value

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(booking => 
      booking.book.title.toLowerCase().includes(query) ||
      booking.member.user.name.toLowerCase().includes(query) ||
      booking.id.toString().includes(query)
    )
  }

  // Book filter
  if (selectedBook.value) {
    filtered = filtered.filter(booking => booking.book.id == selectedBook.value)
  }

  // Member filter
  if (selectedMember.value) {
    filtered = filtered.filter(booking => booking.member.id == selectedMember.value)
  }

  return filtered
})

const paginatedBookings = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredBookings.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredBookings.value.length / itemsPerPage.value)
})

const visiblePages = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value
  
  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    } else if (current >= total - 3) {
      pages.push(1)
      pages.push('...')
      for (let i = total - 4; i <= total; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      pages.push('...')
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    }
  }
  
  return pages.filter(page => page !== '...' || pages.indexOf(page) === pages.lastIndexOf(page))
})

const hasActiveFilters = computed(() => {
  return searchQuery.value || selectedBook.value || selectedMember.value
})

// Methods
const fetchBookings = async () => {
  try {
    const res = await api.get("/booking")
    bookings.value = res.data
  } catch (err) {
    console.error(err)
  }
}

const fetchBooks = async () => {
  try {
    const res = await api.get("/books")
    books.value = res.data
  } catch (err) {
    console.error(err)
  }
}

const fetchMembers = async () => {
  try {
    const res = await api.get("/members")
    members.value = res.data
  } catch (err) {
    console.error(err)
  }
}

const openModal = (mode, booking = null) => {
  modalMode.value = mode
  showModal.value = true
  if (mode === "edit" && booking) {
    formBooking.value = { ...booking }
  } else {
    formBooking.value = {
      id: null,
      book_id: '',
      member_id: ''
    }
  }
}

const closeModal = () => {
  showModal.value = false
}

const createBooking = async () => {
  try {
    await api.post("/booking", formBooking.value)
    await fetchBookings()
    closeModal()
  } catch (err) {
    console.error("Create Error:", err)
  }
}

const updateBooking = async () => {
  try {
    await api.put(`/booking/${formBooking.value.id}`, formBooking.value)
    await fetchBookings()
    closeModal()
  } catch (err) {
    console.error("Update Error:", err)
  }
}

const deleteBooking = async (id) => {
  if (confirm("Are you sure you want to delete this booking?")) {
    try {
      await api.delete(`/booking/${id}`)
      await fetchBookings()
    } catch (err) {
      console.error("Delete Error:", err)
    }
  }
}

const clearSearch = () => {
  searchQuery.value = ''
}

const clearAllFilters = () => {
  searchQuery.value = ''
  selectedBook.value = ''
  selectedMember.value = ''
  currentPage.value = 1
}

const toggleView = () => {
  viewMode.value = viewMode.value === 'grid' ? 'list' : 'grid'
}

const getBookTitle = (bookId) => {
  const book = books.value.find(b => b.id == bookId)
  return book ? book.title : ''
}

const getMemberName = (memberId) => {
  const member = members.value.find(m => m.id == memberId)
  return member ? member.user.name : ''
}

const getThisMonthBookings = () => {
  const now = new Date()
  const thisMonth = bookings.value.filter(booking => {
    const bookingDate = new Date(booking.created_at)
    return bookingDate.getMonth() === now.getMonth() && 
           bookingDate.getFullYear() === now.getFullYear()
  })
  return thisMonth.length
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const formatDateTime = (dateString) => {
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Watch for filter changes to reset pagination
const resetPagination = () => {
  currentPage.value = 1
}

// Lifecycle
onMounted(() => {
  fetchBookings()
  fetchBooks()
  fetchMembers()
})
</script>