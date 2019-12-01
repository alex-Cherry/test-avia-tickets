<template>
  <v-toolbar class="blue lighten-2" dark>
    <v-layout row>
      <v-flex md6 offset-md3>
        <v-toolbar class="blue lighten-2 elevation-0" dark>
          <!-- Logo -->
          <v-btn icon>
            <v-icon color="white" light>$vuetify.icons.plane</v-icon>
          </v-btn>
          <!-- Title -->
          <v-toolbar-title class="ml-0 brand-logo">
            <router-link to="/" tag="span" class="title pointer">Avia Tickets</router-link>
          </v-toolbar-title>
        </v-toolbar>
      </v-flex>
    </v-layout>
  </v-toolbar>
</template>

<style lang="scss" scoped>
  .pointer {
    cursor: pointer;
  }
</style>
