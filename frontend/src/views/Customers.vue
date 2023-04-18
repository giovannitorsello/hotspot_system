<template>
    <div id="sidebar" class="active">
        <div class="sidebar-wrapper active">
            <div class="sidebar-header">
                <div class="d-flex justify-content-between">
                    <div class="logo">
                        <a href="index.html"><img src="/img/logo_ASYTECH.png" alt="Logo"
                                /></a>
                    </div>
                    <div class="toggler">
                        <a href="#" class="sidebar-hide d-xl-none d-block"><i class="bi bi-x bi-middle"></i
                                ></a>
                    </div>
                </div>
            </div>
            <Sidebar />
        </div>
    </div>
    <div id="main">
        <header class="mb-3">
            <a href="#" class="burger-btn d-block d-xl-none">
                            <i class="bi bi-justify fs-3"></i>
                          </a>
        </header>
    
        <div class="page-heading">
            <h3>CLIENTI</h3>
        </div>
        <div class="page-content">
            <section class="row">
                <div class="col-12 col-lg-12">
                    <div class="page-heading">
                        <section id="multiple-column-form">
                            <div class="row match-height">
                                <div class="col-12">
                                    <div class="card">
                                        <div class="card-header">
                                            <h4 class="card-title">INSERISCI CLIENTE</h4>
                                        </div>
                                        <div class="card-content">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col-md-6 col-12">
                                                        <div class="form-group">
                                                            <label>NOME</label>
                                                            <input type="text" class="form-control" name="companyName" v-model="payload.companyName" required />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-12">
                                                        <div class="form-group">
                                                            <label>CODICE FISCALE </label>
                                                            <input type="text" class="form-control" v-model="payload.fiscalCode" required />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-12">
                                                        <div class="form-group">
                                                            <label>P.IVA</label>
                                                            <input type="text" class="form-control" v-model="payload.vatCode" required />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-12">
                                                        <div class="form-group">
                                                            <label>CITTA</label>
                                                            <input type="text" class="form-control" v-model="payload.city" required />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-12">
                                                        <div class="form-group">
                                                            <label>FAX</label>
                                                            <input type="text" class="form-control" v-model="payload.fax" required />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-12">
                                                        <div class="form-group">
                                                            <label>WEB PAGE</label>
                                                            <input type="text" class="form-control" v-model="payload.web" required />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-12">
                                                        <div class="form-group">
                                                            <label>BANDA</label>
                                                            <input type="text" class="form-control" v-model="payload.defaultBandwidth" required />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-12">
                                                        <div class="form-group">
                                                            <label>NOTE</label>
                                                            <input type="text" class="form-control" v-model="payload.note" required />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-12">
                                                        <div class="form-group">
                                                            <label>INDIRIZZO</label>
                                                            <input type="text" class="form-control" v-model="payload.addessCompany" required />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-12">
                                                        <div class="form-group">
                                                            <label>TELEFONO</label>
                                                            <input type="text" class="form-control" v-model="payload.phone" required />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-12">
                                                        <div class="form-group">
                                                            <label>PIN</label>
                                                            <input type="text" class="form-control" name="pin" :value="this.randomPin">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-12">
                                                        <div class="form-group">
                                                            <label>EMAIL</label>
                                                            <input type="email" class="form-control" v-model="payload.email" required />
                                                        </div>
                                                    </div>
    
                                                    <div class="col-12 d-flex justify-content-end">
                                                        <button class="btn btn-primary me-1 mb-1" @click="submitForm()">
                                                  Inserisci
                                                </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
    
                        <section class="section">
                            <v-card>
                                <v-tabs v-model="tab" bg-color="primary" align-with-title centered>
                                    <v-tab value="one">TUTTI</v-tab>
                                    <v-tab value="two">MODIFICA</v-tab>
                                    <v-tab value="three">ELIMINA</v-tab>
                                </v-tabs>
    
                                <v-card-text>
                                    <v-window v-model="tab">
                                        <v-window-item value="one">
                                            <v-text-field v-model="search" label="CERCA"></v-text-field>
                                            <v-table density="compact" v-model="search">
                                                <thead>
    
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>DENOMINAZIONE</th>
                                                        <th>CODICE FISCALE</th>
                                                        <th>PARTITA IVA</th>
                                                        <th>COMUNE</th>
                                                        <th>FAX</th>
                                                        <th>WEB PAGE</th>
                                                        <th>BANDWITH</th>
                                                        <th>NOTE</th>
                                                        <th>INDIRIZZO</th>
                                                        <th>TELEFONO</th>
                                                        <th>PIN</th>
                                                        <th>EMAIL</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
    
                                                <tbody>
                                                    <tr v-for="customer in customers" :key="customer.id">
                                                        <td>{{ customer.id }}</td>
                                                        <td>{{ customer.companyName }}</td>
                                                        <td>{{ customer.fiscalCode }}</td>
                                                        <td>{{ customer.vatCode }}</td>
                                                        <td>{{ customer.city }}</td>
                                                        <td>{{ customer.fax }}</td>
                                                        <td>{{ customer.web }}</td>
                                                        <td>{{ customer.defaultBandwidth }}</td>
                                                        <td>{{ customer.note }}</td>
                                                        <td>{{ customer.addessCompany }}</td>
                                                        <td>{{ customer.phone }}</td>
                                                        <td>{{ customer.pin }}</td>
                                                        <td>{{ customer.email }}</td>
                                                        <td>
                                                            <i class="bi bi-trash" @click="openDeleteClient(customer)"> </i>
                                                            <i class="bi bi-pen" @click="editClient(customer)"></i>
    
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </v-table>
                                        </v-window-item>
    
                                        <v-window-item value="two">
                                            <v-card>
                                                <v-card-title>
                                                    Modifica cliente
                                                </v-card-title>
                                                <v-card-text>
                                                    <v-text-field v-model="selectedCustomer.companyName" label="Denominazione"></v-text-field>
                                                    <v-text-field v-model="selectedCustomer.fiscalCode" label="Codice fiscale"></v-text-field>
                                                    <v-text-field v-model="selectedCustomer.vatCode" label="Partita IVA"></v-text-field>
                                                    <v-text-field v-model="selectedCustomer.city" label="Comune"></v-text-field>
                                                    <v-text-field v-model="selectedCustomer.fax" label="Fax"></v-text-field>
                                                    <v-text-field v-model="selectedCustomer.web" label="Web page"></v-text-field>
                                                    <v-text-field v-model="selectedCustomer.defaultBandwidth" label="Bandwidth"></v-text-field>
                                                    <v-text-field v-model="selectedCustomer.note" label="Note"></v-text-field>
                                                    <v-text-field v-model="selectedCustomer.addessCompany" label="Indirizzo"></v-text-field>
                                                    <v-text-field v-model="selectedCustomer.phone" label="Telefono"></v-text-field>
                                                    <v-text-field v-model="selectedCustomer.pin" label="PIN"></v-text-field>
                                                    <v-text-field v-model="selectedCustomer.email" label="Email"></v-text-field>
                                                </v-card-text>
                                            </v-card>
                                        </v-window-item>
    
                                        <v-window-item value="three">
                                            <v-card>
                                                <v-card-title>Conferma eliminazione</v-card-title>
                                                <v-card-text>
                                                    <p>Vuoi eliminare il cliente "{{ selectedClient.companyName }}"?</p>
                                                </v-card-text>
                                                <v-card-actions>
                                                    <v-btn color="primary" @click="deleteClient(selectedClient)">Elimina</v-btn>
                                                    <v-btn @click="selectedClient = null">Annulla</v-btn>
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
</template>

<script>
import axios from "axios";
import Sidebar from "@/components/Sidebar.vue";
export default {
    name: "Customers",
    components: { Sidebar },
    data() {
        return {
            tab: 'one',
            search: '',
            selectedCustomer: null,
            selectedClient: null,
            randomPin: '',
            payload: {
                companyName: "",
                fiscalCode: "",
                vatCode: "",
                city: "",
                fax: "",
                web: "",
                defaultBandwidth: "",
                note: "",
                addessCompany: "",
                phone: "",
                email: "",
            },
        };
    },
    computed:{
        customers() {
      return this.$store.state.dataUser.customerOfThisReseller; // leggi lo stato dell'elenco dei dati dallo store
    },
    },
    methods: {
        openDeleteClient(client) {
      this.selectedClient = client;
      this.tab = 'three';
    },
    deleteClient(client) {
      this.$store.commit('DELETE_CUSTOMER', client.id);
      this.selectedClient = null;
    },
        editClient(customer) {
            this.selectedCustomer = customer;
            this.tab = 'two';
        },
        submitForm() {
            this.payload.pin = this.randomPin;
            this.payload.ResellerId = this.$store.state.user.ResellerId;
          /*  this.$store.dispatch('addCustomer',this.payload); */
             axios.post("http://localhost/admin/customers/insert", {
                    payload: this.payload,
                })
                .then((response) => {
                    if (response.data.status == 200) {
                        console.log(response.data);
                        this.$swal(response.data.msg);
                        /* this.$store.dispatch('fetchAllData'); */
                    } else {
                        this.$swal(response.data.msg);
                    }
                }); 
        },
     
        createRandomPin() {
            const chars = '0123456789';
            for (let i = 0; i < 5; i++) {
                const randomIndex = Math.floor(Math.random() * chars.length);
                this.randomPin += chars[randomIndex];
            }
        },
        openClient(x) {
            console.log(x);
        }
    },
    created() {
        this.createRandomPin();
    },

};
</script>
