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
        <Sidebar />
        <button class="sidebar-toggler btn x"><i data-feather="x"></i></button>
      </div>
    </div>
    <div id="main">
      <header class="mb-3">
        <a href="#" class="burger-btn d-block d-xl-none">
          <i class="bi bi-justify fs-3"></i>
        </a>
      </header>

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
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="2" cols="50"> </textarea>
                          </div>
                        </div>
                        <div class="col-md-6 col-12">
                          <div class="form-group">
                            <label>TEMPLATE DI AGGIORNAMENTO</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="2"></textarea>
                          </div>
                        </div>
                        <div class="col-md-6 col-12">
                          <div class="form-group">
                            <label>TEMPLATE DI RIMOZIONE</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="2"></textarea>
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
  import Sidebar from "@/components/Sidebar.vue";
  export default {
    name: "Radius",
    components: { Sidebar },
    setup() {
      const hsComponentStore = hsStore();
      return { hsComponentStore };
    },
    created() {},
    data() {
      return {};
    },
    props: {},
    methods: {},
  };
</script>

<style lang="scss" scoped></style>
