<template>
  <Sidebar />
  <div id="main">
    <div class="page-heading">
      <h3>TICKET SYSTEM STATUS</h3>
      <h4>Bentornato {{ this.hsComponentStore.user.utente }}</h4>
    </div>
    <div class="page-content">
      <section class="row">
        <div class="col-12 col-lg-12">
          <div class="row" style="justify-content: center">
            <div
              class="col-6 col-lg-2 col-md-6"
              v-if="this.hsComponentStore.user.role == 'RESELLER'"
            >
              <div class="card">
                <div class="card-body px-3 py-4-5">
                  <div class="row">
                    <div class="col-md-4">
                      <div class="stats-icon blue">
                        <i class="iconly-boldProfile"></i>
                      </div>
                    </div>
                    <div class="col-md-8">
                      <h6 class="text-muted font-semibold">CLIENTI</h6>
                      <h6 class="font-extrabold mb-0">
                        {{ hsComponentStore.customerOfThisReseller.length }}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-6 col-lg-2 col-md-6">
              <div class="card">
                <div class="card-body px-3 py-4-5">
                  <div class="row">
                    <div class="col-md-4">
                      <div class="stats-icon green">
                        <i class="iconly-boldAdd-User"></i>
                      </div>
                    </div>
                    <div class="col-md-8">
                      <h6 class="text-muted font-semibold">NUOVI WEBSURFER</h6>
                      <h6 class="font-extrabold mb-0">
                        {{
                          hsComponentStore.lastWebsurfers != {}
                            ? 0
                            : hsComponentStore.lastWebsurfers.length
                        }}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-6 col-lg-2 col-md-6">
              <div class="card">
                <div class="card-body px-3 py-4-5">
                  <div class="row">
                    <div class="col-md-4">
                      <div class="stats-icon blue">
                        <i class="iconly-boldProfile"></i>
                      </div>
                    </div>
                    <div class="col-md-8">
                      <h6 class="text-muted font-semibold">WEBSURFER</h6>
                      <h6 class="font-extrabold mb-0">
                        {{ hsComponentStore.websurfers.length }}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-6 col-lg-2 col-md-6">
              <div class="card">
                <div class="card-body px-3 py-4-5">
                  <div class="row">
                    <div class="col-md-4">
                      <div class="stats-icon purple">
                        <i class="iconly-boldShow"></i>
                      </div>
                    </div>
                    <div class="col-md-8">
                      <h6 class="text-muted font-semibold">TICKET ATTIVI</h6>
                      <h6 class="font-extrabold mb-0">
                        {{ hsComponentStore.activeTickets.length }}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-6 col-lg-2 col-md-6">
              <div class="card">
                <div class="card-body px-3 py-4-5">
                  <div class="row">
                    <div class="col-md-4">
                      <div class="stats-icon red">
                        <i class="iconly-boldBookmark"></i>
                      </div>
                    </div>
                    <div class="col-md-8">
                      <h6 class="text-muted font-semibold">TICKET SCADUTI</h6>
                      <h6 class="font-extrabold mb-0">
                        {{ hsComponentStore.expiredTickets.length }}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
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
                      <label
                        >SELEZIONA STRUTTURA:{{ payload.CustomerId }}
                      </label>
                      <fieldset class="form-group">
                        <select
                          v-model="payload.CustomerId"
                          class="form-select"
                        >
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
              <TableWebsurfer />
            </div>
           
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { hsStore } from "@/store/hotspotSystemStore.js";
import Sidebar from "@/components/Sidebar.vue";
import TableWebsurfer from "@/components/TableWebsurfer.vue";
export default {
  components: { Sidebar, TableWebsurfer },
  name: "DashboardHotel",
  setup() {
    const hsComponentStore = hsStore();
    return { hsComponentStore };
  },
  data() {
    return {
      payload: {},
    };
  },
  props: {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>