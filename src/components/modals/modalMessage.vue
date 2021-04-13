<template>
  <router-link :to="{ name: 'catalog' }" custom v-slot="{ navigate }">
    <div
      class="modal-container"
      @click.self="() => {navigate(), cleanModal()}"
      v-on:keyup.esc="() => {navigate(), cleanModal()}"
      role="link"
    >
      <div class="modal-container__flex">
        <button
          @click="() => {navigate(), cleanModal()}"
          @keypress.enter="() => {navigate(), cleanModal()}"
          role="link"
          class="modal__close__btn"
          aria-label="закрыть окно"
        >
          <span class="close__btn_decorator" />
        </button>

        <div class="modal__content">
          <span class="modal-img" :style="{ backgroundImage: `url(${currentImg})` }" />
          <p class="modal__text">{{ modalText }}</p>
        </div>
        <a class="modal__link" @click="() => {navigate(), cleanModal()}" role="link">Вернуться на главную</a>
      </div>
    </div>
  </router-link>
</template>

<script>
import { computed } from 'vue'
import successImg from '../../assets/img/checked.svg'
import errorImg from '../../assets/img/error.svg'
import defautImg from '../../assets/img/egg.svg'
import { useStore } from 'vuex'

export default {
  name: 'ModalMessage',
  setup () {
    const store = useStore()
    const modalType = store.state.apiConnection.modalType
    const modalText = store.state.apiConnection.modalContent

    const currentImg = computed(() => {
      if (modalType === 'success') {
        return successImg
      }
      if (modalType === 'error') {
        return errorImg
      }
      return defautImg
    })

    return {
      currentImg,
      modalText,
      cleanModal: () => store.commit('setMessage', { modalContent: null, modalType: null })
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

        span {
          position: relative;
          background-color: rgba(2,52,73,0.8);
          transition: background-color .2s;

          &::after {
            content: '';
            position: absolute;
            right: -15px;
            top: -1px;
            width: 32px;
            height: 3px;
            background-color: inherit;
            transform: rotate(45deg);
          }

          &::before {
            content: '';
            position: absolute;
            right: -15px;
            top: -1px;
            width: 32px;
            height: 3px;
            background-color: inherit;
            transform: rotate(-45deg);
          }
        }

        &:hover,
        &:active,
        &:focus {
          span {
            background-color: #CC0000;
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
