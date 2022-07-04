<template>
  <section>
    <div class="data-box data-box-wrapper">
      <h1>{{ detail.title }}</h1>
      <div class="html" v-html="detail.content"></div>
    </div>
  </section>
</template>
<script setup>
import {} from "vue";
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import dayjs from "dayjs";
import { activityInfo } from "../../api/server";

const router = useRouter();
const route = useRoute();

const detail = ref({
  title: "",
  content: "",
});

const getInfo = async () => {
  const { data } = await activityInfo({ _id: route.query._id });
  detail.value = data;
};
const format = (date) => dayjs(date).format("YYYY-MM-DD HH:mm:ss");

onMounted(() => {
  getInfo();
});
</script>
<style lang="less" scoped>
.html {
  word-wrap: break-word;

  word-break: normal;
}
</style>
