<template>
  <div class="about-menu__container flex flex-wrap flex-row my2 content-start">
    <div class="col-12 lg-col-12 left-align">
      <div class="bold h2 mb2">Menu</div>
    </div>
    <div class="col-12 md-col-4 mb3">
      <div class="flex-column lg-col-12 left-align">
        <div v-for="(section, idx) in content" :key="section.title">
          <div
            v-on:click="contentIdx = idx"
            v-bind:class="{ bold: contentIdx === idx }"
            class="flex lg-col-12 h3 pb1 pointer"
          >
            {{ section.title }}
          </div>
        </div>
      </div>
    </div>
    <div class="flex-column md-col-6 left-align h3">
      <div v-html="content[contentIdx].description"></div>
      <!-- <div v-for="section in content" :key="section.description">
        <div>{{section.description}} {{contentIdx}}</div>
      </div> -->
    </div>
  </div>
</template>

<style scoped>
.about-menu__container {
  min-height: 250px;
}
</style>

<script>
export default {
  name: "About",
  components: {},
  state: {},
  data: function() {
    return {
      contentIdx: 0,
      content: [
        {
          title: `What is this?`,
          description: `This is a demo instance of <a href="https://forensic-architecture.org/">Forensic Architecture's</a> <a href="https://github.com/forensic-architecture/mtriage-viewer">mtriage-viewer</a>. We use this interface to present the results of machine learning analysis to OSINT researchers.
<p>For more information regarding how this has been applied in investigations, see our blog posts <a href="https://forensic-architecture.org/investigation/cv-in-triple-chaser">Computer Vision in Triple Chaser</a> and <a href="https://forensic-architecture.org/investigation/detecting-tear-gas">Detecting Tear Gas: Vision and Sound</a>.</p>`,
        },
        {
          title: `FAQ`,
          description: `
          <div>
          <strong><a href="https://github.com/forensic-architecture/mtriage">mtriage</a></strong> is an end-to-end framework that enables the retrieval and analysis of crowdsourced multimedia using machine learning.
          </div>
          <p>
          An mtriage <strong>pipeline</strong> can be thought of as a sequence of data transformations which, ultimately, output artifacts that can be scrutinized and further actioned by a researcher. In short, it largely automates the labor-intensive process of annotating media inputs. 
          </p>
          <p>
          Two of the main components of an mtriage pipeline are: <strong>selectors</strong> and <strong>analyzers</strong>: the former pertain to the retrieval of data, whereas the latter relates to determining regions of interest within the media itself.
          </p>
          <p>
          The output of an mtriage pipeline is called a <strong>batch</strong>. A batch highlights regions of interest resulting from the execution of an mtriage pipeline: if the pipeline pertains to identifying objects of interest using Computer Vision, the appropriate <strong>viewer</strong> will present the relevant results in this interface.
          </p>
          <p>
          For more detail on the rationale behind developing mtriage, check out <a href="https://github.com/forensic-architecture/mtriage/blob/main/docs/overview.md">our overview document.</a>
          </p>`,
        },
        {
          title: `How can I contribute?`,
          description: `<div>We welcome input, discussion, and contributions from open-source developers. One can check out the mtriage <a href="https://github.com/forensic-architecture/mtriage">repository</a> on Github.</div>
          <p>The source code for our website can be found at: TODO.</p>
          <p>If you are interested in helping us develop additional selectors and analyzers, please consider joining <a href="https://discord.gg/FJ4XsCg">the conversation on Discord.</a></p>`,
        },
        {
          title: `People`,
          description: `<div>
          We are a team of software researchers, journalists, and academics. Our extended community members help us with the development of our open-source frameworks.</div>
          <p>Below are our core members:</p>`,
        },
      ],
    };
  },
  props: {},
  methods: {
    setContentIdx(newIdx) {
      this.state.contentIdx = newIdx;
    },
  },
  computed: {},
  mounted: function() {},
};
</script>
