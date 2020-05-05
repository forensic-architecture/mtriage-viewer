<template>
  <div>
    View using: {{ batch.etype }}
  </div>
</template>

<script>
  export default {
    props: {
      batch: Object
    }
  }
</script>
