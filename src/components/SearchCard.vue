<template>
  <v-layout class="px-24">
    <!-- <v-flex xl4 offset-xl4 lg6 offset-lg3 md8 offset-md2 sm10 offset-sm1 xs12> -->
    <v-flex xl4 offset-xl4 lg6 offset-lg3 md12 sm12 xs12>
      <v-card class="mt-3">
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <!-- Title -->
          <v-card-title primary-title class="justify-center">
            <div>
              <h3 class="headline mb-0 card-header text-sm-center">Поиск авиабилетов</h3>
            </div>
          </v-card-title>

          <!-- Input From -->
          <v-autocomplete
            class="mx-5"
            v-model="origin"
            :items="cities"
            label="Откуда"
            persistent-hint
            :rules="fromCityRules"
          ></v-autocomplete>

          <!-- Input Where -->
          <v-autocomplete
            class="mx-5"
            v-model="destination"
            :items="cities"
            label="Куда"
            persistent-hint
            :rules="whereCityRules"
          ></v-autocomplete>

          <!-- Datepicker Depart Date -->
          <app-datepicker
            header="Туда"
            v-model="departDate"
            :rules="departDateRules"
          ></app-datepicker>

          <!-- Datepicker Return Date -->
          <app-datepicker
            header="Обратно"
            v-model="returnDate"
            class="mb-4"
          ></app-datepicker>

          <v-divider></v-divider>

          <!-- Actions -->
          <v-card-actions class="px-0 py-3">
            <v-layout
              :class="{'column': isMobile,
                        'align-center': isMobile,
                        'row': !isMobile,
                        'justify-center': !isMobile}"
              wrap>
              <!-- Button Find tickets -->
              <v-btn
                dark
                color="#1976d2"
                :class="[{'ml-5': !isMobile}, 'mb-2']"
                @click="clickFindTickets"
                :loading="loading"
              >
                Найти билеты
                <v-icon right dark>send</v-icon>
              </v-btn>

              <v-spacer></v-spacer>

              <!-- Button Reset -->
              <v-btn
                dark
                color="#90caf9"
                :class="[{'mr-5': !isMobile}, 'mb-2']"
                @click="clickReset"
                :disabled="loading"
              >
                Сбросить
                <v-icon right dark>cancel</v-icon>
              </v-btn>
            </v-layout>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import DatePicker from '@/components/DatePicker'

export default {
  props: ['cities', 'loading'],
  data: () => ({
    origin: '',
    destination: '',
    departDate: null,
    returnDate: null,
    show: true,
    valid: true,
    fromCityRules: [
      v => !!v || 'Необходимо заполнить город отправления'
    ],
    whereCityRules: [
      v => !!v || 'Необходимо заполнить город назначения'
    ],
    departDateRules: [
      v => !!v || 'Необходимо заполнить дату отправления'
    ]
  }),
  methods: {
    enterAnimation: (el, done) => {
      console.log('enter animation')
    },
    clickFindTickets () {
      if (!this.$refs.form.validate()) {
        return
      }
      this.$emit('findTicketsClicked', this.getResult())
    },
    clickReset () {
      // this.origin = ''
      // this.destination = ''
      this.departDate = null
      this.returnDate = null
      this.$refs.form.reset()
    },
    getResult () {
      const res = {
        origin: this.origin,
        destination: this.destination,
        departDate: new Date(this.departDate).toISOString().substr(0, 10)
      }
      if (this.returnDate) {
        res.returnDate = new Date(this.returnDate).toISOString().substr(0, 10)
      }

      return res
    }
  },
  components: {
    'app-datepicker': DatePicker
  },
  computed: {
    isMobile () {
      return this.$store.state.isMobile
    }
  }
}
</script>

<style lang="scss" scoped>
  .card-header {
    color: #1976d2;
    letter-spacing: 2px !important;
    font-size: 27px !important;
    font-weight: 700;
    text-align: center;
  }
</style>
