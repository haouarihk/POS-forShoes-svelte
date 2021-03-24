<script lang="ts">
  import firebase from "firebase";
  import "firebase/firestore";
  import "firebase/auth";
  import "firebase/storage";

  import type { BasketItemd } from "d/types";

  import BasketItem from "./basketItem.svelte";

  export let basketItems: BasketItemd[] = [];
  let prices: number[] = [];
  export let totalCost: number;
  export let takeback: (b: BasketItemd) => void = () => {};

  export let height: number = 100;

  let bh: any;
  $: {
    console.log(bh);
    height = bh * 0.6;
  }

  function dlt(i: number) {
    takeback(basketItems[i]);
    basketItems.splice(i, 1);
    basketItems = [...basketItems];
  }

  $: {
    totalCost = prices.reduce((a, b) => a + b, 0);
  }

  function distneast() {}
</script>

<div class="h-100 lefty sidebar ">
  <h2>Basket:</h2>
  <br />
  <div class="lfy" style="height:{height}px !imporant">
    <div class="row">
      {#each basketItems as _, i}
        <BasketItem ids={_} index={i} />
      {/each}
    </div>
  </div>
</div>

<svelte:window bind:innerHeight={bh} />

<style>
  .lfy {
    overflow-y: scroll;
    overflow-x: hidden;
    padding-right: 2em;
  }
  .sidebar {
    display: table-cell;
    padding: 1%;
  }
  .sidebar {
    width: 600px !important;
    min-width: 166px;
    transition: min-width 0.333s;
  }
  .sidebar:hover {
    min-width: 350px;
    transition: min-width 0.3s;
  }

  .lefty {
    border-right: #282828 0.1cm solid;
    box-shadow: -3em 0em 2em black;
    padding: 1em;
  }
</style>
