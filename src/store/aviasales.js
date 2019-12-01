import api from '@/services/apiAviasales'
import Ticket from '@/classes/ticket'
// import dateFormat from '@/helpers/date'

export default {
  state: {
    countries: null,
    cities: null,
    shortCities: null,
    tickets: null,
    airlines: null
  },
  getters: {
    countries (state) {
      return state.countries
    },
    cities (state) {
      return state.cities
    },
    shortCities (state) {
      return state.shortCities
    },
    tickets (state) {
      return state.tickets
    },
    airlines (state) {
      return state.airlines
    },
    getCityCodeByKey: (state) => (key) => {
      const city = Object.values(state.cities).find(item => {
        return item.fullName === key
      })
      return city.code || ''
    },
    getCityNameByCode: (state) => (code) => {
      const city = state.cities[code]
      return city.name
    }
  },
  mutations: {
    serializeCountries (state, countries) {
      state.countries = countries
        .reduce((obj, country) => {
          obj[country.code] = {
            code: country.code,
            name: country.name || country.name_translations.en
          }
          return obj
        }, {})
    },
    serializeCities (state, cities) {
      state.cities = cities
        .reduce((obj, city) => {
          const countryName = state.countries[city.country_code].name || ''
          obj[city.code] = {
            code: city.code,
            name: city.name || city.name_translations.en,
            countryCode: city.country_code,
            countryName: countryName
          }
          obj[city.code].fullName = `${obj[city.code].name}, ${obj[city.code].countryName}`
          return obj
        }, {})
    },
    serializeAirlines (state, airlines) {
      state.airlines = airlines
        .reduce((obj, airline) => {
          obj[airline.code] = {
            code: airline.code,
            name: airline.name || airline.name_translations.en,
            logo: `http://pics.avs.io/200/200/${airline.code}.png`
          }
          return obj
        }, {})
    },
    serializeTickets (state, tickets) {
      state.tickets = Object.values(tickets).map(item => {
        return new Ticket(item.origin,
          state.cities[item.origin].name,
          item.destination,
          state.cities[item.destination].name,
          item.price,
          item.flightNumber || '',
          item.transfers,
          item.airline,
          state.airlines[item.airline].name,
          state.airlines[item.airline].logo,
          new Date(item.departure_at),
          new Date(item.return_at))
      })
    },
    createShortCities (state) {
      state.shortCities = Object.entries(state.cities)
        .map(([, city]) => {
          return city.fullName
        })
    }
  },
  actions: {
    async loadData ({ state, commit }) {
      try {
        const response = await Promise.all([
          api.getCountries(),
          api.getCities(),
          api.getAirlines()
        ])
        const [ countries, cities, airlines ] = response

        // Countries - convert array to object
        commit('serializeCountries', countries)
        // Cities - convert array to object
        commit('serializeCities', cities)
        // ShortCities - for autocompleters
        commit('createShortCities')
        // Airlines - convert array to object
        commit('serializeAirlines', airlines)
      } catch (err) {
        state.cities = {}
        state.countries = {}
        state.shortCities = []
        state.airlines = {}
        Promise.reject(err)
      }
    },
    async fetchTickets ({ state, commit }, params) {
      state.tickets = []
      try {
        const response = await api.getTickets(params)
        console.log(Object.values(response.data))
        commit('serializeTickets', response.data)
      } catch (err) {
        console.log(err)
        Promise.reject(err)
      }
    }
  }
}
