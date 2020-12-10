<template>
  <div
    class="flex flex-row flex-wrap justify-between my2 pb1 bold border-bottom"
  >
    <div class="flex lg-col-2 col-12">.mtbatch viewer</div>
    <div class="flex lg-col-2 col-12">v / {{ version }}</div>
    <div class="flex lg-col-2 col-12">
      available batches / 2
    </div>
    <div class="flex lg-col-2 col-12">
      last run / 01.12.2020
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    version: String,
  },
};
</script>

<style lang="scss">
$primary-color: #2a2a2a;
$text-color: white;

// .header {
//   color: $text-color;
//   display: flex;
//   justify-content: left;
//   background-color: $primary-color;
//   align-items: center;
//   padding: 5px 20px;
// }

// .flex-across {
//   display: flex;
//   align-items: center;
// }

// #header-text {
//   margin: 0 1em;
// }
</style>
