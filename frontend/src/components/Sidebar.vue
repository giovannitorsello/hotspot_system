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
           
            <div class="sidebar-menu">
                <ul class="menu">
                    <li v-for="item in checkClass" :key="item.id" :class="item.class" >
                        <router-link :to="item.path">
                        <a class='sidebar-link'>
                                  <i class="bi bi-grid-fill"></i>
                            <span>{{item.name}}</span>
                            </a>
                        </router-link>
                    </li>
                </ul>
            </div>
            <button class="sidebar-toggler btn x"><i data-feather="x"></i></button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "Sidebar",
    created() {},
    data() {
        return {
            menus: []
        };
    },
    computed:{
      checkClass(){
        return this.menus.map(item =>{
          item.class= item.path === this.$route.path ? 'sidebar-item active hidden' : 'sidebar-item'
          return item
        })
      }
    },
    created(){
        if(this.$store.state.user.role == "RESELLER"){
            this.menus = [{
                    name: 'Home',
                    path: '/dashboard',  
                }, {
                    name: 'Clienti',
                    path: '/customers',
                },
                {
                    name: 'Navigatore web',
                    path: '/websurfers',
                }, {
                    name: 'Ruoli',
                    path: '/users',
                }, {
                    name: 'Ticket',
                    path: '/tickets',
                }
            ]
        };
        if(this.$store.state.user.role == "HOTEL"){
            this.menus = [{
                    name: 'Home',
                    path: '/dashboard',
                },
                {
                    name: 'Navigatore web',
                    path: '/websurfers',
                }, {
                    name: 'Ruoli',
                    path: '/users',
                }, {
                    name: 'Ticket',
                    path: '/tickets',
                }
            ]
        };
        if(this.$store.state.user.role == "USER"){
            this.menus = [{
                    name: 'Home',
                    path: '/dashboard',
                },
                {
                    name: 'Navigatore web',
                    path: '/websurfers',
                },
                 {
                    name: 'Ticket',
                    path: '/tickets',
                }
            ]
        };
        if(this.$store.state.user.role == "SUPERADMIN"){
            this.menus = [{
                    name: 'Home',
                    path: '/dashboard',
                },
                {
                    name: 'Reseller',
                    path: '/resellers',
                },
                {
                    name: 'Navigatore web',
                    path: '/websurfers',
                }, {
                    name: 'Ruoli',
                    path: '/users',
                }, {
                    name: 'Ticket',
                    path: '/tickets',
                },
                {
                    name: 'Radius',
                    path: '/radius',
                }
            ]
        };
    },
    props: {},
    methods: {},
};
</script>

