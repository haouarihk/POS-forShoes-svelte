<script lang="ts">
  import ThisUser from "./auth/thisUser.svelte";

  export let intSelectedPage: number;
  export let changePage: Function;
  export let navOptions: any[];

  export let userAuth: any;
</script>

<style>
  .nav-item {
    border: 0;
  }
  .kk {
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

    /* -webkit-app-region: drag !important; */
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

    /* -webkit-app-region: no-drag !important; */
  }
  .button_close:focus {
    background: red;
    border: 0;
  }
  .active {
    min-width: 120px;
    background: rgba(70, 115, 145, 0.233) !important;
    transition: min-width 0.3s;
  }
</style>

<!-- <link
  rel="stylesheet"
  href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" />

<nav class="navbar navbar-expand-lg navbar-light bg-success">
  <a class="navbar-brand" href="#">Pos</a>
  <button
    class="navbar-toggler"
    type="button"
    data-toggle="collapse"
    data-target="#navbarSupportedContent"
    aria-controls="navbarSupportedContent"
    aria-expanded="false"
    aria-label="Toggle navigation">
    <span class="navbar-toggler-icon" />
  </button>

  <!-- svelte-ignore a11y-missing-attribute 
  <div class="collapse navbar-collapse drag" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      {#each navOptions as item, i (i)}
        <button
          class={'nav-link bg-success kk'}
          class:active={intSelectedPage == i}
          on:click={(e) => changePage(e)}
          id={'' + i}
          role="tab">{item.page}</button>
      {/each}
    </ul>
    <div class="form-inline my-2 my-lg-0">
      {#if userAuth.user}
        <ThisUser {...userAuth} />
      {:else}
        <h5 class="m-1">not logged in</h5>
      {/if}

      <div class="button button_close" />
      <div class="button button-minimize ">
        <img
          class="button-img-minimize m-1"
          src="./png/titlebar/caption-buttons.svg#minimize" />
      </div>
      <div class="button button-maximize p-1 m-2">
        <img
          class="button-img-maximize m-1"
          src="./png/titlebar/caption-buttons.svg#maximize " />
        <img
          class="button-img-restore m-1"
          src="./png/titlebar/caption-buttons.svg#restore"
          style="display: none;" />
        <img
          class="button-img-close m-1"
          src="./png/titlebar/caption-buttons.svg#close " />
      </div>
    </div>
  </div>
</nav> 
-->
<div class=" w-full flex  py-0">
  <div class="w-full px-0">
    <nav
      class="relative flex  items-center justify-between px-0 py-2 navbar-expand-lg bg-green-500 rounded">
               <a
            class="text-sm font-bold leading-relaxed inline-block px-3  py-auto uppercase text-white"
            href="#pablo">
            Pos
          </a>
       
        <div class="flex lg:flex-grow items-center" id="example-navbar-info">
          <ul
            class="flex flex-col lg:flex-row list-none ml-auto my-auto lg:flex-grow flex">
            {#each navOptions as item, i (i)}
              <button
                class="nav-item nav-link my-auto"
                class:active={intSelectedPage == i}
                on:click={(e) => changePage(e)}
                id={'' + i}
                role="tab">
                {item.page}
              </button>
            {/each}
          </ul>
          
        </div>
        
      <div class="flex flex-col lg:flex-row list-none ">
        {#if userAuth.user}
          <ThisUser {...userAuth} />
        {:else}
          <h5 class="">not logged in</h5>
        {/if}

        <img
          class="button-img-minimize m-1 p-2"
          src="./png/titlebar/caption-buttons.svg#minimize" />

        <img
          class="button-img-maximize m-1 p-2"
          src="./png/titlebar/caption-buttons.svg#maximize " />

        <img
          class="button-img-close m-1 p-2"
          src="./png/titlebar/caption-buttons.svg#close " />
      </div>
    </nav>
  </div>
</div>
