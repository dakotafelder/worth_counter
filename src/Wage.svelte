<script>
	import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  let wage = "";
  let rate = "";

  function setRate(type) {
    rate = type;
  }

  function formatWage() {
    if (wage.split(".").length > 2) {
      return wage.split(".").slice(0, 2).join(".")
    }
    return wage.replace(/([^\d\.])/g,'');
  }

  function start() {
    const strippedWage = formatWage();
    if (wage.length === 0 || rate.length === 0 || strippedWage.length === 0) return;

    dispatch('start', { rate: rate, wage: parseFloat(strippedWage, 10) });
  }
</script>

<style lang="scss">
  h2 {
    font-size: 32px;
    margin-bottom: 24px;
  }
  .wage {
    padding: 32px;
    padding-left: 0;
    max-width: 362px;
    background: #fff;
  }
  .wage-input {
    position: relative;
    padding-top: 6px;
    padding-bottom: 6px;
    font-size: 24px;
    border: 1px solid #000000;
  }
  .wage-input input {
    box-sizing: border-box;
    width: calc(100% - 40px);
    margin-left: 30px;
    font-size: 24px;
  }
  .wage-input::before {
    content: "$";
    position: absolute;
    left: 12px;
    margin-top: 1px;
    font-weight: bold;
  }
  button {
    font-size: 16px;
    text-transform: uppercase;
  }
  .rate-input {
    display: flex;
    margin-top: 8px;
    margin-bottom: 32px;
  }
  .rate-input button {
    width: 100%;
    padding: 8px 35px;
    background: #fff;
    border: 1px solid #000000;
  }
  .rate-input button.active {
    cursor: default;
  }
  .rate-input button:hover,
  .rate-input button.active {
    background: #000;
    color: #fff;
    border: 1px solid #000000;
  }
  .rate-input button:first-of-type {
    margin-right: 8px;
  }
  .start {
    display: block;
    width: 100%;
    padding: 12px 0;
    color: #fff;
    background: #000000;
    border: 1px solid #000000;
    font-size: 16px;
  }

  @media (max-width: 960px) {
    .wage {
      max-width: unset;
      padding: unset;
    }
  }
</style>

<div class="wage">
  <h2>Enter your wage</h2>
  <div class="wage-input">
    <input bind:value={wage} min="0" placeholder="24,000" />
  </div>
  <div class="rate-input">
    <button
      on:click={() => setRate('hour')}
      class={rate === 'hour' ? 'active' : ''}>
      PER HOUR
    </button>
    <button
      on:click={() => setRate('year')}
      class={rate === 'year' ? 'active' : ''}>
      PER YEAR
    </button>
  </div>
  <button on:click={start} class="start">START</button>
</div>
