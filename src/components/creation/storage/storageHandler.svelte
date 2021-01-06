<script lang="ts">
    import type {
        BasketItemd,
        Storage,
        StorageItem,
    } from "../../../../d/types";
    

    import StorageItemer from "./storageItemer.svelte";
    

    export let addedable: boolean = false;
    export let productRef: any;
    export let storage: Storage = {};

    export let selectedItem: BasketItemd = {
        id: productRef.key,
        storageId: "",
    };
    export let possibleItems: BasketItemd[] = [];

    let arrayStorage: StorageItem[] = [];

    export let arraySizes: string[] = [];
    export let arrayColors: string[] = [];

    export let selectedColor: string = "";
    export let selectedSize: number = 0;

    let results: StorageItem[] = [];

    export let theMod: number = 1;


    // just for visulizing
    let wid: any;
</script>

<style>
    .pad0 {
        padding: 2em !important;
    }
    .cup {
        background: #6c757d;
    }
    .sml {
        width: 60px;
        max-height: 2em;
        min-width: 41%;
    }
    .f1 {
        background: cornflowerblue;
    }
    .f2 {
        background: rgb(104, 133, 187);
    }
    .darkmode {
        background: #424d57;
    }
</style>

<div class="row" bind:offsetWidth={wid}>
    <StorageItemer
        bind:storage
        bind:arrayStorage
        bind:selectedItem
        bind:possibleItems 
        productId={productRef.key}
        />

    {#if possibleItems.length > 0}
        <h5 class="{wid < 200 ? 'col-12' : 'col-6'} ">
            quantity({possibleItems.length || 0}):
        </h5>
    {/if}
</div>

<!-- <div class="col-6">
        {#each arraySizes.sort() as s}
            <button
                class="cup"
                on:click={() => {
                    embi(s);
                }}
                class:bg-primary={selectedItems[selectedColorId] ? selectedItems[selectedColorId].sizes[s.id] : false}>{s.size}</button>
        {/each}
    </div> -->
