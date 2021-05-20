<template>
    <main class='content container'>
    <div class='content__top content__top--catalog'>
      <h1 class='content__title'>Каталог</h1>
      <span class='content__info'>{{ totalProductsCount?.total }} товаров</span>
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
import { ref, watch, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'MainPage',
  components: {
    ProductList,
    BasePagination,
    ProductFilter,
    EmptyRequest
  },
  setup () {
    const store = useStore()

    const filterPriceFrom = ref(0)
    const filterPriceTo = ref(0)
    const filterCategoryId = ref(0)
    const filterProps = ref(null)
    const currentPage = ref(1)
    const productsPerPage = ref(12)

    if (!store.getters.getCatalog) {
      store.dispatch('getProducts', {
        page: currentPage.value,
        limit: productsPerPage.value
      })
    }

    watch([currentPage, filterCategoryId, filterProps, filterPriceFrom, filterPriceTo], () => {
      store.dispatch('getProducts', {
        page: currentPage.value,
        limit: productsPerPage.value,
        categoryId: filterCategoryId.value,
        // props: filterProps.value,
        minPrice: filterPriceFrom.value || null,
        maxPrice: filterPriceTo.value || null
      })
    })

    return {
      filterPriceFrom,
      filterPriceTo,
      filterCategoryId,
      filterProps,
      currentPage,
      productsPerPage,
      products: computed(() => store.getters.getCatalog),
      totalProductsCount: computed(() => store.getters.getPagination)
    }
  }
}
</script>
