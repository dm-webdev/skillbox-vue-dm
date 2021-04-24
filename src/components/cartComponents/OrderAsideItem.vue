<template>
  <li class="cart__order">
    <h3>{{ title }}</h3>
    <b>{{ formatedPrice }} ₽</b>
    <span>Артикул: {{ code }}</span>
  </li>
</template>

<script>
export default {
  name: 'OrderAsideItem',
  props: {
    title: {
      type: String,
      requared: true
    },
    formatedPrice: {
      type: String,
      requared: true
    },
    code: {
      type: Number,
      requared: true
    }
  }
}
</script>
