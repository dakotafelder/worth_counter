<script>
  import Ticker from "./Ticker.svelte";
  import Tooltip from "./Tooltip.svelte";

  export let wage;
  export let rate;

  const SECONDS_IN_HOUR = 3600;
  const SECONDS_IN_DAY = 86400;
  const SECONDS_IN_YEAR = 31557600;
  const WORK_HOURS_IN_YEAR = 2085;
  const HOURS_IN_YEAR = 8760;
  const BEZOS_2020 = 30600000000;
  const BEZOS_NET = 150300000000;
  const LABELS = ["YEAR", "DAY", "HOUR", "MINUTE", "SECOND"];

  let seconds = 0;
  let floatSeconds = 0;

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
    ].map(int => int.toString());
  }

  function timeToX(x, wage, rate, seconds) {
    const wagePerYear = rate === "hour" ? wage * WORK_HOURS_IN_YEAR : wage;
    const wagePerSecond = wagePerYear / SECONDS_IN_YEAR;

    return formatToYear(x / wagePerSecond - seconds);
  }

  function hourly(wage, seconds) {
    return formatCommas((wage * (seconds / SECONDS_IN_HOUR)).toFixed(2));
  }

  function yearly(wage, seconds) {
    return formatCommas((wage * (seconds / SECONDS_IN_YEAR)).toFixed(2));
  }

  function formatCommas(numbers) {
    const decimals = numbers.split(".")[1];
    const numbersAsInt = parseInt(numbers).toString();
    const numbersAsArray = numbersAsInt.split("");

    const formattedNumbers = numbersAsArray.reduce((acc, current, idx, src) => {
      const comma = (src.length - idx) % 3 === 0 && idx > 0 ? "," : "";

      return `${acc}${comma}${current}`;
    }, "");

    return decimals ? `${formattedNumbers}.${decimals}` : formattedNumbers;
  }

  function getPlural(number) {
    return parseInt(number) === 1 ? "" : "S";
  }

  $: timer = formatTime(seconds);
  $: youEarned =
    rate === "hour" ? hourly(wage, floatSeconds) : yearly(wage, floatSeconds);
  $: jeffEarned = yearly(BEZOS_2020, floatSeconds);
  $: jeffEarnedBySeconds = BEZOS_NET + parseFloat(yearly(BEZOS_2020, seconds));
  $: timeToMillion = timeToX(1000000, wage, rate, seconds);
  $: timeToBillion = timeToX(1000000000, wage, rate, seconds);
  $: timeToJeff = timeToX(jeffEarnedBySeconds, wage, rate, seconds);

  onMount(() => {
    setInterval(() => {
      floatSeconds = parseFloat((floatSeconds += 0.2).toFixed(1));

      if (floatSeconds % 1 === 0) {
        seconds = seconds += 1;
      }
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
      <Ticker digits={timer} />
    </div>
  </li>

  <li>
    <div class="label">
      YOU'VE EARNED
      <Tooltip title="BASE WAGE:" {rate} wage={formatCommas(wage.toString())} />
    </div>
    <div class="number">
      <Ticker digits={`$${youEarned}`} />
    </div>
  </li>

  <li>
    <div class="label">
      JEFF'S EARNED
      <Tooltip
        title="2020 EARNINGS:"
        wage={formatCommas(BEZOS_2020.toString())} />
    </div>
    <div class="number">
      <Ticker digits={`$${jeffEarned}`} />
    </div>
  </li>

</ul>

<ul class="secondary-counters">
  <li>
    <div class="label">TIME TO $1M</div>
    <div class="numbers-with-units">
      {#each timeToMillion as unit, index}
        <div class="number">
          <Ticker digits={formatCommas(unit)} />
          <span class="unit-label">{`${LABELS[index]}${getPlural(unit)}`}</span>
        </div>
      {/each}
    </div>
  </li>

  <li>
    <div class="label">
      TIME TO JEFF
      <Tooltip title="BEZOS WORTH:" wage={formatCommas(BEZOS_2020.toString())} />
    </div>
    <div class="numbers-with-units">
      {#each timeToJeff as unit, index}
        <div class="number">
          <Ticker digits={formatCommas(unit)} />
          <span class="unit-label">{`${LABELS[index]}${getPlural(unit)}`}</span>
        </div>
      {/each}
    </div>
  </li>
</ul>
