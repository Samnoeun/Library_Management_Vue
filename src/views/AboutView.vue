<template>
  <div class="about">
    <h1>This is an about page</h1>
    <ul>
      <li v-for="book in books" :key="book.id">
        {{ book.title }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      books: [] // ✅ match your template
    };
  },
  mounted() {
    axios
      .get("http://localhost:8000/api/books")
      .then((res) => {
        this.books = res.data;
      })
      .catch((err) => {
        console.error("Error fetching books:", err);
      });
  }
};
</script>
