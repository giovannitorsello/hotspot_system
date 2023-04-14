
<template>
    <div id="app">
      <Sidebar></sidebar>
        <div id="main">
            <header class="mb-3">
                <a href="#" class="burger-btn d-block d-xl-none">
              <i class="bi bi-justify fs-3"></i>
            </a>
            </header>
            <div class="page-heading">
                <h3>TICKET SYSTEM STATUS</h3>
                <h4>
                    <!--  Bentornato <%= user.username %> -->
                </h4>
            </div>
            <div class="page-content">
                <section class="row">
                    <div class="col-12 col-lg-12">
                        <div class="row" style="justify-content: center;">
                            <!--    <% if (user.role =='RESELLER') { %> -->
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
                                                <h6 class="text-muted font-semibold">CLIENTI </h6>
                                                <h6 class="font-extrabold mb-0">
                                                    <!--       <%= data.customerOfThisReseller.length %> -->
                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--   <% } %>
                  <% if (data==null) { %> -->
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
                                                <h6 class="text-muted font-semibold">NUOVI CLIENTI</h6>
                                                <h6 class="font-extrabold mb-0">
                                                    <!--       <%= data.lastUserInserted %> -->
                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--   <% } %> -->
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
                                                <h6 class="text-muted font-semibold">WEBSURFER </h6>
                                                <h6 class="font-extrabold mb-0">
                                                    <!--     <%= data.websurfers.length %> -->
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
    
    
                                                    <!--    <% if(data.activeTickets == null){ %>
                                    0
                                    <% } else { %> 
                                      <%= data.activeTickets.length %>
                                      <% } %> -->
    
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
    
                                                    <!--     <% if(data.expiredTickets == null){ %>
                                    0
                                    <% } else { %> 
                                      <%= data.expiredTickets.length %>
                                      <% } %> -->
    
                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
    
                        <!--        <% if(user.role=='RESELLER' ){ %> -->
                        <div class="row">
                            <div class="col-12 col-xl-12">
                                <div class="card">
                                    <div class="card-header text-align-center">
                                        <h4>CLIENTI</h4>
                                    </div>
                                    <div class="card-body">
                                        <div class="table-responsive">
                                            <table class="table table-hover table-lg" id="table1">
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>NOME</th>
                                                        <th>C.F/P.IVA</th>
                                                        <th>EMAIL</th>
                                                        <th>FAX</th>
                                                        <th>INDIRIZZO</th>
                                                        <th>NOTE</th>
                                                        <th>TELEFONO</th>
                                                        <th>WEB</th>
                                                        <th>PIN</th>
                                                        <th>DEFAULT BANDWITH</th>
                                                        <th>ACTIONS</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <!--     <% data.customerOfThisReseller.forEach(function(reseller) { %> -->
                                                    <tr>
                                                        <td class="col-auto">
                                                            <p class=" mb-0">
                                                                <!--    <%= reseller.id %> -->
                                                            </p>
                                                        </td>
                                                        <td class="col-auto">
                                                            <p class=" mb-0">
                                                                <!--    <%= reseller.companyName %> -->
                                                            </p>
                                                        </td>
                                                        <td class="col-auto">
                                                            <p class=" mb-0">
                                                                <!--     <%= reseller.fiscalCode %> -->
                                                            </p>
                                                        </td>
                                                        <td class="col-auto">
                                                            <p class=" mb-0">
                                                                <!--   <%= reseller.email %> -->
                                                            </p>
                                                        </td>
                                                        <td class="col-auto">
                                                            <p class=" mb-0">
                                                                <!--  <%= reseller.fax %> -->
                                                            </p>
                                                        </td>
                                                        <td class="col-auto">
                                                            <p class=" mb-0">
                                                                <!--   <%= reseller.addessCompany %> -->
                                                            </p>
                                                        </td>
                                                        <td class="col-auto">
                                                            <p class=" mb-0">
                                                                <!--   <%= reseller.note %> -->
                                                            </p>
                                                        </td>
                                                        <td class="col-auto">
                                                            <p class=" mb-0">
                                                                <!--  <%= reseller.phone %> -->
                                                            </p>
                                                        </td>
                                                        <td class="col-auto">
                                                            <p class=" mb-0">
                                                                <!--  <%= reseller.web %> -->
                                                            </p>
                                                        </td>
                                                        <td class="col-auto">
                                                            <p class=" mb-0">
                                                                <!--   <%= reseller.pin %> -->
                                                            </p>
                                                        </td>
                                                        <td class="col-auto">
                                                            <p class=" mb-0">
                                                                <!--    <%= reseller.defaultBandwidth %> -->
                                                            </p>
                                                        </td>
                                                        <td class="col-auto">
                                                            <p class=" mb-0">
                                                                <button>MODIFICA</button>
                                                                <button>ELIMINA</button>
                                                            </p>
                                                        </td>
                                                    </tr>
                                                    <!--    <% }) %> -->
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--   <% }else{ %>
    
                    <% } %> -->
                        <div class="row">
                            <div class="col-12 col-xl-6">
                                <div class="card">
                                    <div class="card-header text-align-center">
                                        <h4>ULTIMI WEBSURFER INSERITI(3 GIORNI)</h4>
                                    </div>
                                    <!--    <% if(data.lastWebsurfers == 'NESSUN UTENTE AGGIUNTO DI RECENTE' || data.lastWebsurfers == null){ %> -->
                                    <div class="card-body">
                                        <div class="table-responsive">
                                            <table class="table table-hover table-lg">
                                                <tbody>
                                                    <tr>
                                                        <td class="col-auto">
                                                            <p class=" mb-0">
                                                                NESSUN UTENTE AGGIUNTO DI RECENTE
                                                            </p>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <!--   <% }else{ %> -->
                                    <div class="card-body">
                                        <div class="table-responsive">
                                            <table class="table table-hover table-lg">
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
                                                <!--          <tbody>
                                      <% data.lastWebsurfers.forEach(function(websurfer) { %>
                                        <tr>
                                            <td>
                                                <%= websurfer.id %>
                                            </td>
                                            <td>
                                                <%= websurfer.firstname %>
                                            </td>
                                            <td>
                                                <%= websurfer.lastname %>
                                            </td>
                                            <td>
                                                <%= websurfer.email %>
                                            </td>
                                            <td>
                                                <%= websurfer.phone %>
                                            </td>
                                            <td>
                                                <%= websurfer.note %>
                                            </td>
                                        </tr>
                                        <% }) %>
                                    </tbody> -->
                                            </table>
                                        </div>
                                    </div>
                                    <!--   <% } %> -->
                                </div>
                            </div>
    
    
                            <div class="col-12 col-xl-6">
                                <div class="card">
                                    <div class="card-header">
                                        <h4>ULTIMI TICKET CREATI(3 GIORNI)</h4>
                                    </div>
                                    <!--   <% if(data.lastTickets == 'NESSUN TICKET AGGIUNTO DI RECENTE' || data.lastTickets == null){ %> -->
                                    <div class="card-body">
                                        <div class="table-responsive">
                                            <table class="table table-hover table-lg">
                                                <tbody>
                                                    <tr>
                                                        <td class="col-auto">
                                                            <p class=" mb-0">
                                                                <!--   <%= data.lastTickets %> -->
                                                            </p>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <!--  <% }else{ %> -->
                                    <div class="card-body">
                                        <div class="table-responsive">
                                            <table class="table table-hover table-lg">
                                                <thead>
                                                    <tr>
                                                        <th>USER ID</th>
                                                        <th>EMMISSIONE</th>
                                                        <th>SCADENZA</th>
                                                        <th>DURATA(GG)</th>
                                                        <th>STATO</th>
                                                        <th>LOGIN</th>
                                                        <th>PASSWORD</th>
                                                    </tr>
                                                </thead>
                                            </table>
                                        </div>
                                    </div>
                                    <!--     <% } %> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';
export default {
  components: { Sidebar },
    name: "Dashboard",
    created() {},
    data() {
        return {};
    },
    props: {},
    methods: {},
};
</script>

