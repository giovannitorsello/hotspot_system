<template>
        <v-row class="row m-0" style="justify-content: center">
            <v-col>
                <v-row>
                    <v-col>
                        <div class="stats-icon blue">
                            <i class="iconly-boldProfile"></i>
                        </div>
                    </v-col>
                    <v-col>
                        <h6 class="text-muted font-semibold">RESELLER</h6>
                        <h6 class="font-extrabold mb-0">
                            {{ hsComponentStore.resellersOfSelectedSuperadmin.length }}
                        </h6>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
</template>

<script>
import { hsStoreSuperadmin } from "@/store/storeSuperadmin.js";
export default {
  name: "StatsSuperadmin",
  setup() {
      const hsComponentStore = hsStoreSuperadmin();
      return { hsComponentStore };
    },
  data() {
    return {};
  },
  props: {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>