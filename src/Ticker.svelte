<script>
export let digits;
const NUMBERS = [...Array(10).keys()];

$: stringNumber = digits.toString().split('').reverse();

</script>

<style>
.digit {
  display: inline-block;
}
.ticker-container {
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
  height: 1em;
  line-height: 1em;
  overflow-y: hidden;
}
.ticker {
  display: flex;
  flex-direction: column;
  transition: transform 300ms cubic-bezier(0.65, 0.05, 0.36, 1);
}
</style>


<span class="ticker-container">
  {#each stringNumber as char, index}
    {#if parseInt(char) || char === "0"}
      <span class="digit">
        <div class="ticker" style="transform: translateY(-{char}em)">
          {#each NUMBERS as n}
            <span>{n}</span>
          {/each}
        </div>
      </span>
    {:else}
     <span>{char}</span>
    {/if}
  {/each}
</span>
