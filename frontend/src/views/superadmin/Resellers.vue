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
              <SidebarSuperadmin />
          </div>
      </div>
      <div id="main">
          <div class="page-heading">
              <h3>RESELLER</h3>
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
                                              <h4 class="card-title">INSERISCI RESELLER</h4>
                                          </div>
                                          <div class="card-content">
                                              <div class="card-body">
                                                <div class="row">
                                                    <FormReseller />
                                                </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </section>
                          <section class="section">
                              <div class="card">
                                  <div class="card-body">
                                      <TableReseller />
                                  </div>
                              </div>
                          </section>
                      </div>
                  </div>
              </section>
          </div>
      </div>
  </div>
</template>

<script>
import { hsStoreSuperadmin } from "@/store/storeSuperadmin.js";
import FormReseller from '@/components/superadmin/FormReseller.vue'
import SidebarSuperadmin from "@/components/superadmin/SidebarSuperadmin.vue";
import TableReseller from "@/components/superadmin/TableResellerSuperadmin.vue";
import axios from 'axios';
export default {
  name: "Reseller",
  components: { SidebarSuperadmin, TableReseller,FormReseller },
  setup() {
      const hsComponentStore = hsStoreSuperadmin();
      return { hsComponentStore };
  },
 
  data() {
      return {
          payload: {
              pin:''
          }
      };
  },
  props: {},
  methods: {
  },
};
</script>