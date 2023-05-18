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
      <header class="mb-3">
        <a href="#" class="burger-btn d-block d-xl-none">
          <i class="bi bi-justify fs-3"></i>
        </a>
      </header>

      <div class="page-heading">
        <h3>CLIENTI</h3>
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
                        <h4 class="card-title">INSERISCI NUOVO UTENTE</h4>
                      </div>
                      <div class="card-content">
                        <div class="card-body">
                          <form class="form" method="post" action="customers/insert">
                            <div class="row">
                              <div class="col-md-6 col-12">
                                <div class="form-group">
                                  <label for="first-name-column">Denominazione</label>
                                  <input type="text" class="form-control" id="denominazione" name="companyName" required />
                                </div>
                              </div>
                              <div class="col-md-6 col-12">
                                <div class="form-group">
                                  <label for="last-name-column">Codice Fiscale</label>
                                  <input type="text" class="form-control" name="fiscalCode" required />
                                </div>
                              </div>
                              <div class="col-md-6 col-12">
                                <div class="form-group">
                                  <label for="city-column">P.iva</label>
                                  <input type="text" class="form-control" name="vatCode" required />
                                </div>
                              </div>
                              <div class="col-md-6 col-12">
                                <div class="form-group">
                                  <label for="country-floating">Comune</label>
                                  <input type="text" class="form-control" name="city" required />
                                </div>
                              </div>
                              <div class="col-md-6 col-12">
                                <div class="form-group">
                                  <label for="company-column">Fax</label>
                                  <input type="text" class="form-control" name="fax" required />
                                </div>
                              </div>
                              <div class="col-md-6 col-12">
                                <div class="form-group">
                                  <label for="email-id-column">Web Page</label>
                                  <input type="text" class="form-control" name="web" required />
                                </div>
                              </div>
                              <div class="col-md-6 col-12">
                                <div class="form-group">
                                  <label for="email-id-column">Bandwith</label>
                                  <input type="text" class="form-control" name="defaultBandwidth" required />
                                </div>
                              </div>
                              <div class="col-md-6 col-12">
                                <div class="form-group">
                                  <label for="email-id-column">Note</label>
                                  <input type="text" class="form-control" name="note" required />
                                </div>
                              </div>
                              <div class="col-md-6 col-12">
                                <div class="form-group">
                                  <label for="email-id-column">Indirizzo</label>
                                  <input type="text" class="form-control" name="addessCompany" required />
                                </div>
                              </div>
                              <div class="col-md-6 col-12">
                                <div class="form-group">
                                  <label for="email-id-column">Telefono</label>
                                  <input type="text" class="form-control" name="phone" required />
                                </div>
                              </div>
                              <div class="col-md-6 col-12">
                                <div class="form-group">
                                  <label for="email-id-column">Pin</label>
                                  <input type="text" class="form-control" name="pin" required />
                                </div>
                              </div>
                              <div class="col-md-6 col-12">
                                <div class="form-group">
                                  <label for="email-id-column">Email</label>
                                  <input type="email" class="form-control" name="email" required />
                                </div>
                              </div>
                              <div class="col-md-6 col-12">
                                <div class="form-group">
                                  <label>Profilo</label>
                                  <select class="form-select" name="profile" required>
                                    <option value="DEFAULT">DEFAULT</option>
                                    <option value="PROFESSIONAL">PROFESSIONAL</option>
                                  </select>
                                </div>
                              </div>

                              <div class="col-12 d-flex justify-content-end">
                                <button type="submit" class="btn btn-primary me-1 mb-1">Inserisci</button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section class="section">
                <div class="card">
                  <!--        <div class="card-header">
                                        Simple Datatable
                                    </div> -->
                  <div class="card-body">
                    <table class="table table-striped" id="table1">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>DENOMINAZIONE</th>
                          <th>CODICE FISCALE</th>
                          <th>PARTITA IVA</th>
                          <th>COMUNE</th>
                          <th>FAX</th>
                          <th>WEB PAGE</th>
                          <th>DEFAULT BANDWITH</th>
                          <th>NOTE</th>
                          <th>INDIRIZZO</th>
                          <th>TELEFONO</th>
                          <th>PIN</th>
                          <th>EMAIL</th>
                          <th>PROFILE</th>
                        </tr>
                      </thead>
                      <!-- <tbody>
                                                <% customers.forEach(function(customer) { %>
                                                    <tr onclick="modifyRow(this)">
                                                        <td>
                                                            <%= customer.id %>
                                                        </td>
                                                        <td>
                                                            <%= customer.companyName %>
                                                        </td>
                                                        <td>
                                                            <%= customer.fiscalCode %>
                                                        </td>
                                                        <td>
                                                            <%= customer.vatCode %>
                                                        </td>
                                                        <td>
                                                            <%= customer.city %>
                                                        </td>
                                                        <td>
                                                            <%= customer.fax %>
                                                        </td>
                                                        <td>
                                                            <%= customer.web %>
                                                        </td>
                                                        <td>
                                                            <%= customer.defaultBandwidth %>
                                                        </td>
                                                        <td>
                                                            <%= customer.note %>
                                                        </td>
                                                        <td>
                                                            <%= customer.addessCompany %>
                                                        </td>
                                                        <td>
                                                            <%= customer.phone %>
                                                        </td>
                                                        <td>
                                                            <%= customer.pin %>
                                                        </td>   
                                                        <td>
                                                            <%= customer.email %>
                                                        </td>
                                                        <td>
                                                            <%= customer.profile %>
                                                        </td>
                                                    </tr>

                                                    <%  }) %>

                                               
                                            </tbody> -->
                    </table>
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
    name: "Reseller",
    components: { SidebarSuperadmin },
    setup() {
      const hsComponentStore = hsStoreSuperadmin();
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
