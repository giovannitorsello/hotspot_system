import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Login,
  },

  // Routes fo superadmin
  {
    path: "/superadmin/dashboard",
    name: "superadminDashboard",
    component: () => import("../views/superadmin/SuperadminDashboard.vue"),
  },
  {
    path: "/superadmin/resellers",
    name: "supeadminResellers",
    component: () => import("../views/superadmin/Resellers.vue"),
  },
  {
    path: "/superadmin/radius",
    name: "superadminRadius",
    component: () => import("../views/superadmin/Radius.vue"),
  },

  // Routes fo resellers
  {
    path: "/reseller/dashboard",
    name: "resellerDashboard",
    component: () => import("../views/reseller/ResellerDashboard.vue"),
  },
  {
    path: "/reseller/customers",
    name: "resellerCustomers",
    component: () => import("../views/reseller/Customers.vue"),
  },
  {
    path: "/reseller/devices",
    name: "reseller",
    component: () => import("../views/reseller/Devices.vue"),
  },
  {
    path: "/reseller/users",
    name: "resellerUsers",
    component: () => import("../views/reseller/Users.vue"),
  },

  // Routes fo customer
  {
    path: "/customer/dashboard",
    name: "customerDashboard",
    component: () => import("../views/customer/CustomerDashboard.vue"),
  },
  {
    path: "/customer/websurfers",
    name: "customerWebsurfers",
    component: () => import("../views/customer/Websurfers.vue"),
  },
  {
    path: "/customer/devices",
    name: "customerDevices",
    component: () => import("../views/customer/Devices.vue"),
  },
  {
    path: "/customer/users",
    name: "customerUsers",
    component: () => import("../views/customer/Users.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
