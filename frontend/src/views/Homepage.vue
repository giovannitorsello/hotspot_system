<template>
    <div>
        <Sidebar/>
        <div id="main">
            <header class="mb-3">
                <a href="#" class="burger-btn d-block d-xl-none">
              <i class="bi bi-justify fs-3"></i>
            </a>
            </header>
            <div class="page-heading">
                <h3>TICKET SYSTEM STATUS</h3>
                <h4>Bentornato {{ this.hsComponentStore.user.utente }}</h4>
            </div>
            <div class="page-content">
                <section class="row">
                    <div class="col-12 col-lg-12">
                        <div class="row" style="justify-content: center">
                            <div class="col-6 col-lg-2 col-md-6" v-if="this.hsComponentStore.user.role == 'RESELLER'">
                                <div class="card">
                                    <div class="card-body px-3 py-4-5">
                                        <div class="row">
                                            <div class="col-md-4">
                                                <div class="stats-icon blue">
                                                    <i class="iconly-boldProfile"></i>
                                                </div>
                                            </div>
                                            <div class="col-md-8">
                                                <h6 class="text-muted font-semibold">CLIENTI</h6>
                                                <h6 class="font-extrabold mb-0">
                                                    {{ hsComponentStore.customerOfThisReseller.length }}
                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6 col-lg-2 col-md-6">
                                <div class="card">
                                    <div class="card-body px-3 py-4-5">
                                        <div class="row">
                                            <div class="col-md-4">
                                                <div class="stats-icon green">
                                                    <i class="iconly-boldAdd-User"></i>
                                                </div>
                                            </div>
                                            <div class="col-md-8">
                                                <h6 class="text-muted font-semibold">NUOVI WEBSURFER</h6>
                                                <h6 class="font-extrabold mb-0">
                                                    {{ hsComponentStore.lastWebsurfers != {} ? 0 : hsComponentStore.lastWebsurfers.length }}
                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--   <% } %> -->
                            <div class="col-6 col-lg-2 col-md-6">
                                <div class="card">
                                    <div class="card-body px-3 py-4-5">
                                        <div class="row">
                                            <div class="col-md-4">
                                                <div class="stats-icon blue">
                                                    <i class="iconly-boldProfile"></i>
                                                </div>
                                            </div>
                                            <div class="col-md-8">
                                                <h6 class="text-muted font-semibold">WEBSURFER</h6>
                                                <h6 class="font-extrabold mb-0">
                                                    {{ hsComponentStore.websurfers.length }}
                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6 col-lg-2 col-md-6">
                                <div class="card">
                                    <div class="card-body px-3 py-4-5">
                                        <div class="row">
                                            <div class="col-md-4">
                                                <div class="stats-icon purple">
                                                    <i class="iconly-boldShow"></i>
                                                </div>
                                            </div>
                                            <div class="col-md-8">
                                                <h6 class="text-muted font-semibold">TICKET ATTIVI</h6>
                                                <h6 class="font-extrabold mb-0">
                                                    {{ hsComponentStore.activeTickets.length }}
                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6 col-lg-2 col-md-6">
                                <div class="card">
                                    <div class="card-body px-3 py-4-5">
                                        <div class="row">
                                            <div class="col-md-4">
                                                <div class="stats-icon red">
                                                    <i class="iconly-boldBookmark"></i>
                                                </div>
                                            </div>
                                            <div class="col-md-8">
                                                <h6 class="text-muted font-semibold">TICKET SCADUTI</h6>
                                                <h6 class="font-extrabold mb-0">
                                                    {{ hsComponentStore.expiredTickets.length }}
                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mb-6">
                          <TableClient />
                        
                        </div>
    
                        <div class="row">
                            <div class="col-12 col-xl-6">
                                <div class="card">
                                    <div class="card-header text-align-center">
                                        <h4>ULTIMI WEBSURFER INSERITI(3 GIORNI)</h4>
                                    </div>
                                    <div class="card-body" v-if="hsComponentStore.lastWebsurfers != {}">
                                       
                                            <v-card>
                                                <v-tabs v-model="tab" bg-color="#435ebe"></v-tabs>
                                                <v-card-text>
                                                    <v-window>
                                                        <v-window-item>
                                                            <v-table>
                                                                <thead>
                                                                    <tr>
                                                                        <th>ID</th>
                                                                        <th>NOME</th>
                                                                        <th>COGNOME</th>
                                                                        <th>EMAIL</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr v-for="websurfer in hsComponentStore.lastWebsurfers" :key="websurfer.id">
                                                                      <td>{{ websurfer.id }}</td>
                                                                        <td>{{ websurfer.firstname }}</td>
                                                                        <td>{{ websurfer.lastname }}</td>
                                                                        <td>{{ websurfer.email }}</td>
                                                                    </tr>
                                                                </tbody>
                                                            </v-table>
                                                        </v-window-item>
                                                    </v-window>
                                                </v-card-text>
                                            </v-card>
                                    </div>
                                </div>
                            </div>
    
                            <div class="col-12 col-xl-6">
                                <div class="card">
                                    <div class="card-header">
                                        <h4>ULTIMI TICKET CREATI(3 GIORNI)</h4>
                                    </div>
    
                                    <div class="card-body" v-if="hsComponentStore.lastTickets.length > 0 ">
                                       
                                            <v-card>
                                                <v-tabs v-model="tab" bg-color="#435ebe"></v-tabs>
                                                <v-card-text>
                                                    <v-window>
                                                        <v-window-item>
                                                            <v-table>
                                                                <thead>
                                                                    <tr>
                                                                        <th>ID</th>
                                                                        <th>DATA CREAZIONE</th>
                                                                        <th>DATA SCADENZA</th>
                                                                        <th>USERNAME</th>
                                                                        <th>PASSWORD</th>
                                                                        <th>HOTEL</th>
                                                                        <th>WEBSURFER</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr v-for="ticket in hsComponentStore.lastTickets" :key="ticket.id">
                                                                        <td>{{ ticket.id }}</td>
                                                                        <td>{{ ticket.emissionDate }}</td>
                                                                        <td>{{ ticket.expirationDate }}</td>
                                                                        <td>{{ ticket.login }}</td>
                                                                        <td>{{ ticket.password }}</td>
                                                                        <td>{{ ticket.CustomerId }}</td>
                                                                        <td>{{ ticket.WebsurferId }}</td>
                                                                    </tr>
                                                                </tbody>
                                                            </v-table>
                                                        </v-window-item>
                                                    </v-window>
                                                </v-card-text>
                                            </v-card>
                                    </div>
                                    <div class="card-body" v-if="hsComponentStore.lastTickets.length = 0">
                                            <v-card >
                                                <v-tabs v-model="tab" bg-color="#435ebe"></v-tabs>
                                                <v-card-text>
                                                    <v-window>
                                                        <v-window-item>
                                                            <v-table>
                                                              
                                                                <tbody>
                                                                    <tr >
                                                                        <td>"NESSUN NUOVO TICKET"</td>
                                                                    </tr>
                                                                </tbody>
                                                            </v-table>
                                                        </v-window-item>
                                                    </v-window>
                                                </v-card-text>
                                            </v-card>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
import { hsStore } from "@/store/hotspotSystemStore.js";
import Sidebar from "@/components/Sidebar.vue";
import TableClient from "@/components/TableClient.vue";
export default {
    components: { Sidebar,TableClient },
    name: "Dashboard",
    setup() {
        const hsComponentStore = hsStore();
        return { hsComponentStore };
    },
    data() {
        return {
            tab: 'one',
            
        };
    },
    methods: {},
};
</script>
