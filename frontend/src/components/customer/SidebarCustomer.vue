<template>
  <div id="sidebar" class="active">
    <div class="sidebar-wrapper active">
      <div class="sidebar-header">
        <div class="d-flex justify-content-between">
          <div class="logo">
            <a href="/dashboard"><img src="/img/logo_ASYTECH.png" alt="Logo" /></a>
          </div>
        </div>
      </div>

      <div class="sidebar-menu">
        <ul class="menu">
          <li v-for="item in checkClass" :key="item.id" :class="item.class">
            <router-link :to="item.path">
              <a class="sidebar-link">
                <i class="bi bi-grid-fill"></i>
                <span>{{ item.name }}</span>
              </a>
            </router-link>
          </li>
        </ul>
      </div>

      <div class="sidebar-footer">
        <button class="sidebar-toggler btn x"><i data-feather="x"></i></button>
        <router-link to="/">
          <button class="sidebar-logout btn" @click="logout">ESCI</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import { hsStore } from "@/store/hotspotSystemStore.js";
  export default {
    name: "Sidebar",
    setup() {
      const hsComponentStore = hsStore();
      return { hsComponentStore };
    },
    data() {
      return {
        menus: [],
      };
    },
    computed: {
      checkClass() {
        return this.menus.map((item) => {
          item.class = item.path === this.$route.path ? "sidebar-item active hidden" : "sidebar-item";
          return item;
        });
      },
    },
    created() {
      this.menus = [
        {
          name: "Home",
          path: "/customer/dashboard",
        },
        {
          name: "Inserisci Ospite",
          path: "/customer/websurfers",
        },
        {
          name: "Gestione Ticket",
          path: "/customer/ticket",
        },
        {
          name: "Credenziali Accesso",
          path: "/customer/users",
        },
      ];
    },

    methods: {},
  };
</script>
<style scoped>
  .sidebar-footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 30px;
  }

  .sidebar-logout {
    display: block;
    width: 100%;
    text-align: center;
    border: 1px solid black;
    background: none;
    padding: 0;
    font-size: 1.3rem;
    color: black;
  }

  .sidebar-logout:hover {
    color: #1d2124;
    cursor: pointer;
  }
  .sidebar-wrapper {
    box-shadow: 0px 0px 7px 2px;
  }
</style>
