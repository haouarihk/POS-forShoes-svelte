<script lang="ts">
  import type { ItemShop } from "../../d/types";
  import Lister from "./creation/lister.svelte";

  import DropDown from "./dropdown.svelte";

  export let height = 100;

  export let items: ItemShop[] = [];
  export let viewItems: ItemShop[];

  export let cb: Function = () => {};

  export let categories: string[] = [];
  let chosenCategory: number = -1;

  export let sellers: string[] = [];
  let chosenSeller: number = -1;

  let settings = ["add new"];

  let searchf: string = "";

  $: {
    viewItems = items.filter((val) =>
      searchf != ""
        ? val.name.indexOf(searchf) != -1
        : true && chosenCategory != -1
        ? val.category == categories[chosenCategory]
        : true && chosenSeller != -1
        ? val.seller == sellers[chosenSeller]
        : true
    );
  }
  let isOpen = false;
</script>

<style>
  .botomborder {
    border-bottom: rgba(109, 109, 109, 0.308) solid 1mm !important;
  }
  .pad {
    padding: 1em;
    height: 100px;
  }
  .cup {
    margin-left: 1em;
    background: #282828;
  }
  .bf {
    min-height: 0% !important;
    height: 1px;
    transition: min-height 5s;
  }
  .bf2 {
    min-height: 100% !important;

    transition: min-height 5s;
  }
</style>

<div class="row botomborder" style="height:{height}px !important">
  <div class="col-12 row">
    <h4 class="col-2">Filters:</h4>
    <input
      class=" col-5 cup"
      bind:value={searchf}
      style="height:2.333em !important; margin-right:1%" />

    <div class="col-sm-2">
      <DropDown
        Class="col-12"
        items={settings}
        title="⋮"
        selective={false}
        cb={(a) => {
          cb(a, {
            name: searchf,
            category: categories[chosenCategory == -2 ? 0 : chosenCategory],
            seller: sellers[chosenSeller == -2 ? 0 : chosenSeller],
          });
        }} />
    </div>
  </div>

  <div class="col-12 row {isOpen ? 'bf2' : 'bf'}">
    <Lister
      Class="col"
      interdatatype="categories"
      title="categories"
      dir="categories"
      bind:listItems={categories}
      bind:value={chosenCategory} />

    <Lister
      Class=" col"
      interdatatype="sellers"
      title="sellers"
      dir="sellers"
      bind:listItems={sellers}
      bind:value={chosenSeller} />
  </div>
</div>
<slot />
