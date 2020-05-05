<template>
  <div>
    <h1> TODO: switch based on etype </h1>
    <Container :batch="batch" label="tank" :threshold="0" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Container from '../cvjson/Container'

export default {
  components: {
    Container,
  },
  computed: {
    ...mapState({
      batch: state => state.activeBatch
    })
  }
}
</script>
