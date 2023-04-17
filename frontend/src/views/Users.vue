<template>
   
        <div id="sidebar" class="active">
            <div class="sidebar-wrapper active">
                <div class="sidebar-header">
                    <div class="d-flex justify-content-between">
                        <div class="logo">
                            <a href="index.html"><img src="/img/logo_ASYTECH.png" alt="Logo"></a>
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
                <h3>UTENTI</h3>
            </div>
            <div class="page-content">
                <section class="row">
                    <div class="col-12 col-lg-12">

                        <div class="page-heading">
                            <section class="section">
                                <div class="card">

                                    <div class="col-md-6 col-12">
                                        <div class="card">
                                            <div class="card-header">
                                                <h4 class="card-title">INSERISCI NUOVO UTENTE</h4>
                                            </div>
                                            <div class="card-content">
                                                <div class="card-body">
                                                    <form method="post" action="users/insert"
                                                        class="form form-horizontal">
                                                        <div class="form-body">
                                                            <div class="row">
                                                                <div class="col-md-4">
                                                                    <label>Nome Utente</label>
                                                                </div>
                                                                <div class="col-md-8">
                                                                    <div class="form-group has-icon-left">
                                                                        <div class="position-relative">
                                                                            <input type="text" class="form-control"
                                                                                placeholder="Username" name="username"
                                                                                required>
                                                                            <div class="form-control-icon">
                                                                                <i class="bi bi-person"></i>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-4">
                                                                    <label>Password</label>
                                                                </div>
                                                                <div class="col-md-8">
                                                                    <div class="form-group has-icon-left">
                                                                        <div class="position-relative">
                                                                            <input type="password" class="form-control"
                                                                                placeholder="Password" name="password"
                                                                                required>
                                                                            <div class="form-control-icon">
                                                                                <i class="bi bi-lock"></i>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-4">
                                                                    <label>Ruolo</label>
                                                                </div>
                                                                <div class="col-md-8">
                                                                    <fieldset class="form-group">
                                                                        <select class="form-select" name="role"
                                                                            required>


                                                                            <option value="HOTEL">ADMIN</option>
                                                                            <option value="USER">USER</option>
                                                                        </select>
                                                                    </fieldset>
                                                                </div>
                                                              <!--   <% if(role == "RESELLER"){ %>
                                                                <div class="col-md-4">
                                                                    <label>Cliente</label>
                                                                </div>
                                                                
                                                                <div class="col-md-8">
                                                                    <fieldset class="form-group">
                                                                        <select class="form-select" name="client"
                                                                            required>
                                                                            <% clients.forEach(function(client) { %>
                                                                                <option value=<%=client.id %>> <%=
                                                                                        client.companyName %>
                                                                                </option>
                                                                                <% }) %>
                                                                        </select>
                                                                    </fieldset>
                                                                </div>
                                                                <% } %> -->
                                                                <div class="col-12 d-flex justify-content-end">
                                                                    <button type="submit"
                                                                        class="btn btn-primary me-1 mb-1">INSERISCI</button>

                                                                </div>
                                                            </div>
                                                        </div>

                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="card-body">
                                        <table class="table table-striped" id="tableUsers">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>NOME</th>
                                                    <th>PASSWORD</th>
                                                    <th>RUOLO</th>
                                                </tr>
                                            </thead>
                                             <tbody>
                                                    <tr v-for="user in this.$store.state.dataUser.userOfAllCustomers" :key="user.id" >
                                                        <td>
                                                            {{user.id}}
                                                        </td>
                                                        <td>
                                                            {{user.utente}}
                                                        </td>
                                                        <td>
                                                            {{user.password}}
                                                        </td>
                                                            <td v-if="user.role == 'RESELLER'">
                                                                <span class="badge bg-primary">RESELLER</span>
                                                            </td>
                                                                <td v-if="user.role == 'HOTEL'">
                                                                    <span class="badge bg-success">HOTEL</span>
                                                                </td>
                                                                    <td v-if="user.role == 'USER'">
                                                                        <span class="badge bg-dark">USER</span>
                                                                    </td>          
                                                    </tr>
                                            </tbody> 
                                        </table>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </section>
            </div>
        </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';
export default {
  name: "Users",
  components: { Sidebar },
  created() {},
  data() {
    return {};
  },
  props: {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>