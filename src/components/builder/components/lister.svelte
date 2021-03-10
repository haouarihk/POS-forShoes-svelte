<script lang="ts">
    import Modal from "sv-bootstrap-modal";

    import firebase from "firebase";
    let db = firebase.database();
    // let fStorage = firebase.storage();

    import { filtererOBJ, getListOf, instructId } from "../../utils/utils";

    import type { NewItem } from "../../../../d/types";
    import Dropdown from "../../dropdown.svelte";

    export let Class: string | undefined = "";

    export let specialReplacementForDir: any = {};

    export let title: string = "";
    export let dir: string = "";

    export let addedable: boolean = true;
    export let viewedElement: string = "displayName";

    export let isNewOrEdit: Boolean = true;

    export let items: any = {};

    export let listItems: string[] = [];

    export let component: any;

    $: {
        dir = filtererOBJ(dir, specialReplacementForDir);
    }

    let isOpen = false;

    let status: number = 0;
    let errMsg: string = "";

    $: {
        listItems = getListOf(items, viewedElement);
    }

    async function getKeys() {
        if (dir) {
            // get dirs
            return db.ref(dir).on("value", (snap) => {
                items = instructId(snap.val() || {});
                status = 0;
            });
        } else {
            return null;
        }
    }

    // ------- adds a new item
    let newItemData: NewItem.all = {};
    async function createNew() {
        return await db.ref(dir).push().set(newItemData);
    }

    /**this function get called whenever intem is selected from the dropdown menu*/
    async function cap(_i: string, i: number) {
        if (i == -2) {
            isOpen = true;

            // ---- this is called whenever an item is not selected
            newItemData.displayName = _i || "";
        } else if (i > -1) {
            // ---- this is called whenever an item is selected
            value = i;
        }
    }

    export var value: number = -2;
</script>

<dir class=" {Class}">
    {#await getKeys() then __}
        <Dropdown
            Class="col-12"
            items={listItems}
            bind:value
            bind:title
            cb={cap}
            {addedable}
        />
    {/await}
</dir>

<!-- popup -->
<Modal bind:open={isOpen}>
    <div class="poper">
        <div class="modal-header">
            <h5 class="modal-title">
                {isNewOrEdit ? "New" : "Edit"}
                {title}
            </h5>
            <button
                type="button"
                class="close"
                on:click={() => (isOpen = false)}
            >
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <svelte:component this={component} bind:values={newItemData} />
            <!-- {#if (title = "categories")}
                <Category bind:values={newItemData} />
            {:else if (title = "clients")}
                <Client bind:values={newItemData} />
            {:else if (title = "sellers")}
                <Seller bind:values={newItemData} />
            {/if} -->
        </div>
        <div class="modal-footer">
            <button
                type="button"
                class="btn btn-secondary"
                on:click={() => (isOpen = false)}>Close</button
            >
            <button
                type="button"
                class="btn btn-primary"
                on:click={() => {
                    createNew();
                    isOpen = false;
                }}>{isNewOrEdit ? "Create" : "Edit"}</button
            >
        </div>
    </div>
</Modal>

<style>
    .poper {
        background: rgb(46, 148, 122);
    }
    .close {
        border-radius: 22%;
    }
</style>
