<script>
  let wage = "";
  let rate = "";

  function setRate(type) {
    rate = type;
  }
</script>

<style lang="scss">
  h2 {
    font-size: 32px;
    margin-bottom: 24px;
  }
  .wage {
    width: 25vw;
    padding: 32px;
    background: #fff;
    box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.15);
    border-radius: 8px;
  }
  .wage-input {
    position: relative;
    padding-top: 6px;
    padding-bottom: 6px;
    font-size: 24px;
    border: 1px solid #000000;
    border-radius: 4px;
  }
  .wage-input input {
    box-sizing: border-box;
    width: calc(100% - 30px);
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
    border-radius: 4px;
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
    border-radius: 4px;
    font-size: 16px;
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
  <button class="start">START</button>
</div>
