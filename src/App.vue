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
      // console.log('resize')
      // console.log(screen.width)
      // console.log(this.$vuetify.breakpoint.width < 600)
      // this.$store.commit('setMobile', this.$vuetify.breakpoint.width < 600)
      this.$store.commit('setMobile', screen.width < 600)
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
