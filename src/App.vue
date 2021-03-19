<template>
    <main class='content container'>
    <div class='content__top content__top--catalog'>
      <h1 class='content__title'>
        Каталог
      </h1>
      <span class='content__info'>{{ totalProductsCount }} товаров</span>
    </div>

    <div class='content__catalog'>
      <ProductFilter
        v-model:price-from='filterPriceFrom'
        v-model:price-to='filterPriceTo'
        v-model:category-id='filterCategoryId'
        v-model:selected-color='filterColor'
      />

      <section class='catalog'>
        <ProductList :products='products' />

        <h2 v-if='filteredProducts.length === 0'>По Вашему запросу ничего не найдено ¯\_(ツ)_/¯</h2>

        <BasePagination
          v-model:current-page='currentPage'
          :count-per-page='productsPerPage'
          :total-count='totalProductsCount'
        />
      </section>
    </div>
  </main>
</template>

<script>
import products from './data/products'
import ProductList from './components/ProductList.vue'
import BasePagination from './components/controls/BasePagination.vue'
import ProductFilter from './components/ProductFilter.vue'

export default {
  name: 'App',
  components: {
    ProductList,
    BasePagination,
    ProductFilter
  },
  data () {
    return {
      currentPage: 1,
      productsPerPage: 3,
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColor: null
    }
  },
  computed: {
    filteredProducts () {
      let filteredProducts = products
      if (this.filterPriceFrom > 0) {
        filteredProducts = filteredProducts.filter(product => product.price > this.filterPriceFrom)
      }
      if (this.filterPriceTo > 0) {
        filteredProducts = filteredProducts.filter(product => product.price < this.filterPriceTo)
      }
      if (this.filterCategoryId) {
        filteredProducts = filteredProducts.filter(product => product.categoryId === this.filterCategoryId)
      }
      if (this.filterColor) {
        filteredProducts = filteredProducts.filter(product => product.colors.find(color => color.colorId === this.filterColor))
      }
      this.goToFirstPage()

      return filteredProducts
    },
    products () {
      const offset = (this.currentPage - 1) * this.productsPerPage
      return this.filteredProducts.slice(offset, offset + this.productsPerPage)
    },
    totalProductsCount () {
      return this.filteredProducts.length
    }
  },
  methods: {
    goToFirstPage () {
      this.currentPage = 1
    }
  }
}
</script>
