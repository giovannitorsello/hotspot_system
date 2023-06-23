<template>
  <v-container>
      <v-row class="row" style="justify-content: center">
            <!-- Statistiche ultimi websurfer-->
          <v-col>
              <v-row>
                  <v-col>
                      <div class="stats-icon blue">
                          <i class="iconly-boldProfile"></i>
                      </div>
                  </v-col>
                  <v-col>
                      <h6 class="text-muted font-semibold">WEBSURFER</h6>
                      <h6 class="font-extrabold mb-0">
                          {{ hsComponentStore.websurfersOfSelectedCustomer.length }}
                      </h6>
                  </v-col>
              </v-row>
          </v-col>
              <!-- Statistiche websurfer-->
          <v-col>
              <v-row>
                  <v-col>
                      <div class="stats-icon purple">
                          <i class="iconly-boldShow"></i>
                      </div>
                  </v-col>
                  <v-col>
                      <h6 class="text-muted font-semibold">TICKET ATTIVI</h6>
                      <h6 class="font-extrabold mb-0">
                          {{ hsComponentStore.ticketsActiveOfSelectedCustomer.length }}
                      </h6>
                  </v-col>
              </v-row>
          </v-col>
              <!-- Statistiche ticket scaduti-->
          <v-col>
              <v-row>
                  <v-col>
                      <div class="stats-icon red">
                          <i class="iconly-boldBookmark"></i>
                      </div>
                  </v-col>
                  <v-col>
                      <h6 class="text-muted font-semibold">TICKET SCADUTI</h6>
                      <h6 class="font-extrabold mb-0">
                          {{ hsComponentStore.ticketsExpiredOfSelectedCustomer.length }}
                      </h6>
                  </v-col>
              </v-row>
          </v-col>
      </v-row>
  </v-container>
</template>

<script>
import { hsStoreCustomer } from "@/store/storeCustomer.js";
export default {
  name: "statsCustomer",
  setup() {
      const hsComponentStore = hsStoreCustomer();
      return { hsComponentStore };
  },
  created() {},
  data() {
      return {};
  },
  props: {},
  methods: {},
};
</script>