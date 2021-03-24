<script lang="ts">
    import { getContext } from "svelte";

    //import type { Interdata } from "d/types";

    import NewItem from "../creation/newItem.svelte";

    const { close } = getContext("editItemModal");

    export let errmsg: string = "";
    export let productId: string = "";
    export let interdata: Interdata[] = [];
    export let submit: (k: { interdata: Interdata[] }) => string;
</script>

<div class="modal-header">
    <h5 class="modal-title">Edit item</h5>
    <button type="button" class="close" on:click={() => close()}>
        <span aria-hidden="true">&times;</span>
    </button>
</div>
<div class="modal-body">
    <NewItem {interdata} {productId} />
</div>
<div class="modal-footer">
    <button type="button" class="btn btn-secondary" on:click={() => close()}
        >Close</button
    >
    <button
        type="button"
        class="btn btn-primary"
        on:click={() => {
            errmsg = submit({ interdata });
        }}>Edit</button
    >
    {errmsg}
</div>
