<script lang="ts">
  import type { BasketItemd, ItemShop } from "../../d/types";

  import Pre from "./utils/pre.svelte";

  import firebase from "firebase";

  const fsdb = firebase.firestore();

  export let Class: string="";

  export let index: number=0;
  export let price: number = 0;

  //@ts-ignore
  export let item: ItemShop = { price: 0 };
  export let ids: BasketItemd;
  export let dlt: Function = () => {};

  let color: string;
  let size: number;
  let wid: any;

  $: {
    //@ts-ignore
    price = parseInt(item.price);
  }

  (async () => {
    let data = (await fsdb.doc(`items/${ids.id}`).get()).data();
     console.log(data)
  })();

  $: {
    if (item.storage) {
      if (item.storage[ids.storageId]) {
        color = item.storage[ids.storageId].color;
        size = item.storage[ids.storageId].size;
      }
    }
  }
</script>

<style>
  .adj {
    text-size-adjust: auto;
  }
  .tts {
    background: #158d69 !important;
    margin-bottom: 1em;
    min-width: 200px;
  }
  .fa {
    position: absolute;
    top: -5px;
    right: 260px;
    margin: 0em;
    width: 2em;
    height: 2em;
    background: #191919;
    border-radius: 100%;
    padding-bottom: 1em;
  }
</style>

<div class="card tts {Class}" bind:offsetWidth={wid}>
  {#if wid > 250}<button class="bg-warn fa" on:click={() => dlt(index)} />{/if}
  <div class="card-body">
    <h5 class="card-title">{item.name}</h5>
    <h6 class="card-subtitle mb-2 ">
      Price:
      <Pre price={item.price} />
    </h6>
    <div class="card-text row">
      <div class="row col-12">
        <h5 class="col">Color:</h5>
        <h5 class="col" style="color:{color} !important">{color}</h5>
      </div>
      <div class="row col-12">
        <h5 class="col">Size:</h5>
        <h5 class="col">{size}</h5>
      </div>
    </div>
  </div>
</div>
