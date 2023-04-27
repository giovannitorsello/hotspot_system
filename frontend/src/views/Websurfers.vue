<template>
  <div>
    <div id="sidebar" class="active">
      <div class="sidebar-wrapper active">
        <div class="sidebar-header">
          <div class="d-flex justify-content-between">
            <div class="logo">
              <a href="/dashboard"
                ><img src="/img/logo_ASYTECH.png" alt="Logo"
              /></a>
            </div>
            <div class="toggler">
              <a href="#" class="sidebar-hide d-xl-none d-block"
                ><i class="bi bi-x bi-middle"></i
              ></a>
            </div>
          </div>
        </div>
        <Sidebar />
      </div>
    </div>
    <div id="main">
      <header class="mb-3">
        <a href="#" class="burger-btn d-block d-xl-none">
          <i class="bi bi-justify fs-3"></i>
        </a>
      </header>

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
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="payload.firstname"
                                />
                              </div>
                            </div>
                            <div class="col-md-6 col-12">
                              <div class="form-group">
                                <label for="last-name-column">Cognome</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="payload.lastname"
                                />
                              </div>
                            </div>
                            <div class="col-md-6 col-12">
                              <div class="form-group">
                                <label for="city-column">Email</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="payload.email"
                                />
                              </div>
                            </div>
                            <div class="col-md-6 col-12">
                              <div class="form-group">
                                <label for="country-floating">Telefono</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="payload.phone"
                                />
                              </div>
                            </div>
                            <div class="col-md-6 col-12">
                              <div class="form-group">
                                <label for="company-column">Note</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="payload.note"
                                />
                              </div>
                            </div>
                            <div class="col-md-6 col-12">
                              <div class="form-group">
                                <label>SELEZIONA STRUTTURA:{{ payload.CustomerId }}
                                  </label>
                                <fieldset class="form-group">
                                  <select v-model="payload.CustomerId" class="form-select">
                                    <template
                                      v-for="customer in hsComponentStore.customerOfThisReseller"
                                      :key="customer.id"
                                    >
                                      <option :value="customer.id">
                                        {{ customer.companyName }}
                                      </option>
                                    </template>
                                  </select>
                                </fieldset>
                              </div>
                            </div>
                            <div class="col-12 d-flex justify-content-end">
                              <button
                                type="submit"
                                class="btn btn-primary me-1 mb-1"
                                @click="insertWebsurfer()"
                              >
                                Inserisci
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
             <TableWebsurfer />
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { hsStore } from "@/store/hotspotSystemStore.js";
import TableWebsurfer from "@/components/TableWebsurfer.vue";
import Sidebar from "@/components/Sidebar.vue";
export default {
  name: "Websurfers",
  components: { Sidebar,TableWebsurfer },
  setup() {
    const hsComponentStore = hsStore();
    return { hsComponentStore };
  },
  data() {
    return {
      payload: {
        firstname: "",
        lastname: "",
        email: "",
        note: "",
        phone: "",
        CustomerId:""
      },
    };
  },
  methods: {
  },
};
</script>
