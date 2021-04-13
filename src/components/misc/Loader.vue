<template>
  <div class="cssload-container">
    <ul class="cssload-flex-container">
      <li>
        <span class="cssload-loading" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Loader'
}
</script>

<style>
  .cssload-container * {
    box-sizing: border-box;
  }

  .cssload-container {
    position: fixed;
    top: calc(50% - 45px);
    left: calc(50% - 45px);
    display: flex;
  }

  .cssload-container ul li{
    list-style: none;
  }

  .cssload-flex-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: auto;
  }

  .cssload-flex-container li {
    padding: 9px;
    height: 95px;
    width: 95px;
    margin: 28px 19px;
    position: relative;
    text-align: center;
  }

  .cssload-loading {
    display: inline-block;
    position: relative;
    width: 81px;
    height: 81px;
    border-radius: 100%;
    border: 5px solid transparent;
    border-bottom: 5px solid rgb(2,52,73);
    border-left: 5px solid rgba(2,52,73,0.98);
    animation: cssload-spinR 1.8s linear infinite;
  }

  .cssload-loading:before, .cssload-loading:after {
    content: '';
    display: block;
    border-radius: 100%;
    position: absolute;
  }

  .cssload-loading:before {
    height: 47px;
    width: 47px;
    border: 3px solid transparent;
    border-top: 3px solid rgb(1,159,227);
    border-right: 3px solid rgb(1,159,227);
    animation: cssload-spinL 0.6775s linear infinite;
    transform-origin: center center;
    top: 11%;
    left: 11%;
  }

  .cssload-loading:after {
    height: 9px;
    width: 9px;
    background: transparent;
    border: 2px solid rgb(167,168,168);
    top: 35.5%;
    left: 35.5%;
  }

  @keyframes cssload-spinR {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes cssload-spinL {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(-360deg);
    }
  }
</style>
