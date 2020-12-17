<template>
  <v-app
    id="app"
    class="clearfix m2 mx3 m-auto flex flex-column justify-between left-align"
  >
    <Header :version="version" />
    <!-- <div class="main-app flex flex-column justify-between left-align"> -->
    <!-- <About /> -->
    <router-view />
    <!-- <batch-list v-if="!activeBatch" />
    <view-batch v-else /> -->
    <!-- </div> -->
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import About from "@/components/About.vue";
import Header from "@/components/Header.vue";
import BatchList from "@/components/BatchList.vue";
import ViewBatch from "@/components/ViewBatch.vue";
import Intro from "@/components/Intro.vue";
import "basscss/css/basscss.min.css";

export default {
  name: "app",
  computed: mapState({
    version: "version",
    activeBatch: (state) => state.activeBatch,
  }),
  components: {
    Header,
    About,
    Intro,
    BatchList,
    ViewBatch,
  },
};
</script>

<style lang="scss">
@import "css/app.css";

$primary-color: blue;
$background-color: #f1f1f1;
$card-colour: #1a1a1a;
$fa-red: #ee4238;

$break-small: 320px;
$break-large: 1024px;

@mixin respond-to($media) {
  @if $media == handhelds {
    @media only screen and (max-width: $break-small) {
      @content;
    }
  } @else if $media == medium-screens {
    @media only screen and (min-width: $break-small + 1) and (max-width: $break-large - 1) {
      @content;
    }
  } @else if $media == wide-screens {
    @media only screen and (min-width: $break-large) {
      @content;
    }
  }
}

body {
  margin: 0px;
  // background-color: $background-color;
}

#app {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  max-width: 1280px;
  // margin-top: 60px;
  // margin: 0px;
}

.main-app {
  min-height: 600px;
}

#body-container {
  display: flex;
  justify-content: space-between;
}

.container {
  display: flex;
  flex-direction: row-reverse;

  @include respond-to(medium-screens) {
    flex-direction: column;
  }
  .content-case {
    flex: 2;
  }
  .info-case {
    flex: 1;
    background-color: transparent;
    padding: 0 1em;
    h2 {
      // text-transform: uppercase;
      color: white;
    }
  }
}

.flexc {
  display: flex;
  justify-content: center;
  align-items: center;
}

img {
  width: 4em;
}
</style>
