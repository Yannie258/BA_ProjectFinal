<template>
  <div>
    <button :class="[buttonClasses]" :type="type">
      <slot />
    </button>
  </div>
</template>

<script>
import { computed } from "vue";
export default {
  props: {
    type: {
      type: String,
      default: "primary",
    },
  },
  // eslint-disable-next-line vue/require-default-prop
  setup(props) {
    const buttonClasses = computed(() => {
      let buttonClassnames;
      if (props.type === "primary") {
        buttonClassnames =
          "tw-flex tw-border-blue-500 tw-text-white tw-text-center tw-bg-blue-600 tw-rounded tw-p-2 hover:tw-brightness-150 hover:tw-duration-300 tw-shadow-lg tw-h-12";
      }
      if (props.type === "secondary") {
        buttonClassnames =
          "tw-flex tw-border-2 tw-border-blue-500 tw-rounded tw-p-2 tw-h-12 tw-text-blue-500 hover:tw-text-blue-800";
      }
      if (props.type === "normal") {
        buttonClassnames =
          " tw-text-blue-500 hover:tw-text-white hover:tw-bg-blue-300 tw-flex tw-jutify-center tw-border-blue-500";
      }
      return buttonClassnames;
    });

    return {
      buttonClasses,
    };
  },
};
</script>

<style></style>
