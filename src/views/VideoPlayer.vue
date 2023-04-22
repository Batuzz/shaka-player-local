<template>
  <div>
    <span class="manifest-url-label">Manifest URL</span>
    <input v-model="manifestUrl" class="manifest-input">
    <div ref="videoContainer" class="shadow-lg mx-auto max-w-full size">
      <video
          id="video"
          ref="videoPlayer"
          class="h-full maxw"
      ></video>
    </div>
  </div>
</template>

<script>
import shaka from 'shaka-player/dist/shaka-player.ui.js';

export default {
  name: "VideoPlayer",
  data() {
    return {
      manifestUrl: ''
    }
  },
  watch: {
    manifestUrl() {
      this.loadPlayer()
    }
  },
  mounted() {
    this.loadPlayer()
  },
  methods: {
    onError(error) {
      console.error('Error code', error.code, 'object', error);
    },
    loadPlayer() {
      const player = new shaka.Player(this.$refs.videoPlayer);
      const ui = new shaka.ui.Overlay(
          player,
          this.$refs.videoContainer,
          this.$refs.videoPlayer
      );
      ui.getControls();
      console.log(Object.keys(shaka.ui));

      const defaultManifestUrl = 'https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd';

      const manifestUrl = this.manifestUrl || defaultManifestUrl; // https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd

      player
          .load(manifestUrl)
          .then(() => {
            console.log('The video has now been loaded!');
          })
          .catch(this.onError); // onError is executed if the asynchronous load fail
    }
  }
}
</script>

<style scoped>
@import '../../node_modules/shaka-player/dist/controls.css'; /* Shaka player CSS import */


.manifest-url-label {
  color: #FFF;
  text-align: left;
}

.manifest-input {
  margin: 20px;
  width: 90%;
  background-color: #ccc;
}

.size {
  width: 800px;
  margin: auto;
}

.maxw {
  max-width: 100%;
}
</style>
