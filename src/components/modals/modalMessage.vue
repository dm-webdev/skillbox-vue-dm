<template>
  <router-link :to="toPath" custom v-slot="{ navigate }">
    <div
      class="modal-container"
      @click.self="() => {navigate(), cleanModal()}"
      v-on:keyup.esc="() => {navigate(), cleanModal()}"
      role="link"
    >
      <div class="modal-container__flex">
        <button
          v-if="modalData.showCloseBtn"
          @click="() => {navigate(), cleanModal()}"
          @keypress.enter="() => {navigate(), cleanModal()}"
          role="link"
          class="modal__close__btn"
          aria-label="закрыть окно"
        >
          <div>
            <span class="close__btn_decorator" />
          </div>
        </button>

        <div class="modal__content">
          <span class="modal-img" :style="{ backgroundImage: `url(${currentImg})` }" />
          <p class="modal__text">{{ modalText }}</p>
        </div>

        <div v-if="isDelete" class="modal__btn-group">
          <button
            class="modal__btn-del button--primery"
            type="button"
            @click.prevent="onDeleteProduct"
          >
            Удалить
          </button>

          <button
            class="modal__btn-cancell button--primery"
            type="button"
            @click.prevent="cleanModal"
          >
            отменить
          </button>
        </div>
        <a
          v-if="!(isSuccess || isDelete)"
          class="modal__link"
          @click="() => {navigate(), cleanModal()}"
          role="link"
        >
          Вернуться на главную
        </a>
      </div>
    </div>
  </router-link>
</template>

<script>
import { getCurrentImg, getIsSuccess, getIsDelete, getToPath, closeModalWithTimeOut } from '@/helpers/modalHelpers'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed, watch } from 'vue'

export default {
  name: 'ModalMessage',
  setup () {
    const store = useStore()
    const route = useRoute()

    const modalData = computed(() => store.getters.getModalData)
    const currentId = computed(() => store.getters.getIdToDel)
    const cleanModal = () => store.dispatch('cleanMessage')
    const onDeleteProduct = () => {
      store.dispatch('deleteProductFromCart', { productId: currentId.value })
      store.dispatch('cleanMessage')
    }

    watch(store.state.apiConnection, () =>
      closeModalWithTimeOut(getIsSuccess(modalData.value.modalType), cleanModal)
    )

    return {
      currentImg: getCurrentImg(modalData.value.modalType),
      modalText: modalData.value.modalContent,
      isSuccess: getIsSuccess(modalData.value.modalType),
      isDelete: getIsDelete(modalData.value.modalType),
      toPath: getToPath(modalData.value.modalType, route),
      modalData,
      onDeleteProduct,
      cleanModal
    }
  }
}
</script>

<style lang="scss" scoped>
  .modal-container * {
    box-sizing: border-box;
  }

  .modal-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    background-color: rgba(2,52,73,0.30);

    .modal-container__flex {
      position: relative;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: space-around;
      margin: auto;
      padding: 30px;
      min-width: 30%;
      max-width: 40%;
      background-color: #FFF;
      border-radius: 20px;

      .modal__close__btn {
        position: absolute;
        top: 0;
        right: 0;
        border-radius: 20px;
        border: none;
        width: 40px;
        height: 40px;
        background-color: rgba(2,52,73,0.1);
        cursor: pointer;

        div {
          position: relative;
          width: 100%;
          height: 100%;

          span {
            display: block;
            position: relative;
            width: 0;
            height: 0;
            background-color: rgba(2,52,73,0.8);
            transition: background-color .2s;

            &::after {
              content: '';
              position: absolute;
              right: -28px;
              top: 18px;
              width: 32px;
              height: 3px;
              background-color: inherit;
              transform: rotate(45deg);
            }

            &::before {
              content: '';
              position: absolute;
              right: -29px;
              top: 18px;
              width: 32px;
              height: 3px;
              background-color: inherit;
              transform: rotate(-45deg);
            }
          }
        }

        &:hover,
        &:active,
        &:focus {
          div {
            span {
              background-color: #CC0000;
            }
          }
        }
      }

      .modal__content {
        display: flex;
        flex-flow: row wrap;
        margin-bottom: 15px;

        .modal-img {
          width: 50px;
          height: 50px;
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
        }

        .modal__text {
          flex-grow: 1;
          padding-left: 15px;
          padding-right: 15px;
          font-size: 1.2rem;
          text-align: center;
        }
      }

      .modal__btn-group {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        padding: 0 50px;

        button {
          padding: 10px;
          border-radius: 5px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s;
        }

        .modal__btn-del {
          background-color: #CC0000;
          border-color: #CC0000;
        }

        .modal__btn-cancell {
          background-color: #9eff00;
        }
      }

      .modal__link {
        align-self: start;
        color: #222222;
        border-bottom: 2px dashed #222222;
        transition: border-color .2s ease, color .2s ease;
        cursor: pointer;

        &:focus,
        &:hover,
        &:active {
          color: rgb(1,159,227);
          border-color: rgb(1,159,227);
        }
      }
    }
  }
</style>
