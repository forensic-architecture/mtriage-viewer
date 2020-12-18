<template>
  <div class="relative">
    <div class="absolute flex-column h6 p1 rounded" :id="tooltipId"></div>
    <div class="col-12" :id="svgId"></div>
  </div>
</template>
<script>
import { select, scaleLinear } from "d3";
import {fmtMinSec, formatPercentage} from '../lib/util';

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
        .attr("height", `20px`)
        .append("g");
      svg
        .append("line")
        .attr("x1", 0)
        .attr("x2", `100%`)
        .attr("y1", `50%`)
        .attr("y2", `50%`)
        .attr("stroke", "black")
        .attr("opacity", 0.5)
        .attr("stroke-width", "1");

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

      const tooltip = select(`#${this.tooltipId}`)
        .style('font-size', '10px')
        .style('pointer-events', `none`)
        .style('line-height', '10px')

      svg
        .selectAll("rect")
        .data(detectedFrames)
        .enter()
        .append("rect")
        .attr("fill", `red`)
        .attr("x", (d) => `${scaleX(d.frame)}%`)
        .attr("y", 0)
        .attr("opacity", .7)
        .attr("width", 3)
        .attr("height", `100%`)
        .style('cursor', 'pointer')
        .on('click', (d) => {
          this.openFrame(d.target.__data__.frame)
        })
        .on('mouseenter', function(d, i) {
          tooltip
            .style('transform', `translate(${d.layerX}px, -10px)`)
            .style('background', 'rgba(230, 230, 230, .4)')
            .html(`
              <div>
                Time: ${fmtMinSec(d.target.__data__.frame)}
              </div>
              <div>
                Score: ${formatPercentage(+d.target.__data__.score)}%
              </div>
            `)
        })
        .on('mouseleave', function(d, i) {
          tooltip
            .style('background', 'none')
            .html(``)
        })
      // console.log(detectedFrames, this.length);
    },
    openFrame: function(idx) {
      window.open(`https://youtu.be/${this.video_id}?t=${idx}`, "_blank");
    }
  },
  computed: {
    svgId: function() {
      return `frame-map-${this.video_id}`;
    },
    tooltipId: function() {
      return `frame-map-tooltip-${this.video_id}`
    }
  },

  mounted: function() {
    this.init();
  },
};
</script>
