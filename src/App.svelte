<script>
	import { fly } from 'svelte/transition';
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
    width: 100%;
  }
  .guillotine {
    position: relative;
    display: flex;
    align-items: center;
    height: 100vh;
    width: 40%;
    max-width: 550px;
  }
  .guillotine img {
    position: absolute;
    width: 100%;
  }
  h1 {
    font-size: 72px;
    margin-top: 10%;
    margin-bottom: 72px;
  }
  .info {
    margin-left: 10%;
    width: 56%;
  }
   @media (max-width: 960px) {
    h1 {
      margin-top: 70px;
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
      margin-top: 0;
      width: 60%;
      height: unset;
    }
    .guillotine img {
      position: relative;
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
    <div class="guillotine">
      <img alt="" src="./assets/guillotine_final_final_final.png" />
    </div>
    <div class="info">
      <h1>What's your time<br>really worth?</h1>
      {#if showCounter}
        <div transition:fly="{{ delay: 200, x: 200, duration: 200 }}">
          <Counter wage={wage} rate={rate}/>
        </div>
        {:else}
        <div transition:fly="{{ x: -200, duration: 200 }}">
          <Wage on:start={start}/>
        </div>
      {/if}
    </div>
  </div>
</main>
