<script lang="ts">
  import "firebase/firestore";
  import "firebase/auth";
  import "firebase/storage";
  import {
    Collection,
    //@ts-ignore
  } from "sveltefire";

  import ItemsViewer from "../components/itemsViewer.svelte";
  import SearchBar from "../components/searchBar.svelte";
  import NewItem from "../components/creation/newItem.svelte";
  
  import Modal from "sv-bootstrap-modal";

  import {
    getInterData,
    getUnicId,
    instructId,
    toArray,
  } from "../components/utils/utils";
  import type { BasketItemd, Interdata, ItemShop } from "../../d/types";

  import fb from "firebase";
  import Globalizer from "../components/utils/globalizer.svelte";
  let db = fb.database();
  let fStorage = fb.storage();
  let fsdb = fb.firestore();
  export let addToBasket: Function;

  let interdata: Interdata[];
  let items: ItemShop[] = [];

  let categories: string[];
  let sellers: string[];

  let isOpen = false;
  export let etems: any = {};

  let state: number = 0;
  let errmsg: string = "";

  async function getItems() {
    return db.ref(`items`).on("value", (snap) => {
      etems = snap.val() || {};
    });
  }
  //getItems();

  async function getdata() {
    interdata = await getInterData(db, "items");
    return interdata;
  }

  function takeItem(er: BasketItemd) {
    delete etems[er.id].storage[er.storageId];
    etems = { ...etems };
  }

  async function setItem(id: string, data: ItemShop) {
    return db.ref(`items/${id}`).set(data);
  }

  async function createNewItem() {
    state = 1;
    try {
      //@ts-ignore
      let _newItem: ItemShop = {};

      let barcodeId = getUnicId(etems);

      for (let k = 0; k < interdata.length; k++) {
        const d = interdata[k];
        switch (d.answerType) {
          case "barcode":
            if (etems[d.data]) {
              state = 0;
              errmsg = "this barcode already exists";
              isOpen = true;
              return;
            } else {
              barcodeId = d.data;
            }

          case "file":
            console.log("uplaoding image..");
            let regurl = `shoe_${interdata[0].data}_${Math.round(
              Math.random() * 10000
            )}`;
            let imgFef = fStorage.ref("images").child(regurl);
            await imgFef.put(d.data).then((snap) => {
              _newItem.photoURL = regurl;
            });
            console.log("finished uplaoding The image!");
            break;
          case "lister":
            //@ts-ignore
            _newItem[d.name] = d.title;
            break;

          default:
            //@ts-ignore
            _newItem[d.name] = d.data;
            break;
        }
      }

      console.log(_newItem);

      let _id;

      await fsdb.collection(`items/`).doc(`${_id}`).set(_newItem);

      state = 0;
      isOpen = false;
    } catch (err) {
      errmsg = err;
      state = 2;
    }
  }

  async function requestOpen(dd: string, dd2: any) {
    await getdata();

    if (dd == "add new") {
      interdata = interdata.map((a) => {
        return { ...a, ...{ data: dd2[a.title] } };
      });
      isOpen = true;
    }
  }

  export async function takeback(item: BasketItemd) {
    //@ts-ignore
    await db
      .ref(`items/${item.id}/storage/${item.storageId}`)
      .on("value", (snap) => {
        etems[item.id].storage[item.storageId] = snap.val() || {};
      });
  }

  $: {
    items = toArray(instructId(etems || {})) || [];
  }

  let itmheight: any = 0;
  let srchheight = 0;

  let itmWidth: any = 0;

  $: {
    itmheight = window.innerHeight * 0.63;
    srchheight = window.innerHeight * 0.2;

    itmWidth = window.innerHeight * 2;
  }

  let viewItems: ItemShop[] = [];
</script>

<style>
  .close {
    border-radius: 22%;
  }
  .searchi {
    box-shadow: 0em 0em 10em black;
    width: 100%;
  }
  .poper {
    display: absolute;
  }
  .f1 {
    background: #696969;
  }
  .f2 {
    background: #484848;
  }
</style>

<!-- _items  => etems => toarray => items -->
<Collection path={`items`} let:data={_et} let:ref={itemsRef}>
  <Globalizer data={_et} bind:data2={etems} />

  <SearchBar
    {items}
    bind:viewItems
    bind:categories
    bind:sellers
    cb={requestOpen}
    height={srchheight} />

  {#if viewItems[0]}
    <ItemsViewer
      {addToBasket}
      items={viewItems}
      {takeItem}
      height={itmheight}
      width={itmWidth} />
  {/if}
</Collection>

<Modal bind:open={isOpen}>
  {#if state == 1}
    loading..
  {:else if state == 2}
    Error:
    {errmsg}
    <button on:click={() => (state = 0)}>return</button>
  {:else}
    <div class="poper">
      <div class="modal-header f1">
        <h5 class="modal-title">Add item</h5>
        <button
          type="button"
          class="close bg-danger"
          on:click={() => (isOpen = false)}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body f2">
        <NewItem {interdata} productId={''} />

        {errmsg}
      </div>
      <div class="modal-footer f1">
        <button
          type="button"
          class="btn btn-secondary"
          on:click={() => (isOpen = false)}>Close</button>
        <button
          type="button"
          class="btn btn-primary"
          on:click={() => {
            createNewItem();
          }}>Create</button>
      </div>
    </div>
  {/if}
</Modal>
