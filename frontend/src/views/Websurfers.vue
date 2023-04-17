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
                <Sidebar/>

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
                                                    <form class="form" method="post" action="websurfers/insert">
                                                        <div class="row">
                                                            <div class="col-md-6 col-12">
                                                                <div class="form-group">
                                                                    <label for="first-name-column">Nome</label>
                                                                    <input type="text" class="form-control"
                                                                        id="denominazione" name="firstname" required>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-6 col-12">
                                                                <div class="form-group">
                                                                    <label for="last-name-column">Cognome</label>
                                                                    <input type="text" class="form-control"
                                                                        name="lastname" required>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-6 col-12">
                                                                <div class="form-group">
                                                                    <label for="city-column">Email</label>
                                                                    <input type="text" class="form-control" name="email"
                                                                        required>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-6 col-12">
                                                                <div class="form-group">
                                                                    <label for="country-floating">Telefono</label>
                                                                    <input type="text" class="form-control" name="phone"
                                                                        required>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-6 col-12">
                                                                <div class="form-group">
                                                                    <label for="company-column">Note</label>
                                                                    <input type="text" class="form-control" name="note"
                                                                        required>
                                                                </div>
                                                            </div>
                                         
                                                            <div class="col-12 d-flex justify-content-end">
                                                                <button type="submit"
                                                                    class="btn btn-primary me-1 mb-1">Inserisci</button>

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
                                    <div class="card-body">   
                                            <table class="table table-striped" id="tableWebsurfer">
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>NOME</th>
                                                        <th>COGNOME</th>
                                                        <th>EMAIL</th>
                                                        <th>TELEFONO</th>
                                                        <th>NOTE</th>
                                                    </tr>
                                                </thead>
                                              <tbody>
                                                   
                                                        <tr v-for="websurfer in this.$store.state.dataUser.websurfers" :key="websurfer.id" >
                                                            <td>
                                                                {{websurfer.id}}
                                                            </td>
                                                            <td>
                                                                {{websurfer.firstname}}
                                                            </td>
                                                            <td>
                                                                {{websurfer.lastname}}
                                                            </td>
                                                            <td>
                                                                {{websurfer.email}}
                                                            </td>
                                                            <td>
                                                                {{websurfer.phone}}
                                                            </td>
                                                            <td>
                                                                {{websurfer.note}}
                                                            </td>
                                                            <td>
                                                                <button>MODIFICA</button>
                                                                <button>ELIMINA</button>
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
  name: "Websurfers",
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