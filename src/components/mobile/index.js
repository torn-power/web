import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const drawerVisible = ref(false);
    return {
      drawerVisible,
    };
  },
});
