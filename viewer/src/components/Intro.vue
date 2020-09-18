<template>
  <div class='container'>
    <div>This is a demo instance of <a href='https://forensic-architecture.org'>Forensic Architecture's</a> <a href='https://github.com/forensic-architecture/mtriage-viewer'>mtriage-viewer</a>. We use this interface to present the results of machine learning analysis to OSINT researchers.</div><div>For more information regarding how this has been applied in investigations, see our blog posts <a href="https://forensic-architecture.org/investigation/cv-in-triple-chaser">Computer Vision in Triple Chaser</a> and <a href="https://forensic-architecture.org/investigation/detecting-tear-gas">Detecting Tear Gas: Vision and Sound</a></div>
    <h2>NOTES OF USE</h2>
    <div>The classifier used is directly applied from <a href="https://keras.io/api/applications/">Keras trained on ImageNet</a>. Because the ImageNet sample contains 1000 classes, each frame is classified into just 1 of those 1000 options. (Thus if a person is more prominent than a rifle, the result will likely be 'person' rather than 'rifle', even if the image clearly contains a rifle.) The accuracy of the classifier could easily be tuned to improve for specific objects.</div>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  flex-direction: column;
}
div {
  text-align: left;
  padding-bottom: 10px;
}
</style>

