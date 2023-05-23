<template>
  <v-dialog v-model="dialogEditCustomer" :scrim="false" transition="dialog-bottom-transition">
    <v-card>
      <v-card-title> Modifica cliente </v-card-title>
      <v-tabs v-model="tabSettings" bg-color="primary">
        <v-tab value="customerGeneralSettings">Anagrafica</v-tab>
        <v-tab value="customerContactSettings">Contatti</v-tab>
        <v-tab value="customerDevicesSettings">Dispositivi</v-tab>
        <v-tab value="customerNotes">Annotazioni</v-tab>
        <v-tab value="customerLogo">Logo</v-tab>
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
          <v-window-item value="customerLogo">
            <v-form id="formLogo">
              <v-file-input v-model="selectedLogo" show-size label="Seleziona logo" accept="image/*" @change="uploadLogo()"></v-file-input>

              <v-alert v-if="messageUploadLogo" border="left" color="blue-grey" dark>
                {{ messageUploadLogo }}
              </v-alert>
              <v-card v-if="imageInfos" class="mx-auto">
                <v-list>
                  <v-subheader>Dettagli immagine</v-subheader>
                  <v-list-item-group color="primary">
                    <v-list-item>
                      <a :href="imageInfos.url">{{ imageInfos.name }}</a>
                      <v-img class="bg-white" width="300" :aspect-ratio="1" :src="imageInfos.url" cover></v-img>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-card>
            </v-form>
            <v-row>
              <v-col>
                <v-sheet class="pa-2 ma-1" align="end">
                  <i class="bi bi-arrow-left ma-1" style="font-size: xx-large" @click="exit()"></i>
                  <i class="bi bi-check-circle ma-1" style="font-size: xx-large" @click="changeLogo(urlLogo)"></i>
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
  import axios from "axios";
  import UploadLogoService from "@/services/UploadLogoService";
  import utilityArrays from "@/utils/utilityArrays.js";
  import { hsStoreReseller } from "@/store/storeReseller.js";
  import TableDevices from "@/components/reseller/TableDevices.vue";
  import FormDevice from "@/components/reseller/FormDevice.vue";
  export default {
    name: "FormCustomer",
    components: { TableDevices, FormDevice },

    setup() {
      const hsComponentStore = hsStoreReseller();
      return { hsComponentStore };
    },
    data() {
      return {
        urlLogo: {},
        selectedLogo: {},
        imageInfos: {},
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
      this.imageInfos.name = "logo";
      this.imageInfos.url = process.env.VUE_APP_API_ENDPOINT + "/logo/customer_" + this.selectedCustomer.id + ".jpg";
    },
    methods: {
      changeLogo() {
        console.log("Entering change logo");
        if (this.selectedLogo && this.selectedLogo.length === 1) this.previewLogo = URL.createObjectURL(this.selectedLogo[0]);
        this.uploadLogo();
      },

      uploadLogo() {
        console.log("Entering upload logo");
        if (!this.selectedLogo) {
          this.message = "Please select an image!";
          return;
        }

        this.imageInfos.url = "";
        this.imageInfos.name = "";

        console.log("File is:", this.selectedLogo);
        let formData = new FormData();
        formData.append("companyLogo", this.selectedLogo[0]);
        formData.append("typeCompany", "customer");
        formData.append("idCompany", this.selectedCustomer.id);

        axios
          .post("/api/customer/upload/logo", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            console.log("File uploaded: ", result.data);
            this.imageInfos = result.data.companyLogo;
            this.imageInfos.url = result.data.companyLogo.url + "?rnd=" + new Date().getTime();
          })
          .catch((error) => {
            this.messageUploadLogo = "Errore in logo upload " + error;
            this.selectedLogo = null;
          });
      },
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
