<template>
  <div class="social-media container">
    <!-- Create Post -->
    <form @submit.prevent="sendPost">
      <div class="create-post">
        <textarea v-model="newPost.content" cols="50" rows="3"></textarea>

        <input type="text" v-model="newPost.author" placeholder="Your Name" />
        <input
          type="text"
          v-model="newPost.contentImage"
          placeholder="img-link"
        />
      </div>
      <input type="submit" value="Submit" class="btn btn-primary" />
    </form>
    <!-- Show all Posts -->
    <div v-for="post in posts" :key="post._id" class="row post">
      <div class="col-3">
        <img
          class="userImage"
          height="100"
          :src="post.img"
          :alt="post.author + '-Foto'"
        />
      </div>
      <div class="col-9">
        <div class="author-created">
          <span class="author">{{ post.author }}</span>
          -
          <span class="created">{{ dateMoment(post.created) }}</span>
        </div>
        <div class="content">{{ post.content }}</div>
        <img
          v-if="post.contentImage"
          width="500"
          :src="post.contentImage"
          :alt="post.author + 'Bild'"
        />
        <div class="row reactions">
          <div class="col-3">
            <a @click="likePost(post._id)">
              <i class="fa fa-thumbs-up"></i>
              Like({{ post.likedBy.length }})
            </a>
          </div>

          <div class="col-3">
            <a @click="sendReply(post._id)">
              <i class="fa fa-reply"></i> Reply
            </a>
          </div>
          <div class="col-3">More...</div>
          <div class="col-3">
            <a @click="deletePost(post._id)">Delete</a>
          </div>
        </div>

        <!-- Show Replies -->
        <div v-for="(answer, index) in post.replies" :key="index">
          <div class="row replies">
            <div class="col-2">
              <img
                height="50"
                :src="answer.img"
                :alt="answer.author + '-Foto'"
              />
            </div>
            <div class="col-10 content">
              <div class="author-created">
                <span class="author">{{ answer.author }}</span>
                -
                <span class="created">{{ answer.created }}</span>
              </div>
              {{ answer.content }}
            </div>
          </div>
          <div class="row reactions">
            <div class="col-3">
              <i class="fa fa-thumbs-up"></i>
              Like({{ answer.likes }})
            </div>

            <div class="col-3"><i class="fa fa-reply"></i> Reply</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import moment from "moment";

export default {
  name: "SocialMedia",
  data() {
    return {
      newPost: {
        author: null,
        content: null,
        img: null,
        contentImage: null
      },
      output: null
    };
  },
  computed: {
    ...mapState({
      posts: state => state.posts
    })
  },
  mounted() {
    this.$store.dispatch("loadPosts");
  },
  methods: {
    sendPost() {
      switch (this.newPost.author) {
        case "Arvid":
          this.newPost.img =
            "https://res.cloudinary.com/htw-dresden/image/upload/v1580816359/arvid_jjpgby.jpg";
          break;
        case "Romy":
          this.newPost.img =
            "https://res.cloudinary.com/htw-dresden/image/upload/v1580816359/romy_m2k0mf.jpg";
          break;
        case "Marco":
          this.newPost.img =
            "https://res.cloudinary.com/htw-dresden/image/upload/v1582288683/marco-krause-foto.1024x1024_v0sbbg.jpg";
          break;
        case "Lena":
          this.newPost.img =
            "https://res.cloudinary.com/htw-dresden/image/upload/v1582288346/900_sxpmzq.jpg";
          break;
        case "Robert":
          this.newPost.img =
            "https://res.cloudinary.com/htw-dresden/image/upload/v1582288507/900_1_vsdj11.jpg";
          break;

        default:
          this.newPost.img =
            "https://www.uclg-planning.org/sites/default/files/styles/featured_home_left/public/no-user-image-square.jpg?itok=PANMBJF-";
          break;
      }
      axios
        .post("http://localhost:3000/posts", {
          author: this.newPost.author,
          content: this.newPost.content,
          img: this.newPost.img,
          contentImage: this.newPost.contentImage
        })
        .then(response => (this.output = response.data))
        .catch(error => (this.output = error));

      this.newPost.author = "";
      this.newPost.content = "";
      this.newPost.img = "";
      this.newPost.contentImage = "";
    },
    sendReply(id) {
      axios
        .patch("http://localhost:3000/posts/" + id, {
          replies: {
            author: "Arvid",
            content: "2 mal is okay",
            img:
              "https://www.uclg-planning.org/sites/default/files/styles/featured_home_left/public/no-user-image-square.jpg?itok=PANMBJF-",
            likes: 0
          }
        })
        .then(response => (this.output = response.data))
        .catch(error => (this.output = error));
    },
    likePost(id) {
      axios
        .patch("http://localhost:3000/posts/" + id, {
          likedBy: "Arvid"
        })
        .then(response => (this.output = response.data))
        .catch(error => (this.output = error));
    },
    deletePost(id) {
      const result = confirm("Wirklich löschen?");
      if (result) {
        axios
          .delete("http://localhost:3000/posts/" + id)
          .then(response => (this.output = response.data))
          .catch(error => (this.output = error));
      }
    },
    dateMoment(date) {
      return moment(date).format("DD-MM-YYYY");
    }
  },
  watch: {
    output() {
      this.$store.dispatch("loadPosts");
    }
  }
};
</script>

<style scoped>
.social-media {
  width: 50%;
  min-height: 100vh;
  margin-top: 30px;
}
.create-post {
  border: solid 1px var(--lightgrey);
  border-radius: 2px;
  background-color: var(--white);
}
textarea {
  width: 100%;
  border: none;
  padding: 10px;
  resize: none;
}
textarea:focus {
  outline: none !important;
  border: none;
}
input[type="text"] {
  width: 100%;
  border: none;
  padding: 10px;
  border-top: 1px solid var(--superlightgrey);
}
input[type="text"]:focus {
  outline: none !important;
}
.btn {
  background-color: var(--cyan);
  border: none;
  float: right;
  margin-top: 10px;
}
.btn:hover {
  background-color: var(--cyan);
}
.btn:focus {
  background-color: var(--cyan);
  border: none;
}
.post {
  margin-bottom: 50px;
  margin-top: 80px;
}

.author-created {
  text-align: left;
}
.author {
  font-weight: bold;
  color: var(--cyan);
}
.created {
  font-style: italic;
  color: var(--darkgrey);
}
.userImage {
  border-radius: 50%;
}
.content {
  padding: 15px;
  text-align: left;
  border-radius: 10px;
  margin: 10px 0 10px 0;
}
.reactions {
  color: var(--cyan);
  font-weight: bold;
  margin-bottom: 20px;
  margin-left: 10px;
}
.replies {
  border: 1px solid var(--superlightgrey);
  background-color: var(--superlightgrey);
  width: 80%;
  margin-left: 30px;
  margin-top: 10px;
  border-radius: 10px;
  padding: 10px;
}
</style>
