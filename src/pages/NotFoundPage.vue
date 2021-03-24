<template>
  <div class='not-found-container'>
    <h2>Страница по вашему запросу не найдена</h2>

    <div class='not-found-text'>¯\_(ツ)_/¯</div>

    <button
      class='not-found-btn'
      type='button'
      @click.prevent="gotoPage('main')"
    >на главную страницу</button>
  </div>
</template>

<script>
import { gotoPage } from '@/helpers/routesHelpers'

export default {
  name: 'NotFoundPage',
  methods: {
    gotoPage
  }
}
</script>

<style lang="scss" scoped>
  .not-found-container {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    min-height: 50vh;
    background-color: antiquewhite;

    .not-found-text {
      margin-bottom: 20px;
      font-weight: 700;
    }

    .not-found-btn {
      padding: 10px 25px;
      border-radius: 10px;
      text-transform: uppercase;
      font-weight: 600;
      cursor: pointer;
      background-color: rgb(12, 240, 99, .5);
      transition: background-color .3s, transform .3s;

      &:hover,
      &:active,
      &:focus {
        background-color: rgb(12, 240, 99, 1);
        transform: scale(1.01);
      }
    }
  }
</style>
