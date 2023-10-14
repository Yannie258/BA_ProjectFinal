<template>
  <!--Social Media Footer-->
  <div class="modal-footer justify-content-center">
    <span class="mr-4">Spread the word!</span>
    <a type="button" class="btn-floating btn-sm btn-fb" id="fbk">
      <i class="fa fa-facebook-f"></i>
    </a>
    <!--Twitter-->
    <a type="button" class="btn-floating btn-sm btn-tw" id="twat">
      <i class="fa fa-twitter"></i>
    </a>
    <!--Google +-->
    <a type="button" class="btn-floating btn-sm btn-gplus" id="gog"> 
      <i class="fa fa-google-plus"></i>
    </a>
    <!--Linkedin-->
    <a type="button" class="btn-floating btn-sm btn-ins" id="lkdn">
      <i class="fa fa-linkedin"></i>
    </a>
    <button
      @click="trackMyClick('close','video-modal','button')"
      v-if="button"
      type="button"
      class="btn btn-outline-primary btn-rounded btn-md ml-4" 
      data-dismiss="modal"
      id="videos_banner"
      >
      Close
    </button>
  </div>
</template>

<script>
export default {
  name: "SocialMediaFooter",
  props: {
    button: Boolean
  }
};
</script>

<style></style>
