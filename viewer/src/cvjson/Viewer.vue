<template>
  <div>
    <v-container fluid>
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
    </v-container>
    <div v-if="isDefault">
      Select a label above to begin.
    </div>
    <Graph :elements="elements" :label="label" :threshold="threshold" />
    <Loading v-if="!!fetching" />
    <div v-show='!fetching && pageNo > 0' class='button' @click='refetchElements'>Load more</div>
    <div v-if="!!error" class="flexc">
      <h1>A network connection occurred. Make sure you are correctly configured with a running backend.</h1>
    </div>
  </div>
</template>

<script>
  import Loading from '../components/Loading.vue'
  import Graph from './Graph.vue'
  import { mapState, mapActions } from 'vuex'

  const PER_PAGE = 10

  export default {
    name: 'CvJsonViewer',
    components: {
      Loading,
      Graph
    },
    props: {
      batch: Object,
      labels: Array,
    },
    data() {
      return { pageNo: 0 }
    },
    methods: {
      ...mapActions([
        'fetchFromBatch',
        'fetchAttribute'
      ]),
      refetchElements() {
// TODO: add logic working out which elements have already been fetched, and don't need to be done again.
        const {batch, pageNo, ranking, label} = this
        const els = ranking[label]
        this.pageNo += 1
        const startIdx = pageNo * PER_PAGE
        const endIdx = Math.min(els.length, (pageNo + 1) * PER_PAGE)
        const elements = els.slice(startIdx, endIdx)
        const me = this
        this.fetchFromBatch({ q: batch.query, elements })
          .then(() => {
            me.pageNo += 1;
          })
      }
    },
    computed: {
      ...mapState({
        fetching: 'fetching',
        elements: 'activeElements',
        error: 'error',
        threshold: state => state.batch.threshold,
        label: state => state.batch.label,
        ranking: state => state.batch.ranking
      }),

      availableLabels() {
        const av = this.ranking ? Object.keys(this.ranking) : []
        return this.labels.filter(l => av.includes(l))
      },
      isDefault() {
        return this.elements.length === 0 && !this.fetching
      },
      storeThreshold: {
        get() {
          return this.$store.state.batch.threshold
        },
        set(value) {
          this.$store.commit('UPDATE_THRESHOLD', value)
        }
      },
      storeLabel: {
        get() {
          return this.$store.state.batch.label
        },
        set(value) {
          this.$store.commit('UPDATE_LABEL', value)
          this.refetchElements()
        },
      },
    },
    mounted: function () {
      const { batch } = this
      this.batch.label = this.storeLabel
      this.fetchAttribute({ attribute: "ranking", query: this.batch.query })
    }
  }
</script>

<style lang="scss">
  $primary-color: #e2e2e2;

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
