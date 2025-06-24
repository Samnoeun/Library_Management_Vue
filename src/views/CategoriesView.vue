<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 p-4 sm:p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Enhanced Header Section -->
      <div class="mb-8">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div class="space-y-2">
            <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <div class="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg">
                <FolderIcon class="w-7 h-7 text-white" />
              </div>
              <span class="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Categories Hub
              </span>
            </h1>
            <p class="text-gray-600 dark:text-gray-400 text-lg">
              Organize your book collection by categories
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
              class="px-6 py-2.5 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:from-purple-700 hover:via-pink-700 hover:to-rose-700 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
            >
              <PlusIcon class="w-5 h-5" />
              <span class="hidden sm:inline">Add New</span> Category
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
                placeholder="Search categories..."
                class="w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
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
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="name">Sort by Name</option>
              <option value="books_count">Sort by Book Count</option>
              <option value="created_at">Sort by Date Created</option>
            </select>
          </div>
        </div>

        <!-- Filter Tags -->
        <div v-if="searchQuery" class="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <span class="text-sm text-gray-600 dark:text-gray-400 mr-2">Active filters:</span>
          <span class="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm">
            Search: "{{ searchQuery }}"
            <button @click="searchQuery = ''" class="hover:text-purple-600">
              <XIcon class="w-3 h-3" />
            </button>
          </span>
        </div>
      </div>

      <!-- Enhanced Stats Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <div class="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-purple-100 text-sm font-medium">Total Categories</p>
              <p class="text-3xl font-bold">{{ filteredCategories.length }}</p>
              <p class="text-purple-200 text-xs mt-1">{{ categories.length }} total</p>
            </div>
            <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <FolderIcon class="w-6 h-6" />
            </div>
          </div>
        </div>
        
        <div class="bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl shadow-lg p-6 text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-pink-100 text-sm font-medium">Total Books</p>
              <p class="text-3xl font-bold">{{ getTotalBooksCount() }}</p>
              <p class="text-pink-200 text-xs mt-1">Across all categories</p>
            </div>
            <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <BookOpenIcon class="w-6 h-6" />
            </div>
          </div>
        </div>
        
        <div class="bg-gradient-to-br from-rose-500 to-rose-600 rounded-2xl shadow-lg p-6 text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-rose-100 text-sm font-medium">Largest Category</p>
              <p class="text-3xl font-bold">{{ getLargestCategoryCount() }}</p>
              <p class="text-rose-200 text-xs mt-1">{{ getLargestCategoryName() }}</p>
            </div>
            <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <TrendingUpIcon class="w-6 h-6" />
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl shadow-lg p-6 text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-indigo-100 text-sm font-medium">Average Books</p>
              <p class="text-3xl font-bold">{{ getAverageBooksPerCategory() }}</p>
              <p class="text-indigo-200 text-xs mt-1">Per category</p>
            </div>
            <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <BarChartIcon class="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      <!-- Results Summary -->
      <div v-if="filteredCategories.length > 0" class="mb-6">
        <p class="text-gray-600 dark:text-gray-400 text-sm">
          Showing {{ filteredCategories.length }} of {{ categories.length }} categories
          <span v-if="searchQuery" class="text-purple-600 dark:text-purple-400">
            (filtered)
          </span>
        </p>
      </div>

      <!-- Enhanced Categories Display -->
      <div v-if="filteredCategories.length > 0">
        <!-- Grid View -->
        <div v-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          <div
            v-for="category in paginatedCategories"
            :key="category.id"
            class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300 overflow-hidden group"
          >
            <!-- Card Header -->
            <div class="bg-gradient-to-r from-purple-50 via-pink-50 to-rose-50 dark:from-gray-700 dark:via-gray-700 dark:to-gray-700 p-6 border-b border-gray-200 dark:border-gray-600">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 rounded-xl flex items-center justify-center shadow-lg">
                    <FolderIcon class="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 class="font-bold text-xl text-gray-900 dark:text-white truncate max-w-32" :title="category.name">
                      {{ category.name }}
                    </h3>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      {{ category.books?.length || 0 }} books
                    </p>
                  </div>
                </div>
                <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    @click="openModal('edit', category)"
                    class="p-2 text-purple-600 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg transition-colors"
                    title="Edit category"
                  >
                    <EditIcon class="w-4 h-4" />
                  </button>
                  <button
                    @click="confirmDelete(category.id)"
                    class="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                    title="Delete category"
                  >
                    <TrashIcon class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <!-- Card Content -->
            <div class="p-6">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2">
                  <BookOpenIcon class="w-5 h-5 text-purple-500" />
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Books in this category
                  </span>
                </div>
                <span class="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-3 py-1 rounded-full text-sm font-medium">
                  {{ category.books?.length || 0 }}
                </span>
              </div>

              <!-- Books Preview -->
              <div v-if="category.books && category.books.length > 0" class="space-y-2 mb-4">
                <div
                  v-for="book in category.books.slice(0, 3)"
                  :key="book.id"
                  class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                >
                  <div class="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span class="truncate">{{ book.title }}</span>
                </div>
                <div v-if="category.books.length > 3" class="text-xs text-gray-500 dark:text-gray-400 pl-4">
                  +{{ category.books.length - 3 }} more books
                </div>
              </div>

              <div v-else class="text-center py-4">
                <BookOpenIcon class="w-8 h-8 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
                <p class="text-sm text-gray-500 dark:text-gray-400">No books in this category yet</p>
              </div>

              <!-- Action Button -->
              <button
                @click="toggleBooks(category.id)"
                class="w-full mt-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
              >
                <BookOpenIcon class="w-4 h-4" />
                {{ activeCategoryId === category.id ? 'Hide Books' : 'View All Books' }}
              </button>
            </div>

            <!-- Expandable Books List -->
            <div v-if="activeCategoryId === category.id && category.books && category.books.length > 0" class="border-t border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50">
              <div class="p-6">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <BookOpenIcon class="w-5 h-5 text-purple-500" />
                  All Books ({{ category.books.length }})
                </h4>
                <div class="space-y-3 max-h-64 overflow-y-auto">
                  <div
                    v-for="book in category.books"
                    :key="book.id"
                    class="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-600"
                  >
                    <h5 class="font-medium text-gray-900 dark:text-white text-sm">{{ book.title }}</h5>
                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      by {{ book.author }} • Published {{ formatDate(book.published_at) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Card Footer -->
            <div class="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-600">
              <div class="flex items-center justify-between">
                <span class="text-xs text-gray-500 dark:text-gray-400">
                  Category ID: #{{ category.id }}
                </span>
                <div class="flex items-center gap-2">
                  <button
                    @click="openModal('edit', category)"
                    class="text-xs text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 font-medium transition-colors"
                  >
                    Edit
                  </button>
                  <span class="text-gray-300 dark:text-gray-600">|</span>
                  <button
                    @click="confirmDelete(category.id)"
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
        <div v-else class="space-y-4">
          <div
            v-for="category in paginatedCategories"
            :key="category.id"
            class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200"
          >
            <div class="p-6">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 rounded-xl flex items-center justify-center shadow-lg">
                    <FolderIcon class="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{ category.name }}</h3>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      {{ category.books?.length || 0 }} books in this category
                    </p>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <button
                    @click="toggleBooks(category.id)"
                    class="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
                  >
                    <BookOpenIcon class="w-4 h-4" />
                    {{ activeCategoryId === category.id ? 'Hide Books' : 'View Books' }}
                  </button>
                  <button
                    @click="openModal('edit', category)"
                    class="p-2 text-purple-600 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg transition-colors"
                    title="Edit category"
                  >
                    <EditIcon class="w-5 h-5" />
                  </button>
                  <button
                    @click="confirmDelete(category.id)"
                    class="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                    title="Delete category"
                  >
                    <TrashIcon class="w-5 h-5" />
                  </button>
                </div>
              </div>

              <!-- Expandable Books List -->
              <div v-if="activeCategoryId === category.id && category.books && category.books.length > 0" class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <BookOpenIcon class="w-5 h-5 text-purple-500" />
                  Books in {{ category.name }} ({{ category.books.length }})
                </h4>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div
                    v-for="book in category.books"
                    :key="book.id"
                    class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
                  >
                    <h5 class="font-medium text-gray-900 dark:text-white">{{ book.title }}</h5>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      by {{ book.author }}
                    </p>
                    <p class="text-xs text-gray-400 dark:text-gray-500 mt-2">
                      Published {{ formatDate(book.published_at) }}
                    </p>
                  </div>
                </div>
              </div>

              <div v-else-if="activeCategoryId === category.id" class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600 text-center">
                <BookOpenIcon class="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                <p class="text-gray-500 dark:text-gray-400">No books in this category yet</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Enhanced Pagination -->
        <div v-if="totalPages > 1" class="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="text-sm text-gray-700 dark:text-gray-300">
            Showing {{ ((currentPage - 1) * itemsPerPage) + 1 }} to {{ Math.min(currentPage * itemsPerPage, filteredCategories.length) }} of {{ filteredCategories.length }} results
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
                    ? 'bg-purple-600 text-white'
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
          <FolderIcon class="w-16 h-16 text-gray-400" />
        </div>
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          {{ searchQuery ? 'No matching categories found' : 'No categories yet' }}
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto text-lg">
          {{ searchQuery 
            ? 'Try adjusting your search to find what you\'re looking for.' 
            : 'Start organizing your library by creating your first book category.' 
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
            class="px-8 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:from-purple-700 hover:via-pink-700 hover:to-rose-700 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2 justify-center"
          >
            <PlusIcon class="w-5 h-5" />
            {{ searchQuery ? 'Create New Category' : 'Create First Category' }}
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
        class="bg-white dark:bg-gray-800 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 scale-100"
        @click.stop
      >
        <!-- Modal Header -->
        <div class="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 px-6 py-6">
          <div class="flex items-center justify-between">
            <h3 class="text-xl font-bold text-white flex items-center gap-3">
              <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <FolderIcon class="w-6 h-6 text-white" />
              </div>
              {{ modalMode === "add" ? "Create New Category" : "Edit Category" }}
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
          @submit.prevent="modalMode === 'add' ? createCategory() : updateCategory()"
          class="p-6 space-y-6"
        >
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              <FolderIcon class="w-5 h-5 inline mr-2 text-purple-500" />
              Category Name
            </label>
            <input
              v-model="formCategory.name"
              type="text"
              placeholder="Enter category name..."
              class="w-full px-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all shadow-sm"
              required
            />
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
              class="px-8 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:from-purple-700 hover:via-pink-700 hover:to-rose-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              {{ modalMode === "add" ? "Create Category" : "Update Category" }}
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
            Are you sure you want to delete this category? This action cannot be undone and may affect associated books.
          </p>
          <div class="flex items-center justify-end gap-3">
            <button
              @click="closeDeleteModal"
              class="px-6 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              @click="deleteCategory(selectedCategoryId)"
              class="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Delete Category
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
  FolderIcon, 
  PlusIcon, 
  SearchIcon, 
  XIcon,
  EditIcon,
  TrashIcon,
  GridIcon,
  ListIcon,
  BookOpenIcon,
  TrendingUpIcon,
  BarChartIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from 'lucide-vue-next'
import api from "../plugins/axios"

// Reactive data
const categories = ref([])
const showModal = ref(false)
const showDeleteModal = ref(false)
const selectedCategoryId = ref(null)
const activeCategoryId = ref(null)
const modalMode = ref('add')
const formCategory = ref({
  id: null,
  name: ''
})

// Search and filter states
const searchQuery = ref('')
const sortBy = ref('name')
const viewMode = ref('grid')

// Pagination
const currentPage = ref(1)
const itemsPerPage = ref(12)

// Computed properties
const filteredCategories = computed(() => {
  let filtered = categories.value

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(category => 
      category.name.toLowerCase().includes(query)
    )
  }

  // Sort
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'books_count':
        return (b.books?.length || 0) - (a.books?.length || 0)
      case 'created_at':
        return new Date(b.created_at || 0) - new Date(a.created_at || 0)
      default:
        return 0
    }
  })

  return filtered
})

const paginatedCategories = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredCategories.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredCategories.value.length / itemsPerPage.value)
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
const fetchCategories = async () => {
  try {
    const res = await api.get("/categories")
    categories.value = res.data.map((category) => ({
      ...category,
      books: []
    }))
    
    // Fetch books for each category
    for (const category of categories.value) {
      try {
        const booksRes = await api.get(`/categories/${category.id}/books`)
        category.books = booksRes.data
      } catch (err) {
        console.error(`Error fetching books for category ${category.id}:`, err)
        category.books = []
      }
    }
  } catch (err) {
    console.error(err)
  }
}

const openModal = (mode, category = null) => {
  modalMode.value = mode
  showModal.value = true
  if (mode === 'edit' && category) {
    formCategory.value = { ...category }
  } else {
    formCategory.value = { id: null, name: '' }
  }
}

const closeModal = () => {
  showModal.value = false
}

const confirmDelete = (id) => {
  selectedCategoryId.value = id
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  selectedCategoryId.value = null
}

const createCategory = async () => {
  try {
    await api.post("/categories", formCategory.value)
    await fetchCategories()
    closeModal()
  } catch (err) {
    console.error("Create Error:", err)
  }
}

const updateCategory = async () => {
  try {
    await api.put(`/categories/${formCategory.value.id}`, formCategory.value)
    await fetchCategories()
    closeModal()
  } catch (err) {
    console.error("Update Error:", err)
  }
}

const deleteCategory = async (id) => {
  try {
    await api.delete(`/categories/${id}`)
    await fetchCategories()
    closeDeleteModal()
  } catch (err) {
    console.error("Delete Error:", err)
  }
}

const toggleBooks = (categoryId) => {
  activeCategoryId.value = activeCategoryId.value === categoryId ? null : categoryId
}

const clearSearch = () => {
  searchQuery.value = ''
}

const toggleView = () => {
  viewMode.value = viewMode.value === 'grid' ? 'list' : 'grid'
}

const getTotalBooksCount = () => {
  return categories.value.reduce((total, category) => total + (category.books?.length || 0), 0)
}

const getLargestCategoryCount = () => {
  const largest = categories.value.reduce((max, category) => 
    (category.books?.length || 0) > (max.books?.length || 0) ? category : max, 
    { books: [] }
  )
  return largest.books?.length || 0
}

const getLargestCategoryName = () => {
  const largest = categories.value.reduce((max, category) => 
    (category.books?.length || 0) > (max.books?.length || 0) ? category : max, 
    { books: [], name: 'None' }
  )
  return largest.name
}

const getAverageBooksPerCategory = () => {
  if (categories.value.length === 0) return 0
  const total = getTotalBooksCount()
  return Math.round(total / categories.value.length)
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Lifecycle
onMounted(() => {
  fetchCategories()
})
</script>
