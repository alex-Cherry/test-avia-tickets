<template>
  <v-layout row class="px-24 mt-4">
    <v-flex class="md4 offset-md4">
      <v-card>
        <v-layout row>
          <!-- Left Column -->
          <v-flex class="md3">
            <v-layout row class="justify-center">
              <v-img :src="ticket.airlineLogo" max-width="100px"></v-img>
            </v-layout>
            <v-layout row class="justify-center">
              <p class="ticket-airline-name">{{ ticket.airlineName }}</p>
            </v-layout>
            <v-layout row class="justify-center">
              <v-chip dark class="blue lighten-2 px-3 py-2" text-color="white">{{ ticket.price | currencyFilter }}</v-chip>
            </v-layout>
          </v-flex>

          <!-- Divider -->
          <v-divider :vertical="true"></v-divider>

          <!-- Right Column Start -->
          <v-flex class="md9">
            <div class="ticket-right-column">

              <!-- Top Start -->
              <div class="height-100 d-flex align-center">
                <div class="px-24">
                  <div class="ticket-destination d-flex align-center">
                    <div class="d-flex align-center mr-auto">
                      <span class="ticket-city">{{ ticket.originName }}</span>
                      <i class="medium material-icons">flight_takeoff</i>
                    </div>
                    <div class="d-flex align-center">
                      <i class="medium material-icons">flight_land</i>
                      <span class="ticket-city">{{ ticket.destinationName }}</span>
                    </div>
                  </div>
                  <div class="ticket-time-price d-flex align-center">
                    <span class="ticket-time-departure">{{ ticket.departureAt | dateFilter }}</span>
                  </div>
                  <div class="ticket-additional-info">
                    <span class="ticket-transfers d-inline-block">Пересадок: {{ ticket.transfers }}</span>
                    <span class="ticket-flight-number d-inline-block mr-2">Номер рейса: {{ ticket.flightNumber }}</span>
                  </div>
                </div>
              </div>
              <!-- Top End -->

              <v-divider></v-divider>
              <!-- Bottom Start -->
              <div class="height-100 d-flex align-center">
                <div class="px-24">
                  <div class="ticket-destination d-flex align-center">
                    <div class="d-flex align-center mr-auto">
                      <span class="ticket-city">{{ ticket.destinationName }}</span>
                      <i class="medium material-icons">flight_takeoff</i>
                    </div>
                    <div class="d-flex align-center">
                      <i class="medium material-icons">flight_land</i>
                      <span class="ticket-city">{{ ticket.originName }}</span>
                    </div>
                  </div>
                  <div class="ticket-time-price d-flex align-center">
                    <span class="ticket-time-departure">{{ ticket.returnAt | dateFilter }}</span>
                  </div>
                </div>
              </div>
              <!-- Bottom End -->

            </div>
          </v-flex>
          <!-- Right Column End -->

        </v-layout>
      </v-card>

    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: {
    ticket: {
      type: Object
    }
  },
  data: () => ({})
}
</script>

<style lang="scss" scoped>
.height-100 {
  height: 100%;
}

.ticket-card {
  padding: 10px 15px;
}

.ticket-airline-name {
  font-weight: bold;
  text-transform: capitalize;
  padding: 0 20px;
  text-align: center;
}

.ticket-destination {
  margin-bottom: 10px;
  border-bottom: 1px dashed gray;
}

.ticket-destination .ticket-city {
  font-size: 26px;
  text-transform: uppercase;
}

.ticket-destination i.material-icons {
  font-size: 26px;
}

.ticket-time-departure {
  font-weight: bold;
  color: gray;
}

.ticket-price {
  font-size: 25px;
  padding: 5px;
  background: #6a1b9a;
  color: #fff;
}

.ticket-additional-info {
  font-size: 14px;
  font-weight: bold;
}

.ticket-right-column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}
</style>
