<script lang="ts">
  import type { ItemShop } from "../../d/types";
  import Item from "./item.svelte";
  import { slide } from "svelte/transition";

  export let addToBasket: Function;
  export let removeItem: any;

  export let height = "100";
  export let width = "100";

  export let items: ItemShop[] = [];
</script>

{#if items[0]}
  <div
    class="viewField"
    style="height:{height}px !important; max-width:{width}px !important"
  >
    {#each items as _item, i}
      <div transition:slide|local class="col display-flex">
        <Item bind:data={_item} {removeItem} {addToBasket} {i} />
      </div>
    {/each}
  </div>
{:else}Nothing..{/if}

<style>
  .viewField {
    background: #484848 !important;
    overflow-y: scroll;
    overflow-x: hidden;

    display: flex;
    flex-grow: 1;
    flex-wrap: wrap;
    flex-basis: content;
    gap: 20px;
  }
</style>
