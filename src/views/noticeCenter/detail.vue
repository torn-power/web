<template>
  <section>
    <div class="data-box">
      <h1>{{ detail.title }}</h1>
      <div v-html="detail.content"></div>
    </div>
  </section>
</template>
<script setup>
import {} from "vue";
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { noticeInfo } from "../../api/server";

const router = useRouter();
const route = useRoute();

const detail = ref({
  title: "",
  content: "",
});

const getInfo = async () => {
  const { data } = await noticeInfo({ _id: route.query._id });
  detail.value = data;
};

onMounted(() => {
  getInfo();
});
</script>
<style></style>
