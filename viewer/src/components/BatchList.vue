<template>
  <div class="flex flex-row flex-wrap">
    <div class="flex col-12 h1 bold my3">Batches</div>
    <div class="flex flex-wrap col-12">
      <Loading v-if="fetching" />
      <div v-if="error" class="flexc">
        <h1>
          A network connection error occurred. Make sure you are correctly
          configured.
        </h1>
      </div>
      <div
        class="flex lg-col-4 md-col-6 col-12 batch-row clearfix px2 py2"
        v-for="(batch, idx) in elementmap"
        :key="batch.query"
      >
        <div
          class="flex flex-row flex-wrap col-12 left-align"
          v-if="batch.elements !== null"
          @click="SET_ACTIVE_BATCH(batch)"
        >
          <div class="lg-col-2 sm-col-12 h2">{{ idx + 1 }}/</div>
          <div class="flex flex-column align-bottom">
            <div class="h3 bold">{{ batch.query.replace(/\//g, "") }}</div>
            <div class="mt2">{{ batch.elements.length }} elements</div>
            <div class="">Generated on: 01.12.2020</div>
            <div class="mt2">
              <BatchPreview :batch="batch" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "./Loading.vue";
import { mapState, mapActions, mapMutations } from "vuex";
import BatchPreview from "./BatchPreview.vue";

export default {
  name: "BatchList",
  components: {
    Loading,
    BatchPreview,
  },
  methods: {
    ...mapActions(["fetchBatches"]),
    ...mapMutations(["SET_ACTIVE_BATCH"]),
  },
  computed: {
    ...mapState({
      fetching: (state) => state.fetching,
      elementmap: (state) => state.elementmap,
      error: (state) => state.error,
    }),
  },
  mounted: function() {
    this.fetchBatches();
  },
};
</script>

<style lang="scss">
$primary-color: #e2e2e2;

h1,
h2 {
  text-align: left;
}

.batch-row {
  cursor: pointer;

  &:hover {
    border: 1px solid black;
    border-left-width: 0px;
    border-right-width: 0px;
  }
}

.table {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  flex: 1;
  min-height: 100%;
}

.graph-container {
  text-align: left;
}

.hidden {
  display: none;
}
</style>
