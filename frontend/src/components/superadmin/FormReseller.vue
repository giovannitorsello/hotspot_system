<template>
  <v-dialog v-model="dialogEditReseller" :scrim="true" persistent transition="dialog-bottom-transition">
    <v-card>
      <v-card-title> Modifica reseller </v-card-title>
      <v-tabs v-model="tabSettings" bg-color="primary">
        <v-tab value="resellerGeneralSettings">Anagrafica</v-tab>
        <v-tab value="resellerContactSettings">Contatti</v-tab>
        <v-tab value="resellerNotes">Annotazioni</v-tab>
        <v-tab value="resellerLogo">Logo</v-tab>
        <v-tab value="resellerUser">Utenti</v-tab>
      </v-tabs>
      <v-card-text>
        <v-window v-model="tabSettings">
          <v-window-item value="resellerGeneralSettings">
            <v-form ref="formGeneralSettings">
              <v-text-field v-model="selectedReseller.companyName" :rules="validationRules('companyName')" label="Denominazione"></v-text-field>
              <v-text-field v-model="selectedReseller.fiscalCode" :rules="validationRules('fiscalCode')" label="Codice fiscale"></v-text-field>
              <v-text-field v-model="selectedReseller.vatCode" :rules="validationRules('vatCode')" label="Partita IVA"></v-text-field>
              <v-text-field v-model="selectedReseller.city" :rules="validationRules('city')" label="Comune"></v-text-field>
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
          <v-window-item value="resellerContactSettings">
            <v-form ref="formContractSettings">
              <v-text-field v-model="selectedReseller.addressCompany" :rules="validationRules('address')" label="Indirizzo"></v-text-field>
              <v-text-field v-model="selectedReseller.email" :rules="validationRules('email')" label="Email" :change="changeEmail()"></v-text-field>
              <v-text-field v-model="selectedReseller.phone" :rules="validationRules('phone')" label="Telefono"></v-text-field>
              <v-text-field v-model="selectedReseller.fax" label="Fax"></v-text-field>
            </v-form>
            <v-row>
              <v-col>
                <v-sheet class="pa-2 ma-1" align="end">
                  <i class="bi bi-arrow-left ma-1" style="font-size: xx-large" @click="tabSettings = 'customerGeneralSettings'"></i>
                  <i class="bi bi-arrow-right ma-1" style="font-size: xx-large" @click="validateContractSettingsForm()"></i>
                </v-sheet>
              </v-col>
            </v-row>
          </v-window-item>
          <v-window-item value="resellerNotes">
            <v-textarea v-model="selectedReseller.note" label="Note"></v-textarea>
            <v-row>
              <v-col>
                <v-sheet class="pa-2 ma-1" align="end">
                  <i class="bi bi-arrow-left ma-1" style="font-size: xx-large" @click="exit()"></i>
                  <i class="bi bi-check-circle ma-1" style="font-size: xx-large" @click="saveCustomer(selectedReseller)"></i>
                </v-sheet>
              </v-col>
            </v-row>
          </v-window-item>
          <v-window-item value="resellerLogo">
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
          <v-window-item value="resellerUser">
            <h4 style="text-align: center">Credenziali iniziali per questo reseller</h4>
            <v-divider />
            <v-text-field v-model="selectedReseller.username" label="Username" disabled></v-text-field>
            <v-text-field
              v-model="selectedReseller.password"
              :append-inner-icon="showPass ? 'mdi mdi-eye' : 'mdi mdi-eye-off'"
              @click:append-inner="showPass = !showPass"
              :type="showPass ? 'text' : 'password'"
              label="Password"
            ></v-text-field>
            <v-row>
              <v-col>
                <v-sheet class="pa-2 ma-1" align="end">
                  <i class="bi bi-arrow-left ma-1" style="font-size: xx-large" @click="exit()"></i>
                  <i class="bi bi-check-circle ma-1" style="font-size: xx-large" @click="saveReseller(selectedReseller)"></i>
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
  import { generateRandomPassword } from "@/utils/randomPassword";
  import { rules } from "@/utils/validate";
  import utilityArrays from "@/utils/utilityArrays.js";
  import { hsStoreSuperadmin } from "@/store/storeSuperadmin.js";
  import FormUser from "@/components/superadmin/FormUser.vue";
  export default {
    name: "FormReseller",
    components: { FormUser },
    setup() {
      const hsComponentStore = hsStoreSuperadmin();
      return { hsComponentStore };
    },
    data() {
      return {
        tabSettings: "resellerGeneralSettings",
        showPass: false,
        urlLogo: {},
        selectedLogo: {},
        imageInfos: {},
        dialogEditReseller: true,
        selectedReseller: { id: 0 },
      };
    },
    mounted() {
      this.dialogEditReseller = true;
      if (this.hsComponentStore.selectedReseller) this.selectedReseller = this.hsComponentStore.selectedReseller;

      if (this.selectedReseller.id) {
        this.imageInfos.name = "logo";
        this.imageInfos.url = process.env.VUE_APP_API_ENDPOINT + "/logo/reseller_" + this.selectedReseller.id + ".jpg";
      }

      this.selectedReseller.password = generateRandomPassword(8);
    },
    methods: {
      async validateGeneralSettingsForm() {
        const { valid } = await this.$refs.formGeneralSettings.validate();
        if (valid) {
          this.tabSettings = "resellerContactSettings";
        }
      },
      async validateContractSettingsForm() {
        const { valid } = await this.$refs.formContractSettings.validate();
        if (valid) {
          this.tabSettings = "resellerDevicesSettings";
        }
      },
      async createUserForReseller(reseller) {
        var newUser = {
          role: "RESELLER",
          email: reseller.email,
          phone: reseller.phone,
          firstname: reseller.companyName,
          username: reseller.email,
          password: reseller.password,
          ResellerId: reseller.ResellerId,
          CustomerId: 0,
        };
        await axios.post("/api/user/save", { user: newUser });
      },
      validationRules(field) {
        return rules[field];
      },
      changeEmail() {
        console.log("Email is changing");
        this.selectedReseller.username = this.selectedReseller.email;
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
        formData.append("typeCompany", "reseller");
        formData.append("idCompany", this.selectedReseller.id);
        axios
          .post("/api/reseller/upload/logo", formData, {
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
      saveReseller(reseller) {
        axios
          .post("/api/reseller/save", {
            reseller: reseller,
          })
          .then(async (response) => {
            if (response.data.status == 200) {
              this.hsComponentStore.selectedReseller = response.data.reselle;
              this.createUserForReseller(response.data.reselle);
              utilityArrays.updateElementById(this.hsComponentStore.resellersOfSelectedSuperadmin, response.data.reseller);
              this.dialogEditCustomer = false;
              this.$swal(response.data.msg);
            } else {
              this.$swal(response.data.msg);
            }
          });
      },
      deleteCustomer(reseller) {
        this.$emit("deleteReseller", reseller);
      },
      editDevice(customer) {
        console.log("Selected reseller is:", reseller);
        this.hsComponentStore.selectedReseller = reseller;
        this.selectedReseller = reseller;
        this.selectedReseller.username = this.selectedReseller.email;
      },
      exit() {
        this.$emit("exitEditReseller");
      },
    },
  };
</script>
