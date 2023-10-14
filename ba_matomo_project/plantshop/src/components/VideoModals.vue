<template>
  <!-- Video Modals -->
  <div class="row video-modals">
    <VideoModal
      v-for="video in videos"
      :key="video.id"
      :image="video.image"
      :video="video.video"
      :id="video.id"
    />
  </div>
</template>
<script>
import VideoModal from "@/components/VideoModal.vue";

export default {
  name: "VideoModals",
  components: {
    VideoModal
  },
  data() {
    return {
      videos: [
        {
          id: 1,
          image: require("@/assets/img/modal1.jpg"),
          video: "B8xHukKq1Uk"
        },
        {
          id: 2,
          image: require("@/assets/img/modal2.jpg"),
          video: "A4pmZ45BY1I"
        },
        {
          id: 3,
          image: require("@/assets/img/modal3.jpg"),
          video: "R0BPcvlguJA"
        }
      ]
    };
  }
  //   mounted() {
  //     let webtrekkMediaTracking = document.createElement("script");
  //     webtrekkMediaTracking.setAttribute(
  //       "src",
  //       "./webtrekk_mediaTracking.min.js"
  //     );
  //     document.head.appendChild(webtrekkMediaTracking);
  //     let webtrekkYoutubeMediaTracking = document.createElement("script");
  //     webtrekkYoutubeMediaTracking.setAttribute(
  //       "src",
  //       "./webtrekk_youtubeMediaTracking.js"
  //     );
  //     document.head.appendChild(webtrekkYoutubeMediaTracking);
  //   }
};
</script>

<style scoped>
.video-modals {
  margin-right: 50px;
  margin-left: 50px;
}
</style>
