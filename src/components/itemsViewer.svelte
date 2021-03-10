<script lang="ts">
  import type { ItemShop } from "../../d/types";
  import Item from "./item.svelte";
  import { slide } from "svelte/transition";

  export let addToBasket: Function;
  export let takeItem: any;

  export let height = "100";
  export let width = "100";

  export let items: ItemShop[] = [];
</script>

{#if items[0]}
  <div
    class="row viewField "
    style="height:{height}px !important; max-width:{width}px !important"
  >
    {#each items as _item, i}
      <div transition:slide|local class="col display-flex">
        <Item
          {..._item}
          {takeItem}
          {addToBasket}
          bind:storage={_item.storage}
          {i}
        />
      </div>
    {/each}
  </div>
{:else}Nothing..{/if}

<style>
  .viewField {
    background: #484848 !important;
    overflow-y: scroll;
    overflow-x: hidden;
    padding: 1em;
    margin-bottom: 5px;
  }
</style>
