<template>
  <v-card>
    <v-tabs v-model="tab" bg-color="#435ebe">
      <v-tab value="one" color="white">Dispositivi</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="one">
          <v-text-field label="CERCA"></v-text-field>
          <v-data-table
            :headers="header"
            :items="hsComponentStore.devicesOfSelectedCustomer"
            :search="search"
            :page.sync="page"
            :items-per-page="itemsPerPage"
            :hide-default-header="true"
            :hide-default-footer="true"
            disable-pagination
            @click:row="selectTicket"
          >
            <template v-slot:[`item.actions`]="{ item }">
              <i class="bi bi-trash" @click="deleteDevice(item.raw)"> </i>
            </template>
          </v-data-table>
        </v-window-item>
        <v-window-item value="two">
          <v-card>
            <v-card-title> Modifica dispositivo </v-card-title>
            <v-card-text>
              <v-text-field v-model="selectedDevice.description" label="Descrizione"></v-text-field>
              <v-text-field v-model="selectedDevice.addressSetup" label="Sede"></v-text-field>
              <v-text-field v-model="selectedDevice.ipv4" label="IPV4"></v-text-field>
              <v-text-field v-model="selectedDevice.ipv6" label="IPV6"></v-text-field>
              <v-text-field v-model="selectedDevice.pin" label="Pin configurazione"></v-text-field>
              <v-text-field v-model="selectedDevice.defaultBandwidth" label="Banda default"></v-text-field>
              <v-text-field v-model="selectedDevice.bandwidthProfiles" label="Profili banda"></v-text-field>
              <v-text-field v-model="selectedDevice.websurferCustomFields" label="Campi custom"></v-text-field>
              <v-text-field v-model="selectedDevice.preAuthLandingPage" label="Pagina pre auth"></v-text-field>
              <v-text-field v-model="selectedDevice.postAuthLandingPage" label="Pagina post auth"></v-text-field>
              <v-text-field v-model="selectedDevice.deviceAuthProperties" label="Props monitoring"></v-text-field>
              <v-row>
                <v-col>
                  <v-sheet class="pa-2 ma-1" align="end">
                    <i class="bi bi-arrow-left ma-1" style="font-size: xx-large" @click="goBack()"></i>
                    <i class="bi bi-check-circle ma-1" style="font-size: xx-large" @click="saveDevice(selectedDevice)"></i>
                  </v-sheet>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-window-item>
        <v-window-item value="three">
          <v-card>
            <v-card-title>Conferma dispositivo</v-card-title>
            <v-card-text>
              <p>Vuoi eliminare il dispositivo n."{{ selectedDevice.description }}"?</p>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" @click="deleteUser(selectedUser)">Elimina</v-btn>
              <v-btn @click="goBack()">Annulla</v-btn>
            </v-card-actions>
          </v-card>
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>

<script>
  import { hsStoreCustomer } from "@/store/storeCustomer.js";
  import generateRandomCredentials from "@/utils/random";
  export default {
    name: "TableTicket",
    setup() {
      const hsComponentStore = hsStoreCustomer();
      return { hsComponentStore };
    },
    data() {
      return {
        tab: "",
        selectedDevice: "",
        search: "",
        header: [
          { title: "Descrizione", key: "description" },
          { title: "Sede", key: "setupAddress" },
          { title: "IPV4", key: "ipv4" },
          { title: "IPV6", key: "ipv6" },
          { title: "Banda default", key: "defaultBandwidth" },
        ],
        page: 1,
        itemsPerPage: 10,
      };
    },
    computed: {},
    props: {},
    methods: {
      insertDevice() {
        this.selectedDevice.CustomerId = this.hsComponentStore.loggedCustomer.id;
        axios
          .post("/api/devices/insert", {
            device: this.selectedDevice,
          })
          .then((response) => {
            console.log(response);
            if (response.data.status == 200) {
              this.hsComponentStore.devicesOfSelectedCustomer.push(response.data.result);
              this.$swal(response.data.msg);
            } else {
              this.$swal(response.data.msg);
            }
          });
      },
      deleteDevice(device) {
        axios.post("/api/device/delete", { device: device }).then(async (response) => {
          if (response.data.status == 200) {
            utilityArrays.deleteElementById(this.hsComponentStore.devicesOfSelectedCustomer, device.id);
            this.$swal(response.data.msg);
          } else {
            this.$swal(response.data.msg);
          }
        });
      },
      selectDevice(row, object) {
        var deviceId = object.item.columns.id;
      },
    },
  };
</script>
