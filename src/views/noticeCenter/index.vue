<template>
  <section>
    <div class="data-box">
      <h1>{{ $t("global.announcementCenter") }}</h1>
      <ol class="notice">
        <li class="item" v-for="(v, i) in lists" :key="i" @click="detail(v)">
          {{ v.title }}
        </li>
      </ol>
    </div>
  </section>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { noticeLists } from "../../api/server";

const router = useRouter();

const lists = ref([]);

const getLists = async () => {
  const { data } = await noticeLists({ pageSize: 100 });
  lists.value = data.results;
};

const detail = (v) => {
  router.push({
    path: "/notice-detail",
    query: {
      _id: v._id,
    },
  });
};

onMounted(() => {
  getLists();
});
</script>
<style lang="less" scoped>
ol {
  padding: 10px;
}
.notice {
  height: 75vh;
  overflow: auto;
  .item {
    font-size: 14px;
    color: white;
    padding: 10px;
    margin: 10px;
    background-color: rgba(0, 0, 0, 0.3);
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
}
</style>
