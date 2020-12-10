<template>
  <div>
    View using:
    <span class="bold">{{ batch.etype }}</span>
  </div>
</template>

<script>
export default {
  props: {
    batch: Object,
  },
};
</script>

<style lang="scss">
.invert-inside {
  // color: white;
  // background-color: black;
  // padding: 5px 2.5px;
}
</style>
