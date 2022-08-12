<template>
  <div class="wrap">
    <div class="left">
      <share-card :pagesize="18"></share-card>
    </div>
    <right-box></right-box>
  </div>
</template>

<script>
import ShareCard from "@/components/ShareCard";
import RightBox from "../../components/RightBox.vue";
export default {
  components: {
    ShareCard,
    RightBox,
  },
};
</script>

<style>
</style>