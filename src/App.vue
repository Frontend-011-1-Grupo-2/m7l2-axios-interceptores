<script setup>
import { apiPlaceholder } from './api/apiPlaceholder'
import { ref } from 'vue'

const posts = ref([])
const isLoading = ref(false)
const error = ref('')

// const fetchPosts = async () => {
//   try {
//     isLoading.value = true
//     const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
//     posts.value = response.data
//   } catch (err) {
//     console.error('Error en la petición', err)
//     error.value = `Error en la petición: ${err}`
//   } finally {
//     isLoading.value = false
//   }
// }

// const fetchPosts = async () => {
//   try {
//     isLoading.value = true
//     const response = await apiPlaceholder.get('/posts')
//     posts.value = response.data
//   } catch (error) {
//     error.value = `Error en la petición: ${err}`
//   } finally {
//     isLoading.value = false
//   }
// }

// Accedemos a funcion onLoadingChange de axios para manejar estadod e carga
apiPlaceholder.onLoadingChange = (loadingState) => {
  isLoading.value = loadingState
}

const fetchPosts = async () => {
  try {
    const response = await apiPlaceholder.get('/posts')
    posts.value = response
  } catch (err) {
    console.error('Error al obtener los posts', err)
    error.value = `Error al obtener los posts ${err}`
  }
}

// const fetchPhotos = async () => {
//   try {
//     isLoading.value = true
//     const response = await apiPlaceholder.get('/photos')
//     // posts.value = response.data
//     // console.log(res)
//   } catch (err) {
//     error.value = `Error en la petición: ${err}`
//   } finally {
//     isLoading.value = false
//   }
// }

fetchPosts()
// fetchPhotos()
</script>

<template>
  <main class="container">
    <div class="spinner-border" role="status" v-if="isLoading">
      <span class="visually-hidden">Loading...</span>
    </div>
    <p class="text-danger lead" v-if="error">{{ error }}</p>
    <ul class="list-group" v-if="!isLoading && !error">
      <li class="list-group-item" v-for="post in posts" :key="post.id">
        <h3>{{ post.title }}</h3>
        <p class="lead">{{ post.body }}</p>
        <p class="small text-muted">Creado por: {{ post.userId }}</p>
      </li>
    </ul>
  </main>
</template>

<style scoped></style>
