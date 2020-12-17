<template>
  <div class="col-12" :id="svgId"></div>
</template>
<script>
import { select, scaleLinear } from "d3";

export default {
  name: "SVGFrameMap",
  components: {},
  props: {
    video_id: String,
    length: Number,
    frames: Array,
    scores: Array,
    label: String,
    threshold: Number,
  },
  data() {
    return {
      margin: {
        left: 0,
        right: 0,
      },
    };
  },
  methods: {
    init() {
      // console.log(this.svgId, select(`${this.svgId}`));
      // console.log(this.$vnode.elm);
      const svg = select(this.$vnode.elm)
        .append("svg")
        .attr("width", `100%`)
        .attr("height", `10px`)
        .append("g");
      svg
        .append("line")
        .attr("x1", 0)
        .attr("x2", `100%`)
        .attr("y1", `50%`)
        .attr("y2", `50%`)
        .attr("stroke", "black")
        .attr("opacity", 0.5)
        .attr("stroke-width", "2");

      // const detectedFrames = this.scores.map((score, idx) =>
      //   score > this.threshold ? { score, frame: idx } : null
      // );
      const detectedFrames = [];
      this.frames.forEach(
        (frame, i) =>
          this.scores[i] > this.threshold &&
          detectedFrames.push({
            score: this.scores[i],
            frame,
          })
      );

      const scaleX = scaleLinear()
        .domain([0, this.length])
        .range([0, 100]);

      svg
        .selectAll("rect")
        .data(detectedFrames)
        .enter()
        .append("rect")
        .attr("fill", `red`)
        .attr("x", (d) => `${scaleX(d.frame)}%`)
        .attr("y", 0)
        .attr("width", 3)
        .attr("height", `100%`);
      // console.log(detectedFrames, this.length);
    },
  },
  computed: {
    svgId: function() {
      return `frame-map-${this.video_id}`;
    },
  },

  mounted: function() {
    this.init();
  },
};
</script>
