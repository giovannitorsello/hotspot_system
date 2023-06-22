<template>
    <div id="auth">
        <div class="row h-100">
            <div class="col-lg-5 col-12">
                <div id="auth-left">
                    <div class="auth-logo">
                        <a href="/dashboard"><img src="img/logo_ASYTECH.png" alt="Logo"
                /></a>
                    </div>
                    <h1 class="auth-title">LOGIN TICKET</h1>
                    <p class="auth-subtitle mb-5"></p>
                    <div class="form-group position-relative has-icon-left mb-4">
                        <input type="text" class="form-control form-control-xl" placeholder="Username" name="username" v-model="username" required />
                        <div class="form-control-icon">
                            <i class="bi bi-person"></i>
                        </div>
                    </div>
                    <div class="form-group position-relative has-icon-left mb-4">
                        <input type="password" class="form-control form-control-xl" placeholder="Password" name="password" v-model="password" required />
                        <div class="form-control-icon">
                            <i class="bi bi-shield-lock"></i>
                        </div>
                    </div>
                    <button class="btn btn-primary btn-block btn-lg shadow-lg mt-5" @click="checkCredentials()">
                ACCEDI
              </button>
                </div>
            </div>
            <div class="col-lg-7 d-none d-lg-block">
                <div id="auth-right"></div>
            </div>
            <SnackbarMessage ref="snackbarMessage" />
        </div>
    </div>
</template>

<script>
import axios from "axios";
import DialogConfirm from "@/components/general/DialogConfirm.vue";
import SnackbarMessage from "@/components/general/SnackbarMessage.vue";
import { hsStoreSuperadmin } from "@/store/storeSuperadmin.js";
import { hsStoreReseller } from "@/store/storeReseller.js";
import { hsStoreCustomer } from "@/store/storeCustomer.js";

export default {
    name: "App",
    components: { SnackbarMessage, DialogConfirm },
    setup() {
    },
    data() {
        return {
            username: "antoniocortese1999@gmail.com",
            password: "mpghb3po",
        };
    },
    methods: {
        async checkCredentials() {
            const res = await axios.post("/api/login", {
                username: this.username,
                password: this.password,
            });
            if (!res.data.user || !res.data.user.role) {
                this.$router.push("/");
                this.$refs.snackbarMessage.open("Credenziali errate!", "error");
            } else {
                if (res.data.user.role === "SUPERADMIN") {
                    const storeSuperadmin = hsStoreSuperadmin();
                    console.log("Logged superadmin is:", res.data.user);
                    storeSuperadmin.init(res.data.user);
                    this.$router.push("superadmin/dashboard");
                    return {storeSuperadmin};
                } else if (res.data.user.role === "RESELLER") {
                    const storeReseller = hsStoreReseller();
                    console.log("Logged reseller is:", res.data.user);
                    storeReseller.init(res.data.user);
                    this.$router.push("reseller/dashboard");
                    return {storeReseller};
                } else if (res.data.user.role === "CUSTOMER") {
                    const storeCustomer = hsStoreCustomer();
                    console.log("Logged customer is:", res.data.user);
                    storeCustomer.init(res.data.user);
                    this.$router.push("customer/dashboard");
                    return {storeCustomer};
                }
            }
        },
    },
};
</script>
