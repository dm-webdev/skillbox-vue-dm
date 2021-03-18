<template>
  <ul class='catalog__pagination pagination'>
      <li class='pagination__item'>
        <a
          href='#'
          class='pagination__link pagination__link--arrow'
          :class="{'pagination__link--disabled': currentPage === 1}"
          aria-label='Предыдущая страница'
          @click.prevent='currentPage > 1 && paginate(currentPage - 1)'
        >
          <svg width='8' height='14' fill='currentColor'>
            <use xlink:href='#icon-arrow-left'></use>
          </svg>
        </a>
      </li>
      <li class='pagination__item' v-for='pageNumber in pages' :key='pageNumber'>
        <a
          href='#'
          class='pagination__link'
          :class="{'pagination__link--current': pageNumber === currentPage}"
          @click.prevent='paginate(pageNumber)'
        >
          {{ pageNumber }}
        </a>
      </li>
      <li class='pagination__item'>
        <a
          class='pagination__link pagination__link--arrow'
          :class="{'pagination__link--disabled': currentPage === pages}"
          href='#'
          aria-label='Следующая страница'
          @click.prevent='currentPage < pages && paginate(currentPage + 1)'
        >
          <svg width='8' height='14' fill='currentColor'>
            <use xlink:href='#icon-arrow-right'></use>
          </svg>
        </a>
      </li>
    </ul>
</template>

<script>
export default {
  name: 'BasePagination',
  props: ['currentPage', 'totalCount', 'countPerPage'],
  emits: ['update:currentPage'],
  computed: {
    pages () {
      return Math.ceil(this.totalCount / this.countPerPage)
    }
  },
  methods: {
    paginate (page) {
      this.$emit('update:currentPage', page)
    }
  }
}
</script>
