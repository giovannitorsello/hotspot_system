<template>
  <div>
    <div id="sidebar" class="active">
      <div class="sidebar-wrapper active">
        <div class="sidebar-header">
          <div class="d-flex justify-content-between">
            <div class="logo">
              <a href="/dashboard"><img src="/img/logo_ASYTECH.png" alt="Logo" /></a>
            </div>
            <div class="toggler">
              <a href="#" class="sidebar-hide d-xl-none d-block"><i class="bi bi-x bi-middle"></i></a>
            </div>
          </div>
        </div>
        <SidebarReseller />
      </div>
    </div>

    <div id="main">
      <header class="mb-3">
        <a href="#" class="burger-btn d-block d-xl-none">
          <i class="bi bi-justify fs-3"></i>
        </a>
      </header>

      <div class="page-heading">
        <h3>CLIENTI</h3>
        <v-autocomplete label="Autocomplete" :items="customersSearchCustomers" update:search="updateCustomersList" :value="customersSearchString"></v-autocomplete>
      </div>

      <div class="page-content">
        <section class="row">
          <div class="col-12 col-lg-12">
            <div class="page-heading">
              <section id="multiple-column-form">
                <div class="row match-height">
                  <div class="col-12">
                    <div class="card">
                      <div class="card-header">
                        <h4 class="card-title">INSERISCI CLIENTE</h4>
                      </div>
                      <div class="card-content">
                        <div class="card-body">
                          <div class="row">
                            <div class="col-md-6 col-12">
                              <div class="form-group">
                                <label>NOME</label>
                                <input type="text" class="form-control" name="companyName" v-model="payload.companyName" required />
                              </div>
                            </div>
                            <div class="col-md-6 col-12">
                              <div class="form-group">
                                <label>CODICE FISCALE </label>
                                <input type="text" class="form-control" v-model="payload.fiscalCode" required />
                              </div>
                            </div>
                            <div class="col-md-6 col-12">
                              <div class="form-group">
                                <label>P.IVA</label>
                                <input type="text" class="form-control" v-model="payload.vatCode" required />
                              </div>
                            </div>
                            <div class="col-md-6 col-12">
                              <div class="form-group">
                                <label>CITTA</label>
                                <input type="text" class="form-control" v-model="payload.city" required />
                              </div>
                            </div>
                            <div class="col-md-6 col-12">
                              <div class="form-group">
                                <label>FAX</label>
                                <input type="text" class="form-control" v-model="payload.fax" required />
                              </div>
                            </div>
                            <div class="col-md-6 col-12">
                              <div class="form-group">
                                <label>WEB PAGE</label>
                                <input type="text" class="form-control" v-model="payload.web" required />
                              </div>
                            </div>
                            <div class="col-md-6 col-12">
                              <div class="form-group">
                                <label>LARGHEZZA BANDA PREDEFINITA</label>
                                <input type="text" class="form-control" v-model="payload.defaultBandwidth" required />
                              </div>
                            </div>
                            <div class="col-md-6 col-12">
                              <div class="form-group">
                                <label>NOTE</label>
                                <input type="text" class="form-control" v-model="payload.note" required />
                              </div>
                            </div>
                            <div class="col-md-6 col-12">
                              <div class="form-group">
                                <label>INDIRIZZO</label>
                                <input type="text" class="form-control" v-model="payload.addessCompany" required />
                              </div>
                            </div>
                            <div class="col-md-6 col-12">
                              <div class="form-group">
                                <label>TELEFONO</label>
                                <input type="text" class="form-control" v-model="payload.phone" required />
                              </div>
                            </div>
                            <div class="col-md-6 col-12">
                              <div class="form-group">
                                <label>PIN</label>
                                <input type="text" class="form-control" name="pin" :value="this.randomPin" />
                              </div>
                            </div>
                            <div class="col-md-6 col-12">
                              <div class="form-group">
                                <label>EMAIL</label>
                                <input type="email" class="form-control" v-model="payload.email" required />
                              </div>
                            </div>
                            <div class="col-md-6 col-12">
                              <div class="form-group">
                                <label>Profilazioni di larghezza di banda</label>
                                <input type="textarea" class="form-control" v-model="payload.bandwidthProfiles" />
                              </div>
                            </div>
                            <div class="col-md-6 col-12">
                              <div class="form-group">
                                <label>Campi aggiuntivi di autenticazione</label>
                                <input type="textarea" class="form-control" v-model="payload.websurferCustomFields" />
                              </div>
                            </div>
                            <div class="col-12 d-flex justify-content-end">
                              <button class="btn btn-primary me-1 mb-1" @click="submitForm()">Inserisci</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section class="section">
                <TableCustomer />
              </section>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
  import { hsStore } from "@/store/hotspotSystemStore.js";
  import TableCustomer from "@/components/reseller/TableCustomer.vue";
  import axios from "axios";
  import SidebarReseller from "@/components/reseller/SidebarReseller.vue";
  export default {
    name: "Customers",
    components: { SidebarReseller, TableCustomer },
    setup() {
      const hsComponentStore = hsStore();
      return { hsComponentStore };
    },
    data() {
      return {
        tabSettings: "customerGeneralSettings",
        customersSearchCustomers: [],
        customersSearchString: "",
        tab: "one",
        table: [],
        selectedCustomer: null,
        selectedClient: null,
        randomPin: "",
        payload: {
          companyName: "",
          fiscalCode: "",
          vatCode: "",
          city: "",
          fax: "",
          web: "",
          defaultBandwidth: "",
          note: "",
          addessCompany: "",
          phone: "",
          email: "",
        },
      };
    },
    methods: {
      createRandomPin() {
        const chars = "0123456789";
        for (let i = 0; i < 5; i++) {
          const randomIndex = Math.floor(Math.random() * chars.length);
          this.randomPin += chars[randomIndex];
        }
      },
      updateCustomersList() {
        axios
          .post("/admin/customers/getCustomersByFulltextSearch", {
            searchString: this.customersSearchString,
          })
          .then((response) => {
            if (response.data.status == 200) {
              this.customersSearchList = res.searchList;
            } else {
            }
          });
      },

      submitForm() {
        this.payload.pin = this.randomPin;
        this.payload.ResellerId = this.hsComponentStore.user.ResellerId;
        axios
          .post("/admin/customers/insert", {
            payload: this.payload,
          })
          .then((response) => {
            if (response.data.status == 200) {
              this.hsComponentStore.addCustomer(response.data.result);
              this.payload = {};
              this.randomPin = "";
              this.createRandomPin();
              this.$swal(response.data.msg);
            } else {
              this.$swal(response.data.msg);
            }
          });
      },
      openClient(x) {
        console.log(x);
      },
    },
    created() {
      this.createRandomPin();
    },
  };
</script>
