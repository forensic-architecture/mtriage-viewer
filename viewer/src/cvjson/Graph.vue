<template>
  <div class="graph-container">
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
  // import { rankByFrameCount } from '../lib/rank'
  import VideoCell from './VideoCell.vue'

  export default {
    name: 'Graph',
    components: {
      VideoCell
    },
    props: {
      elements: Array,
      label: String,
      threshold: Number,
    },
    methods: {
      getFrames(video) {
        if (!video.labels) return null
        const lbls = Object.keys(video.labels)
        if (lbls.includes(this.label)) {
          return video.labels[this.label].frames
        }
        return null
      },
      getScores(video) {
        if (!video.labels) return null
        const lbls = Object.keys(video.labels)
        if (lbls.includes(this.label)) {
          return video.labels[this.label].scores
        }
        return null
      }
    },
  }
</script>
