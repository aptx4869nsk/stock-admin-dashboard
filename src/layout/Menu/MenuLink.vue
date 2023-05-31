<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot></slot>
  </component>
</template>

<script>
import { toRefs, defineComponent, computed } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "meni-link",
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  setup() {
    const store = useStore();
    const isCollapse = computed(() => store.state.app.isCollapse);

    const linkProps = (to) => {
      return {
        to: to,
      };
    };
    // @click="hideMenu"
    const hideMenu = () => {
      if (document.body.clientWidth <= 1000 && !isCollapse.value) {
        store.commit("app/isCollapseChange", true);
      }
    };
    return {
      type: "router-link",
      linkProps,
      hideMenu,
    };
  },
});
</script>
<style lang=""></style>
