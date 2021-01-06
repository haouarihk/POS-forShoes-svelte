<script globals lang="ts">
  import firebase from "firebase";
  import Fb from "firebase/app";
  import "firebase/firestore";
  import "firebase/auth";
  import "firebase/storage";
  import {
    FirebaseApp,
    User,
    //@ts-ignore
  } from "sveltefire";
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional

  // Initialize Firebase
  // @ts-ignore
  Fb.initializeApp(fbConfig);
  Fb.analytics();
  const db = firebase.database();
  const fsdb = firebase.firestore();

  import { QParamer } from "param-handler";
  let ph = new QParamer(window);
  import { navOptions } from "./naver.svelte";
  let { selectedPage, intSelectedPage } = qgnu(ph, navOptions);

  // change the selected component (the event.originalTarget.id is not accessible in Chrome so switched to event.srcElement.id)
  function changePage(event: any) {
    selectedPage = navOptions[event.srcElement.id];
    intSelectedPage = event.srcElement.id;
    ph.set("page", selectedPage.page);
    return true;
  }

  import type { BasketItemd, ItemShop } from "../d/types";
  import BasketItemViewer from "./components/basketItemViewer.svelte";
  import NavBar from "./components/navBar.svelte";

  import Pre from "./components/utils/pre.svelte";
  import { getMultiItemsById, getUnicId, qgnu } from "./components/utils/utils";
  import Login from "./pages/login.svelte";
  import TitleBar from "./components/titleBar.svelte";

  let basketItems: BasketItemd[] = [];

  let totalCost: number;

  let etems: any;

  function addToBasket(b: BasketItemd) {
    if (b.storageId.length < 1) {
      return false;
    }
    // if it already exists
    let p = basketItems.find((a) => a.storageId == b.storageId) ? true : false;
    if (!p) {
      basketItems.push(b);
      basketItems = [...basketItems];
      return true;
    } else return false;
  }

  async function sellAllItemsInTheBasket() {
    // get all items
    //@ts-ignore
    let items: ItemShop[] = await getMultiItemsById(
      db,
      basketItems.map((a) => a.id)
    );

    // push all items in the sold items
    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      let storageItem = basketItems[i];
      let soldRef = fsdb.doc("sold/");
      let k = await soldRef.get();
      let kId = getUnicId(k.data());
      fsdb.doc(`sold/${kId}`).set({
        worker: "default",
        date: new Date(),
        category: item.category,
        storageItem,
      });

      // push id of the sold item to the buyer
      //@ts-ignore
      // let b = db.ref(`buyer/${}/`).push();
      // let bId = k.key;
      // k.set({
      //   worker: "default",
      //   date: new Date(),
      //   category: item.category,
      //   color: item.color,
      //   storage,
      // });
    }
  }

  let takeback: any;
</script>

<style>
  .page {
    display: table;
    width: 100%;
    height: 60%;
  }
  .invisible {
    display: none;
    visibility: hidden;
  }

  .page-content {
    display: table-cell;
    padding: 1%;
  }

  .fbmenu {
    background: #138563 !important;
  }
  .globalCenter {
    display: relative;
  }

  .hs {
    height: 2.5em;
  }
</style>

<TitleBar />

<!-- svelte-ignore missing-declaration -->
<FirebaseApp firebase={Fb}>
  <User let:user let:auth>
    <div slot="signed-out">
      <NavBar
      navOptions={[]}
      {intSelectedPage}
      {changePage}
      userAuth={{ auth, user }} /><br />
      <Login {auth} />
    </div>

    <!-- Start User Default -->

    <main class="globalCenter">
      <NavBar
        {navOptions}
        {intSelectedPage}
        {changePage}
        userAuth={{ auth, user }} /><br />
      <div class="page">
        <BasketItemViewer bind:basketItems bind:totalCost {takeback} />

        <div class="page-content container ksi">
          <div class="row">
            <div class="col-sm-12">
              {#each navOptions as page, i}
                <div
                  class="p-2 invisible"
                  class:invisible={i != intSelectedPage}>
                  <!-- this is where our main content is placed -->
                  <svelte:component
                    this={page.component}
                    {addToBasket}
                    bind:basketItems
                    bind:totalCost
                    bind:takeback
                    bind:etems />
                </div>
              {/each}
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- total cost -->
    <div class="fixed-bottom row fbmenu bg-success">
      <h1 class="col-5">
        Total Cost:
        <Pre price={totalCost} />
      </h1>
      <button
        class="col bg-success "
        on:click={sellAllItemsInTheBasket}>sell</button>
      <button class="col bg-primary ">add to costumer</button>
      <!-- <button class="col-12 col-xl-2 bg-info">be right back</button> -->
    </div>
  </User>
</FirebaseApp>
