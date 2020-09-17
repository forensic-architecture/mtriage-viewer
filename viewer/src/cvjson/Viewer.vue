<template>
  <div>
    <h1>Showing matches for: {{ label }}</h1>
    <v-container fluid>
      <v-row>
        <v-col>
          <v-select
            v-model="storeLabel"
            color="black"
            :items="labels"
            label="Label"
          />
        </v-col>
        <v-col>
          <v-slider
            color="black"
            v-model="storeThreshold"
            class="align-center"
            :step="0.05"
            :max="1"
            :min="0"
            hide-details
          />
        </v-col>
      </v-row>
    </v-container>
    <div v-if="isDefault">
      Select a label above to begin.
    </div>
    <Graph :elements="elements" :label="label" :threshold="threshold" />
    <Loading v-if="!!fetching" />
    <div v-show='!isDefault && !fetching' class='button' @click='nextPage'>Load more</div>
    <div v-if="!!error" class="flexc">
      <h1>A network connection occurred. Make sure you are correctly configured with a running backend.</h1>
    </div>
  </div>
</template>

<script>
  import Loading from '../components/Loading.vue'
  import Graph from './Graph.vue'
  import { mapState, mapActions } from 'vuex'

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
        'cvjson_fetchElements'
      ]),
      nextPage() {
        const me = this
        const { batch, pageNo } = this
        this.cvjson_fetchElements({ batch, pageNo })
          .then(() => {
            me.pageNo += 1;
            console.log('Page number now '+me.pageNo+'.')
          })
      },
      refetchElements(label) {
        const {batch, pageNo} = this
        const me = this
        this.cvjson_fetchElements({ batch: { ...batch, label }, pageNo })
        .then(() => {
          me.pageNo += 1;
        })

      }
    },
    computed: {
      isDefault() {
        return this.elements.length === 0 && !this.fetching
      },
      ...mapState({
        fetching: 'fetching',
        elements: 'activeElements',
        error: 'error',
        threshold: state => state.batch.threshold,
        label: state => state.batch.label,
      }),
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
          alert('we here')
          this.refetchElements(value)
          this.$store.commit('UPDATE_LABEL', value)
        },
      },
    },
    mounted: function () {
      const { batch } = this
      this.batch.label = this.storeLabel
    }
  }
</script>

<style lang="scss">
  $primary-color: #e2e2e2;

  h1 {
    padding-bottom: 30px;
  }

  .control-panel {
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
