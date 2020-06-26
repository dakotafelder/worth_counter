<script>
  export let title;
  export let rate;
  export let wage;

  let showTip = false;

  $: displayRate = rate === "hour" ? "HR" : "YR";
</script>

<style>
  .wrapper {
    position: relative;
  }
  .tip {
    position: absolute;
    bottom: 30px;
    left: 50%;
    min-width: 90px;
    padding: 11px;
    margin: auto;
    text-align: center;
    transform: translateX(-50%);
    background: #fff;
    border: 1px solid #000000;
  }
  .title {
    font-weight: 300;
    font-size: 12px;
    line-height: 14px;
    white-space: nowrap;
  }
  .rate {
    font-weight: bold;
    font-size: 16px;
    line-height: 19px;
    white-space: nowrap;
    margin-top: 3px;
  }
</style>

<span class="wrapper">
  <!-- {#if showTip} -->
  <div class="tip">
    <div class="title">{title}</div>
    <div class="rate">
      ${wage}{#if rate}/{displayRate}{/if}
    </div>
  </div>
  <!-- {/if} -->
  <img
    on:mouseover={() => {
      showTip = true;
    }}
    on:mouseleave={() => {
      showTip = false;
    }}
    alt="tooltip"
    src="../assets/tooltip.svg" />
</span>
