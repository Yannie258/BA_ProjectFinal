module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    "plugin:vue/vue3-recommended",
    // 'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
    "prettier",
  ],

  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
    "vue/multi-word-component-names": 0,
    "vue/no-multiple-template-root": "off",
    "vue/attribute-hyphenation": [
      "error",
      "never",
      {
        ignore: ["custom-prop"],
      },
    ],
    "vue/no-deprecated-slot-attribute": "off",
    "vue/no-deprecated-slot-scope-attribute": "off",
  },
};