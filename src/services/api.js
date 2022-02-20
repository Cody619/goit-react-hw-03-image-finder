import axios from 'axios'
import queryString from 'query-string'
export const api_key = '24139872-fead068626907a7ba14cf06e1'
export const base_URL = 'https://pixabay.com/api/'
axios.defaults.baseURL = base_URL

export const getImages = (page, q) => {
  const params = queryString.stringify({
    key: api_key,
    q,
    page,
    per_page: 12,
    image_type: 'photo',
    orientation: 'horizontal',
  })
  return axios.get('?' + params)
}
