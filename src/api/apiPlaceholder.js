import axios from "axios";

export const apiPlaceholder = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {
    'Content-Type': 'application/json',
    // si se pidiera usar api key en los headers:
    // 'x-api-key': 'mi-api-key-que-me-dieron'
    // si se pidiera JSON Web Token (JWT)
    // 'Authorization': `Bearer ${localStorage.getItem('token')}`
  },
})

apiPlaceholder.onLoadingChange = null

// Interceptor de petición -> Request
// Se ejecuta ante que la petición sea enviada al servidor
apiPlaceholder.interceptors.request.use(
  (config) => {
    if (typeof apiPlaceholder.onLoadingChange === 'function') {
      apiPlaceholder.onLoadingChange(true)
    }
    console.log('Interceptor de Request → Enviando petición a:', config.url)

    return config
  },
  (error) => {
    if (typeof apiPlaceholder.onLoadingChange === 'function') {
      apiPlaceholder.onLoadingChange(false)
    }

    return Promise.reject(error)
  }
)

// Interceptor de respuesta -> Response
apiPlaceholder.interceptors.response.use(
  (response) => {
    if (typeof apiPlaceholder.onLoadingChange === 'function') {
      apiPlaceholder.onLoadingChange(false)
    }

    console.log('Respuesta recibida correctamente')
    console.log('Response desde el interceptor', response)
    return response.data // entregamos los datos desestructurados
  },

  (error) => {
    if (typeof apiPlaceholder.onLoadingChange === 'function') {
      apiPlaceholder.onLoadingChange(false)
    }

    if (error.response) {
      console.error(`Error del servidor ${error.response.status}: ${error.response.data}`)

      switch (error.response.status) {
        case 401:
          console.warn('Sesión expirada o no autorizada')
          break
        case 404:
          console.warn('El recurso solicitado no fue encontrado')
          break
        case 500:
          console.warn('Error interno del servidor, inténtelo de nuevo más tarde')
          break
      }
    } else if (error.request) {
      console.error('Error de red: No se pudo conectar con el servidor')
    } else {
      console.error('Error inesperado', error.message)
    }

    return Promise.reject(error)
  }
)