<template>
  <div class="flex flex-row flex-wrap left-align">
    <div class="flex col-12">
      <div class="mr1 bold">
        Select a classification label below to begin:
      </div>
      <div class="px1">
        <!-- <label for="label-select">Label</label> -->
        <select name="ml-labels" id="label-select" v-model="storeLabel">
          <option v-for="l in availableLabels" :key="l">{{ l }}</option>
        </select>
      </div>
    </div>
    <div></div>
    <!-- <v-container fluid>
      <v-row md="12">
        <v-col offset-md="4" md="4" align="center">
          <v-select
            v-model="storeLabel"
            color="black"
            :items="availableLabels"
            label="Label"
          />
        </v-col>
      </v-row>
    </v-container> -->
    <div class="flex flex-column col-12">
      <div class="lg-col-6 my3">
        <p>
          Each cell below represents a video, its timeline running from left to
          right.
        </p>
        <p>
          Red frames indicate a classification that matches the label. The
          brighter the frame, the more confident the classification.
        </p>
        <p>
          The classifier used is directly applied from
          <a href="https://keras.io/api/applications/"
            >Keras trained on ImageNet</a
          >. Because the ImageNet sample contains 1000 classes, each frame is
          classified into just 1 of those 1000 options. (Thus if a person is
          more prominent than a rifle, the result will likely be 'person' rather
          than 'rifle', even if the image clearly contains a rifle.) The
          accuracy of the classifier could easily be tuned to improve for
          specific objects.
        </p>
        <p class="bold">
          Click on a cell to see general information about the video, or on a
          frame to go to that section of the original video.
        </p>
      </div>
      <Graph :elements="elements" :label="label" :threshold="threshold" />
      <Loading v-if="!!fetching" />
      <div
        v-show="!fetching && pageNo > 0"
        class="button my2 bold"
        @click="refetchElements"
      >
        Load more...
      </div>
      <div v-if="!!error" class="flexc">
        <h1>
          A network connection occurred. Make sure you are correctly configured
          with a running backend.
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "../components/Loading.vue";
import Graph from "./Graph.vue";
import { mapState, mapActions } from "vuex";

const PER_PAGE = 10;

export default {
  name: "CvJsonViewer",
  components: {
    Loading,
    Graph,
  },
  props: {
    batch: Object,
    labels: Array,
    data: Array,
  },
  data() {
    return { pageNo: 0 };
  },
  methods: {
    ...mapActions(["fetchFromBatch", "fetchAttribute"]),
    refetchElements() {
      // TODO: add logic working out which elements have already been fetched, and don't need to be done again.
      const { batch, pageNo, ranking, label } = this;
      const els = ranking[label];
      this.pageNo += 1;
      const startIdx = pageNo * PER_PAGE;
      const endIdx = Math.min(els.length, (pageNo + 1) * PER_PAGE);
      const elements = els.slice(startIdx, endIdx);
      const me = this;
      this.fetchFromBatch({ q: batch.query, elements }).then(() => {
        me.pageNo += 1;
      });
    },
  },
  updated() {
    console.log(this.data);
    console.log(this);
  },
  computed: {
    ...mapState({
      fetching: "fetching",
      elements: "activeElements",
      error: "error",
      threshold: (state) => state.batch.threshold,
      label: (state) => state.batch.label,
      ranking: (state) => state.batch.ranking,
    }),

    availableLabels() {
      return this.data && [...new Set(this.data.map((d) => d.label))];
      const av = this.ranking ? Object.keys(this.ranking) : [];
      const labels = this.labels.filter((l) => av.includes(l));
      labels.unshift("");
      return labels;
    },
    isDefault() {
      return this.elements.length === 0 && !this.fetching;
    },
    storeThreshold: {
      get() {
        return this.$store.state.batch.threshold;
      },
      set(value) {
        this.$store.commit("UPDATE_THRESHOLD", value);
      },
    },
    storeLabel: {
      get() {
        return this.$store.state.batch.label;
      },
      set(value) {
        this.$store.commit("UPDATE_LABEL", value);
        this.refetchElements();
      },
    },
  },
  mounted: function() {
    const { batch } = this;
    this.batch.label = this.storeLabel;
    this.fetchAttribute({ attribute: "ranking", query: this.batch.query });
  },
};
</script>

<style lang="scss">
$primary-color: #e2e2e2;

// .intro {
//   text-align: left;
//   max-width: 600px;
//   margin: 0 auto;
//   padding-bottom: 20px;
// }

// .table {
//   display: flex;
//   justify-content: flex-start;
//   flex-direction: column;
//   flex: 1;
//   min-height: 100%;
// }

// .graph-container {
//   text-align: left;
// }

// .hidden {
//   display: none;
// }
</style>
