<script lang="ts">
  import firebase from "firebase";

  // import { getContext } from "svelte";
  import { scale } from "svelte/transition";

  import type { BasketItemd, ItemShop } from "d/types";
  import StorageHandler from "./builder/storage/storageHandler.svelte";
  import Pre from "./utils/pre.svelte";

  import { getImg, toArray } from "./utils/utils";
  // import EditItemModal from "./modals/editItem-modal.svelte";

  import Item from "./builder/item.svelte";

  import Modal from "./modal.svelte";
  import { defaults } from "./utils/defaults";
  import Shoe from "./defaults/shoe.svelte";

  // firebase stuff
  let db = firebase.database();
  let fStorage = firebase.storage();
  //

  export let Class: string = "";

  export let i: number = 0;
  export let id: string = "";

  export let data: ItemShop = defaults.ItemShop;
  export let addToBasket: Function;

  export let selectedItem: BasketItemd = {
    id,
    storageId: "",
  };

  export let possibleItems: BasketItemd[] = [];

  //will be depricated soon
  let thisRef = { key: id };

  export let removeItem: any;

  function atb() {
    console.log(id);
    selectedItem.id = id;
    if (selectedItem.storageId != "")
      if (addToBasket(selectedItem, i)) {
        removeItem(selectedItem);
      } else {
        console.log("YOU CANT TAKE IT AWAY FROM ME");
      }
  }

  let isExpand: boolean = false;
  let imgwid;
  let imghid;

  //--- modal stuff
  let isOpen: boolean = false;
  let errmsg: string = "";
  async function onclickEdit() {
    isOpen = true;
    //open(EditItemModal,{interdata,submit})
  }

  function submit() {}
</script>

<div class="baciItem {Class}">
  <div
    class="card item greeny"
    style="width: 18rem;"
    on:click={() => {
      isExpand = true;
    }}
  >
    {#if data.photoURL != ""}
      {#await getImg(fStorage, "images/" + data.photoURL)}
        <Shoe Class="card-img-top img1" />
      {:then _}
        <div
          class="parentimg"
          bind:offsetHeight={imghid}
          bind:offsetWidth={imgwid}
        >
          <img
            src={_ || defaults.defaultPhoto}
            class="card-img-top"
            alt="..."
          />

          {#if toArray(data.storage).length == 0}
            <img
              src={defaults.soldoutPhoto}
              class="img2"
              alt="..."
              width={imgwid}
              height={imghid}
            />
          {/if}
        </div>
      {:catch}
        <Shoe Class="card-img-top img1" />
      {/await}
    {:else}
      <Shoe Class="card-img-top img1" />
    {/if}

    <div class="card-body greeny">
      <h5 class="card-title">
        <Pre price={data.price} />
      </h5>
      <p class="card-text greeny">
        {data.displayName} of category {data.category}
      </p>

      <div
        class={isExpand ? "" : "invisible"}
        in:scale={defaults.style.scaleIn}
        out:scale={defaults.style.scaleOut}
      >
        <hr />
        <StorageHandler
          productRef={thisRef}
          bind:storage={data.storage}
          bind:selectedItem
          bind:possibleItems
        />
        <button
          href="#"
          class="btn {possibleItems.length == 0 ? 'disabled' : 'btn-primary'}"
          disabled={possibleItems.length == 0}
          on:click={atb}>add to basket</button
        >
      </div>
    </div>
  </div>
  {#if isExpand}
    <button style="background:rgba(0,0,0,0)" on:click={() => (isExpand = false)}
      >close</button
    >
    <button style="background:rgba(0,0,0,0)" on:click={onclickEdit}>Edit</button
    >
  {/if}
</div>

<Modal bind:isOpen>
  <div slot="header">
    <h5 class="title">Edit item</h5>
    <button type="button" class="close" on:click={() => (isOpen = false)}>
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <hr />
  <div slot="content">
    <Item bind:values={data} />
  </div>
  <hr />
  <div slot="footer">
    <button
      type="button"
      class="btn btn-secondary"
      on:click={() => (isOpen = false)}>Close</button
    >
    <button
      type="button"
      class="btn btn-primary"
      on:click={() => {
        submit();
      }}>Edit</button
    >
    {errmsg}
  </div>
</Modal>

<style>
  .baciItem {
    padding-bottom: 1.2em;
  }
  .item {
    background: rgb(90, 124, 81) !important;
    box-shadow: 0px 0px 1px rgb(2, 2, 2) !important;
    top: 2px;
    transition: top 1s;
  }
  .greeny {
    background: #158d69 !important;
  }
  .item:hover {
    background: rgb(90, 124, 81) !important;
    box-shadow: 0px 0px 10px rgb(2, 2, 2) !important;
    top: 5px;
    transition: box-shadow 1s;
    transition: top 1s;
  }

  .disabled {
    background: rgb(47, 47, 48) !important;
    color: rgb(124, 122, 122) !important;
  }

  .bt-1 {
    border-top: rgba(255, 255, 255, 0.144) solid;
    padding-top: 1em;
  }

  .parentimg {
    position: relative;
    top: 0;
    left: 0;
  }

  .img1 {
    position: relative;
    top: 0;
    left: 0;
  }
  .img2 {
    position: absolute;
    top: 0px;
    left: 0px;
  }
</style>
