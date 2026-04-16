const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

async function axiosClient(path, { method = 'GET', body, token, headers = {} } = {}) {
      const config = {
            method,
            headers: {
                  'Content-Type': 'application/json',
                  ...headers,
            },
      }

      if (body) {
            config.body = JSON.stringify(body)
      }

      if (token) {
            config.headers.Authorization = `Bearer ${token}`
      }

      const response = await fetch(`${API_BASE_URL}${path}`, config)
      const payload = await response.json().catch(() => null)

      if (!response.ok) {
            const message = payload?.message || 'API request failed'
            throw new Error(message)
      }

      return payload
}

export default axiosClient
