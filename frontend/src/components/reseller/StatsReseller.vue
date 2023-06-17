<template>
    <v-container>
        <v-row class="row" style="justify-content: center">
              <!-- Statistiche ultimi clienti-->
            <v-col>
                <v-row>
                    <v-col>
                        <div class="stats-icon blue">
                            <i class="iconly-boldProfile"></i>
                        </div>
                    </v-col>
                    <v-col>
                        <h6 class="text-muted font-semibold">CLIENTI</h6>
                        <h6 class="font-extrabold mb-0">
                            {{ hsComponentStore.customersOfSelectedReseller.length }}
                        </h6>
                    </v-col>
                </v-row>
            </v-col>
            <!-- Statistiche nuovi websurfer-->
            <v-col>
                <v-row>
                    <v-col>
                        <div class="stats-icon green">
                            <i class="iconly-boldAdd-User"></i>
                        </div>
                    </v-col>
                    <v-col>
                        <h6 class="text-muted font-semibold">NUOVI WEBSURFER</h6>
                        <h6 class="font-extrabold mb-0">
                            {{ hsComponentStore.lastWebsurfers != {} ? 0 : hsComponentStore.lastWebsurfers.length }}
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
                        <h6 class="text-muted font-semibold">WEBSURFER</h6>
                        <h6 class="font-extrabold mb-0">
                            {{ hsComponentStore.activeTickets.length }}
                        </h6>
                    </v-col>
                </v-row>
            </v-col>
                <!-- Statistiche ticket attivi-->
            <v-col>
                <v-row>
                    <v-col>
                        <div class="stats-icon blue">
                            <i class="iconly-boldProfile"></i>
                        </div>
                    </v-col>
                    <v-col>
                        <h6 class="text-muted font-semibold">TICKET ATTIVI</h6>
                        <h6 class="font-extrabold mb-0">
                            {{ hsComponentStore.websurfers.length }}
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
                            {{ hsComponentStore.expiredTickets.length }}
                        </h6>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { hsStoreReseller } from "@/store/storeReseller.js";
export default {
    name: "statsReseller",
    setup() {
        const hsComponentStore = hsStoreReseller();
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

<style lang="scss" scoped>

</style>