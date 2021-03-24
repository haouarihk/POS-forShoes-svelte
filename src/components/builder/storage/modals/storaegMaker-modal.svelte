<script lang="ts">
    import { getContext } from "svelte";

    //import type { Interdata } from "d/types";

    const { close } = getContext("storage-modal");

    import Newitem from "../../../creation/newItem.svelte";

    export let interdata: Interdata[] = [];

    export let submit: Function = () => {};

    export let selectedQuantity: number = 0;
</script>

<div class="modal-header f1">
    <h5 class="modal-title">Add item</h5>
    <button type="button" class="close" on:click={() => close()}>
        <span aria-hidden="true">&times;</span>
    </button>
</div>
<div class="modal-body f2">
    <Newitem bind:interdata />
    <input type="number" bind:value={selectedQuantity} min="0" />
</div>
<div class="modal-footer f1">
    <button type="button" class="btn btn-secondary" on:click={() => close()}
        >Close</button
    >
    <button
        type="button"
        class="btn btn-primary"
        on:click={() => {
            close();
            submit({ selectedQuantity, interdata });
        }}>Add</button
    >
</div>
