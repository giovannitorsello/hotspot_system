<template>
  <v-dialog v-model="dialogEditCustomer" :scrim="false" transition="dialog-bottom-transition">
    <v-card>
      <v-card-title> Modifica cliente </v-card-title>
      <v-tabs v-model="tabSettings" bg-color="primary">
        <v-tab value="customerGeneralSettings">Anagrafica</v-tab>
        <v-tab value="customerContactSettings">Contatti</v-tab>
        <v-tab value="customerDevicesSettings">Dispositivi</v-tab>
        <v-tab value="customerNotes">Annotazioni</v-tab>
      </v-tabs>

      <v-card-text>
        <v-window v-model="tabSettings">
          <v-window-item value="customerGeneralSettings">
            <v-text-field v-model="selectedCustomer.companyName" label="Denominazione"></v-text-field>
            <v-text-field v-model="selectedCustomer.fiscalCode" label="Codice fiscale"></v-text-field>
            <v-text-field v-model="selectedCustomer.vatCode" label="Partita IVA"></v-text-field>
            <v-text-field v-model="selectedCustomer.city" label="Comune"></v-text-field>
            <v-row>
              <v-col>
                <v-sheet class="pa-2 ma-1" align="end">
                  <i class="bi bi-arrow-left ma-1" style="font-size: xx-large" @click="exit()"></i>
                  <i class="bi bi-check-circle ma-1" style="font-size: xx-large" @click="saveCustomer(selectedCustomer)"></i>
                </v-sheet>
              </v-col>
            </v-row>
          </v-window-item>
          <v-window-item value="customerContactSettings">
            <v-text-field v-model="selectedCustomer.addressCompany" label="Indirizzo"></v-text-field>
            <v-text-field v-model="selectedCustomer.email" label="Email"></v-text-field>
            <v-text-field v-model="selectedCustomer.phone" label="Telefono"></v-text-field>
            <v-text-field v-model="selectedCustomer.fax" label="Fax"></v-text-field>
            <v-row>
              <v-col>
                <v-sheet class="pa-2 ma-1" align="end">
                  <i class="bi bi-arrow-left ma-1" style="font-size: xx-large" @click="exit()"></i>
                  <i class="bi bi-check-circle ma-1" style="font-size: xx-large" @click="saveCustomer(selectedCustomer)"></i>
                </v-sheet>
              </v-col>
            </v-row>
          </v-window-item>
          <v-window-item value="customerDevicesSettings">
            <v-row>
              <TableDevices />
            </v-row>
            <v-row>
              <v-col>
                <FormDevice v-if="dialogEditDevice" @exitEditDevice="exitEditDevice" @saveDevice="saveDevice" />
                <v-sheet class="pa-2 ma-1" align="begin"> <v-btn density="compact" icon="mdi-plus" @click="addDevice()"> </v-btn></v-sheet>
                <v-sheet class="pa-2 ma-1" align="end">
                  <i class="bi bi-arrow-left ma-1" style="font-size: xx-large" @click="exit()"></i>
                  <i class="bi bi-check-circle ma-1" style="font-size: xx-large" @click="saveCustomer(selectedCustomer)"></i>
                </v-sheet>
              </v-col>
            </v-row>
          </v-window-item>
          <v-window-item value="customerNotes">
            <v-textarea v-model="selectedCustomer.note" label="Note"></v-textarea>
            <v-row>
              <v-col>
                <v-sheet class="pa-2 ma-1" align="end">
                  <i class="bi bi-arrow-left ma-1" style="font-size: xx-large" @click="exit()"></i>
                  <i class="bi bi-check-circle ma-1" style="font-size: xx-large" @click="saveCustomer(selectedCustomer)"></i>
                </v-sheet>
              </v-col>
            </v-row>
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
  import utilityArrays from "@/utils/utilityArrays.js";
  import { hsStoreReseller } from "@/store/storeReseller.js";
  import TableDevices from "@/components/reseller/TableDevices.vue";
  import FormDevice from "@/components/reseller/FormDevice.vue";
  import axios from "axios";
  export default {
    name: "FormCustomer",
    components: { TableDevices, FormDevice },

    setup() {
      const hsComponentStore = hsStoreReseller();
      console.log("Selected customer is:", hsComponentStore.selectedCustomer);
      return { hsComponentStore };
    },
    data() {
      return {
        dialogEditDevice: false,
        dialogEditCustomer: true,
        tabSettings: "customerGeneralSettings",
        selectedCustomer: {},
      };
    },
    mounted() {
      this.dialogEditCustomer = true;
      this.selectedCustomer = this.hsComponentStore.selectedCustomer;
      this.selectedDevice = this.hsComponentStore.selectedDevice;
    },
    methods: {
      saveCustomer() {
        this.$emit("saveCustomer", this.selectedCustomer);
      },
      deleteCustomer(customer) {
        this.$emit("deleteCustomer", customer);
      },
      editDevice(customer) {
        console.log("Selected customer is:", customer);
        this.hsComponentStore.selectedCustomer = customer;
      },
      saveDevice(device) {
        console.log("Device to be saved:", device);
        device.ResellerId = this.hsComponentStore.loggedReseller.id;
        device.CustomerId = this.hsComponentStore.selectedCustomer.id;

        axios
          .post("/api/device/save", {
            device: device,
          })
          .then((response) => {
            if (response.data.status == 200) {
              utilityArrays.updateElementById(this.hsComponentStore.devicesOfSelectedCustomer, response.data.device);
              this.dialogEditDevice = false;
            } else {
              this.$emit("saveDeviceError");
            }
          });
      },
      deleteDevice(device) {
        axios.post("/api/device/delete", { device: device }).then(async (response) => {
          if (response.data.status == 200) {
            utilityArrays.deleteElementById(this.hsComponentStore.devicesOfSelectedCustomer, device);
            this.$swal(response.data.msg);
          } else {
            utilityArrays.deleteElementById(this.hsComponentStore.devicesOfSelectedCustomer, device);
            this.$swal(response.data.msg);
          }
        });
      },
      addDevice() {
        this.hsComponentStore.selectedDevice = {};
        this.dialogEditDevice = true;
      },
      exitEditDevice() {
        this.dialogEditDevice = false;
      },
      exit() {
        this.$emit("exitEditCustomer");
      },
    },
  };
</script>
