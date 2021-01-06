<script lang="ts">
    import type {
        BasketItemd,
        Interdata,
        Storage,
        StorageItem,
    } from "../../../../d/types";

    import firebase from "firebase";

    import StorageItemer from "./storageItemer.svelte";
    import { getInterData, getUnicId } from "../../utils/utils";
    import StoraegMakerModal from "./modals/storaegMaker-modal.svelte";
import Modal from "../../modal.svelte";
import NewItem from "../newItem.svelte";

    let db = firebase.database();
    let fStorage = firebase.storage();

    // inputs
    export let productId: string;
    export let storage: Storage = {};
    export let addedable: boolean = false;
    //

    let possibleColors: string[] = [];
    let possibleSizes: number[] = [];

    let isOpen = false;
    let interdata: Interdata[] = [];
    async function gid() {
        interdata = await getInterData(db, "storageItem");
        interdata = interdata.map((a) => {
            let _a = a;
            if (a.name == "color") {
                _a.items = possibleColors;
            } else if (a.name == "size") {
                _a.items = possibleSizes.map((a) => "" + a);
            }
            return a;
        });
    }

    let selectedQuantity = 0;

    async function addnew() {
        if (!storage) storage = {};
        let storageItem: any = {};
        interdata.forEach((a) => {
            storageItem[a.name] = a.data;
        });

        if (!selectedQuantity) selectedQuantity = 1;
        for (let __i = 0; __i < selectedQuantity; __i++) {
            let _sId = getUnicId(storage);

            if (productId) {
                // we need to add storageItem into the database inside item storage
                await db
                    .ref(`items/${productId}`)
                    .child(`storage/${_sId}`)
                    .set(storageItem);
            }

            storage[_sId] = storageItem;
        }
    }

    //modal
    async function onclickAdd() {
        await gid()
        isOpen=true
        // open(StoraegMakerModal, {
        //     submit,
        //     interdata,
        //     selectedQuantity,
        // });
    }

    async function submit() {
        await addnew();
        isOpen=false;
    }
    //
</script>

<style>
    .f2 {
        background: #696969;
    }
    .f1 {
        background: #484848;
    }
</style>

<div>
    <StorageItemer bind:storage bind:possibleSizes bind:possibleColors />

    {#if addedable}
        <button class="f1" on:click={() => onclickAdd()}>add new</button>
    {/if}
</div>

<Modal bind:isOpen>
    <div slot="header" class=" f1">
        <h5 class="modal-title">Add item</h5>
        <button type="button" class="close" on:click={() => (isOpen=false)}>
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div slot="content" class=" f2">
        <NewItem bind:interdata />
        <input type="number" bind:value={selectedQuantity} min="0" />
    </div>
    <div slot="footer" class=" f1">
        <button
            type="button"
            class="btn btn-secondary"
            on:click={() => (isOpen=false)}>Close</button>
        <button
            type="button"
            class="btn btn-primary"
            on:click={() => {
                submit();
            }}>Add</button>
    </div>
</Modal>