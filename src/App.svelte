<script>
  import Wage from "./Wage.svelte";
  import Counter from "./Counter.svelte";

  let wage = "";
  let rate = "";
  let showCounter = false;

  function start(evt) {
    wage = evt.detail.wage;
    rate = evt.detail.rate;
    showCounter = true;
  }
</script>

<style>
  #app {
    display: flex;
  }
  .guillotine {
    margin: auto 0;
    width: 40%;
  }
  h1 {
    font-size: 72px;
    margin-top: 20%;
    margin-bottom: 80px;
  }
  .info {
    margin-left: 10%;
    width: 56%;
  }
   @media (max-width: 960px) {
    h1 {
      margin-top: 100px;
      margin-bottom: 60px;
      font-size: 48px;
    }
    #app {
      flex-direction: column-reverse;
      align-items: center;
    }
    .info {
      width: 70%;
      margin: 0;
    }
    .guillotine {
      margin-top: 80px;
      width: 60%;
    }
  }

  @media (max-width: 600px) {
    .info {
      width: 90%;
    }
    .guillotine {
      width: 90%;
    }
  }
</style>

<main>
  <div id="app">
    <img alt="" src="./assets/guillotine.png" class="guillotine" />
    <div class="info">
      <h1>What's your time<br>really worth?</h1>
      <Wage />
    </div>
  </div>
</main>
