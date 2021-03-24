<script lang="ts">
    import fb from "firebase";
    import { defaults } from "../utils/defaults";
    let db = fb.database();
    let fStorage = fb.storage();
    let fsdb = fb.firestore();

    import type { ItemShop } from "d/types";

    import Item from "../item.svelte";

    let dir: string = "items";

    let value: string = "";
    function onchange(e: Event) {
        //@ts-ignore
        if (e.keyCode == 13) {
            getItem(value);
            //@ts-ignore
            e.target.value = "";
            //@ts-ignore
            e.target.focus();
        }
    }

    async function getItem(id: string) {
        return db.ref(`${dir}/${id}`).once("value", (snap) => {
            let val = snap.val();

            if (!val) {
                alert(
                    `this barcode (${id}) dosen't have an item asign to it in directory ${dir}`
                );
                item = null;
                return;
            }
            item = { ...val, ...{ id } };
        });
    }

    export var Class: string = "";
    export var removeItem: Function, addToBasket: Function;
    export var item: ItemShop | null = null;
</script>

<input class={Class} bind:value on:keypress={onchange} />
{#if item}
    <Item data={item} {addToBasket} {removeItem} />
{/if}
