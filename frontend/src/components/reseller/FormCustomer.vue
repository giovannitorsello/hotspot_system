<template>
  <v-dialog v-model="dialogEditCustomer" :scrim="true" persistent transition="dialog-bottom-transition">
    <v-card>
      <v-card-title> Modifica cliente </v-card-title>
      <v-tabs v-model="tabSettings" bg-color="primary">
        <v-tab value="customerGeneralSettings">Anagrafica</v-tab>
        <v-tab value="customerContactSettings">Contatti</v-tab>
        <v-tab value="customerDevicesSettings">Dispositivi</v-tab>
        <v-tab value="customerNotes">Annotazioni</v-tab>
        <v-tab value="customerLogo">Logo</v-tab>
        <v-tab value="customerUser">Utenti</v-tab>
      </v-tabs>
      <v-card-text>
        <v-window v-model="tabSettings">
          <v-window-item value="customerGeneralSettings">
            <v-form ref="formGeneralSettings">
            <v-text-field v-model="selectedCustomer.companyName" :rules="validationRules('companyName')" label="Denominazione"></v-text-field>
            <v-text-field v-model="selectedCustomer.fiscalCode"  :rules="validationRules('fiscalCode')" label="Codice fiscale"></v-text-field>
            <v-text-field v-model="selectedCustomer.vatCode"  :rules="validationRules('vatCode')" label="Partita IVA"></v-text-field>
            <v-text-field v-model="selectedCustomer.city" :rules="validationRules('city')" label="Comune"></v-text-field>
            <v-row>
              <v-col>
                <v-sheet class="pa-2 ma-1" align="end">
                  <i class="bi bi-arrow-left ma-1" style="font-size: xx-large" @click="exit()"></i>
                  <i class="bi bi-arrow-right ma-1" style="font-size: xx-large" @click="validateGeneralSettingsForm()"></i>
                </v-sheet>
              </v-col>
            </v-row>
            </v-form>
          </v-window-item>
          <v-window-item value="customerContactSettings">
            <v-form ref="formContractSettings">
            <v-text-field v-model="selectedCustomer.addessCompany" :rules="validationRules('address')"  label="Indirizzo"></v-text-field>
            <v-text-field v-model="selectedCustomer.email" :rules="validationRules('email')" label="Email"></v-text-field>
            <v-text-field v-model="selectedCustomer.phone" :rules="validationRules('phone')"  label="Telefono"></v-text-field>
            <v-text-field v-model="selectedCustomer.fax" label="Fax"></v-text-field>
          </v-form>
            <v-row>
              <v-col>
                <v-sheet class="pa-2 ma-1" align="end">
                  <i class="bi bi-arrow-left ma-1" style="font-size: xx-large" @click="tabSettings='customerGeneralSettings'"></i>
                  <i class="bi bi-arrow-right ma-1" style="font-size: xx-large" @click="validateContractSettingsForm()"></i>
                </v-sheet>
              </v-col>
            </v-row>
          </v-window-item>
          <v-window-item value="customerDevicesSettings">
              <TableDevices />
            <v-row>
              <v-col>
                <FormDevice v-if="dialogEditDevice" @exitEditDevice="exitEditDevice" @saveDevice="saveDevice" />
                <v-sheet class="pa-2 ma-1" align="begin"> <v-btn density="compact" icon="bi bi-plus" @click="addDevice()"> </v-btn></v-sheet>
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
              <v-file-input v-model="selectedLogo" show-size label="Seleziona logo" accept="image/jpeg, image/jpg" @change="uploadLogo()"></v-file-input>
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
          <v-window-item value="customerUser">
            <h4 style="text-align:center">Credenziali d'accesso al sistema per questo cliente</h4>
            <v-divider />
            <v-text-field v-model="selectedCustomer.username"  label="Username"></v-text-field>
            <v-text-field
            v-model="selectedCustomer.password"
            :append-inner-icon="showPass ? 'mdi mdi-eye' : 'mdi mdi-eye-off'"
            @click:append-inner="showPass = !showPass"
            :type="showPass ? 'text' : 'password'"
            label="Password"></v-text-field>
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
  <SnackbarMessage ref="snackbarMessage" />
</template>
<script>
  import axios from "axios";
  import { generateRandomPassword } from "@/utils/randomPassword";
  import { rules } from "@/utils/validate";
  import UploadLogoService from "@/services/UploadLogoService";
  import utilityArrays from "@/utils/utilityArrays.js";
  import { hsStoreReseller } from "@/store/storeReseller.js";
  import TableDevices from "@/components/reseller/TableDevices.vue";
  import FormDevice from "@/components/reseller/FormDevice.vue";
  import FormUser from "@/components/reseller/FormUser.vue";
  import SnackbarMessage from "../general/SnackbarMessage.vue";
  export default {
    name: "FormCustomer",
    components: { TableDevices, FormDevice, FormUser,SnackbarMessage },
    setup() {
      const hsComponentStore = hsStoreReseller();
      return { hsComponentStore };
    },
    data() {
      return {
        showPass:false,
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
      async validateGeneralSettingsForm(){
        const {valid} = await this.$refs.formGeneralSettings.validate();
        if(valid){
          this.tabSettings = "customerContactSettings"
        }
      },
      async validateContractSettingsForm(){
        const {valid} = await this.$refs.formContractSettings.validate();
        if(valid){
          this.tabSettings = "customerDevicesSettings"
        }
      },
      async createUserForCustomer(customer){
        var newUser={
          role: "CUSTOMER",
          email: customer.email,
          phone: customer.phone,
          firstname: customer.companyName,
          username: customer.email,
          password: generateRandomPassword(8),
          ResellerId: customer.ResellerId,
          CustomerId: customer.id
        }
        await axios.post("/api/user/save",{user: newUser});
      },
      validationRules(field) {
      return rules[field];
      },
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
            this.selectedLogo = null;
          });
      },
      saveCustomer(customer) {
        customer.ResellerId = this.hsComponentStore.loggedReseller.id;
        axios
          .post("/api/customer/save", {
            customer: customer,
          })
          .then(async (response) => {
            if (response.data.status == 200) {
              this.hsComponentStore.selectedCustomer = response.data.customer;
              this.createUserForCustomer(response.data.customer);
              utilityArrays.updateElementById(this.hsComponentStore.customersOfSelectedReseller, response.data.customer);
              this.dialogEditCustomer = false;
              this.$refs.snackbarMessage.open(response.data.msg, "info");
             
            } else {
              this.$refs.snackbarMessage.open(response.data.msg, "error");
              
            }
          });
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
            this.$refs.snackbarMessage.open(response.data.msg, "info");
          } else {
            utilityArrays.deleteElementById(this.hsComponentStore.devicesOfSelectedCustomer, device);
            this.$refs.snackbarMessage.open(response.data.msg, "error");
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
