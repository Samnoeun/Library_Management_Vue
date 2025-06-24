<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-emerald-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 p-4 sm:p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Enhanced Header Section -->
      <div class="mb-8">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div class="space-y-2">
            <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <div class="w-12 h-12 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                <UsersIcon class="w-7 h-7 text-white" />
              </div>
              <span class="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Members Hub
              </span>
            </h1>
            <p class="text-gray-600 dark:text-gray-400 text-lg">
              Manage library members and their information
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
              class="px-6 py-2.5 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 hover:from-green-700 hover:via-emerald-700 hover:to-teal-700 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
            >
              <PlusIcon class="w-5 h-5" />
              <span class="hidden sm:inline">Add New</span> Member
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
                placeholder="Search members by name or email..."
                class="w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
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

          <!-- Library Filter -->
          <div>
            <select
              v-model="selectedLibrary"
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">All Libraries</option>
              <option v-for="library in uniqueLibraries" :key="library.id" :value="library.id">
                {{ library.name }}
              </option>
            </select>
          </div>

          <!-- Sort Options -->
          <div>
            <select
              v-model="sortBy"
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="name">Sort by Name</option>
              <option value="email">Sort by Email</option>
              <option value="library">Sort by Library</option>
              <option value="created_at">Sort by Join Date</option>
            </select>
          </div>
        </div>

        <!-- Filter Tags -->
        <div v-if="hasActiveFilters" class="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <span class="text-sm text-gray-600 dark:text-gray-400 mr-2">Active filters:</span>
          <span v-if="searchQuery" class="inline-flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm">
            Search: "{{ searchQuery }}"
            <button @click="searchQuery = ''" class="hover:text-green-600">
              <XIcon class="w-3 h-3" />
            </button>
          </span>
          <span v-if="selectedLibrary" class="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm">
            Library: {{ getLibraryName(selectedLibrary) }}
            <button @click="selectedLibrary = ''" class="hover:text-blue-600">
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
        <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg p-6 text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-green-100 text-sm font-medium">Total Members</p>
              <p class="text-3xl font-bold">{{ filteredMembers.length }}</p>
              <p class="text-green-200 text-xs mt-1">{{ members.length }} total</p>
            </div>
            <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <UsersIcon class="w-6 h-6" />
            </div>
          </div>
        </div>
        
        <div class="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-lg p-6 text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-emerald-100 text-sm font-medium">Active Libraries</p>
              <p class="text-3xl font-bold">{{ uniqueLibraries.length }}</p>
              <p class="text-emerald-200 text-xs mt-1">With members</p>
            </div>
            <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <BuildingIcon class="w-6 h-6" />
            </div>
          </div>
        </div>
        
        <div class="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl shadow-lg p-6 text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-teal-100 text-sm font-medium">This Month</p>
              <p class="text-3xl font-bold">{{ getThisMonthMembers() }}</p>
              <p class="text-teal-200 text-xs mt-1">New members</p>
            </div>
            <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <TrendingUpIcon class="w-6 h-6" />
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl shadow-lg p-6 text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-cyan-100 text-sm font-medium">Average per Library</p>
              <p class="text-3xl font-bold">{{ getAverageMembersPerLibrary() }}</p>
              <p class="text-cyan-200 text-xs mt-1">Members</p>
            </div>
            <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <BarChartIcon class="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      <!-- Results Summary -->
      <div v-if="filteredMembers.length > 0" class="mb-6">
        <p class="text-gray-600 dark:text-gray-400 text-sm">
          Showing {{ filteredMembers.length }} of {{ members.length }} members
          <span v-if="hasActiveFilters" class="text-green-600 dark:text-green-400">
            (filtered)
          </span>
        </p>
      </div>

      <!-- Enhanced Members Display -->
      <div v-if="filteredMembers.length > 0">
        <!-- Grid View -->
        <div v-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          <div
            v-for="member in paginatedMembers"
            :key="member.id"
            class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:border-green-300 dark:hover:border-green-600 transition-all duration-300 overflow-hidden group"
          >
            <!-- Card Header -->
            <div class="bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 dark:from-gray-700 dark:via-gray-700 dark:to-gray-700 p-6 border-b border-gray-200 dark:border-gray-600">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                    <UserIcon class="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 class="font-bold text-lg text-gray-900 dark:text-white truncate max-w-32" :title="member.user.name">
                      {{ member.user.name }}
                    </h3>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      Member #{{ member.id }}
                    </p>
                  </div>
                </div>
                <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    @click="openModal('edit', member)"
                    class="p-2 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-colors"
                    title="Edit member"
                  >
                    <EditIcon class="w-4 h-4" />
                  </button>
                  <button
                    @click="confirmDelete(member.id)"
                    class="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                    title="Delete member"
                  >
                    <TrashIcon class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <!-- Card Content -->
            <div class="p-6 space-y-4">
              <div class="flex items-start gap-3">
                <MailIcon class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div class="min-w-0 flex-1">
                  <p class="text-sm font-medium text-gray-900 dark:text-white truncate" :title="member.user.email">
                    {{ member.user.email }}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">Email Address</p>
                </div>
              </div>
              
              <div class="flex items-start gap-3">
                <BuildingIcon class="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div class="min-w-0 flex-1">
                  <p class="text-sm font-medium text-gray-900 dark:text-white truncate" :title="member.library.name">
                    {{ member.library.name }}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">{{ member.library.location }}</p>
                </div>
              </div>
              
              <div class="flex items-start gap-3">
                <CalendarIcon class="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                <div class="min-w-0 flex-1">
                  <p class="text-sm font-medium text-gray-900 dark:text-white">
                    {{ formatDate(member.created_at) }}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">Member Since</p>
                </div>
              </div>
            </div>

            <!-- Card Footer -->
            <div class="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-600">
              <div class="flex items-center justify-between">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  <div class="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5"></div>
                  Active Member
                </span>
                <div class="flex items-center gap-2">
                  <button
                    @click="openModal('edit', member)"
                    class="text-xs text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 font-medium transition-colors"
                  >
                    Edit
                  </button>
                  <span class="text-gray-300 dark:text-gray-600">|</span>
                  <button
                    @click="confirmDelete(member.id)"
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
                    Member
                  </th>
                  <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Email
                  </th>
                  <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Library
                  </th>
                  <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Location
                  </th>
                  <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Member Since
                  </th>
                  <th class="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <tr
                  v-for="member in paginatedMembers"
                  :key="member.id"
                  class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                        <UserIcon class="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p class="text-sm font-medium text-gray-900 dark:text-white">
                          {{ member.user.name }}
                        </p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">
                          ID: {{ member.id }}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-2">
                      <MailIcon class="w-4 h-4 text-green-500" />
                      <p class="text-sm text-gray-900 dark:text-white truncate max-w-48" :title="member.user.email">
                        {{ member.user.email }}
                      </p>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-2">
                      <BuildingIcon class="w-4 h-4 text-blue-500" />
                      <p class="text-sm text-gray-900 dark:text-white truncate max-w-32" :title="member.library.name">
                        {{ member.library.name }}
                      </p>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <p class="text-sm text-gray-900 dark:text-white truncate max-w-32" :title="member.library.location">
                      {{ member.library.location }}
                    </p>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <p class="text-sm text-gray-900 dark:text-white">
                      {{ formatDate(member.created_at) }}
                    </p>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div class="flex items-center justify-end gap-2">
                      <button
                        @click="openModal('edit', member)"
                        class="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 p-1 rounded"
                        title="Edit member"
                      >
                        <EditIcon class="w-4 h-4" />
                      </button>
                      <button
                        @click="confirmDelete(member.id)"
                        class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 p-1 rounded"
                        title="Delete member"
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
            Showing {{ ((currentPage - 1) * itemsPerPage) + 1 }} to {{ Math.min(currentPage * itemsPerPage, filteredMembers.length) }} of {{ filteredMembers.length }} results
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
                    ? 'bg-green-600 text-white'
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
          <UsersIcon class="w-16 h-16 text-gray-400" />
        </div>
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          {{ hasActiveFilters ? 'No matching members found' : 'No members yet' }}
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto text-lg">
          {{ hasActiveFilters 
            ? 'Try adjusting your search criteria or filters to find what you\'re looking for.' 
            : 'Start building your member community by adding your first library member.' 
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
            class="px-8 py-3 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 hover:from-green-700 hover:via-emerald-700 hover:to-teal-700 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2 justify-center"
          >
            <PlusIcon class="w-5 h-5" />
            {{ hasActiveFilters ? 'Add New Member' : 'Add First Member' }}
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
        <div class="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 px-6 py-6">
          <div class="flex items-center justify-between">
            <h3 class="text-xl font-bold text-white flex items-center gap-3">
              <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <UsersIcon class="w-6 h-6 text-white" />
              </div>
              {{ modalMode === "add" ? "Add New Member" : "Edit Member" }}
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
          @submit.prevent="modalMode === 'add' ? createMember() : updateMember()"
          class="p-6 space-y-6"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                <UserIcon class="w-5 h-5 inline mr-2 text-green-500" />
                Full Name
              </label>
              <input
                v-model="formMember.name"
                type="text"
                placeholder="Enter member's full name..."
                class="w-full px-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all shadow-sm"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                <MailIcon class="w-5 h-5 inline mr-2 text-blue-500" />
                Email Address
              </label>
              <input
                v-model="formMember.email"
                type="email"
                placeholder="Enter email address..."
                class="w-full px-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all shadow-sm"
                required
              />
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                <BuildingIcon class="w-5 h-5 inline mr-2 text-purple-500" />
                Library
              </label>
              <select
                v-model="formMember.library_id"
                class="w-full px-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all shadow-sm"
                required
              >
                <option value="" disabled>Choose a library...</option>
                <option v-for="library in libraries" :key="library.id" :value="library.id">
                  {{ library.name }} - {{ library.location }}
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
              class="px-8 py-3 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 hover:from-green-700 hover:via-emerald-700 hover:to-teal-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              {{ modalMode === "add" ? "Add Member" : "Update Member" }}
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
            Are you sure you want to delete this member? This action cannot be undone and will remove all associated data.
          </p>
          <div class="flex items-center justify-end gap-3">
            <button
              @click="closeDeleteModal"
              class="px-6 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              @click="deleteMember(selectedMemberId)"
              class="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Delete Member
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
  UsersIcon, 
  UserIcon,
  PlusIcon, 
  SearchIcon, 
  XIcon,
  EditIcon,
  TrashIcon,
  GridIcon,
  ListIcon,
  MailIcon,
  BuildingIcon,
  CalendarIcon,
  TrendingUpIcon,
  BarChartIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from 'lucide-vue-next'
import api from "../plugins/axios"

// Reactive data
const members = ref([])
const libraries = ref([])
const showModal = ref(false)
const showDeleteModal = ref(false)
const selectedMemberId = ref(null)
const modalMode = ref('add')
const formMember = ref({
  id: null,
  name: '',
  email: '',
  library_id: null
})

// Search and filter states
const searchQuery = ref('')
const selectedLibrary = ref('')
const sortBy = ref('name')
const viewMode = ref('grid')

// Pagination
const currentPage = ref(1)
const itemsPerPage = ref(12)

// Computed properties
const filteredMembers = computed(() => {
  let filtered = members.value

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(member => 
      member.user.name.toLowerCase().includes(query) ||
      member.user.email.toLowerCase().includes(query)
    )
  }

  // Library filter
  if (selectedLibrary.value) {
    filtered = filtered.filter(member => member.library.id == selectedLibrary.value)
  }

  // Sort
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'name':
        return a.user.name.localeCompare(b.user.name)
      case 'email':
        return a.user.email.localeCompare(b.user.email)
      case 'library':
        return a.library.name.localeCompare(b.library.name)
      case 'created_at':
        return new Date(b.created_at || 0) - new Date(a.created_at || 0)
      default:
        return 0
    }
  })

  return filtered
})

const paginatedMembers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredMembers.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredMembers.value.length / itemsPerPage.value)
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

const uniqueLibraries = computed(() => {
  const libraryMap = new Map()
  members.value.forEach(member => {
    if (member.library && !libraryMap.has(member.library.id)) {
      libraryMap.set(member.library.id, member.library)
    }
  })
  return Array.from(libraryMap.values())
})

const hasActiveFilters = computed(() => {
  return searchQuery.value || selectedLibrary.value
})

// Methods
const fetchMembers = async () => {
  try {
    const res = await api.get("/members")
    members.value = res.data
  } catch (err) {
    console.error(err)
  }
}

const fetchLibraries = async () => {
  try {
    const res = await api.get("/libraries")
    libraries.value = res.data
  } catch (err) {
    console.error(err)
  }
}

const openModal = (mode, member = null) => {
  modalMode.value = mode
  showModal.value = true
  if (mode === 'edit' && member) {
    formMember.value = {
      id: member.id,
      name: member.user.name,
      email: member.user.email,
      library_id: member.library.id
    }
  } else {
    formMember.value = {
      id: null,
      name: '',
      email: '',
      library_id: null
    }
  }
}

const closeModal = () => {
  showModal.value = false
}

const confirmDelete = (id) => {
  selectedMemberId.value = id
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  selectedMemberId.value = null
}

const createMember = async () => {
  try {
    await api.post("/members", formMember.value)
    await fetchMembers()
    closeModal()
  } catch (err) {
    console.error("Create Error:", err)
  }
}

const updateMember = async () => {
  try {
    await api.put(`/members/${formMember.value.id}`, formMember.value)
    await fetchMembers()
    closeModal()
  } catch (err) {
    console.error("Update Error:", err)
  }
}

const deleteMember = async (id) => {
  try {
    await api.delete(`/members/${id}`)
    await fetchMembers()
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
  selectedLibrary.value = ''
  currentPage.value = 1
}

const toggleView = () => {
  viewMode.value = viewMode.value === 'grid' ? 'list' : 'grid'
}

const getLibraryName = (libraryId) => {
  const library = uniqueLibraries.value.find(lib => lib.id == libraryId)
  return library ? library.name : ''
}

const getThisMonthMembers = () => {
  const now = new Date()
  const thisMonth = members.value.filter(member => {
    if (!member.created_at) return false
    const memberDate = new Date(member.created_at)
    return memberDate.getMonth() === now.getMonth() && 
           memberDate.getFullYear() === now.getFullYear()
  })
  return thisMonth.length
}

const getAverageMembersPerLibrary = () => {
  if (uniqueLibraries.value.length === 0) return 0
  return Math.round(members.value.length / uniqueLibraries.value.length)
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
  fetchMembers()
  fetchLibraries()
})
</script>
