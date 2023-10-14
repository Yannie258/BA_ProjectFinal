import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const getDefaultState = () => {
  return {
    token: '',
    user: {}
  };
};

export default new Vuex.Store({
  strict: true,
  plugins: [createPersistedState()],
  state: { getDefaultState(){  return {
    token: '',
    user: {}
  };},
    getters: {
      isLoggedIn: state => {
        return state.token;
      },
      getUser: state => {
        return state.user;
      }
    },
    products: [
      {
        id: 1,
        image: require("@/assets/img/flowers4.jpg"),
        title: "Rosen aus Hellerau",
        price: 19.9,
        description:
          "Die Rosen (Rosa) sind die namensgebende Pflanzengattung der Familie der Rosengewächse (Rosaceae). Die Gattung umfasst je nach Auffassung des Autors .",
        rating: 3.0,
        reviews: [
          {
            author: "Marco",
            review: "super, meine Frau hat sich gefreut",
            rating: 4.5
          },
          {
            author: "Peter L.",
            review: "bin kein Blumen Fan",
            rating: 1.5
          }
        ]
      },
      {
        id: 2,
        image: require("@/assets/img/flowers10.jpg"),
        title: "Tulpen aus der Neustadt",
        price: 14.99,
        description:
          "Die Tulpen bilden eine Pflanzengattung in der Familie der Liliengewächse. Die etwa 150 Arten sind in Nordafrika und über Europa bis Zentralasien verbreitet.",
        rating: 4.5,
        reviews: [
          {
            author: "Rayk",
            review: "Nicht so toll, blöde Farbe",
            rating: 2.5
          },
          {
            author: "Peter G.",
            review: "Schönes Geschenk",
            rating: 2.5
          }
        ]
      },
      {
        id: 3,
        image: require("@/assets/img/flowers8.jpg"),
        title: "Nelken aus Radebeul",
        price: 12.0,
        description:
          "Die Nelken (Dianthus) bilden eine Pflanzengattung in der Familie der Nelkengewächse (Caryophyllaceae). Die 320 bis 600 Arten kommen in den gemäßigten Zonen vor.",
        rating: 4.0,
        reviews: [
          {
            author: "Romy",
            review: "Sehen toll auf dem Balkon aus.",
            rating: 4.5
          },
          {
            author: "Rober",
            review: "hässlich",
            rating: 0.5
          }
        ]
      },
      {
        id: 4,
        image: require("@/assets/img/flowers9.jpg"),
        title: "Margeriten aus Striesen",
        price: 4.5,
        description:
          "Die Margeriten sind eine Pflanzengattung in der Familie der Korbblütler. Die Gattung umfasst derzeit 42 Arten. Der botanische Name leitet sich von altgriechisch λευκός leukós ‚weiß‘ und ἄνθος ánthos ‚Blüte, Blume‘ ab.",
        rating: 5.0,
        reviews: [
          {
            author: "Lena",
            review: "Schön für eine Hochzeit.",
            rating: 4.5
          }
        ]
      }
    ],
    cartProducts: [],
    posts: []
  },
  mutations: {
    add(state, newProduct) {
      state.cartProducts.push(newProduct);
    },
    changeQty(state, payload) {
      state.cartProducts.find(element => element.id == payload.id).qty +=
        payload.qty;
    },
    remove(state, id) {
      const index = state.cartProducts.findIndex(e => e.id === id);
      state.cartProducts.splice(index, 1);
    },
    SET_POSTS(state, posts) {
      state.posts = posts;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USER: (state, user) => {
      state.user = user;
    },
    RESET: state => {
      Object.assign(state, getDefaultState());
    }
  },
  actions: {
    
    loadPosts({ commit }) {
      axios
        .get("http://localhost:3000/posts")
        .then(res => res.data)
        .then(posts => {
          commit("SET_POSTS", posts);
        });
    },
    login: ({ commit, dispatch }, { token, user }) => {
      commit('SET_TOKEN', token);
      commit('SET_USER', user);
      // set auth header
      console.log(dispatch);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },
    logout: ({ commit }) => {
      commit('RESET', '');
    }
  },
  modules: {}
});
