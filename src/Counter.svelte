<script>
  export let wage;
  export let rate;

  const SECONDS_IN_HOUR = 3600;
  const SECONDS_IN_YEAR = 31557600;
  const BEZOS_2020 = 30600000000;

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

  function formatToMilliseconds(seconds) {
    return new Date(1000 * seconds).toISOString().substr(11, 12);
  }

  function timeToX(x, wage, rate, seconds) {
    return formatTime(
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

  $: timer = formatTime(seconds);
  $: youEarned =
    rate === "hour" ? hourly(wage, seconds) : yearly(wage, seconds);
  $: jeffEarned = yearly(BEZOS_2020, seconds);
  $: timeToMillion = timeToX(1000000, wage, rate, seconds);
  $: timeToBillion = timeToX(1000000000, wage, rate, seconds);

  onMount(() => {
    setInterval(() => {
      seconds += .1;
    }, 100);
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
  .secondary-counters .number {
    font-size: 24px;
    line-height: 28px;
  }
</style>

<ul class="main-counters">
  <li>
    <div class="label">TIME ELAPSED</div>
    <div class="number">{timer}</div>
  </li>

  <li>
    <div class="label">YOU'VE EARNED</div>
    <div class="number">{youEarned}</div>
  </li>

  <li>
    <div class="label">JEFF'S EARNED</div>
    <div class="number">{jeffEarned}</div>
  </li>

</ul>

<ul class="secondary-counters">
  <li>
    <div class="label">TIME TO $1M</div>
    <div class="number">{timeToMillion}</div>
  </li>

  <li>
    <div class="label">TIME TO $1B</div>
    <div class="number">{timeToBillion}</div>
  </li>
</ul>
