<template>
  <component :is="viewerComp" :batch="batch" :labels="labels"></component>
</template>

<script>
import { mapState } from "vuex";

import CvJsonViewer from "../cvjson/Viewer.vue";

export default {
  components: {
    CvJsonViewer,
  },
  computed: {
    ...mapState({
      batch: (state) => state.activeBatch,
      labels: (state) => state.activeLabels,
    }),
    viewerComp: function() {
      const etypePrefix = !!this.batch ? this.batch.etype : "any";
      return `${etypePrefix}Viewer`;
    },
  },
};
</script>
