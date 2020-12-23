<template>
  <div>
    <component
      :is="viewerComp.nested"
      :batch="batch"
      :data="flattened"
      :labels="labels"
    ></component>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";

import CvJsonViewer from "../cvjson/Viewer.vue";
import api from "../lib/api";

export default {
  components: {
    CvJsonViewer,
  },
  data() {
    return {
      flattened: [],
    };
  },
  methods: {
    ...mapActions(["fetchFromBatch"]),
    // active batch won't exist if we land directly here from wherever
    ...mapMutations(["SET_ACTIVE_BATCH"]),
    setData(data) {
      console.log(data);
      this.flattened = data;
    },
  },
  computed: {
    ...mapState({
      allBatches: (state) => state.allBatches,
      batch: (state) => state.activeBatch,
      labels: (state) => state.activeLabels,
    }),
    viewerComp: function() {
      const etypePrefix = !!this.batch ? this.batch.etype : "any";
      return {
        flattened: `${etypePrefix}FlattenedViewer`,
        nested: `${etypePrefix}Viewer`,
      };
      // return `${etypePrefix}Viewer`;
    },
  },
  async beforeRouteEnter(to, from, next) {
    const batchName = to.params.id;

    const d = await api.fetchMetaElement({ query: batchName });
    // console.log(d, this);
    next((vm) => {
      console.log(vm.allBatches);
      vm.SET_ACTIVE_BATCH(
        vm.allBatches.find((batch) => batch.query === batchName)
      );
      console.log(d);
      vm.setData(d["flattened.json"]);
    });
  },
};
</script>
