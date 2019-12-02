<template>
  <div>
    <!-- Progress -->
    <template v-if="!isDataLoaded">
      <app-progress class="mt-5"></app-progress>
    </template>

    <!--  -->
    <template v-else-if="!isDataEmpty">
      <app-search-card
        @findTicketsClicked="findTickets"
        :cities="shortCities"
        :loading="loading"
      ></app-search-card>
      <!-- Ticket Container -->
      <div v-if="hasTickets">
        <app-ticket
          v-for="(ticket, key) in tickets"
          :key="key"
          :ticket="ticket"
          :isMobile="isMobile"
        ></app-ticket>
      </div>
      <template v-else-if="!hasTickets && isSearchDone">
        <v-layout row class="mt-5">
          <v-flex class="xs4 offset-xs4">
            <div text-xs-center class="display-1">
              Билеты не найдены
            </div>
          </v-flex>
        </v-layout>
      </template>
    </template>

    <!-- There is not data -->
    <template v-else>
      <v-layout row class="mt-5">
        <v-flex class="xs4 offset-xs4">
          <div text-xs-center class="display-1" style="color: red;">
            Сервис недоступен
          </div>
        </v-flex>
      </v-layout>
    </template>

  </div>
</template>

<script>
import SearchCard from '@/components/SearchCard'
import Ticket from '@/components/Ticket'
import Progress from '@/components/Progress'

export default {
  name: 'home',
  data: () => ({
    isSearchDone: false,
    loading: false
  }),
  computed: {
    isDataLoaded () {
      return this.shortCities
    },
    isDataEmpty () {
      return this.shortCities.length === 0
    },
    shortCities () {
      return this.$store.getters.shortCities
    },
    tickets () {
      return this.$store.getters.tickets
    },
    hasTickets () {
      return this.tickets && this.tickets.length >= 0
    },
    isMobile () {
      return this.$store.state.isMobile
    }
  },
  components: {
    'app-search-card': SearchCard,
    'app-ticket': Ticket,
    'app-progress': Progress
  },
  methods: {
    findTickets (value) {
      this.isSearchDone = false
      this.loading = true
      const params = {
        origin: this.$store.getters.getCityCodeByKey(value.origin),
        destination: this.$store.getters.getCityCodeByKey(value.destination),
        depart_date: value.departDate,
        currency: 'RUB'
      }
      if (value.returnDate) {
        params.return_date = value.returnDate
      }
      this.$store.dispatch('fetchTickets', params)
        .finally(() => {
          this.isSearchDone = true
          this.loading = false
        })
    }
  },
  mounted () {
  }
}
</script>
