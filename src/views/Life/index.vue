<template>
  <div class="wrap">
    <div class="left">
      <life-card></life-card>
    </div>
    <right-box></right-box>
  </div>
</template>

<script>
import LifeCard from "../../components/LifeCard.vue";
import RightBox from "../../components/RightBox.vue";
export default {
  components: {
    LifeCard,
    RightBox,
  },
};
</script>

<style>
</style>