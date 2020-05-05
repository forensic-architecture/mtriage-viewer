<template>
  <component :is="viewerComp" :batch="batch"></component>
</template>

<script>
import { mapState } from 'vuex'

import CvJsonViewer from '../cvjson/Container'

export default {
  components: {
    CvJsonViewer,
  },
  computed: {
    ...mapState({
      batch: state => state.activeBatch
    }),
    viewerComp: function() {
      const etypePrefix = !!this.batch ? this.batch.etype : "any"
      return `${etypePrefix}Viewer`
    }
  }
}
</script>
