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
  main {
    height: 100vh;
  }
  #app {
    display: flex;
    min-height: 100%;
  }
  .guillotine {
    margin: auto 0;
    width: 40%;
    max-width: 550px;
  }
  h1 {
    font-size: 72px;
    margin-top: 10%;
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
      font-size: 56px;
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
    h1 {
      font-size: 48px;
    }
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
      {#if showCounter}
        <Counter wage={wage} rate={rate}/>
        {:else}
        <Wage on:start={start}/>
      {/if}
    </div>
  </div>
</main>
