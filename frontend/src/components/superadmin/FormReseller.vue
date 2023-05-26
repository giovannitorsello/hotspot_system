<template>
  <v-window v-model="activeStep">
    <v-window-item :value="1">
      <v-card>
        <v-card-title class="text-h6"> ANAGRAFICA </v-card-title>
        <v-form ref="form">
          <div class="row m-2 -align-center">
            <div class="col-md-6 col-12">
              <div class="form-group">
                <v-text-field
                  v-model="payload.companyName"
                  :rules="validationRules('companyName')"
                  label="*Denominazione"
                  variant="outlined"
                ></v-text-field>
              </div>
            </div>
            <div class="col-md-6 col-12">
              <div class="form-group">
                <v-text-field
                  v-model="payload.fiscalCode"
                  :rules="validationRules('fiscalCode')"
                  label="*Codice Fiscale"
                  variant="outlined"
                ></v-text-field>
              </div>
            </div>
            <div class="col-md-6 col-12">
              <div class="form-group">
                <v-text-field
                  label="*P.iva"
                  v-model="payload.vatCode"
                  variant="outlined"
                  :rules="validationRules('vatCode')"
                ></v-text-field>
              </div>
            </div>
          </div>
        </v-form>
        <div class="row justify-content-center">
          <div class="col-sm-1">
            <v-btn class="btn-formReseller" @click="isValidateFirstStep()"
              >Next</v-btn
            >
          </div>
        </div>
      </v-card>
    </v-window-item>

    <v-window-item :value="2">
      <v-card>
        <v-card-title class="text-h6"> DATI CONTATTO </v-card-title>
        <v-form ref="form1">
          <div class="row m-2 content-align-center">
            <div class="col-md-6 col-12">
              <div class="form-group">
                <v-text-field
                  label="*Comune"
                  v-model="payload.city"
                  :rules="validationRules('city')"
                  variant="outlined"
                ></v-text-field>
              </div>
            </div>
            <div class="col-md-6 col-12">
              <div class="form-group">
                <v-text-field
                  label="Fax"
                  v-model="payload.fax"
                  variant="outlined"
                ></v-text-field>
              </div>
            </div>
            <div class="col-md-6 col-12">
              <div class="form-group">
                <v-text-field
                  v-model="payload.addessCompany"
                  :rules="validationRules('address')"
                  label="*Indirizzo"
                  variant="outlined"
                ></v-text-field>
              </div>
            </div>
            <div class="col-md-6 col-12">
              <div class="form-group">
                <v-text-field
                  v-model="payload.phone"
                  :rules="validationRules('phone')"
                  label="*Telefono"
                  variant="outlined"
                ></v-text-field>
              </div>
            </div>
            <div class="col-md-6 col-12">
              <div class="form-group">
                <v-text-field
                  label="*Email"
                  v-model="payload.email"
                  variant="outlined"
                  :rules="validationRules('email')"
                ></v-text-field>
              </div>
            </div>
          </div>
        </v-form>
        <div class="row justify-content-center">
          <div class="row">
            <v-btn class="btn-formReseller" @click="prevStep">Previous</v-btn>
            <v-btn class="btn-formReseller" @click="isValidateSecondStep()"
              >Next</v-btn
            >
          </div>
        </div>
      </v-card>
    </v-window-item>

    <v-window-item :value="3">
      <v-card>
        <v-card-title class="text-h6"> IMPOSTAZIONI </v-card-title>
        <v-form ref="form2">
          <div class="row m-2 content-align-center">
            <div class="col-md-6 col-12">
              <div class="form-group">
                <v-text-field
                  label="Web"
                  v-model="payload.web"
                  variant="outlined"
                ></v-text-field>
              </div>
            </div>
            <div class="col-md-6 col-12">
              <div class="form-group">
                <v-text-field
                  label="Note"
                  v-model="payload.note"
                  variant="outlined"
                ></v-text-field>
              </div>
            </div>
          </div>
        </v-form>
        <div class="row-md-3">
          <v-btn class="btn-formReseller" @click="prevStep">Previous</v-btn>
          <v-btn class="btn-formReseller" @click="isValidAll">Inserisci</v-btn>
        </div>
      </v-card>
    </v-window-item>
  </v-window>
</template>
<script>
import { hsStoreSuperadmin } from "@/store/storeSuperadmin.js";
import { VWindow, VWindowItem } from "vuetify/lib/components/VWindow";
import { rules } from "@/utils/validate";
import axios from "axios";
export default {
  components: {
    VWindow,
    VWindowItem,
  },
  setup() {
    const hsComponentStore = hsStoreSuperadmin();
    return { hsComponentStore };
  },
  data() {
    return {
      payload: {
        pin: "",
        fiscalCode: "",
      },
      activeStep: 1,
    };
  },

  methods: {
    validationRules(field) {
      return rules[field];
    },
    nextStep() {
      this.activeStep += 1;
    },
    prevStep() {
      this.activeStep -= 1;
    },
    async isValidateFirstStep() {
      const { valid } = await this.$refs.form.validate();
      if (valid) this.activeStep += 1;
    },
    async isValidateSecondStep() {
      const { valid } = await this.$refs.form1.validate();
      if (valid) this.activeStep += 1;
    },
    async isValidAll() {
      const { valid } = await this.$refs.form2.validate();
      if (valid) {
        axios
          .post("/admin/reseller/insert", { payload: this.payload })
          .then((response) => {
            if (response.data.status == 200) {
              this.hsComponentStore.addReseller(response.data.newReseller);
              this.$swal(response.data.msg);
              this.payload = {};
              this.activeStep = 1;
            } else {
              this.$swal(response.data.msg);
            }
          });
      }
    },
  },
};
</script>
<style scoped>
.btn-formReseller {
  margin-bottom: 10px;
}
</style>