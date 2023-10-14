<template>
  <div class="locale-changer mr-2">
    <span :class="`flag-icon flag-icon-${$i18n.locale}`" />
    <select v-model="$i18n.locale">
      <option
        v-for="(lang, i) in $i18n.availableLocales"
        :key="`Lang${i}`"
        :value="lang"
        >{{ lang }}</option
      >
    </select>
  </div>
</template>

<script>
export default {
  name: "LanguageSwitcher"
};
</script>

<style scoped></style>
