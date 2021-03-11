<script lang="ts">
  import ThisUser from "./auth/thisUser.svelte";

  export let intSelectedPage: number;
  export let changePage: Function;
  export let navOptions: any[];

  export let userAuth: any;
</script>

<div class="w-full flex py-0">
  <div class="w-full px-0">
    <nav
      class="relative flex  items-center justify-between px-0 py-2 navbar-expand-lg bg-green-500 rounded"
    >
      <a
        class="text-sm font-bold leading-relaxed inline-block px-3  py-auto uppercase text-white"
        href="#pablo"
      >
        Pos
      </a>

      <div class="flex lg:flex-grow items-center" id="example-navbar-info">
        <ul class="flex  flex-row list-none ml-auto my-auto lg:flex-grow">
          {#each navOptions as item, i (i)}
            <button
              class="nav-item nav-link my-auto"
              class:active={intSelectedPage == i}
              on:click={(e) => changePage(e)}
              id={"" + i}
              role="tab"
            >
              {item.page}
            </button>
          {/each}
        </ul>
      </div>

      <div class="flex flex-row list-none ">
        {#if userAuth.user}
          <ThisUser {...userAuth} />
        {:else}
          <h5 class="">not logged in</h5>
        {/if}

        <img
          class="button-img-minimize m-1 p-2"
          alt=""
          src="./png/titlebar/caption-buttons.svg#minimize"
        />

        <img
          class="button-img-maximize m-1 p-2"
          alt=""
          src="./png/titlebar/caption-buttons.svg#maximize "
        />

        <img
          class="button-img-close m-1 p-2"
          alt=""
          src="./png/titlebar/caption-buttons.svg#close "
        />
      </div>
    </nav>
  </div>
</div>

<style>
  .nav-item {
    border: 0;
  }
  /* .kk {
    min-width: 50px;
    transition: min-width 0.1s;
  }
  .kk:hover {
    min-width: 120px;
    background: rgba(70, 115, 145, 0.233) !important;
    transition: min-width 0.3s;
  }
  .kk:focus {
    border: 0cm !important;
    text-size-adjust: 2cm;
    background: rgba(255, 255, 255, 0.205) !important;
  }
  .navbar {
    margin-top: -0.2cm;
    margin-left: -0.2cm;
    margin-right: -0.2cm;


  }
  .navbar:hover {
    cursor: default;
  }
  .navbar:active {
    cursor: default;
  }

  .drag {
    -webkit-app-region: drag !important;
  }

  .drag * {
    -webkit-app-region: no-drag !important;
  }
  .button_close {
    width: fit-content;
    height: 2em;
    border: 0 !important;
    background: rgb(200, 0, 0) !important;
    text-align: center;


  }
  .button_close:focus {
    background: red;
    border: 0;
  }*/
  .active {
    min-width: 120px;
    background: rgba(70, 115, 145, 0.233) !important;
    transition: min-width 0.3s;
  }
</style>
