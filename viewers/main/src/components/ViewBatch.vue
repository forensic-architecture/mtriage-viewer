<template>
  <div>
    <h1> TODO: switch based on etype </h1>
    {{ batch }}
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      batch: state => state.activeBatch
    })
  }
}
</script>
