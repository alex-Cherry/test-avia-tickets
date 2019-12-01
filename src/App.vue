<template>
  <v-app>
    <app-navigation-bar></app-navigation-bar>
    <router-view></router-view>
  </v-app>
</template>

<script>
import NavigationBar from '@/components/NavigationBar'

export default {
  data: () => ({
    isMobile: false
  }),
  components: {
    'app-navigation-bar': NavigationBar
  },
  methods: {
    onResize () {
      console.log('resize')
      this.$store.commit('setMobile', this.$vuetify.breakpoint.xs)
    }
  },
  mounted () {
    this.onResize()
    window.addEventListener('resize', this.onResize, { passive: true })
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResize, { passive: true })
  }
}
</script>

<style lang="scss">
</style>
