import config from '@/config/api.config'
import axios from 'axios'

class ApiAviasales {
  constructor (config) {
    this.config = config
  }

  async getCountries () {
    try {
      const response = await axios.get(config.urlCountries)
      return response.data
    } catch (err) {
      Promise.reject(err)
    }
  }

  async getCities () {
    try {
      const response = await axios.get(config.urlCities)
      return response.data
    } catch (err) {
      Promise.reject(err)
    }
  }

  async getTickets (params) {
    try {
      const response = await axios.get(this.config.urlTickets, {
        params
      })
      return response.data
    } catch (err) {
      return Promise.reject(err)
    }
  }

  async getAirlines () {
    try {
      const response = await axios.get(this.config.urlAirlines)
      return response.data
    } catch (err) {
      return Promise.reject(err)
    }
  }
}

const api = new ApiAviasales(config)
export default api
