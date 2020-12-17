<template>
  <div class="flex flex-row border-bottom h6">
    <div class="col-1">{{ video_id }}</div>
    <div class="col-2">{{ title }}</div>
    <div class="col-2">{{ description }}</div>
    <div class="col-1">{{ fmtDuration }}</div>
    <div class="col-1">{{ date }}</div>
    <div class="col-6">Frame Graph</div>
  </div>
</template>

<script>
import FrameMap from "./FrameMap.vue";
import { fmtMinSec, formatDate, yyyymmddParse } from "../lib/util";

export default {
  name: "TableRow",
  components: {
    FrameMap,
  },
  props: {
    video_id: String,
    title: String,
    uploadDate: String,
    webpageUrl: String,
    description: String,
    duration: Number,
    frames: Array,
    scores: Array,
    label: String,
    threshold: Number,
  },
  computed: {
    rankFmt: function() {
      return this.$vnode.key + 1;
    },
    descriptionFmt: function() {
      if (this.description == "") {
        return "No description.";
      } else {
        return this.description;
      }
    },
    date: function() {
      return formatDate(yyyymmddParse(this.uploadDate));
    },
    fmtDuration: function() {
      return fmtMinSec(this.duration);
    },
  },
};
</script>
