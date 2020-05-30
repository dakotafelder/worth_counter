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
    width: 60%;
    max-width: calc(.7 * 110vh);
  }
  .guillotine img {
    position: fixed;
    width: 60%;
    max-width: calc(.7 * 110vh);
  }
  .info {
    margin: 0 20px;
    width: 50%;
  }
  h1 {
    font-size: 72px;
    margin-top: 10vh;
    margin-bottom: 72px;
    white-space: nowrap;
  }
  @media (max-width: 1300px) {
    .guillotine img {
      left: -80px;
    }
  }
  @media (max-width: 1230px) {
    .info {
      margin-left: 0;
    }
    h1 {
      font-size: 64px;
    }
  }
   @media (max-width: 960px) {
    h1 {
      margin-top: 70px;
      margin-bottom: 60px;
    }
    #app {
      flex-direction: column-reverse;
      align-items: center;
      justify-content: flex-end;
    }
    .info {
      width: 90%;
      margin: 0;
    }
    .guillotine {
      margin-top: 50px;
      width: 100%;
      max-width: unset;
      height: unset;
    }
    .guillotine img {
      position: relative;
      width: 100%;
      max-width: unset;
      left: 0;
    }
  }

  @media (max-width: 600px) {
    h1 {
      font-size: 48px;
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
