<template>
  <v-card>
    <v-tabs v-model="tab" bg-color="#435ebe">
      <v-tab value="one" color="white">TUTTI</v-tab>
      <v-tab value="two" color="white">MODIFICA</v-tab>
      <v-tab value="three" color="white">ELIMINA</v-tab>
    </v-tabs>
    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="one">
          <v-text-field v-model="search" label="CERCA"></v-text-field>
          <v-data-table
          :headers="headers"
            :items="hsComponentStore.customerOfThisReseller"
            :search="search"
            :page.sync="page"
            :items-per-page="itemsPerPage"
            :hide-default-header="true" :hide-default-footer="true" 
            disable-pagination>
          </v-data-table>
        <div :hidden="true">
 <!--    <v-table density="compact">
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
                           <tr v-for="customer in hsComponentStore.customerOfThisReseller" :key="customer.id">
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
                       </v-table> -->


          
        </div>
         
        </v-window-item>
        <v-window-item value="two">
          <v-card>
            <v-card-title> Modifica cliente </v-card-title>
            <v-card-text>
              <v-text-field
                v-model="selectedCustomer.companyName"
                label="Denominazione"
              ></v-text-field>
              <v-text-field
                v-model="selectedCustomer.fiscalCode"
                label="Codice fiscale"
              ></v-text-field>
              <v-text-field
                v-model="selectedCustomer.vatCode"
                label="Partita IVA"
              ></v-text-field>
              <v-text-field
                v-model="selectedCustomer.city"
                label="Comune"
              ></v-text-field>
              <v-text-field
                v-model="selectedCustomer.fax"
                label="Fax"
              ></v-text-field>
              <v-text-field
                v-model="selectedCustomer.web"
                label="Web page"
              ></v-text-field>
              <v-text-field
                v-model="selectedCustomer.defaultBandwidth"
                label="Bandwidth"
              ></v-text-field>
              <v-text-field
                v-model="selectedCustomer.note"
                label="Note"
              ></v-text-field>
              <v-text-field
                v-model="selectedCustomer.addessCompany"
                label="Indirizzo"
              ></v-text-field>
              <v-text-field
                v-model="selectedCustomer.phone"
                label="Telefono"
              ></v-text-field>
              <v-text-field
                v-model="selectedCustomer.pin"
                label="PIN"
              ></v-text-field>
              <v-text-field
                v-model="selectedCustomer.email"
                label="Email"
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
                      @click="saveWebsurfer(selectedCustomer)"
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
                Vuoi eliminare il cliente "{{ selectedClient.companyName }}"?
              </p>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" @click="deleteClient(selectedClient)"
                >Elimina</v-btn
              >
              <v-btn @click="selectedClient = null">Annulla</v-btn>
            </v-card-actions>
          </v-card>
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>

<script>
import { hsStore } from "@/store/hotspotSystemStore.js";
export default {
  name: "Test",
  created() {},
  setup() {
    const hsComponentStore = hsStore();
    return { hsComponentStore };
  },
  data() {
    return {
      items: [],
      search: "",
      tab: "one",
      headers: [
        { text: "ID", value: "id",label:"ID",align:'left' },
        { text: "NOME", value: "companyName" },
        { text: "EMAIL", value: "email" },
        { text: "PIN", value: "pin" },
        { text: "WEB", value: "web" },
        
        { text: "P.IVA", value: "vatCode" },
      ],
      page: 1,
      itemsPerPage: 1,
    };
  },
  computed: {
    totalRecords() {
      return this.hsComponentStore.customerOfThisReseller.length;
    },
    pageCount() {
      return this.totalRecords / this.itemsPerPage;
    },
  },
  props: {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>