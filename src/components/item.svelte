<script lang="ts">
  import firebase from "firebase";

  import { getContext } from "svelte";
  import { scale } from "svelte/transition";

  import type { BasketItemd, Interdata, Storage } from "../../d/types";
  import StorageHandler from "./creation/storage/storageHandler.svelte";
  import Pre from "./utils/pre.svelte";

  import { getImg, getInterData, getUnicId, toArray } from "./utils/utils";
  import NewItem from "./creation/newItem.svelte";
  import EditItemModal from "./modals/editItem-modal.svelte";
  import Modal from "./modal.svelte";

  // firebase stuff
  let db = firebase.database();
  let fStorage = firebase.storage();
  //

  export let Class: string = "";

  export let i: number = 0;
  export let id: string = "";
  export let key: string;
  export let name: string = "";
  export let photoURL: string = "";
  export let category: string = "-1";
  export let seller:string="";

  export let price: number = 0;
  export let buyingPrice:number=0;

  export let storage: Storage;
  export let addToBasket: Function;

  export let selectedItem: BasketItemd = {
    id,
    storageId: "",
  };
  export let possibleItems: BasketItemd[] = [];

  let defaultPhoto = "./png/defaultshoe.png";
  let soldoutPhoto = "./png/soldout.png";

  let interdata: Interdata[] = [];
  async function gid() {
    interdata = await getInterData(db, "items");
    
    return interdata;
  }

  //will be depricated soon
  let thisRef = { key: id };

  export let takeItem: any;

  function atb() {
    console.log(id);
    selectedItem.id = id;
    if (selectedItem.storageId != "")
      if (addToBasket(selectedItem, i)) {
        takeItem(selectedItem);
      } else {
        console.log("YOU CANT TAKE IT AWAY FROM ME");
      }
  }

  export let isExpand: boolean = false;
  let imgwid;
  let imghid;

  //modal stuff
  let isOpen: boolean = false;
  let errmsg:string="";
  async function onclickEdit() {
    await gid();


    interdata.map(a=>{
      switch (a.name) {
        case 'storage':
          a.data = storage
          console.log("storged", storage)
          break;
        case 'name':
          a.data = name
          break;
        case 'price':
          a.data = price
          break;
          case 'buyingPrice':
          a.data = buyingPrice
          break;
        case 'category':
          a.title = category
          break;
        case 'seller':
          a.title = seller
          break;
      }
      return a
    })


    console.log(interdata)
    isOpen = true;
    //open(EditItemModal,{interdata,submit})
  }
  function submit() {
    
  }
  //
</script>

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

<div class="baciItem {Class}">
  <div
    class="card item greeny"
    style="width: 18rem;"
    on:click={() => {
      isExpand = true;
    }}>
    {#await getImg(fStorage, 'images/' + photoURL)}
      <div class="parentimg">
        <img src={defaultPhoto} class="card-img-top img1" alt="..." />

        <img src={soldoutPhoto} class="img2" alt="..." />
      </div>
    {:then _}
      <div
        class="parentimg"
        bind:offsetHeight={imghid}
        bind:offsetWidth={imgwid}>
        <img src={_ || defaultPhoto} class="card-img-top" alt="..." />

        {#if toArray(storage).length == 0}
          <img
            src={soldoutPhoto}
            class="img2"
            alt="..."
            width={imgwid}
            height={imghid} />
        {/if}
      </div>
    {/await}

    <div class="card-body greeny">
      <h5 class="card-title">
        <Pre {price} />
      </h5>
      <p class="card-text greeny">{name} of category {category}</p>

      {#if isExpand}
        <div
          in:scale={{ duration: 100 }}
          out:scale={{ duration: 100 }}
          class="w-16 md:w-32 lg:w-48">
          <hr />
          <StorageHandler
            productRef={thisRef}
            bind:storage
            bind:selectedItem
            bind:possibleItems />
          <button
            href="#"
            class="btn {possibleItems.length == 0 ? 'disabled' : 'btn-primary'}"
            disabled={possibleItems.length == 0}
            on:click={atb}>add to basket</button>
        </div>
      {/if}
    </div>
  </div>
  {#if isExpand}
    <button
      style="background:rgba(0,0,0,0)"
      on:click={() => (isExpand = false)}>close</button>
    <button
      style="background:rgba(0,0,0,0)"
      on:click={() => onclickEdit()}>Edit</button>
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
    <NewItem bind:interdata productId={id} />
  </div>
  <hr />
  <div slot="footer">
    <button
      type="button"
      class="btn btn-secondary"
      on:click={() => (isOpen = false)}>Close</button>
    <button
      type="button"
      class="btn btn-primary"
      on:click={() => {
        submit();
      }}>Edit</button>
    {errmsg}
  </div>
</Modal>
