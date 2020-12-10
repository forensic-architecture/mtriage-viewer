<template>
  <div class="flex flex-wrap flex-row my2">
    <div class="flex lg-col-12">
        <div class="bold h2 mb2">Menu</div>
    </div>
    <div class="lg-col-4">
      <div class="flex-column lg-col-12 left-align">
        <div v-for="(section, idx) in content" :key="section.title">
          <div 
          v-on:mouseenter="contentIdx=idx" 
          v-bind:class="{ bold: contentIdx===idx}" class="flex lg-col-12 h3 pb1" >{{section.title}}</div>
        </div>
      </div>
    </div>
    <div class="flex-column lg-col-6 left-align h3">
      <div v-html="content[contentIdx].description"></div>
      <!-- <div v-for="section in content" :key="section.description">
        <div>{{section.description}} {{contentIdx}}</div>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  components: {

  },
  state: {
    
  },
  data: function() {
    return {
      contentIdx: 0,
      content: [
        {
          title: `What is this?`,
          description: `This is a demo instance of <a href="https://forensic-architecture.org/">Forensic Architecture's</a> <a href="https://github.com/forensic-architecture/mtriage-viewer">mtriage-viewer</a>. We use this interface to present the results of machine learning analysis to OSINT researchers.
<p>For more information regarding how this has been applied in investigations, see our blog posts <a href="https://forensic-architecture.org/investigation/cv-in-triple-chaser">Computer Vision in Triple Chaser</a> and <a href="https://forensic-architecture.org/investigation/detecting-tear-gas">Detecting Tear Gas: Vision and Sound</a>.</p>`
        },
        {
          title: `How can I contribute?`,
          description: `lorem ipsum`
        },
        {
          title: `FAQ`,
          description: `lorem ipsum`
        },
        {
          title: `People`,
          description: `lorem ipsum`
        }
      ]
    }
  },
  props: {
  },
  methods: {
    setContentIdx(newIdx) {
      this.state.contentIdx = newIdx
    }
  },
  computed: {

  },
  mounted: function () {
    
  }
}
</script>