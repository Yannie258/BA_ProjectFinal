<template>
  <div class="row forum-post">
    <div class="col-1">
      <i v-if="post.unreadPost" class="fa fa-envelope"></i>
      <i v-else class="fa fa-envelope-open"></i>
    </div>

    <div class="col-3">
      <router-link
        :to="'/' + $i18n.locale + '/forum' + '/post' + '/' + post.id"
        >{{ post.title }}</router-link
      >
    </div>
    <div class="col-2">{{ post.author }}</div>
    <div class="col-2">{{ post.viewCount }}</div>
    <div class="col-2">{{ post.replyCount }}</div>
    <div class="col-2">
      <div>{{ post.lastUpdateBy }}</div>
      <div>{{ post.lastUpdate }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ForumPost",
  props: {
    post: Object
  }
};
</script>

<style scoped>
div[class*="col"] {
  background: var(--white);
  margin: 5px 0;
  color: var(--darkgrey);
  font-size: 1.2em;
  text-align: left;
}
i {
  color: var(--orange);
}
a {
  text-decoration: none;
  color: var(--darkgrey);
}
a:hover {
  text-decoration: none;
  color: var(--cyan);
}
</style>
