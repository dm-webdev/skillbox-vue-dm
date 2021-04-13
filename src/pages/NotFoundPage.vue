<template>
  <div class='not-found-container'>
    <h2 class="not-found__img" :style="{ backgroundImage: `url(${currentImg})` }">Страница по вашему запросу не найдена</h2>

    <div class='not-found-text'>Повторите повытку позднее.</div>

    <router-link
      class='not-found__link'
      :to="{name: 'catalog'}"
    >
      на главную страницу
    </router-link>
  </div>
</template>

<script>
import { computed } from 'vue'
import notFoundImg from '@/assets/img/404-error.svg'

export default {
  name: 'NotFoundPage',
  setup () {
    const currentImg = computed(() => {
      return notFoundImg
    })

    return {
      currentImg
    }
  }
}
</script>

<style lang="scss" scoped>
  .not-found-container {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    min-height: 50vh;
    max-width: 1240px;
    background-color: rgba(2,52,73,0.15);

    .not-found__img {
      margin: 0 auto;
      padding-left: 60px;
      padding-top: 10px;
      padding-bottom: 20px;
      background-position: left center;
      background-repeat: no-repeat;
      background-size: 50px 50px;
    }

    .not-found-text {
      margin-bottom: 20px;
      font-weight: 700;
    }

    .not-found__link {
        color: #222222;
        border-bottom: 2px dashed #222222;
        transition: border-color .2s ease, color .2s ease;
        text-transform: uppercase;
        cursor: pointer;

        &:focus,
        &:hover,
        &:active {
          color: rgb(1,159,227);
          border-color: rgb(1,159,227);
        }
      }
  }
</style>
