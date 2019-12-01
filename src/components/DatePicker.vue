<template>

  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    lazy
    transition="scale-transition"
    offset-y
    full-width
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        ref="textField"
        :label="header"
        append-icon="event"
        v-on="on"
        class="mx-5"
        v-model="dateFace"
        @focus="focusDepartDate"
        :rules="rules"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="dateStr"
      @input="inputDepartDate"
      first-day-of-week="1"
      locale="ru-Ru"
      :weekday-format="weekdayFormatDepartDate"
    ></v-date-picker>
  </v-menu>

</template>

<script>
import formatDate from '@/helpers/date'

export default {
  props: {
    value: {
      type: Date
    },
    header: {
      type: String,
      required: true
    },
    rules: {
      type: Array,
      default: () => ([])
    }
  },
  data: () => ({
    menu: false,
    dateStr: '',
    weekdaysAbbrev: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
  }),
  computed: {
    dateFace: {
      get () {
        return (this.value) ? formatDate(this.value, 'dd MMMM, EEEEEE') : ''
      },
      set (valule) {
      }
    }
  },
  methods: {
    inputDepartDate () {
      this.menu = false
      this.$emit('input', new Date(this.dateStr))
    },
    weekdayFormatDepartDate (dateStr) {
      const numberOfDay = new Date(dateStr).getDay()
      return this.weekdaysAbbrev[numberOfDay]
    },
    focusDepartDate () {
      this.dateStr = (this.value) ? new Date(this.value).toISOString().substr(0, 10) : ''
    }
  },
  watch: {
    dateStr (value) {
    }
  },
  mounted () {
  },
  updated () {
  }
}
</script>
