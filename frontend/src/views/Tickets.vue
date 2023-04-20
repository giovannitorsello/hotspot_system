<template>
    <div>
        <div id="sidebar" class="active">
            <div class="sidebar-wrapper active">
                <div class="sidebar-header">
                    <div class="d-flex justify-content-between">
                        <div class="logo">
                            <a href="dashboard"><img src="/img/logo_ASYTECH.png" alt="Logo" /></a>
                        </div>
                        <div class="toggler">
                            <a href="#" class="sidebar-hide d-xl-none d-block"><i class="bi bi-x bi-middle"></i></a>
                        </div>
                    </div>
                </div>
                <Sidebar :state="hsComponentStore" />
                <button class="sidebar-toggler btn x"><i data-feather="x"></i></button>
            </div>
        </div>
        <div id="main">
            <header class="mb-3">
                <a href="#" class="burger-btn d-block d-xl-none">
              <i class="bi bi-justify fs-3"></i>
            </a>
            </header>
            <div class="page-heading">
                <h3>TICKET</h3>
            </div>
    
            <section id="multiple-column-form" v-if="tab == 'five'">
                <div class="row match-height">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header">
                                <h4 class="card-title">INSERISCI NUOVO TICKET</h4>
                            </div>
                            <div class="card-content">
                                <div class="card-body">
                                    <form class="form" method="post" action="ticket/insert">
                                        <div class="row">
                                            <!-- <input type="hidden" class="form-control" name="resellerID" value=<%=dataCreationTicker.user.ResellerId %>> -->
                                            <div class="col-md-6 col-12">
                                                <div class="form-group">
                                                    <label for="first-name-column">DATA INIZIO </label>
                                                    <input type="date" class="form-control" name="emission" required />
                                                </div>
                                            </div>
                                            <div class="col-md-6 col-12">
                                                <div class="form-group">
                                                    <label for="first-name-column">DATA FINE </label>
                                                    <input type="date" class="form-control" name="exirration" required />
                                                </div>
                                            </div>
                                            <!--   <div class="col-md-6 col-12">
                                                    <div class="form-group">
                                                        <label for="first-name-column">LOGIN</label>
                                                        <input type="text" class="form-control" disabled value=<%=username %>>
                                                    </div>
                                                </div>
                                                <div class="col-md-6 col-12">
                                                    <div class="form-group">
                                                        <label for="first-name-column">PASSWORD</label>
                                                        <input type="text" class="form-control" disabled value=<%=password %>>
                                                    </div>
                                                </div> -->
    
                                            <div class="col-md-6 col-12">
                                                <div class="form-group">
                                                    <label for="first-name-column">STATE</label>
                                                    <select class="form-select" name="role" required>
                                <option value="active">ATTIVO</option>
                                <option value="disabled">DISATTIVO</option>
                              </select>
                                                </div>
                                            </div>
                                            <div class="col-md-6 col-12">
                                                <div class="form-group">
                                                    <label for="first-name-column">PIN AZIENDA</label>
                                                    <input type="text" class="form-control" id="pinAgency" name="pinAzienda" />
                                                </div>
                                            </div>
                                            <div class="col-md-6 col-12">
                                                <div class="form-group">
                                                    <label for="first-name-column">NOTE</label>
                                                    <input type="text" class="form-control" id="denominazione" name="webSurfer" required />
                                                </div>
                                            </div>
                                            <div class="col-md-6 col-12">
                                                <div class="form-group">
                                                    <label for="first-name-column">SERIALE</label>
                                                    <input type="text" class="form-control" id="denominazione" name="webSurfer" required />
                                                </div>
                                            </div>
    
                                            <div class="col-12 d-flex justify-content-end">
                                                <button type="submit" class="btn btn-primary me-1 mb-1">Inserisci</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
    
            <div class="page-content">
                <section class="row">
                    <div class="col-12 col-lg-12">
                        <div class="page-heading">
                            <section class="section">
                                <div class="card">
                                    <div class="card-body">
                                        <section class="section">
                                            <v-card>
                                                <v-tabs v-model="tab" bg-color="#435ebe">
                                                    <v-tab value="one" color="white">TUTTI</v-tab>
                                                    <v-tab value="two" color="white">MODIFICA</v-tab>
                                                    <v-tab value="three" color="white">ELIMINA</v-tab>
                                                </v-tabs>
    
                                                <v-card-text>
                                                    <v-window v-model="tab">
                                                        <v-window-item value="one">
                                                            <v-text-field label="CERCA"></v-text-field>
                                                            <v-table density="compact">
                                                                <thead>
                                                                    <tr>
                                                                        <th>ID</th>
                                                                        <th>DATA EMISSIONE</th>
                                                                        <th>DATA SCADENZA</th>
                                                                        <th>DURATA</th>
                                                                        <th>LOGIN</th>
                                                                        <th>PASSWORD</th>
                                                                        <th>NOTE</th>
                                                                        <th>STATO</th>
                                                                        <th>PROFILE</th>
                                                                        <th>WEBSURFER ID</th>
                                                                        <th>CUSTOMER ID</th>
                                                                        <th>RESELLER ID</th>
                                                                        <th>PIN AZIENDA</th>
                                                                        <th></th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr v-for="ticket in hsComponentStore.ticketsOfAllCustomers" :key="ticket.id">
                                                                        <td>{{ ticket.id }}</td>
                                                                        <td>{{ ticket.emissionDate }}</td>
                                                                        <td>{{ ticket.expirationDate }}</td>
                                                                        <td>{{ ticket.durationDays }}</td>
                                                                        <td>{{ ticket.login }}</td>
                                                                        <td>{{ ticket.password }}</td>
                                                                        <td>{{ ticket.serialNumber }}</td>
                                                                        <td>{{ ticket.state }}</td>
                                                                        <td>{{ ticket.profile }}</td>
                                                                        <td>{{ ticket.WebsurferId }}</td>
                                                                        <td>{{ ticket.CustomerId }}</td>
                                                                        <td>{{ ticket.ResellerId }}</td>
                                                                        <td>{{ ticket.pinAzienda }}</td>
                                                                        <td>{{ ticket.note }}</td>
                                                                        <td>
                                                                            <i class="bi bi-trash" @click="openDeleteTicket(ticket)"></i>
                                                                            <i class="bi bi-pen" @click="editTicket(ticket)"></i>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </v-table>
                                                        </v-window-item>
                                                        <v-window-item value="two">
                                                            <v-card>
                                                                <v-card-title> Modifica cliente </v-card-title>
                                                                <v-card-text>
                                                                    <v-text-field v-model="selectedTicket.id" label="ID"></v-text-field>
                                                                    <v-text-field v-model="selectedTicket.emissionDate" label="DATA EMISSIONE"></v-text-field>
                                                                    <v-text-field v-model="selectedTicket.expirationDate" label="DATA SCADENZA"></v-text-field>
                                                                    <v-text-field v-model="selectedTicket.durationDays" label="DURATA (GG)"></v-text-field>
                                                                    <v-text-field v-model="selectedTicket.login" label="USERNAME"></v-text-field>
                                                                    <v-text-field v-model="selectedTicket.password" label="PASSWORD"></v-text-field>
                                                                    <v-text-field v-model="selectedTicket.serialNumber" label="N.SERIALE"></v-text-field>
                                                                    <v-text-field v-model="selectedTicket.state" label="STATO"></v-text-field>
                                                                    <v-text-field v-model="selectedTicket.profile" label="PROFILO"></v-text-field>
                                                                    <v-text-field v-model="selectedTicket.WebsurferId" label="ID_WEBSURFER"></v-text-field>
                                                                    <v-text-field v-model="selectedTicket.CustomerId" label="ID_CLIENTE"></v-text-field>
                                                                    <v-text-field v-model="selectedTicket.ResellerId" label="ID_RESELLER"></v-text-field>
                                                                    <v-text-field v-model="selectedTicket.pinAzienda" label="PIN AZIENDA"></v-text-field>
                                                                    <v-text-field v-model="selectedTicket.note" label="NOTE"></v-text-field>
                                                                    <v-row>
                                                                        <v-col>
                                                                            <v-sheet class="pa-2 ma-1" align="end">
                                                                                <i class="bi bi-arrow-left ma-1" style="font-size: xx-large" @click="goBack()"></i>
                                                                                <i class="bi bi-check-circle ma-1" style="font-size: xx-large" @click="saveWebsurfer(selectedCustomer)"></i>
                                                                            </v-sheet>
                                                                        </v-col>
                                                                    </v-row>
                                                                </v-card-text>
                                                            </v-card>
                                                        </v-window-item>
    
                                                        <v-window-item value="three">
                                                            <v-card>
                                                                <v-card-title>Conferma eliminazione</v-card-title>
                                                                <v-card-text>
                                                                    <p>Vuoi eliminare il ticket n."{{ selectedTicket.id }}"?</p>
                                                                </v-card-text>
                                                                <v-card-actions>
                                                                    <v-btn color="primary" @click="deleteUser(selectedUser)">Elimina</v-btn>
                                                                    <v-btn @click="goBack() ">Annulla</v-btn>
                                                                </v-card-actions>
                                                            </v-card>
                                                        </v-window-item>
                                                    </v-window>
                                                </v-card-text>
                                            </v-card>
                                        </section>
                                    </div>
                                </div>
                            </section>
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
export default {
    name: "Tickets",
    components: { Sidebar },
    setup() {
        const hsComponentStore = hsStore();
        return { hsComponentStore };
    },
    data() {
        return {
            tab: 'one',
            selectedTicket:'',
            payload:{

            }
        };
    },
    props: {},
    methods: {
      goBack(){
        this.selectedTicket = "";
        this.tab="one";
      },
      openDeleteTicket(ticket){
        this.selectedTicket = ticket;
        this.tab = "three";
      },
      editTicket(ticket){
        this.selectedTicket = ticket;
        this.tab="two";
      }
    },
};
</script>