<template>

  <div class="col-lg-4 col-md-12 mb-4">
    <div
      class="modal fade"
      :id="'modall' + id"
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
              <div class="m-video__wrapper_yol">
                <video data-v-7135df90="" id ="vid1" src="/media/redflower.070ff1e9.mp4" type="video/mp4" width="900" height="600" controls="controls"></video>
              </div>
            </div>
          </div>

          <!--Footer-->
          <SocialMediaFooter :button="true" />
        </div>
      </div>
    </div>
    <a class="imageContainer" :id="'videos' + id">
      <img
        class="img-fluid z-depth-1"
        :src="image"
        :alt="'modal' + id"
        data-toggle="modal"
        :data-target="'#modall1'"
      />
      <div class="text-block">
        <p>Click Me!</p>
      </div>
    </a>
  </div>
  <!-- Grid column -->
</template>

<script>
import SocialMediaFooter from "@/components/SocialMediaFooter.vue";
import $ from "jquery";
export default {
  name: "HtmlVideo",
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
      $('#videos2').on('click', function(){
        // var v1 = $('img#def').attr('alt');
        //alert('its working ---' + v1);
        $('#vid1').attr("src","/media/vidh.9668f5dc.mp4");
      });
      $('#videos1').on('click', function(){
        // var v1 = $('img#def').attr('alt');
        //alert('its working ---' + v1);
        $('#vid1').attr("src","/media/redflower.070ff1e9.mp4");
      });
      $('#videos3').on('click', function(){
        // var v1 = $('img#def').attr('alt');
        //alert('its working ---' + v1);
        $('#vid1').attr("src","/media/whiteflower.6e22b208.mp4");
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
  position: absolute;
  bottom: 0px;
  right: 0px;
  background-color: var(--cyan);
  color: white;
  padding-left: 20px;
  padding-right: 20px;
}
</style>
