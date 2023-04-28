<template>
  <v-card>
    <v-tabs v-model="tab" bg-color="#435ebe">
      <v-tab value="one" color="white">TUTTI</v-tab>
      <v-tab value="two" color="white">MODIFICA</v-tab>
      <v-tab value="three" color="white">ELIMINA</v-tab>
      <v-tab value="four" color="white">TICKET</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="one">
          <v-text-field v-model="search" label="CERCA"></v-text-field>

          <v-data-table
            :headers="headerField"
            :items="hsComponentStore.websurfers"
            :search="search"
            v-model:page.sync="page"
            :items-per-page="itemsPerPage"
            @click:row="onRowClick"
            disable-pagination
          >
            <template v-slot:[`item.actions`]="{ item }">
              <i class="bi bi-trash" @click="deleteWebsurfer(item.raw)"> </i>
              <i class="bi bi-pen" @click="editWebsurfer(item.raw)"></i>
              
            </template>
          </v-data-table>
        </v-window-item>

        <v-window-item value="two">
          <v-card>
            <v-card-title> Modifica WEBSURFER </v-card-title>
            <v-card-text>
              <v-text-field
                v-model="selectedWebsurfer.firstname"
                label="NOME"
              ></v-text-field>
              <v-text-field
                v-model="selectedWebsurfer.lastname"
                label="COGNOME"
              ></v-text-field>
              <v-text-field
                v-model="selectedWebsurfer.email"
                label="EMAIL"
              ></v-text-field>
              <v-text-field
                v-model="selectedWebsurfer.note"
                label="NOTE"
              ></v-text-field>
              <v-text-field
                v-model="selectedWebsurfer.phone"
                label="TELEFONO"
              ></v-text-field>
              <v-row>
                <v-col>
                  <v-sheet class="pa-2 ma-1" align="end">
                    <i
                      class="bi bi-arrow-left ma-1"
                      style="font-size: xx-large"
                      @click="goBack()"
                    ></i>
                    <i
                      class="bi bi-check-circle ma-1"
                      style="font-size: xx-large"
                      @click="saveWebsurfer()"
                    ></i>
                    <i class="bi bi-plus-circle ma-1"
                    style="font-size: xx-large"
                    ></i>
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
              <p>
                Vuoi eliminare il websurfer "{{ selectedWebsurfer.firstname }}"?
              </p>
            </v-card-text>
            <v-card-actions>
              <v-btn
                color="primary"
                @click="deleteWebsurfer(this.selectedWebsurfer)"
                >Elimina</v-btn
              >
              <v-btn @click="tab = 'one'">Annulla</v-btn>
            </v-card-actions>
          </v-card>
        </v-window-item>

        <v-window-item value="four">
          <v-card>
            <TableTicket />
          </v-card>
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>

<script>
import { hsStore } from "@/store/hotspotSystemStore.js";
import axios from "axios";
import TableTicket from "@/components/TableTicket.vue";
export default {
  name: "TableWebsurfer",
  setup() {
    const hsComponentStore = hsStore();
    return { hsComponentStore };
  },
  components: {TableTicket},
  data() {
    return {
      search: "",
      tab: "one",
      selectedWebsurfer: null,
      selectedClient: null,
    
      page: 1,
      itemsPerPage: 10,
     
    };
  },
  computed: {
    totalRecords() {
      return this.hsComponentStore.customerOfThisReseller.length;
    },
    pageCount() {
      return this.totalRecords / this.itemsPerPage;
    },
    headerField(){
      if(this.hsComponentStore.user.role == 'HOTEL'){
       var header = [
        { title: "ID", key: "id" },
        { title: "NOME", key: "firstname" },
        { title: "COGNOME", key: "lastname" },
        { title: "EMAIL", key: "email" },
        { title: "TELEFONO", key: "phone" },
        { title: "NOTE", key: "note" },
        { title: "SOCIAL", key: "typeSocial" },
        { title: "Actions", key: "actions" },
      ]
      }else{
        var header = [
        { title: "ID", key: "id" },
        { title: "NOME", key: "firstname" },
        { title: "COGNOME", key: "lastname" },
        { title: "EMAIL", key: "email" },
        { title: "NOTE", key: "note" },
        { title: "TELEFONO", key: "phone" },
        { title: "SOCIAL ID", key: "idSocial" },
        { title: "SOCIAL", key: "typeSocial" },
        { title: "ID_HOTEL", key: "CustomerId" },
        { title: "Actions", key: "actions" },
      ]
      }
      return header;
    }
  },
  methods: {
    onRowClick(cellData, item){
      this.selectedWebsurfer = item.item.raw;
      this.tab = "two";
    },
    editWebsurfer(websurfer) {
      console.log(websurfer);
      this.selectedWebsurfer = websurfer;
      this.tab = "two";
    },
    alertDeleteWebsurfer(websurfer) {
      this.selectedWebsurfer = websurfer;
      this.tab = "three";
    },
    goBack() {
      this.selectedWebsurfer = "";
      this.tab = "one";
    },
    saveWebsurfer() {
      axios
        .post("/admin/websurfers/update", {
          payload: this.selectedWebsurfer,
        })
        .then((response) => {
          if (response.data.status == 200) {
            this.hsComponentStore.updateWebsurfer(this.selectedWebsurfer);
            this.tab = "one";
            this.$swal(response.data.msg);
          } else {
            this.$swal(response.data.msg);
          }
        });
    },
    deleteWebsurfer(selectedWebsurfer) {
      axios
        .post("/admin/websurfers/delete", {
          payload: selectedWebsurfer,
        })
        .then((response) => {
          if (response.data.status == 200) {
            this.hsComponentStore.deleteWebsurfer(selectedWebsurfer.id);
            this.tab = "one";
            this.$swal(response.data.msg);
          } else {
            this.$swal(response.data.msg);
          }
        });
    },
  
  },
};
</script>