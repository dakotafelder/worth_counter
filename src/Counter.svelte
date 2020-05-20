<script>
  import Ticker from './Ticker.svelte';

  export let wage;
  export let rate;

  const SECONDS_IN_HOUR = 3600;
  const SECONDS_IN_DAY = 86400;
  const SECONDS_IN_YEAR = 31557600;
  const BEZOS_2020 = 30600000000;
  const LABELS = ["YEAR", "DAY", "HOUR", "MINUTE", "SECOND"]

  let seconds = 0;

  import { onMount } from "svelte";

  function formatTime(seconds) {
    return [
      parseInt(seconds / 60 / 60),
      parseInt((seconds / 60) % 60),
      parseInt(seconds % 60)
    ]
      .join(":")
      .replace(/\b(\d)\b/g, "0$1");
  }

  function formatToYear(seconds) {
    return [
      parseInt(seconds / SECONDS_IN_YEAR),
      parseInt((seconds % SECONDS_IN_YEAR) / SECONDS_IN_DAY),
      parseInt((seconds % SECONDS_IN_DAY) / SECONDS_IN_HOUR),
      parseInt((seconds / 60) % 60),
      parseInt(seconds % 60)
    ]
      .map(int => int.toString())
  }

  function timeToX(x, wage, rate, seconds) {
    return formatToYear(
      x / (wage * (1 / (rate === "hour" ? SECONDS_IN_HOUR : SECONDS_IN_YEAR))) -
        seconds
    );
  }

  function hourly(wage, seconds) {
    return (wage * (seconds / SECONDS_IN_HOUR)).toFixed(2);
  }

  function yearly(wage, seconds) {
    return (wage * (seconds / SECONDS_IN_YEAR)).toFixed(2);
  }

  function getPlural(number) {
    return parseInt(number) === 1 ? '' : 'S'
  }

  $: timer = formatTime(seconds);
  $: youEarned =
    rate === "hour" ? hourly(wage, seconds) : yearly(wage, seconds);
  $: jeffEarned = yearly(BEZOS_2020, seconds);
  $: timeToMillion = timeToX(1000000, wage, rate, seconds);
  $: timeToBillion = timeToX(1000000000, wage, rate, seconds);

  onMount(() => {
    setInterval(() => {
      seconds = parseFloat((seconds += .2).toFixed(1));
    }, 200);
  });
</script>

<style>
  .label {
    margin-bottom: 12px;
    font-size: 16px;
    text-transform: uppercase;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  ul.main-counters {
    margin-bottom: 50px;
  }
  li {
    margin-bottom: 28px;
  }
  .number {
    font-weight: bold;
    font-size: 40px;
    line-height: 47px;
  }
  .numbers-with-units {
    display: flex;
    flex-wrap: wrap;
    flex-basis: 50%;
  }
  .secondary-counters .number {
    display: flex;
    align-items: center;
    margin-right: 32px;
    margin-bottom: 5px;
    font-size: 24px;
    line-height: 24px;
  }
  .secondary-counters .number:last-of-type {
    margin-right: 0;
  }
  .unit-label {
    font-size: 16px;
    line-height: 19px;
    margin-left: 6px;
    margin-top: 2px;
    text-transform: uppercase;
    font-weight: normal;
    color: #808080;
  }
</style>

<ul class="main-counters">
  <li>
    <div class="label">TIME ELAPSED</div>
    <div class="number">
      <Ticker digits={timer}></Ticker>
    </div>
  </li>

  <li>
    <div class="label">YOU'VE EARNED</div>
    <div class="number"><Ticker digits={`$${youEarned}`}></Ticker></div>
  </li>

  <li>
    <div class="label">JEFF'S EARNED</div>
    <div class="number"><Ticker digits={`$${jeffEarned}`}></Ticker></div>
  </li>

</ul>

<ul class="secondary-counters">
  <li>
    <div class="label">TIME TO $1M</div>
    <div class="numbers-with-units">
    {#each timeToMillion as unit, index}
      <div class="number">
        <Ticker digits={unit}></Ticker><span class="unit-label">{`${LABELS[index]}${getPlural(unit)}`}</span>
      </div>
    {/each}
    </div>
  </li>

  <li>
    <div class="label">TIME TO $1B</div>
    <div class="numbers-with-units">
    {#each timeToBillion as unit, index}
      <div class="number">
        <Ticker digits={unit}></Ticker><span class="unit-label">{`${LABELS[index]}${getPlural(unit)}`}</span>
      </div>
    {/each}
    </div>
  </li>
</ul>
