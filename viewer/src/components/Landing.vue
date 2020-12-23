<template>
  <div>
    <About />
    <BatchList />
  </div>
</template>

<script>
import { mapState } from "vuex";

import About from "@/components/About";
import BatchList from "@/components/BatchList";

export default {
  components: {
    About,
    BatchList,
  },
  computed: {
    ...mapState({
      // batch: (state) => state.activeBatch,
      // labels: (state) => state.activeLabels,
    }),
    // viewerComp: function() {
    //   const etypePrefix = !!this.batch ? this.batch.etype : "any";
    //   return `${etypePrefix}Viewer`;
    // },
  },
};
</script>
