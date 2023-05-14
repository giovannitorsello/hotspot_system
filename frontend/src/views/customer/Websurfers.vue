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
        <SidebarCustomer />
      </div>
    </div>
    <div id="main">
      <div class="page-heading">
        <h3>WEBSURFER</h3>
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
                        <h4 class="card-title">INSERISCI NUOVO OSPITE</h4>
                      </div>
                      <div class="card-content">
                        <div class="card-body">
                          <div class="row">
                            <div class="col-md-6 col-12">
                              <div class="form-group">
                                <label for="first-name-column">Nome</label>
                                <input type="text" class="form-control" v-model="payload.firstname" />
                              </div>
                            </div>
                            <div class="col-md-6 col-12">
                              <div class="form-group">
                                <label for="last-name-column">Cognome</label>
                                <input type="text" class="form-control" v-model="payload.lastname" />
                              </div>
                            </div>
                            <div class="col-md-6 col-12">
                              <div class="form-group">
                                <label for="last-name-column">Durata in giorni</label>
                                <input type="text" class="form-control" v-model="payload.durationDays" />
                              </div>
                            </div>
                            <div class="col-md-6 col-12">
                              <div class="form-group">
                                <label for="city-column">Email</label>
                                <input type="text" class="form-control" v-model="payload.email" />
                              </div>
                            </div>
                            <div class="col-md-6 col-12">
                              <div class="form-group">
                                <label for="country-floating">Telefono</label>
                                <input type="text" class="form-control" v-model="payload.phone" />
                              </div>
                            </div>
                            <div class="col-md-6 col-12">
                              <div class="form-group">
                                <label for="company-column">Note</label>
                                <input type="text" class="form-control" v-model="payload.note" />
                              </div>
                            </div>
                            <div class="col-md-6 col-12">
                              <div class="form-group">
                                <fieldset class="form-group">
                                  <v-select
                                    label="SELEZIONA BANDA:"
                                    :items="plans"
                                    v-model="bandwidthProfile"
                                    item-text="name"
                                    item-title="name"
                                    item-value="name"
                                    single-line
                                    return-object
                                  ></v-select>
                                  <!--select v-model="idBandwidth" :change="selectBandwithProfile" class="form-select">
                                    <option v-for="plan in plans" :key="plan.id" :value="plan.id">{{ plan.name }}: {{ plan.download }}Kb - {{ plan.upload }}Kb</option>
                                  </!--select-->
                                </fieldset>
                              </div>
                            </div>
                            <div class="col-12 d-flex justify-content-end">
                              <button type="submit" class="btn btn-primary me-1 mb-1" @click="insertWebsurfer()">Inserisci</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <TableWebsurferCustomer />
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import { hsStore } from "@/store/hotspotSystemStore.js";
  import TableWebsurferCustomer from "@/components/customer/TableWebsurferCustomer.vue";
  import SidebarCustomer from "@/components/customer/SidebarCustomer.vue";
  export default {
    name: "Websurfers",
    components: { SidebarCustomer, TableWebsurferCustomer },
    setup() {
      const hsComponentStore = hsStore();
      return { hsComponentStore };
    },
    data() {
      return {
        plans: [],
        bandwidthProfile: {},
        payload: {
          firstname: "",
          lastname: "",
          email: "",
          note: "",
          phone: "",
          CustomerId: "",
          bandwidthProfile: "",
          durationDays: 7,
        },
      };
    },
    created() {
      const data = this.hsComponentStore.loggedCustomer.bandwidthProfiles;
      var normalizedJSONString = data.replace(/'/g, '"');
      try {
        this.plans = JSON.parse(normalizedJSONString);
      } catch (error) {
        console.log(error);
        //Charge default values
        this.plans = [
          { id: "0", name: "slow", download: "500", upload: "500" },
          { id: "1", name: "base", download: "1000", upload: "1000" },
          { id: "2", name: "premium", download: "2000", upload: "2000" },
          { id: "3", name: "professional", download: "3000", upload: "3000" },
        ];
      }
      //Default value at start
      this.bandwidthProfile = this.plans[0];
    },

    methods: {
      insertWebsurfer() {
        console.log("Websurfer bandwith plan is", this.bandwidthProfile);
        //translate in string value:
        this.payload.bandwidthProfile = JSON.stringify(this.bandwidthProfile);

        axios
          .post("/admin/websurfers/insert", {
            payload: this.payload,
            user: this.hsComponentStore.loggedCustomer,
          })
          .then((response) => {
            if (response.data.status == 200) {
              this.hsComponentStore.addWebsurfer(response.data.newWebsurfer);
              this.$swal(response.data.msg);
            } else {
              this.$swal(response.data.msg);
            }
          });
      },
    },
  };
</script>
