<template>
    <div id="sidebar" class="active">
        <div class="sidebar-wrapper active">
            <div class="sidebar-header">
                <div class="d-flex justify-content-between">
                    <div class="logo">
                        <a href="index.html"><img src="/img/logo_ASYTECH.png" alt="Logo"></a>
                    </div>
                    <div class="toggler">
                        <a href="#" class="sidebar-hide d-xl-none d-block"><i class="bi bi-x bi-middle"></i></a>
                    </div>
                </div>
            </div>
            <Sidebar/>
    
        </div>
    </div>
    <div id="main">
        <header class="mb-3">
            <a href="#" class="burger-btn d-block d-xl-none">
                            <i class="bi bi-justify fs-3"></i>
                        </a>
        </header>
    
        <div class="page-heading">
            <h3>WEBSURFER</h3>
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
                                            <h4 class="card-title">INSERISCI NUOVO OSPITE</h4>
                                        </div>
                                        <div class="card-content">
                                            <div class="card-body">
                                                    <div class="row">
                                                        <div class="col-md-6 col-12">
                                                            <div class="form-group">
                                                                <label for="first-name-column">Nome</label>
                                                                <input type="text" class="form-control" v-model="payload.firstname">
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6 col-12">
                                                            <div class="form-group">
                                                                <label for="last-name-column">Cognome</label>
                                                                <input type="text" class="form-control"  v-model="payload.lastname" >
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6 col-12">
                                                            <div class="form-group">
                                                                <label for="city-column">Email</label>
                                                                <input type="text" class="form-control"  v-model="payload.email" >
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6 col-12">
                                                            <div class="form-group">
                                                                <label for="country-floating">Telefono</label>
                                                                <input type="text" class="form-control" v-model="payload.phone" >
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6 col-12">
                                                            <div class="form-group">
                                                                <label for="company-column">Note</label>
                                                                <input type="text" class="form-control"  v-model="payload.note" >
                                                            </div>
                                                        </div>
    
                                                        <div class="col-12 d-flex justify-content-end">
                                                            <button type="submit" class="btn btn-primary me-1 mb-1" @click="insertWebsurfer()">Inserisci</button>
    
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
                                <v-tabs v-model="tab" bg-color="primary">
                                    <v-tab value="one">WEBSURFER</v-tab>
                                    <v-tab value="two">MODIFICA</v-tab>
                                    <v-tab value="three">ELIMINA</v-tab>
                                </v-tabs>
    
                                <v-card-text>
                                    <v-window v-model="tab">
                                        <v-window-item value="one">
                                            <v-text-field  label="CERCA"></v-text-field>
                                            <v-table>
                                                <thead>
    
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>NOME</th>
                                                        <th>COGNOME</th>
                                                        <th>EMAIL</th>
                                                        <th>TELEFONO</th>
                                                        <th>NOTE</th>
                                                        <th>ID_SOCIAL</th>
                                                        <th>TYPE_SOCIAL</th>
                                                        <th>CLIENTE</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
    
                                                <tbody>
                                                    <tr v-for="websurfer in this.userDataStore.websurfers" :key="websurfer.id">
                                                        <td>{{ websurfer.id }}</td>
                                                        <td>{{ websurfer.firstname }}</td>
                                                        <td>{{ websurfer.lastname }}</td>
                                                        <td>{{ websurfer.email }}</td>
                                                        <td>{{ websurfer.phone }}</td>
                                                        <td>{{ websurfer.note }}</td>
                                                        <td>{{ websurfer.idSocial }}</td>
                                                        <td>{{ websurfer.typeSocial }}</td>
                                                        <td>{{ websurfer.CustomerId }}</td>
                                                        <td>
                                                            <i class="bi bi-trash" @click="alertDeleteWebsurfer(websurfer)"> </i>
                                                            <i class="bi bi-pen" @click="editWebsurfer(websurfer)"></i>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </v-table>
                                        </v-window-item>
    
                                        <v-window-item value="two">
                                            <v-card>
                                                <v-card-title>
                                                    Modifica WEBSURFER
                                                </v-card-title>
                                                <v-card-text>
                                                    <v-text-field v-model="selectedWebsurfer.firstname" label="NOME"></v-text-field>
                                                    <v-text-field v-model="selectedWebsurfer.lastname" label="COGNOME"></v-text-field>
                                                    <v-text-field v-model="selectedWebsurfer.email" label="EMAIL"></v-text-field>
                                                    <v-text-field v-model="selectedWebsurfer.note" label="NOTE"></v-text-field>
                                                    <v-text-field v-model="selectedWebsurfer.phone" label="TELEFONO"></v-text-field>
                                                        <v-row>
                                                            <v-col>
                                                                <v-sheet class="pa-2 ma-1" align="end">
                                                                    <i class="bi bi-arrow-left ma-1" style="font-size:xx-large" @click="goBack()"></i>
                                                                    <i class="bi bi-check-circle ma-1" style="font-size:xx-large" @click="saveWebsurfer()"></i>
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
                                                    <p>Vuoi eliminare il websurfer "{{ selectedWebsurfer.firstname }}"?</p>
                                                </v-card-text>
                                                <v-card-actions>
                                                    <v-btn color="primary" @click="deleteWebsurfer(this.selectedWebsurfer)">Elimina</v-btn>
                                                    <v-btn @click="tab = 'one'">Annulla</v-btn>
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
import { useUserStore } from "@/store/counter";
import Sidebar from '@/components/Sidebar.vue';
import axios from 'axios';
export default {
    name: "Websurfers",
    components: { Sidebar },
    setup(){
        const userDataStore = useUserStore()

        return { userDataStore }
    },

    data() {
        return {
            table:[],
            tab: 'one',
            selectedWebsurfer: null,
            selectedClient: null,
            payload: {
                firstname: "",
                lastname: "",
                email: "",
                note: "",
                phone: "",
            }
        };
    },
    methods: {
        editWebsurfer(websurfer) {
            this.selectedWebsurfer = websurfer;
            this.tab = 'two';
        },
        alertDeleteWebsurfer(websurfer){
            this.selectedWebsurfer = websurfer;
            this.tab='three';
        },
        goBack(){
            this.selectedWebsurfer = '';
            this.tab = 'one';
        },
        saveWebsurfer(){
            axios.post('http://localhost/admin/websurfers/update',{
                payload:this.selectedWebsurfer
            }).then((response) =>{
                if(response.data.status == 200){

                    this.userDataStore.updateWebsurfer(this.selectedWebsurfer);
                    this.tab = 'one';
                    this.$swal(response.data.msg);
                }else{
                    this.$swal(response.data.msg);
                }
            })
        },
        deleteWebsurfer(selectedWebsurfer){
            axios.post("http://localhost/admin/websurfers/delete", {
                payload: selectedWebsurfer
            }).then((response) => {
                if(response.data.status == 200){
                    this.userDataStore.deleteWebsurfer(selectedWebsurfer.id)
                    this.tab = 'one';
                    this.$swal(response.data.msg);
                }else{
                    this.$swal(response.data.msg);
                }
            })
        },
        insertWebsurfer(){
            this.payload.CustomerId = this.userDataStore.user.CustomerId
           
             axios.post("http://localhost/admin/websurfers/insert", {
                payload:this.payload
            }).then((response) => {
                console.log(response);
                if(response.data.status == 200){
                    this.userDataStore.addWebsurfer(response.data.result);
                    this.$swal(response.data.msg);
                }else{
                    this.$swal(response.data.msg);
                }
            }) 
        }
    },
};
</script>
