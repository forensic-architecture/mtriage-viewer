<template>
  <div>
    <h1 class="batch-header" @click="log(`elementmap: ${JSON.stringify(elementmap)}`)"> Available Batches</h1>

    <Loading v-if="fetching" />
    <div v-if="error" class="flexc">
      <h1>A network connection error occurred. Make sure you are correctly configured.</h1>
    </div>

    <div v-for="batch in elementmap" >
      <div class="batch-row" v-if="batch.elements !== null" @click="SET_ACTIVE_BATCH(batch)">
        <h2>{{batch.query}}</h2>
        <div class="table">
          <BatchPreview :batch="batch" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from './Loading.vue'
import { mapState, mapActions, mapMutations } from 'vuex'
import BatchPreview from './BatchPreview.vue'

export default {
  name: 'BatchList',
  components: {
    Loading,
    BatchPreview
  },
  methods: {
    ...mapActions(['fetchBatches']),
    ...mapMutations(['SET_ACTIVE_BATCH']),
    log: function (e) {
      console.log(e);
    } 
  },
  computed: {
    ...mapState({
      fetching: state => state.fetching,
      elementmap: state => state.elementmap,
      error: state => state.error
    })
  },
  mounted: function () {
    this.fetchBatches()
  }
}



</script>

<style lang="scss">
$primary-color: #e2e2e2;

h1, h2 {
  text-align: left;
}

.batch-header {
  margin-bottom: 20px;
}

.batch-row {
  border: 1px solid black;
  padding: 5px 15px;
  &:hover {
    cursor: pointer;
    background-color: black;
    color: white;
  }
}

hr {
  margin: 15px 0;
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
