<template>
  <v-dialog v-model="dialogEditWebsurfer">
    <v-card>
      <template v-slot:title> Inserisci cliente </template>
      <template v-slot:append>
        <v-icon icon="mdi-close" size="large" @click="exit"></v-icon>
      </template>
      <v-tabs v-model="tabSettings" align-tabs="center" bg-color="primary">
        <v-tab value="generalWebsurfer">Anagrafica</v-tab>
        <v-tab value="ticketWebsurfer">Ticket</v-tab>
      </v-tabs>
      <v-window v-model="tabSettings">
        <v-window-item value="generalWebsurfer">
          <v-card-text>
            <v-form ref="formGeneralWebsurfer">
              <v-text-field
                v-model="selectedWebsurfer.firstname"
                :rules="validationRules('firstname')"
                label="Nome"
              ></v-text-field>
              <v-text-field
                v-model="selectedWebsurfer.lastname"
                :rules="validationRules('lastname')"
                label="Cognome"
              ></v-text-field>
              <v-text-field
                v-model="selectedWebsurfer.email"
                :rules="validationRules('email')"
                label="Email"
              ></v-text-field>
              <v-text-field
                v-model="selectedWebsurfer.phone"
                :rules="validationRules('phone')"
                label="Telefono"
              ></v-text-field>
              <v-text-field
                v-model="selectedWebsurfer.note"
                label="NOTE"
              ></v-text-field>
            </v-form>
            <v-row>
              <v-col>
                <v-sheet class="pa-2 ma-1" align="end">
                  <i
                    class="bi bi-arrow-right ma-1"
                    style="font-size: xx-large"
                    @click="validateFormGeneralWebsurfer()"
                  ></i>
                </v-sheet>
              </v-col>
            </v-row>
          </v-card-text>
        </v-window-item>
        <v-window-item value="ticketWebsurfer">
          <v-card-text>
            <TableTickets />
            <v-row>
              <v-col>
                <v-sheet class="pa-2 ma-1" align="end">
                  <i
                    class="bi bi-check-circle ma-1"
                    style="font-size: xx-large"
                    @click="saveWebsurfer(selectedWebsurfer)"
                  ></i>
                </v-sheet>
              </v-col>
            </v-row>
          </v-card-text>
        </v-window-item>
      </v-window>
    </v-card>
  </v-dialog>
</template>
<script>
import { rules } from "@/utils/validate";
import { hsStoreCustomer } from "@/store/storeCustomer.js";
import TableTickets from "@/components/customer/TableTickets.vue";

export default {
  name: "FormWebsurfer",
  components: { TableTickets },
  setup() {
    const hsComponentStore = hsStoreCustomer();
    return { hsComponentStore };
  },
  data() {
    return {
      tabSettings: "generalWebsurfer",
      selectedWebsurfer: {},
      dialogEditWebsurfer: true,
    };
  },
  mounted() {
    this.dialogEditWebsurfer = true;
    if (this.hsComponentStore.selectedWebsurfer)
      this.selectedWebsurfer = this.hsComponentStore.selectedWebsurfer;
  },
  methods: {
    async validateFormGeneralWebsurfer() {
      const { valid } = await this.$refs.formGeneralWebsurfer.validate();
      if (valid) {
        this.tabSettings = "ticketWebsurfer";
      }
    },
    validationRules(field) {
      return rules[field];
    },
    saveWebsurfer() {
      this.$emit("saveWebsurfer", this.selectedWebsurfer);
    },
    deleteWebsurfer(websurfer) {
      this.$emit("deleteWebsurfer", websurfer);
    },
    exit() {
      this.$emit("exitEditWebsurfer");
    },
  },
};
</script>
