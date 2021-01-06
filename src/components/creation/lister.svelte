<script lang="ts">
    import firebase from "firebase";
    let db = firebase.database();
    let fStorage = firebase.storage();

    import type { Interdata } from "../../../d/types";
    import Dropdown from "../dropdown.svelte";

    import {
        constructParam,
        filtererOBJ,
        getListOf,
        instructId,
        toArray,
    } from "../utils/utils";

    export let Class: string|undefined = "";

    export let title: string="";
    export let value: number = -2;

    export let specialReplacementForDir: any = {};
    export let dir: string="";

    $: {
        dir = filtererOBJ(dir, specialReplacementForDir);
    }

    export let addedable: boolean = true;
    export let viewedElement: string = "displayName";

    export let isNewOrEdit: Boolean = true;

    import Modal from "sv-bootstrap-modal";

    import NewItem from "./newItem.svelte";
    let isOpen = false;

    export let interdatatype: string = "default";
    export let interdata: Interdata[];

    export let items: any = {};

    export let listItems: string[] = [];
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

    let DidItBefore = false;

    async function _getInterData() {
        if (!DidItBefore)
            if (interdatatype) {
                DidItBefore = true;
                db.ref(`interdata/${interdatatype}`).on("value", (snap) => {
                    let val = snap.val();
                    interdata = toArray(val) || [];
                });
            } else {
                return null;
            }
    }
    _getInterData();

    async function createNew() {
        let __newData = constructParam(interdata);
        return await db.ref(dir).push().set(__newData);
    }
    /**this function get called whenever intem is selected from the dropdon menu*/
    async function cap(_i:string, i:number) {
        if (i == -2) {
            isOpen = true;
            interdata[0].data = _i || "";
        } else if (i > -1) {
            value = i;
        }
    }
</script>

<style>
    .poper {
        background: rgb(46, 148, 122);
    }
    .close {
        border-radius: 22%;
    }
</style>

<dir class=" {Class}">
    {#await getKeys() then __}
        <Dropdown
            Class="col-12"
            items={listItems}
            bind:value
            bind:title
            cb={cap}
            {addedable} />
    {/await}
</dir>

<!-- popup -->
<Modal bind:open={isOpen}>
    {#if interdata}
        <div class="poper">
            <div class="modal-header">
                <h5 class="modal-title">
                    {isNewOrEdit ? 'New' : 'Edit'}
                    {title}
                </h5>
                <button
                    type="button"
                    class="close"
                    on:click={() => (isOpen = false)}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <NewItem {interdata} />
            </div>
            <div class="modal-footer">
                <button
                    type="button"
                    class="btn btn-secondary"
                    on:click={() => (isOpen = false)}>Close</button>
                <button
                    type="button"
                    class="btn btn-primary"
                    on:click={() => {
                        createNew();
                        isOpen = false;
                    }}>{isNewOrEdit ? 'Create' : 'Edit'}</button>
            </div>
        </div>
    {:else}
        <div class="poper">Loading ..</div>
    {/if}
</Modal>
