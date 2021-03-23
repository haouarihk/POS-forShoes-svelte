<script lang="ts">
  import "firebase/firestore";
  import "firebase/auth";
  import "firebase/storage";

  import { Lang } from "../../lang/lang";

  export let lang: string = "English";

  let langifi: LangTypes.Filter;
  $: {
    langifi = Lang.langs[lang].filter;
  }

  import ItemsViewer from "../components/itemsViewer.svelte";
  import SearchBar from "../components/searchBar.svelte";
  // import NewItem from "../components/creation/newItem.svelte";

  import Modal from "sv-bootstrap-modal";

  import { instructId, toArray } from "../components/utils/utils";
  import type { BasketItemd, ItemShop, LangTypes } from "../../d/types";

  import fb from "firebase";
  import Item from "../components/builder/item.svelte";
  import { defaults } from "../components/utils/defaults";

  let db = fb.database();
  // let fStorage = fb.storage();
  // let fsdb = fb.firestore();
  export let addToBasket: Function;

  let items: ItemShop[] = [];

  let categories: string[];
  let sellers: string[];

  let isOpen = false;
  export let etems: any = {};

  let state: number = 0;
  let errmsg: string = "";

  // async function getItems() {
  //   return db.ref(`items`).on("value", (snap) => {
  //     etems = snap.val() || {};
  //   });
  // }
  //getItems();

  async function getdata() {
    etems = (await db.ref("/items").get()).val();
  }

  function removeItem(er: BasketItemd) {
    delete etems[er.id].storage[er.storageId];
    etems = { ...etems };
  }

  async function pushItem(data: ItemShop) {
    return db.ref(`items/`).push().set(data);
  }

  /** Function to set item with data
   */
  const setItem = (id: string, data: ItemShop) =>
    db.ref(`items/${id}`).set(data);

  let newItemData: ItemShop = defaults.ItemShop;
  async function createNewItem() {
    state = 1;
    try {
      if (!newItemData.displayName) return;

      await pushItem(newItemData).catch((err) => {
        throw err;
      });

      state = 0;
      isOpen = false;
    } catch (err) {
      errmsg = err;
      state = 2;
    }
  }

  async function requestOpen(dd: string) {
    if (dd == langifi.addNewItem) {
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

<!-- _items  => etems => toarray => items -->
{#await getdata()}
  {Lang.langs[lang].general.loading}
{:then _}
  <SearchBar
    {items}
    bind:viewItems
    bind:categories
    bind:sellers
    cb={requestOpen}
    height={srchheight}
  />

  {#if viewItems[0]}
    <ItemsViewer
      {addToBasket}
      items={viewItems}
      {removeItem}
      height={itmheight}
      width={itmWidth}
    />
  {/if}
{/await}

<Modal bind:open={isOpen}>
  {#if state == 1}
    {Lang.langs[lang].general.loading}
  {:else if state == 2}
    {Lang.langs[lang].editing.error}:
    {errmsg}
    <button on:click={() => (state = 0)}
      >{Lang.langs[lang].editing.return}</button
    >
  {:else}
    <div class="poper">
      <div class="modal-header f1">
        <h5 class="modal-title">{langifi.addNewItem}</h5>
        <button
          type="button"
          class="close bg-danger"
          on:click={() => (isOpen = false)}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body f2">
        <Item bind:values={newItemData} {lang} />

        {errmsg}
      </div>
      <div class="modal-footer f1">
        <button
          type="button"
          class="btn btn-secondary"
          on:click={() => (isOpen = false)}
          >{Lang.langs[lang].editing.close}</button
        >
        <button
          type="button"
          class="btn btn-primary"
          on:click={() => {
            createNewItem();
          }}>{Lang.langs[lang].editing.create}</button
        >
      </div>
    </div>
  {/if}
</Modal>

<style>
  .close {
    border-radius: 22%;
  }

  /* .searchi {
    box-shadow: 0em 0em 10em black;
    width: 100%;
  } */
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
