<template>
  <div>
      <div id="sidebar" class="active">
          <div class="sidebar-wrapper active">
              <div class="sidebar-header">
                  <div class="d-flex justify-content-between">
                      <div class="logo">
                          <a href="/dashboard"><img src="/img/logo_ASYTECH.png" alt="Logo" /></a>
                      </div>
                  </div>
              </div>
              <SidebarSuperadmin />
              <button class="sidebar-toggler btn x"><i data-feather="x"></i></button>
          </div>
      </div>
      <div id="main">
          <div class="page-heading">
              <h3>RADIUS</h3>
          </div>
          <div class="page-content">
              <section class="row">
                  <div class="col-12 col-lg-12">
                      <div class="page-heading">
                          <section class="section">
                              <div class="card">
                                  <div class="card-content">
                                      <div class="card-body">
                                          <div class="row">
                                              <div class="col-md-6 col-12">
                                                  <div class="form-group">
                                                      <label>SERVER</label>
                                                      <input type="text" class="form-control" value="localhost" />
                                                  </div>
                                              </div>
                                              <div class="col-md-6 col-12">
                                                  <div class="form-group">
                                                      <label>CREDENZIALI</label>
                                                      <input type="text" class="form-control" value="radcheck" />
                                                  </div>
                                              </div>
                                              <div class="col-md-6 col-12">
                                                  <div class="form-group">
                                                      <label>UTENTE</label>
                                                      <input type="text" class="form-control" value="radius" />
                                                  </div>
                                              </div>
                                              <div class="col-md-6 col-12">
                                                  <div class="form-group">
                                                      <label>PASSWORD</label>
                                                      <input type="text" class="form-control" value="radius" />
                                                  </div>
                                              </div>
                                              <div class="col-md-6 col-12">
                                                  <div class="form-group">
                                                      <label>TEMPLATE DI INSERIMENTO</label>
                                                      <textarea class="form-control" id="exampleFormControlTextarea1" rows="7" v-model="tempInserimento"> </textarea>
                                                  </div>
                                              </div>
                                              <div class="col-md-6 col-12">
                                                  <div class="form-group">
                                                      <label>TEMPLATE DI AGGIORNAMENTO</label>
                                                      <textarea class="form-control" id="exampleFormControlTextarea1" rows="7" v-model="tempAggiornamento"></textarea>
                                                  </div>
                                              </div>
                                              <div class="col-md-6 col-12">
                                                  <div class="form-group">
                                                      <label>TEMPLATE DI RIMOZIONE</label>
                                                      <textarea class="form-control" id="exampleFormControlTextarea1" rows="7" v-model="tempRimozione"></textarea>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
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
import SidebarSuperadmin from "@/components/superadmin/SidebarSuperadmin.vue";
export default {
  name: "Radius",
  components: { SidebarSuperadmin },
  setup() {
      const hsComponentStore = hsStoreSuperadmin();
      return { hsComponentStore };
  },
  created() {},
  data() {
      return {
          tempInserimento: `INSERT INTO radcheck (username, attribute, op, value) VALUES ('%%user_name%%', 'Cleartext-Password', ':=',  '%%user_password%%');
INSERT INTO radreply (username, attribute, op, value) VALUES ('%%user_name%%', 'Mikrotik-Rate-Limit', ':=',  '%%user_rate_limit%%');`,
          tempAggiornamento: `DELETE FROM radcheck WHERE (username='%%user_name%%');
DELETE FROM radreply WHERE (username='%%user_name%%');
INSERT INTO radcheck (username, attribute, op, value) VALUES ('%%user_name%%', 'Cleartext-Password', ':=',  '%%user_password%%');
INSERT INTO radreply (username, attribute, op, value) VALUES ('%%user_name%%', 'Mikrotik-Rate-Limit', ':=',  '%%user_rate_limit%%');`,
          tempRimozione: `DELETE FROM radcheck WHERE (username='%%user_name%%');
DELETE FROM radreply WHERE (username='%%user_name%%');`


      };
  },
  props: {},
  methods: {},
};
</script>

<style lang="scss" scoped>

</style>