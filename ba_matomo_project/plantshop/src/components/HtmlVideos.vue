<template>
  <!-- Video Modals -->
  <div class="row video-modals">
    <HtmlVideo
      v-for="video in videos"
      :key="video.id"
      :image="video.image"
      :video="video.video"
      :id="video.id"
    />
  </div>
</template>
<script>
import HtmlVideo from "@/components/HtmlVideo.vue";

export default {
  name: "HtmlVideos",
  components: {
    HtmlVideo
  },
  data() {
    return {
      videos: [
        {
          id: 1,
          image: require("@/assets/img/redflower.jpg"),
          video: require("@/assets/videos/redflower.mp4")
        },
        {
          id: 2,
          image: require("@/assets/img/hibiscus.jpg"),
          video: require("@/assets/videos/vidh.mp4")
        },
        {
          id: 3,
          image: require("@/assets/img/whiteflower.jpg"),
          video: require("@/assets/videos/whiteflower.mp4")
        }
      ]
    };
  }
};
</script>

<style scoped>
.video-modals {
  margin-right: 50px;
  margin-left: 50px;
}
</style>
