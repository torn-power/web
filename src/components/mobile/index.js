import { message } from "ant-design-vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const drawerVisible = ref(false);

    const copyText = () => {
      message.info("敬请期待");
    };
    return {
      drawerVisible,
      copyText,
    };
  },
});
