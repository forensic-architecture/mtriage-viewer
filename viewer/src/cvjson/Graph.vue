<template>
  <div class="flex flex-column col-12">
    <div class="flex flex-row bold border-bottom h6">
      <div class="col-1">ID</div>
      <div class="col-2">Title</div>
      <div class="col-2">Description</div>
      <div class="col-1">Duration</div>
      <div class="col-1">Upload Date</div>
      <div class="col-6">Frame Graph</div>
    </div>

    <TableRow
      v-for="(video, key) in elements"
      :key="key"
      :video_id="video.webpage_url.split('=')[1]"
      :title="video.title"
      :uploadDate="video.upload_date"
      :webpageUrl="video.webpage_url"
      :description="video.description"
      :duration="video.duration"
      :frames="getFrames(video)"
      :scores="getScores(video)"
      :label="label"
      :threshold="threshold"
    />
    <VideoCell
      v-for="(video, key) in elements"
      v-if="!!video.webpage_url"
      :key="key"
      :video_id="video.webpage_url.split('=')[1]"
      :title="video.title"
      :uploadDate="video.upload_date"
      :webpageUrl="video.webpage_url"
      :description="video.description"
      :duration="video.duration"
      :frames="getFrames(video)"
      :scores="getScores(video)"
      :label="label"
      :threshold="threshold"
    ></VideoCell>
  </div>
</template>

<script>
import VideoCell from "./VideoCell.vue";
import TableRow from "./TableRow.vue";

export default {
  name: "Graph",
  components: {
    TableRow,
    VideoCell,
  },
  props: {
    elements: Array,
    label: String,
    threshold: Number,
  },
  methods: {
    getFrames(video) {
      if (!video.labels) return null;
      const lbls = Object.keys(video.labels);
      if (lbls.includes(this.label)) {
        return video.labels[this.label].frames;
      }
      return null;
    },
    getScores(video) {
      if (!video.labels) return null;
      const lbls = Object.keys(video.labels);
      if (lbls.includes(this.label)) {
        return video.labels[this.label].scores;
      }
      return null;
    },
  },
};
</script>
