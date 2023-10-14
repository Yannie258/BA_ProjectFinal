<template>
  <div class="col-lg-4 col-md-12 mb-4">
    <div
      class="modal fade"
      :id="'modal' + id"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <!--Content-->
        <div class="modal-content">
          <!--Body-->
          <div class="modal-body mb-0 p-0">
            <div
              class="embed-responsive embed-responsive-16by9 z-depth-1-half"
              id="video_wrapper_1"
            >
              <div class="m-video__wrapper">
                <button
                  class="preview__wrapper js-enable-video"
                  :alt="'modal' + id"
                  data-video-id="youtube:i9tjkAi3lDc"
                  title="THis is great!!"
                  :id="'abc' + id"
                >
                  <img
                    class="img-fluid z-depth-1"
                    :src="image"
                    :alt="'modal' + id"
                    data-toggle="modal"
                    :data-target="'#modal' + id"
                    id="def"
                  />
                </button>
                <!--iframe
                  class="embed-responsive-item"
                  :src="
                    'https://www.youtube.com/embed/' +
                      this.video +
                      '?enablejsapi=1'
                  "
                  frameborder="0"
                  allowfullscreen
                  id="videotracking_youtube_youtube:B8xHukKq1Uk"
                ></iframe-->
              </div>
            </div>
          </div>

          <!--Footer-->
          <SocialMediaFooter :button="true" />
        </div>
      </div>
    </div>
    <div class ="container">
      <a class="imageContainer" :id="'link' + id">
        <img
          class="img-fluid z-depth-1"
          :src="image"
          :alt="'modal' + id"
          data-toggle="modal"
          :data-target="'#modal' + id"
          id="imageHover"
        />
        <div class="middle">
          <button class="text" data-toggle="modal" :data-target="'#modal' + id" @click="trackMyClick('click-to-play-video','content','text')">
            Click to play Video
          </button>
        </div>
      </a>
    </div>
  </div>
  <!-- Grid column -->
</template>

<script>
import SocialMediaFooter from "@/components/SocialMediaFooter.vue";
import $ from 'jquery';
export default {
  name: "VideoModal",
  components: {
    SocialMediaFooter
  },
  props: {
    id: Number,
    image: String,
    video: String
  },
  mounted(){
    $(document).ready(function() {
      // var a = $('button#abc').attr('alt')
      $("#link1").on("click", function() {
        // var v1 = $('img#def').attr('alt');
        //alert('its working ---' + v1);
        $('#abc1').replaceWith(
          '<iframe data-v-4961dc22="" src="https://www.youtube.com/embed/B8xHukKq1Uk?enablejsapi=1" frameborder="0" allowfullscreen="allowfullscreen" id="videotracking_youtube_youtube:B8xHukKq1Uk" class="embed-responsive-item"></iframe>'
        );
      });
      $('#link2').on("click", function() {
        // var v1 = $('img#def').attr('alt');
        //alert('its working ---' + v1);
        $('#abc2').replaceWith(
          '<iframe data-v-4961dc22="" src="https://www.youtube.com/embed/A4pmZ45BY1I?enablejsapi=1" frameborder="0" allowfullscreen="allowfullscreen" id="videotracking_youtube_youtube:A4pmZ45BY1I" class="embed-responsive-item"></iframe>'
        );
      });
      $('#link3').on('click', function(){
        // var v1 = $('img#def').attr('alt');
        //alert('its working ---' + v1);
        $('#abc3').replaceWith(
          '<iframe data-v-4961dc22="" src="https://www.youtube.com/embed/cjTvpVg-GCY?enablejsapi=1" frameborder="0" allowfullscreen="allowfullscreen" id="videotracking_youtube_youtube:cjTvpVg-GCY" class="embed-responsive-item"></iframe>'
        );
      });
    });
  }
};
</script>
<style scoped>
#def {
  height: 400px;
  width: 450px;
}
/* Container holding the image and the text */
.imageContainer {
  position: relative;
}

/* Bottom right text */
.text-block {
  opacity: 1;
  position: absolute;
  bottom: 0px;
  right: 0px;
  background-color: var(--cyan);
  color: white;
  padding-left: 20px;
  padding-right: 20px;
}
#imageHover:hover {
  transform: scale(1.1);
}

#imageHover {
  width: 100%;
  padding: 20px 0;
  transition: 1s;
  cursor: pointer;
  border-radius: 5%;
  text-align: center;
  top: 50%;
  left: 50%;
}
.middle {
  transition: .5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
}

.container:hover .image {
  opacity: 0.3;
}

.container:hover .middle {
  opacity: 1;
}

.text {
  background-color: #13a094d8;
  color: white;
  font-size: 16px;
  padding: 16px 32px;
}
</style>
