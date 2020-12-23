<template>
  <div class="flex flex-row">
    <div>Fetching data</div>
  </div>
</template>

<script>
export default {
  name: "Loading",
  props: {
    version: String,
  },
};
</script>

<style lang="scss">
$primary-color: #e2e2e2;

.flex-fill {
  display: flex;
  background-color: transparent;
  flex: 1;
}

.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
