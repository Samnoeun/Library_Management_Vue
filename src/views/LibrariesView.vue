<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50 to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 p-4 sm:p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Enhanced Header Section -->
      <div class="mb-8">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div class="space-y-2">
            <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <div class="w-12 h-12 bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                <BuildingIcon class="w-7 h-7 text-white" />
              </div>
              <span class="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                Libraries Network
              </span>
            </h1>
            <p class="text-gray-600 dark:text-gray-400 text-lg">
              Manage your library locations and facilities
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
              class="px-6 py-2.5 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 hover:from-indigo-700 hover:via-blue-700 hover:to-cyan-700 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
            >
              <PlusIcon class="w-5 h-5" />
              <span class="hidden sm:inline">Add New</span> Library
            </button>
          </div>
        </div>
      </div>

      <!-- Enhanced Search Section -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
        <div class="flex flex-col sm:flex-row gap-4">
          <!-- Search Input -->
          <div class="flex-1">
            <div class="relative">
              <SearchIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search libraries by name or location..."
                class="w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
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

          <!-- Sort Options -->
          <div class="sm:w-48">
            <select
              v-model="sortBy"
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="name">Sort by Name</option>
              <option value="location">Sort by Location</option>
              <option value="created_at">Sort by Date Added</option>
            </select>
          </div>
        </div>

        <!-- Filter Tags -->
        <div v-if="searchQuery" class="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <span class="text-sm text-gray-600 dark:text-gray-400 mr-2">Active filters:</span>
          <span class="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 rounded-full text-sm">
            Search: "{{ searchQuery }}"
            <button @click="searchQuery = ''" class="hover:text-indigo-600">
              <XIcon class="w-3 h-3" />
            </button>
          </span>
        </div>
      </div>

      <!-- Enhanced Stats Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <div class="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl shadow-lg p-6 text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-indigo-100 text-sm font-medium">Total Libraries</p>
              <p class="text-3xl font-bold">{{ filteredLibraries.length }}</p>
              <p class="text-indigo-200 text-xs mt-1">{{ libraries.length }} total</p>
            </div>
            <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <BuildingIcon class="w-6 h-6" />
            </div>
          </div>
        </div>
        
        <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-blue-100 text-sm font-medium">Unique Locations</p>
              <p class="text-3xl font-bold">{{ getUniqueLocationsCount() }}</p>
              <p class="text-blue-200 text-xs mt-1">Different cities</p>
            </div>
            <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <MapPinIcon class="w-6 h-6" />
            </div>
          </div>
        </div>
        
        <div class="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl shadow-lg p-6 text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-cyan-100 text-sm font-medium">This Month</p>
              <p class="text-3xl font-bold">{{ getThisMonthLibraries() }}</p>
              <p class="text-cyan-200 text-xs mt-1">New libraries</p>
            </div>
            <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <TrendingUpIcon class="w-6 h-6" />
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-purple-100 text-sm font-medium">Network Coverage</p>
              <p class="text-3xl font-bold">{{ getNetworkCoverage() }}%</p>
              <p class="text-purple-200 text-xs mt-1">Geographic spread</p>
            </div>
            <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <GlobeIcon class="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex items-center justify-center py-16">
        <div class="flex items-center gap-3">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <p class="text-gray-600 dark:text-gray-400">Loading libraries...</p>
        </div>
      </div>

      <!-- Results Summary -->
      <div v-else-if="filteredLibraries.length > 0" class="mb-6">
        <p class="text-gray-600 dark:text-gray-400 text-sm">
          Showing {{ filteredLibraries.length }} of {{ libraries.length }} libraries
          <span v-if="searchQuery" class="text-indigo-600 dark:text-indigo-400">
            (filtered)
          </span>
        </p>
      </div>

      <!-- Enhanced Libraries Display -->
      <div v-if="!loading && filteredLibraries.length > 0">
        <!-- Grid View -->
        <div v-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          <div
            v-for="library in paginatedLibraries"
            :key="library.id"
            class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-300 overflow-hidden group"
          >
            <!-- Card Header -->
            <div class="bg-gradient-to-r from-indigo-50 via-blue-50 to-cyan-50 dark:from-gray-700 dark:via-gray-700 dark:to-gray-700 p-6 border-b border-gray-200 dark:border-gray-600">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                    <BuildingIcon class="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 class="font-bold text-lg text-gray-900 dark:text-white truncate max-w-32" :title="library.name">
                      {{ library.name }}
                    </h3>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      Library #{{ library.id }}
                    </p>
                  </div>
                </div>
                <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    @click="openModal('edit', library)"
                    class="p-2 text-indigo-600 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 rounded-lg transition-colors"
                    title="Edit library"
                  >
                    <EditIcon class="w-4 h-4" />
                  </button>
                  <button
                    @click="confirmDelete(library.id)"
                    class="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                    title="Delete library"
                  >
                    <TrashIcon class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <!-- Card Content -->
            <div class="p-6 space-y-4">
              <div class="flex items-start gap-3">
                <MapPinIcon class="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" />
                <div class="min-w-0 flex-1">
                  <p class="text-sm font-medium text-gray-900 dark:text-white truncate" :title="library.location">
                    {{ library.location }}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">Location</p>
                </div>
              </div>
              
              <div class="flex items-start gap-3">
                <CalendarIcon class="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div class="min-w-0 flex-1">
                  <p class="text-sm font-medium text-gray-900 dark:text-white">
                    {{ formatDate(library.created_at) }}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">Established</p>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <UsersIcon class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div class="min-w-0 flex-1">
                  <p class="text-sm font-medium text-gray-900 dark:text-white">
                    {{ getLibraryMembersCount(library.id) }} members
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">Active Members</p>
                </div>
              </div>
            </div>

            <!-- Card Footer -->
            <div class="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-600">
              <div class="flex items-center justify-between">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  <div class="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5"></div>
                  Active
                </span>
                <div class="flex items-center gap-2">
                  <button
                    @click="openModal('edit', library)"
                    class="text-xs text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium transition-colors"
                  >
                    Edit
                  </button>
                  <span class="text-gray-300 dark:text-gray-600">|</span>
                  <button
                    @click="confirmDelete(library.id)"
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
                    Library
                  </th>
                  <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Location
                  </th>
                  <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Members
                  </th>
                  <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Established
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
                  v-for="library in paginatedLibraries"
                  :key="library.id"
                  class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center">
                        <BuildingIcon class="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p class="text-sm font-medium text-gray-900 dark:text-white">
                          {{ library.name }}
                        </p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">
                          ID: {{ library.id }}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-2">
                      <MapPinIcon class="w-4 h-4 text-indigo-500" />
                      <p class="text-sm text-gray-900 dark:text-white truncate max-w-48" :title="library.location">
                        {{ library.location }}
                      </p>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-2">
                      <UsersIcon class="w-4 h-4 text-green-500" />
                      <p class="text-sm text-gray-900 dark:text-white">
                        {{ getLibraryMembersCount(library.id) }}
                      </p>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <p class="text-sm text-gray-900 dark:text-white">
                      {{ formatDate(library.created_at) }}
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
                        @click="openModal('edit', library)"
                        class="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 p-1 rounded"
                        title="Edit library"
                      >
                        <EditIcon class="w-4 h-4" />
                      </button>
                      <button
                        @click="confirmDelete(library.id)"
                        class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 p-1 rounded"
                        title="Delete library"
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
            Showing {{ ((currentPage - 1) * itemsPerPage) + 1 }} to {{ Math.min(currentPage * itemsPerPage, filteredLibraries.length) }} of {{ filteredLibraries.length }} results
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
                    ? 'bg-indigo-600 text-white'
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
      <div v-else-if="!loading" class="text-center py-16">
        <div class="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
          <BuildingIcon class="w-16 h-16 text-gray-400" />
        </div>
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          {{ searchQuery ? 'No matching libraries found' : 'No libraries yet' }}
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto text-lg">
          {{ searchQuery 
            ? 'Try adjusting your search to find what you\'re looking for.' 
            : 'Start building your library network by adding your first library location.' 
          }}
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            v-if="searchQuery"
            @click="clearSearch"
            class="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 justify-center"
          >
            <XIcon class="w-5 h-5" />
            Clear Search
          </button>
          <button
            @click="openModal('add')"
            class="px-8 py-3 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 hover:from-indigo-700 hover:via-blue-700 hover:to-cyan-700 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2 justify-center"
          >
            <PlusIcon class="w-5 h-5" />
            {{ searchQuery ? 'Add New Library' : 'Add First Library' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Enhanced Add/Edit Modal -->
    <transition name="modal">
      <div
        v-if="showModal"
        class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        @click.self="closeModal"
      >
        <div
          class="bg-white dark:bg-gray-800 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 scale-100"
          @click.stop
        >
          <!-- Modal Header -->
          <div class="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 px-6 py-6">
            <div class="flex items-center justify-between">
              <h3 class="text-xl font-bold text-white flex items-center gap-3">
                <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <BuildingIcon class="w-6 h-6 text-white" />
                </div>
                {{ modalMode === "add" ? "Add New Library" : "Edit Library" }}
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
            @submit.prevent="modalMode === 'add' ? createLibrary() : updateLibrary()"
            class="p-6 space-y-6"
          >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  <BuildingIcon class="w-5 h-5 inline mr-2 text-indigo-500" />
                  Library Name
                </label>
                <input
                  v-model="formLibrary.name"
                  type="text"
                  placeholder="Enter library name..."
                  class="w-full px-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm"
                  required
                  aria-label="Library Name"
                />
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  <MapPinIcon class="w-5 h-5 inline mr-2 text-blue-500" />
                  Location
                </label>
                <input
                  v-model="formLibrary.location"
                  type="text"
                  placeholder="Enter location address..."
                  class="w-full px-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm"
                  required
                  aria-label="Location"
                />
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
                class="px-8 py-3 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 hover:from-indigo-700 hover:via-blue-700 hover:to-cyan-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                {{ modalMode === "add" ? "Add Library" : "Update Library" }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>

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
            Are you sure you want to delete this library? This action cannot be undone and may affect associated members and books.
          </p>
          <div class="flex items-center justify-end gap-3">
            <button
              @click="closeDeleteModal"
              class="px-6 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              @click="deleteLibrary(selectedLibraryId)"
              class="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Delete Library
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
  BuildingIcon, 
  PlusIcon, 
  SearchIcon, 
  XIcon,
  EditIcon,
  TrashIcon,
  GridIcon,
  ListIcon,
  MapPinIcon,
  CalendarIcon,
  UsersIcon,
  TrendingUpIcon,
  GlobeIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from 'lucide-vue-next'
import api from "../plugins/axios"

// Reactive data
const libraries = ref([])
const showModal = ref(false)
const showDeleteModal = ref(false)
const selectedLibraryId = ref(null)
const loading = ref(true)
const modalMode = ref('add')
const formLibrary = ref({
  id: null,
  name: '',
  location: ''
})

// Search and filter states
const searchQuery = ref('')
const sortBy = ref('name')
const viewMode = ref('grid')

// Pagination
const currentPage = ref(1)
const itemsPerPage = ref(12)

// Computed properties
const filteredLibraries = computed(() => {
  let filtered = libraries.value

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(library => 
      library.name.toLowerCase().includes(query) ||
      library.location.toLowerCase().includes(query)
    )
  }

  // Sort
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'location':
        return a.location.localeCompare(b.location)
      case 'created_at':
        return new Date(b.created_at || 0) - new Date(a.created_at || 0)
      default:
        return 0
    }
  })

  return filtered
})

const paginatedLibraries = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredLibraries.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredLibraries.value.length / itemsPerPage.value)
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

// Methods
const fetchLibraries = async () => {
  loading.value = true
  try {
    const response = await api.get("/libraries")
    libraries.value = response.data
  } catch (err) {
    console.error(err)
    // You could add a toast notification here instead of alert
  } finally {
    loading.value = false
  }
}

const openModal = (mode, library = null) => {
  modalMode.value = mode
  showModal.value = true
  if (mode === 'edit' && library) {
    formLibrary.value = { ...library }
  } else {
    formLibrary.value = { id: null, name: '', location: '' }
  }
}

const closeModal = () => {
  showModal.value = false
}

const confirmDelete = (id) => {
  selectedLibraryId.value = id
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  selectedLibraryId.value = null
}

const createLibrary = async () => {
  try {
    await api.post("/libraries", formLibrary.value)
    await fetchLibraries()
    closeModal()
  } catch (err) {
    console.error("Create Error:", err)
    // You could add a toast notification here instead of alert
  }
}

const updateLibrary = async () => {
  try {
    await api.put(`/libraries/${formLibrary.value.id}`, formLibrary.value)
    await fetchLibraries()
    closeModal()
  } catch (err) {
    console.error("Update Error:", err)
    // You could add a toast notification here instead of alert
  }
}

const deleteLibrary = async (id) => {
  try {
    await api.delete(`/libraries/${id}`)
    await fetchLibraries()
    closeDeleteModal()
  } catch (err) {
    console.error("Delete Error:", err)
    // You could add a toast notification here instead of alert
  }
}

const clearSearch = () => {
  searchQuery.value = ''
}

const toggleView = () => {
  viewMode.value = viewMode.value === 'grid' ? 'list' : 'grid'
}

const getUniqueLocationsCount = () => {
  const uniqueLocations = new Set(libraries.value.map(lib => lib.location.toLowerCase()))
  return uniqueLocations.size
}

const getThisMonthLibraries = () => {
  const now = new Date()
  const thisMonth = libraries.value.filter(library => {
    if (!library.created_at) return false
    const libraryDate = new Date(library.created_at)
    return libraryDate.getMonth() === now.getMonth() && 
           libraryDate.getFullYear() === now.getFullYear()
  })
  return thisMonth.length
}

const getNetworkCoverage = () => {
  // This is a mock calculation - you might want to implement actual geographic coverage logic
  const uniqueLocations = getUniqueLocationsCount()
  return Math.min(Math.round((uniqueLocations / 10) * 100), 100) // Assuming 10 locations = 100% coverage
}

const getLibraryMembersCount = (libraryId) => {
  // This would typically come from an API call or be included in the library data
  // For now, returning a mock number
  return Math.floor(Math.random() * 500) + 50
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
  fetchLibraries()
})
</script>

<style scoped>
.modal-enter-active, .modal-leave-active {
  transition: all 0.3s ease;
}
.modal-enter-from, .modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
