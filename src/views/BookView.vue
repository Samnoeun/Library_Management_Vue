<script setup>
import { ref, onMounted } from 'vue'
import api from '../axios'

const books = ref([])

onMounted(async () => {
  try {
    const res = await api.get('/books')
    books.value = res.data
  } catch (error) {
    console.error('Error fetching books:', error)
  }
})
</script>
