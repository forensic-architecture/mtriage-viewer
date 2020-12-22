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
          description: `This is a demo instance of <a href="https://forensic-architecture.org/">Forensic Architecture's</a> <a href="https://github.com/forensic-architecture/mtriage-viewer">mtriage-viewer</a>. The interface is designed as a workstation where our OSINT researchers can see the results of computational analysis on open source media, such as frame-by-frame classification of Youtube videos using machine learning classifiers.
<p>You can read more about this methodology on our website:
  <ul>
  <li><a href="https://forensic-architecture.org/investigation/cv-in-triple-chaser">Computer Vision in Triple Chaser</a></li>
  <li><a href="https://forensic-architecture.org/investigation/detecting-tear-gas">Detecting Tear Gas: Vision and Sound</a></li>
  </ul>
</p>
  <p>Or see its output in the following investigations and exhibitions:
  <ul>
  <li><a href="https://forensic-architecture.org/investigation/the-battle-of-ilovaisk">The Battle of Ilovaisk</a></li>
  <li><a href="https://forensic-architecture.org/investigation/triple-chaser">Triple Chaser</a></li>
  <li><a href="https://forensic-architecture.org/investigation/model-zoo">Model Zoo</a></li>
  <li><a href="https://forensic-architecture.org/investigation/tear-gas-in-plaza-de-la-dignidad">Tear Gas in Plaza de la Dignidad</a></li>
  </ul>
  </p>`,
        },
        {
          title: `FAQ`,
          description: `
          <div>
          <p><strong>What do 'batches' represent?</strong></p>
          <p>An mtriage <strong>batch</strong> can be understood as what is produced by a sequence of data transformations.It is produced as the result of taking some media and processing it via modules which we call <strong>analyzers</strong>. This interface is designed to helped automate some of the more labor-intensive processes of open source research.</p>

          <p><strong>How are batches produced?</strong></p>
          <p><strong><a href="https://github.com/forensic-architecture/mtriage">mtriage</a></strong> is a framework for orchestrating computational analysis. It includes both modules that can search and retrieve media from various online platforms, and modules that can analyse that media with machine learning classifiers or other analytic techniques.</p>
          <p>For more detail on the rationale behind developing mtriage, check out <a href="https://github.com/forensic-architecture/mtriage/blob/main/docs/overview.md">its documentation.</a></p>`,
        },
        {
          title: `How can I contribute?`,
          description: `<div>We welcome input, discussion, and contributions from open-source developers. One can check out the mtriage <a href="https://github.com/forensic-architecture/mtriage">repository</a> on Github.</div>
          <p>This website is powered by <a href="https://github.com/forensic-architecture/mtriage-server">mtriage-server</a> and <a href="https://github.com/forensic-architecture/mtriage-viewer">mtriage-viewer</a> in tandem.</p>
          <p>If you are interested in helping us develop additional selectors and analyzers, please consider joining <a href="https://discord.gg/FJ4XsCg">the conversation on Discord.</a></p>`,
        },
        {
          title: `People`,
          description: `<div>Though stewarded by <a href="https://forensic-architecture.org">Forensic Architecture</a>, the mtriage ecosystem is developed and maintained by a broader team of software researchers, journalists, and academics. The extended community is integral to mtriage's development and use.</div>
          <p>Active contributors include:</p>
        <ul>
          <li><a href="https://lachlankermode.com">Lachie Kermode</a></li>
          <li><a href="https://forensic-architecture.org/about/team/member/zac-ioannidis">Zac Ioannidis</a></li>
          <li><a href="https://github.com/christegho">Chris Tegho</a></li>
          <li><a href="https://github.com/ashwindcruz">Ashwin D. Cruz</a></li>
          <li><a href="https://github.com/RibenaMapleSyrup">Sean Greaves</a></li>
          <li><a href="https://forensic-architecture.org/about/team/member/ebrahem-farooqui">Ebrahem Farooqui</a></li>
        </ul>`,
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
