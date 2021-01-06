<script lang="ts">
  import { fade, scale, slide } from "svelte/transition";
  export let Class: string = "";
  export let Style: string = "";
  export let items: string[] = [];
  export let title: string = "dropdown";

  export let selective: boolean = true;
  export let addedable: boolean = false;

  export let cap: Function = () => {};

  export let cb: Function = () => {};

  export let value: number = -1;
  let normalTitle = title;
  let viewdItems: string[] = [];
  let toggler = false;
  let search: string = "";
  function changetitle(_i: string, isnew: boolean, i_optional?: number) {
    let index = i_optional || items.indexOf(_i);
    value = index;

    let ttl = _i;
    if (index != -1) {
      if (selective) {
        title = _i;
      }
    } else {
      ttl = _i;
    }

    if (isnew) {
      index = -2;
      ttl = `${ttl}_${Math.round(Math.random() * items.length * 10000)}`;
    } else {
      index = -1;
    }

    cb(ttl, index);
  }

  function init(e:any) {
    e.focus();
    e.select();
    e.setSelectionRange(0, e.value.length);
    search = "";
  }

  function onsearch(e:any) {
    if (e.keyCode == 13) changetitle(viewdItems[0], viewdItems.length == 0);
  }

  $: {
    if (items[0]) viewdItems = items.filter((a) => a.indexOf(search) != -1);
    if (search == "") title = normalTitle;
  }
</script>

<style>
  .dropdown-content {
    margin-top: 0em;
    position: sticky !important;

    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }

  .ddm2 {
    background: rgb(116, 114, 114);
  }
  .brr {
    margin-bottom: 1em;
  }
</style>

<div class="brr {Class}" style={Style}>
  {#if !toggler}
    <button
      type="button"
      class="btn btn-secondary  col-12"
      on:click={() => (toggler = true)}>
      {title}<span>↵</span>
    </button>
  {:else}
    <input
      type="text"
      class="btn btn-secondary col-12"
      bind:value={search}
      on:keypress={onsearch}
      on:blur={() => setTimeout(() => {
          toggler = false;
          changetitle(search, false);
        }, 200)}
      use:init />
  {/if}
  {#if toggler}
    <div class="ddm2 dropdown-content" transition:scale={{ duration: 200 }}>
      {#each viewdItems as _i, i}
        <button
          transition:slide|local
          class={'darkTheme border border-primary ' + selective ? 'dropdown-item ' : ''}
          type="button"
          on:click={() => {
            cap(_i, i);
            search = _i;
            changetitle(_i, false);
            toggler = false;
          }}>{_i}</button>
      {/each}
      {#if addedable}
        <button
          class={'darkTheme  dropdown-item s'}
          type="button"
          on:click={() => {
            changetitle(search, true, -1);
            toggler = false;
          }}>New (+)</button>
      {/if}
      {#if selective}
        <button
          class={'darkTheme bg-danger  dropdown-item '}
          type="button"
          on:click={() => {
            changetitle('', false, -2);
          }}>Cancel (X)</button>
      {/if}
    </div>
  {/if}
</div>
