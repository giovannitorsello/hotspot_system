<template>
  <v-dialog v-model="dialogEditDevice" :scrim="false" transition="dialog-bottom-transition">
    <v-card>
      <v-card-title> Modifica Dispositivo </v-card-title>
      <v-tabs v-model="tabSettings" bg-color="primary">
        <v-tab value="deviceGeneralSettings">Generale</v-tab>
        <v-tab value="deviceWebSettings">Web</v-tab>
        <v-tab value="deviceBandwidthSettings">Profili banda</v-tab>
        <v-tab value="deviceCustomFieldsSettings">Campi personalizzati</v-tab>
        <v-tab value="deviceAuthMonitoringSettings">Impostazioni di connessione</v-tab>
        <v-tab value="deviceNotes">Annotazioni</v-tab>
      </v-tabs>

      <v-card-text>
        <v-window v-model="tabSettings">
          <v-window-item value="deviceGeneralSettings">
            <v-text-field v-model="selectedDevice.description" label="Descrizione"></v-text-field>
            <v-text-field v-model="selectedDevice.addressSetup" label="Indirizzo di installazione"></v-text-field>
            <v-text-field v-model="selectedDevice.api_key" label="Chiave Api di riconoscimento"></v-text-field>
            <v-text-field v-model="selectedDevice.ipv4Management" label="Profilo IPV4"></v-text-field>
            <v-text-field v-model="selectedDevice.ipv6Management" label="Profilo IPV6"></v-text-field>
            <v-text-field v-model="selectedDevice.defaultBandwidth" label="Profilo banda default"></v-text-field>
          </v-window-item>
          <v-window-item value="deviceWebSettings">
            <v-text-field v-model="selectedDevice.preAuthLandingPage" label="Pagina di pre-autorizzazione"></v-text-field>
            <v-text-field v-model="selectedDevice.postAuthLandingPage" label="pagina di post-autorizzazione"></v-text-field>
          </v-window-item>
          <v-window-item value="deviceBandwidthSettings">
            <!--v-textarea rows="10" row-height="10" auto-grow v-model="selectedDevice.bandwidthProfiles" label="Profili di banda (JSON)"></!--v-textarea-->
            <Vue3JsonEditor v-model="hsComponentStore.selectedDevice.bandwidthProfiles" @json-change="onChangeBandwidthProfile" mode="code" :show-btns="false" :expandedOnStart="false" />
          </v-window-item>
          <v-window-item value="deviceCustomFieldsSettings">
            <!--v-textarea rows="10" row-height="10" auto-grow v-model="selectedDevice.websurferCustomFields" label="Campi aggiuntivi form registrazione (JSON)"></!--v-textarea-->
            <Vue3JsonEditor v-model="hsComponentStore.selectedDevice.websurferCustomFields" @json-change="onChangeWebSurferCustomFields" mode="code" :show-btns="false" :expandedOnStart="false" />
          </v-window-item>
          <v-window-item value="deviceAuthMonitoringSettings">
            <!--v-textarea rows="10" row-height="10" auto-grow v-model="selectedDevice.deviceAuthProperties" label="Profilo accesso device (JSON)"></!--v-textarea-->
            <Vue3JsonEditor v-model="hsComponentStore.selectedDevice.deviceAuthProperties" @json-change="onChangeAuthProperties" mode="code" :show-btns="false" :expandedOnStart="false" />
          </v-window-item>
          <v-window-item value="deviceNotes">
            <v-textarea rows="10" row-height="10" auto-grow v-model="selectedDevice.notes" label="Note"></v-textarea>
          </v-window-item>
        </v-window>
        <v-row>
          <v-col>
            <v-sheet class="pa-2 ma-1" align="end">
              <i class="bi bi-arrow-left ma-1" style="font-size: xx-large" @click="exit()"></i>
              <i class="bi bi-check-circle ma-1" style="font-size: xx-large" @click="saveDevice(selectedDevice)"></i>
            </v-sheet>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
  import utilityArrays from "@/utils/utilityArrays.js";
  import { hsStoreReseller } from "@/store/storeReseller.js";
  import axios from "axios";
  import { Vue3JsonEditor } from "vue3-json-editor";
  import { defineComponent, reactive, toRefs } from "vue";

  export default {
    name: "FormDevice",
    components: { Vue3JsonEditor },
    setup() {
      const hsComponentStore = hsStoreReseller();
      const state = reactive({
        json: {},
      });
      return { hsComponentStore, ...toRefs(state) };
    },
    data() {
      return {
        tabSettings: "deviceGeneralSettings",
        dialogEditDevice: true,
        selectedReseller: {},
        selectedCustomer: {},
        selectedDevice: {
          bandwidthProfiles:[],
        },
        header: [
          { title: "Descrizione", key: "description" },
          { title: "Indirizzo installazione", key: "setupAddress" },
          { title: "Indirizzo Ipv4", key: "ipv4Management" },
          { title: "Indirizzo Ipv6", key: "ipv6Management" },
          { title: "Actions", key: "actions" },
          { title: "State", key: "state" },
        ],
        page: 1,
        itemsPerPage: 10,
        websurferCustomFields: {},
        authProperties: {},
      };
    },
    mounted() {
      this.dialogEditDevice = true;
      this.selectedReseller = this.hsComponentStore.loggedReseller;
      this.selectedCustomer = this.hsComponentStore.selectedCustomer;

      //Set default object dandprofiles
      if(!this.hsComponentStore.selectedDevice.bandwidthProfiles) {
        this.hsComponentStore.selectedDevice.bandwidthProfiles = [
            {id: "1", name:"base", download:"4000", upload:"1000"},
            {id: "2", name:"premium", download:"8000", upload:"2000"},
            {id: "3", name:"professional", download:"16000", upload:"5000"},
        ];
      }

      //set default object websurferCustomFields
      if(!this.hsComponentStore.selectedDevice.websurferCustomFields) {
        this.hsComponentStore.selectedDevice.websurferCustomFields = [
            {id: "1", name:"TAVOLI"},
        ];
      }
      this.selectedDevice = this.hsComponentStore.selectedDevice;
    },
    methods: {
      saveDevice(device) {
        this.$emit("saveDevice", device);
      },
      deleteDevice(device) {
        this.$emit("deleteDevice", device);
      },
      editDevice(device) {
        console.log("Selected device is:", device);
        this.hsComponentStore.selectedDevice = device;
      },
      exit() {
        this.dialogEditDevice = false;
        this.$emit("exitEditDevice");
      },
      onChangeBandwidthProfile(jsonValue) {
        this.hsComponentStore.selectedDevice.bandwidthProfiles = jsonValue;
      },
      onChangeWebSurferCustomFields(jsonValue) {
        this.hsComponentStore.selectedDevice.websurferCustomFields = jsonValue;
      },
      onChangeAuthProperties(jsonValue) {
        this.hsComponentStore.selectedDevice.deviceAuthProperties = jsonValue;
      },
    },
  };
</script>
