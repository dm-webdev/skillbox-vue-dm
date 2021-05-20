<template>
  <div class="empty__container" >
    <div class="empty__img" :style="{ backgroundImage: `url(${currentImg})` }"/>
    <p class="empty__desc">{{ text }}</p>
  </div>
</template>

<script>
import { computed } from 'vue'
import emptyImg from '../../assets/img/empty.svg'

export default {
  name: 'EmptyRequest',
  props: {
    text: {
      type: String,
      requared: true
    }
  },
  setup () {
    return {
      currentImg: computed(() => emptyImg)
    }
  }
}
</script>

<style lang="scss" scoped>
  .empty__container * {
    box-sizing: border-box;
  }

  .empty__container {
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    margin: auto;
    width: 100%;
    padding: 30px;
    background-color: rgba(2,52,73,0.15);

    .empty__img {
      margin: 0 auto;
      width: 50px;
      height: 50px;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }

    .empty__desc {
      flex-grow: 1;
      padding-left: 15px;
      padding-right: 15px;
      font-size: 1.2rem;
      text-align: center;
    }
  }
</style>
