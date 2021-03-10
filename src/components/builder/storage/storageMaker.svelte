<script lang="ts">
    import type { Storage } from "../../../../d/types";

    import firebase from "firebase";

    import StorageItemer from "./storageItemer.svelte";
    import { getUnicId } from "../../utils/utils";
    // import StoraegMakerModal from "./modals/storaegMaker-modal.svelte";
    import Modal from "../../modal.svelte";

    import StorageItem from "../storageItem.svelte";

    let db = firebase.database();
    // let fStorage = firebase.storage();

    let possibleColors: string[] = [];
    let possibleSizes: number[] = [];

    let selectedQuantity = 0;
    let selectedColor: string;
    let selectedSize: number;

    let isOpen = false;

    async function addnew() {
        if (!storage) storage = {};
        let storageItem: any = {
            color: selectedColor,
            size: selectedSize,
        };

        if (!selectedQuantity) selectedQuantity = 1;

        let _storage: Storage = storage;
        for (let __i = 0; __i < selectedQuantity; __i++) {
            let _sId = getUnicId(storage);
            _storage[_sId] = storageItem;
        }

        if (productId) {
            // we need to add storageItem into the database inside item storage
            await db.ref(`items/${productId}`).child(`storage`).set(_storage);
        }

        storage = _storage;
    }

    //modal
    async function onclickAdd() {
        // await gid();
        isOpen = true;
        // open(StoraegMakerModal, {
        //     submit,
        //     interdata,
        //     selectedQuantity,
        // });
    }

    async function submit() {
        await addnew();
        isOpen = false;
    }
    //

    export var productId: string;
    export var storage: Storage = {};
    export var addedable: boolean = false;
</script>

<div>
    <StorageItemer bind:storage bind:possibleSizes bind:possibleColors />

    {#if addedable}
        <button class="f1" on:click={() => onclickAdd()}>add new</button>
    {/if}
</div>

<Modal bind:isOpen>
    <div slot="header" class=" f1">
        <h5 class="modal-title">Add item</h5>
        <button type="button" class="close" on:click={() => (isOpen = false)}>
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div slot="content" class=" f2">
        <StorageItem
            {possibleColors}
            {possibleSizes}
            bind:selectedColor
            bind:selectedSize
        />
        <input type="number" bind:value={selectedQuantity} min="0" />
    </div>
    <div slot="footer" class=" f1">
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
            }}>Add</button
        >
    </div>
</Modal>

<style>
    .f2 {
        background: #696969;
    }
    .f1 {
        background: #484848;
    }
</style>
