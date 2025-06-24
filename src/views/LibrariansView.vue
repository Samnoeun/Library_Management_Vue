<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 p-4 sm:p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Enhanced Header Section -->
      <div class="mb-8">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div class="space-y-2">
            <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <div class="w-12 h-12 bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <UserCheckIcon class="w-7 h-7 text-white" />
              </div>
              <span class="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Librarians Hub
              </span>
            </h1>
            <p class="text-gray-600 dark:text-gray-400 text-lg">
              Manage library staff and their access permissions
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
              class="px-6 py-2.5 bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 hover:from-teal-700 hover:via-cyan-700 hover:to-blue-700 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
            >
              <PlusIcon class="w-5 h-5" />
              <span class="hidden sm:inline">Add New</span> Librarian
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
                placeholder="Search librarians by name or email..."
                class="w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
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

          <!-- Status Filter -->
          <div>
            <select
              v-model="selectedStatus"
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <!-- Sort Options -->
          <div>
            <select
              v-model="sortBy"
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="name">Sort by Name</option>
              <option value="email">Sort by Email</option>
              <option value="created_at">Sort by Join Date</option>
            </select>
          </div>
        </div>

        <!-- Filter Tags -->
        <div v-if="hasActiveFilters" class="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <span class="text-sm text-gray-600 dark:text-gray-400 mr-2">Active filters:</span>
          <span v-if="searchQuery" class="inline-flex items-center gap-1 px-3 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300 rounded-full text-sm">
            Search: "{{ searchQuery }}"
            <button @click="searchQuery = ''" class="hover:text-teal-600">
              <XIcon class="w-3 h-3" />
            </button>
          </span>
          <span v-if="selectedStatus" class="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm">
            Status: {{ selectedStatus }}
            <button @click="selectedStatus = ''" class="hover:text-blue-600">
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
        <div class="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl shadow-lg p-6 text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-teal-100 text-sm font-medium">Total Librarians</p>
              <p class="text-3xl font-bold">{{ filteredLibrarians.length }}</p>
              <p class="text-teal-200 text-xs mt-1">{{ librarians.length }} total</p>
            </div>
            <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <UserCheckIcon class="w-6 h-6" />
            </div>
          </div>
        </div>
        
        <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg p-6 text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-green-100 text-sm font-medium">Active Staff</p>
              <p class="text-3xl font-bold">{{ getActiveLibrarians() }}</p>
              <p class="text-green-200 text-xs mt-1">Currently working</p>
            </div>
            <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <CheckCircleIcon class="w-6 h-6" />
            </div>
          </div>
        </div>
        
        <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-blue-100 text-sm font-medium">This Month</p>
              <p class="text-3xl font-bold">{{ getThisMonthLibrarians() }}</p>
              <p class="text-blue-200 text-xs mt-1">New hires</p>
            </div>
            <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <TrendingUpIcon class="w-6 h-6" />
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-purple-100 text-sm font-medium">Admin Access</p>
              <p class="text-3xl font-bold">{{ getAdminLibrarians() }}</p>
              <p class="text-purple-200 text-xs mt-1">With permissions</p>
            </div>
            <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <ShieldCheckIcon class="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      <!-- Results Summary -->
      <div v-if="filteredLibrarians.length > 0" class="mb-6">
        <p class="text-gray-600 dark:text-gray-400 text-sm">
          Showing {{ filteredLibrarians.length }} of {{ librarians.length }} librarians
          <span v-if="hasActiveFilters" class="text-teal-600 dark:text-teal-400">
            (filtered)
          </span>
        </p>
      </div>

      <!-- Enhanced Librarians Display -->
      <div v-if="filteredLibrarians.length > 0">
        <!-- Grid View -->
        <div v-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          <div
            v-for="librarian in paginatedLibrarians"
            :key="librarian.id"
            class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:border-teal-300 dark:hover:border-teal-600 transition-all duration-300 overflow-hidden group"
          >
            <!-- Card Header -->
            <div class="bg-gradient-to-r from-teal-50 via-cyan-50 to-blue-50 dark:from-gray-700 dark:via-gray-700 dark:to-gray-700 p-6 border-b border-gray-200 dark:border-gray-600">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                    <UserIcon class="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 class="font-bold text-lg text-gray-900 dark:text-white truncate max-w-32" :title="librarian.user.name">
                      {{ librarian.user.name }}
                    </h3>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      Librarian #{{ librarian.id }}
                    </p>
                  </div>
                </div>
                <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    @click="openModal('edit', librarian)"
                    class="p-2 text-teal-600 hover:bg-teal-100 dark:hover:bg-teal-900/30 rounded-lg transition-colors"
                    title="Edit librarian"
                  >
                    <EditIcon class="w-4 h-4" />
                  </button>
                  <button
                    @click="confirmDelete(librarian.id)"
                    class="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                    title="Delete librarian"
                  >
                    <TrashIcon class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <!-- Card Content -->
            <div class="p-6 space-y-4">
              <div class="flex items-start gap-3">
                <MailIcon class="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" />
                <div class="min-w-0 flex-1">
                  <p class="text-sm font-medium text-gray-900 dark:text-white truncate" :title="librarian.user.email">
                    {{ librarian.user.email }}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">Email Address</p>
                </div>
              </div>
              
              <div class="flex items-start gap-3">
                <CalendarIcon class="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div class="min-w-0 flex-1">
                  <p class="text-sm font-medium text-gray-900 dark:text-white">
                    {{ formatDate(librarian.created_at) }}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">Joined Date</p>
                </div>
              </div>
              
              <div class="flex items-start gap-3">
                <ShieldCheckIcon class="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                <div class="min-w-0 flex-1">
                  <p class="text-sm font-medium text-gray-900 dark:text-white">
                    {{ getLibrarianRole(librarian) }}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">Access Level</p>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <ActivityIcon class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div class="min-w-0 flex-1">
                  <p class="text-sm font-medium text-gray-900 dark:text-white">
                    {{ getLibrarianActivity(librarian) }}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">Recent Activity</p>
                </div>
              </div>
            </div>

            <!-- Card Footer -->
            <div class="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-600">
              <div class="flex items-center justify-between">
                <span 
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    getLibrarianStatus(librarian) === 'active' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                  ]"
                >
                  <div 
                    :class="[
                      'w-1.5 h-1.5 rounded-full mr-1.5',
                      getLibrarianStatus(librarian) === 'active' ? 'bg-green-400' : 'bg-gray-400'
                    ]"
                  ></div>
                  {{ getLibrarianStatus(librarian) === 'active' ? 'Active' : 'Inactive' }}
                </span>
                <div class="flex items-center gap-2">
                  <button
                    @click="openModal('edit', librarian)"
                    class="text-xs text-teal-600 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300 font-medium transition-colors"
                  >
                    Edit
                  </button>
                  <span class="text-gray-300 dark:text-gray-600">|</span>
                  <button
                    @click="confirmDelete(librarian.id)"
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
                    Librarian
                  </th>
                  <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Email
                  </th>
                  <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Role
                  </th>
                  <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Joined
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
                  v-for="librarian in paginatedLibrarians"
                  :key="librarian.id"
                  class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center">
                        <UserIcon class="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p class="text-sm font-medium text-gray-900 dark:text-white">
                          {{ librarian.user.name }}
                        </p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">
                          ID: {{ librarian.id }}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-2">
                      <MailIcon class="w-4 h-4 text-teal-500" />
                      <p class="text-sm text-gray-900 dark:text-white truncate max-w-48" :title="librarian.user.email">
                        {{ librarian.user.email }}
                      </p>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-2">
                      <ShieldCheckIcon class="w-4 h-4 text-purple-500" />
                      <p class="text-sm text-gray-900 dark:text-white">
                        {{ getLibrarianRole(librarian) }}
                      </p>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <p class="text-sm text-gray-900 dark:text-white">
                      {{ formatDate(librarian.created_at) }}
                    </p>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span 
                      :class="[
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        getLibrarianStatus(librarian) === 'active' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                      ]"
                    >
                      <div 
                        :class="[
                          'w-1.5 h-1.5 rounded-full mr-1.5',
                          getLibrarianStatus(librarian) === 'active' ? 'bg-green-400' : 'bg-gray-400'
                        ]"
                      ></div>
                      {{ getLibrarianStatus(librarian) === 'active' ? 'Active' : 'Inactive' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div class="flex items-center justify-end gap-2">
                      <button
                        @click="openModal('edit', librarian)"
                        class="text-teal-600 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300 p-1 rounded"
                        title="Edit librarian"
                      >
                        <EditIcon class="w-4 h-4" />
                      </button>
                      <button
                        @click="confirmDelete(librarian.id)"
                        class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 p-1 rounded"
                        title="Delete librarian"
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
            Showing {{ ((currentPage - 1) * itemsPerPage) + 1 }} to {{ Math.min(currentPage * itemsPerPage, filteredLibrarians.length) }} of {{ filteredLibrarians.length }} results
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
                    ? 'bg-teal-600 text-white'
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
          <UserCheckIcon class="w-16 h-16 text-gray-400" />
        </div>
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          {{ hasActiveFilters ? 'No matching librarians found' : 'No librarians yet' }}
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto text-lg">
          {{ hasActiveFilters 
            ? 'Try adjusting your search criteria or filters to find what you\'re looking for.' 
            : 'Start building your library team by adding your first librarian.' 
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
            class="px-8 py-3 bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 hover:from-teal-700 hover:via-cyan-700 hover:to-blue-700 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2 justify-center"
          >
            <PlusIcon class="w-5 h-5" />
            {{ hasActiveFilters ? 'Add New Librarian' : 'Add First Librarian' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Enhanced Add/Edit Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      @click.self="closeModal"
    >
      <div
        class="bg-white dark:bg-gray-800 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 scale-100 max-h-[90vh] overflow-y-auto"
        @click.stop
      >
        <!-- Modal Header -->
        <div class="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 px-6 py-6">
          <div class="flex items-center justify-between">
            <h3 class="text-xl font-bold text-white flex items-center gap-3">
              <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <UserCheckIcon class="w-6 h-6 text-white" />
              </div>
              {{ modalMode === "add" ? "Add New Librarian" : "Edit Librarian" }}
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
          @submit.prevent="modalMode === 'add' ? createLibrarian() : updateLibrarian()"
          class="p-6 space-y-6"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                <UserIcon class="w-5 h-5 inline mr-2 text-teal-500" />
                Full Name
              </label>
              <input
                v-model="formLibrarian.name"
                type="text"
                placeholder="Enter librarian's full name..."
                class="w-full px-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all shadow-sm"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                <MailIcon class="w-5 h-5 inline mr-2 text-blue-500" />
                Email Address
              </label>
              <input
                v-model="formLibrarian.email"
                type="email"
                placeholder="Enter email address..."
                class="w-full px-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all shadow-sm"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                <ShieldCheckIcon class="w-5 h-5 inline mr-2 text-purple-500" />
                Access Level
              </label>
              <select
                v-model="formLibrarian.role"
                class="w-full px-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all shadow-sm"
              >
                <option value="librarian">Librarian</option>
                <option value="senior_librarian">Senior Librarian</option>
                <option value="admin">Administrator</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                <ActivityIcon class="w-5 h-5 inline mr-2 text-green-500" />
                Status
              </label>
              <select
                v-model="formLibrarian.status"
                class="w-full px-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all shadow-sm"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
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
              class="px-8 py-3 bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 hover:from-teal-700 hover:via-cyan-700 hover:to-blue-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              {{ modalMode === "add" ? "Add Librarian" : "Update Librarian" }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Enhanced Delete Confirmation Modal -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      @click.self="closeDeleteModal"
    >
      <div
        class="bg-white dark:bg-gray-800 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 scale-100"
        @click.stop
      >
        <!-- Delete Modal Header -->
        <div class="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <TrashIcon class="w-6 h-6 text-white" />
            </div>
            <h3 class="text-xl font-bold text-white">Confirm Deletion</h3>
          </div>
        </div>

        <!-- Delete Modal Content -->
        <div class="p-6">
          <p class="text-gray-700 dark:text-gray-300 mb-6">
            Are you sure you want to delete this librarian? This action cannot be undone and will remove all associated access permissions.
          </p>
          <div class="flex items-center justify-end gap-3">
            <button
              @click="closeDeleteModal"
              class="px-6 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              @click="deleteLibrarian(selectedLibrarianId)"
              class="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Delete Librarian
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { 
  UserCheckIcon, 
  UserIcon,
  PlusIcon, 
  SearchIcon, 
  XIcon,
  EditIcon,
  TrashIcon,
  GridIcon,
  ListIcon,
  MailIcon,
  CalendarIcon,
  ShieldCheckIcon,
  ActivityIcon,
  CheckCircleIcon,
  TrendingUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from 'lucide-vue-next'
import api from "../plugins/axios"

// Reactive data
const librarians = ref([])
const showModal = ref(false)
const showDeleteModal = ref(false)
const selectedLibrarianId = ref(null)
const modalMode = ref('add')
const formLibrarian = ref({
  id: null,
  name: '',
  email: '',
  role: 'librarian',
  status: 'active'
})

// Search and filter states
const searchQuery = ref('')
const selectedStatus = ref('')
const sortBy = ref('name')
const viewMode = ref('grid')

// Pagination
const currentPage = ref(1)
const itemsPerPage = ref(12)

// Computed properties
const filteredLibrarians = computed(() => {
  let filtered = librarians.value

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(librarian => 
      librarian.user.name.toLowerCase().includes(query) ||
      librarian.user.email.toLowerCase().includes(query)
    )
  }

  // Status filter
  if (selectedStatus.value) {
    filtered = filtered.filter(librarian => getLibrarianStatus(librarian) === selectedStatus.value)
  }

  // Sort
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'name':
        return a.user.name.localeCompare(b.user.name)
      case 'email':
        return a.user.email.localeCompare(b.user.email)
      case 'created_at':
        return new Date(b.created_at || 0) - new Date(a.created_at || 0)
      default:
        return 0
    }
  })

  return filtered
})

const paginatedLibrarians = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredLibrarians.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredLibrarians.value.length / itemsPerPage.value)
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
  return searchQuery.value || selectedStatus.value
})

// Methods
const fetchLibrarians = async () => {
  try {
    const res = await api.get("/librarians")
    librarians.value = res.data
  } catch (err) {
    console.error(err)
  }
}

const openModal = (mode, librarian = null) => {
  modalMode.value = mode
  showModal.value = true
  if (mode === 'edit' && librarian) {
    formLibrarian.value = {
      id: librarian.id,
      name: librarian.user.name,
      email: librarian.user.email,
      role: librarian.role || 'librarian',
      status: librarian.status || 'active'
    }
  } else {
    formLibrarian.value = {
      id: null,
      name: '',
      email: '',
      role: 'librarian',
      status: 'active'
    }
  }
}

const closeModal = () => {
  showModal.value = false
}

const confirmDelete = (id) => {
  selectedLibrarianId.value = id
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  selectedLibrarianId.value = null
}

const createLibrarian = async () => {
  try {
    await api.post("/librarians", formLibrarian.value)
    await fetchLibrarians()
    closeModal()
  } catch (err) {
    console.error("Create Error:", err)
  }
}

const updateLibrarian = async () => {
  try {
    await api.put(`/librarians/${formLibrarian.value.id}`, formLibrarian.value)
    await fetchLibrarians()
    closeModal()
  } catch (err) {
    console.error("Update Error:", err)
  }
}

const deleteLibrarian = async (id) => {
  try {
    await api.delete(`/librarians/${id}`)
    await fetchLibrarians()
    closeDeleteModal()
  } catch (err) {
    console.error("Delete Error:", err)
  }
}

const clearSearch = () => {
  searchQuery.value = ''
}

const clearAllFilters = () => {
  searchQuery.value = ''
  selectedStatus.value = ''
  currentPage.value = 1
}

const toggleView = () => {
  viewMode.value = viewMode.value === 'grid' ? 'list' : 'grid'
}

const getLibrarianStatus = (librarian) => {
  // This could be based on actual status field or calculated
  return librarian.status || 'active'
}

const getLibrarianRole = (librarian) => {
  const role = librarian.role || 'librarian'
  return role.charAt(0).toUpperCase() + role.slice(1).replace('_', ' ')
}

const getLibrarianActivity = (librarian) => {
  // Mock activity - in real app this would come from API
  const activities = ['Today', '2 days ago', '1 week ago', '2 weeks ago']
  return activities[Math.floor(Math.random() * activities.length)]
}

const getActiveLibrarians = () => {
  return librarians.value.filter(librarian => getLibrarianStatus(librarian) === 'active').length
}

const getAdminLibrarians = () => {
  return librarians.value.filter(librarian => (librarian.role || 'librarian').includes('admin')).length
}

const getThisMonthLibrarians = () => {
  const now = new Date()
  const thisMonth = librarians.value.filter(librarian => {
    if (!librarian.created_at) return false
    const librarianDate = new Date(librarian.created_at)
    return librarianDate.getMonth() === now.getMonth() && 
           librarianDate.getFullYear() === now.getFullYear()
  })
  return thisMonth.length
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Lifecycle
onMounted(() => {
  fetchLibrarians()
})
</script>