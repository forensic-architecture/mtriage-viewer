<template>
  <div class="flex flex-row flex-wrap border-bottom my2 h6">
    <div class="col-1">{{ video_id }}</div>
    <div class="col-3">{{ title }}</div>
    <div class="col-6">{{ description }}</div>
    <div class="col-1">{{ fmtDuration }}</div>
    <div class="col-1">{{ date }}</div>
    <div class="col-12 my2">
      <SVGFrameMap
        :video_id="video_id"
        :length="duration"
        :frames="frames"
        :scores="scores"
        :label="label"
        :threshold="threshold"
      />
    </div>
  </div>
</template>

<script>
import FrameMap from "./FrameMap.vue";
import SVGFrameMap from "./SVGFrameMap";
import { fmtMinSec, formatDate, yyyymmddParse } from "../lib/util";

export default {
  name: "TableRow",
  components: {
    SVGFrameMap,
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
