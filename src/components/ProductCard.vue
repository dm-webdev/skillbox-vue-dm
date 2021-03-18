<template>
  <div>
    <a class='catalog__pic' href='#'>
      <img :src='src' :alt='title' />
    </a>

    <h3 class='catalog__title'>
      <a href='#'>{{ title }}</a>
    </h3>

    <span class='catalog__price'> {{ price }} ₽ </span>

    <ul class='colors colors--black'>
      <li class='colors__item'>
        <label class='colors__label'>
          <input
            class='colors__radio sr-only'
            type='radio'
            value='#73B6EA'
            v-model='selectedColor'
          />
          <span class='colors__value' style='background-color: #73b6ea'> </span>
        </label>
      </li>
      <li class='colors__item'>
        <label class='colors__label'>
          <input
            class='colors__radio sr-only'
            type='radio'
            value='#8BE000'
            v-model='selectedColor'
          />
          <span class='colors__value' style='background-color: #8be000'> </span>
        </label>
      </li>
      <li class='colors__item'>
        <label class='colors__label'>
          <input
            class='colors__radio sr-only'
            type='radio'
            value='#222'
            v-model='selectedColor'
          />
          <span class='colors__value' style='background-color: #222'> </span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: ['title', 'price', 'src', 'color'],
  data () {
    return {
      selectedColor: this.color
    }
  }
}
</script>
