<template>
    <main class='content container'>
    <div class='content__top content__top--catalog'>
      <h1 class='content__title'>Каталог</h1>
      <span class='content__info'>{{ totalProductsCount }} товаров</span>
    </div>

    <div class='content__catalog'>
      <product-filter
        v-model:price-from='filterPriceFrom'
        v-model:price-to='filterPriceTo'
        v-model:category-id='filterCategoryId'
        v-model:selected-props='filterProps'
      />

      <section class='catalog'>
        <empty-request
          v-if='products?.length === 0'
          text="По Вашему запросу ничего не найдено."
        />

        <product-list
          :products='products'
        />

        <base-pagination
          v-model:current-page='currentPage'
          :count-per-page='productsPerPage'
          :total-count='totalProductsCount'
        />
      </section>
    </div>
  </main>
</template>

<script>
import ProductList from '@/components/ProductList.vue'
import BasePagination from '@/components/controls/BasePagination.vue'
import ProductFilter from '@/components/ProductFilter.vue'
import EmptyRequest from '@/components/misc/EmptyRequest.vue'
import axios from '@/helpers/axiosConfig'
import { ref, watch } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'MainPage',
  components: {
    ProductList,
    BasePagination,
    ProductFilter,
    EmptyRequest
  },
  computed: {
    products () {
      return this.productsData ? this.productsData.items : null
    },
    totalProductsCount () {
      return this.productsData ? this.productsData.pagination.total : 0
    }
  },
  methods: {
    goToFirstPage () {
      this.currentPage = 1
    }
  },
  setup () {
    const store = useStore()

    const filterPriceFrom = ref(0)
    const filterPriceTo = ref(0)
    const filterCategoryId = ref(0)
    const filterProps = ref(null)
    const productsData = ref(null)
    const currentPage = ref(1)
    const productsPerPage = ref(12)

    function loadProducts () {
      store.commit('setIsLoading', true)
      axios.get('products/', {
        params: {
          page: currentPage.value,
          limit: productsPerPage.value,
          categoryId: filterCategoryId.value,
          // props: filterProps.value,
          minPrice: filterPriceFrom.value || null,
          maxPrice: filterPriceTo.value || null
        }
      })
        .then(response => {
          productsData.value = response.data
        })
        .catch(() => store.commit('setMessage', {
          modalContent: 'Что-то пошло не так, повторите запрос позднее',
          modalType: 'error'
        }))
        .finally(() => store.commit('setIsLoading', false))
    }

    loadProducts()

    watch([currentPage, filterCategoryId, filterProps, filterPriceFrom, filterPriceTo], () => {
      loadProducts()
    })

    return {
      filterPriceFrom,
      filterPriceTo,
      filterCategoryId,
      filterProps,
      productsData,
      currentPage,
      productsPerPage
    }
  }
}
</script>
