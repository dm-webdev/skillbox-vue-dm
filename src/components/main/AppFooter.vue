<template>
  <footer class="footer">
    <div class="footer__wrapper container">
      <ul class="footer__links">
        <li>
          <router-link class="footer__link" :to="{ name: 'catalog' }">
            Каталог
          </router-link>
        </li>
        <li>
          <a class="footer__link" href="tel:88006009009">
            8 XXX XXX XX XX
          </a>
        </li>
        <li>
          <a class="footer__link" href="mailto:hi@technozavrrr.com">
            hi@technozavrrr.com
          </a>
        </li>
        <li>
          <a class="footer__link" href="https://www.dm-webdev.ru/">
            Распродажа
          </a>
        </li>
        <li>
          <a class="footer__link footer__link--medium" href="https://www.dm-webdev.ru/#feedbackAnchor">
            Заказать звонок
          </a>
        </li>
      </ul>

      <ul class="footer__social social">
        <li class="social__item">
          <a class="social__link" href="https://www.dm-webdev.ru/#feedbackAnchor" aria-label="Вконтакте">
            <svg width="20" height="11" fill="currentColor">
              <use xlink:href="#icon-vk"></use>
            </svg>
          </a>
        </li>
        <li class="social__item">
          <a class="social__link" href="https://www.dm-webdev.ru/#feedbackAnchor" aria-label="Инстаграм">
            <svg width="17" height="17" fill="currentColor">
              <use xlink:href="#icon-insta"></use>
            </svg>
          </a>
        </li>
        <li class="social__item">
          <a class="social__link" href="https://www.dm-webdev.ru/#feedbackAnchor" aria-label="Facebook">
            <svg width="17" height="17" fill="currentColor">
              <use xlink:href="#icon-facebook"></use>
            </svg>
          </a>
        </li>
        <li class="social__item">
          <a class="social__link" href="https://www.dm-webdev.ru/#feedbackAnchor" aria-label="Twitter">
            <svg width="17" height="14" fill="currentColor">
              <use xlink:href="#icon-twitter"></use>
            </svg>
          </a>
        </li>
        <li class="social__item">
          <a class="social__link" href="https://www.dm-webdev.ru/#feedbackAnchor" aria-label="Telegram">
            <svg width="19" height="17" fill="currentColor">
              <use xlink:href="#icon-telegram"></use>
            </svg>
          </a>
        </li>
      </ul>

      <p class="footer__desc">
        Все права на&nbsp;материалы, находящиеся на&nbsp;сайте, охраняются в&nbsp;соответствии с&nbsp;законодательством&nbsp;РФ,
        в&nbsp;том числе об&nbsp;авторском праве и&nbsp;смежных правах.
      </p>

      <ul class="footer__data">
        <li>
          <a class="footer__link" href="https://www.dm-webdev.ru/" target="_blank" rel="noopener" type="application/pdf">
            Политика конфиденциальности
          </a>
        </li>
        <li>
          <a class="footer__link" href="https://www.dm-webdev.ru/" target="_blank" rel="noopener" type="application/pdf">
            Публичная оферта
          </a>
        </li>
      </ul>

      <span class="footer__copyright">
        © {{currentYahr}} Технозавррр
      </span>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
  computed: {
    currentYahr () {
      return new Date().getFullYear()
    }
  }
}
</script>
