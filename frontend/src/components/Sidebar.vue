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
            <!-- MENU SECTION-->
            <div class="sidebar-menu">
                <ul class="menu">
                    <li v-for="item in checkClass" :key="item.id" :class="item.class" >
                        <a class='sidebar-link' :href="item.path">
                                  <i class="bi bi-grid-fill"></i>
                            <span>{{item.name}}</span>
                            </a>
                    </li>
                </ul>
            </div>
            <button class="sidebar-toggler btn x"><i data-feather="x"></i></button>
        </div>
    </div>
</template>

<script>
export default {
    name: "Sidebar",
    created() {},
    data() {
        return {
            menus: [{
                    name: 'Home',
                    path: '/dashboard',
                    class:'',
                    access: ['SUPERADMIN', 'RESELLER', 'HOTEL', 'USER'],
                   
                }, {
                    name: 'Clienti',
                    path: '/customers',
                    class:'',
                    access: ['SUPERADMIN', 'RESELLER'],
                    hidden: ''
                }, {
                    name: 'Reseller',
                    path: '/resellers',
                    class:'',
                    access: ['SUPERADMIN'],
                
                },
                {
                    name: 'Navigatore web',
                    path: '/websurfers',
                    class:'',
                    access: ['SUPERADMIN', 'RESELLER', 'HOTEL', 'USER'],
                  
                }, {
                    name: 'Ruoli',
                    path: '/users',
                    class:'',
                    access: ['SUPERADMIN', 'RESELLER', 'HOTEL'],
                
                }, {
                    name: 'Ticket',
                    path: '/tickets',
                    class:'',
                    access: ['SUPERADMIN', 'RESELLER', 'HOTEL', 'USER'],
                   
                }, {
                    name: 'Radius',
                    path: '/radius',
                    class:'',
                    access: ['SUPERADMIN'],
                }
            ]
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
    props: {},
    methods: {},
};
</script>

