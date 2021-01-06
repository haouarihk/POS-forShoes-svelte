<script lang="ts">
    import fb from "firebase";
    let db = fb.database();
    let fStorage = fb.storage();
    let fsdb = fb.firestore();

    import type { ItemShop } from "../../../d/types";

    import Item from "../item.svelte";

    export let Class: string = "";
    let dir: string = "items";
    export let addToBasket: Function;
    export let item: ItemShop;

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
        //@ts-ignore
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

    export let takeItem: any;
</script>

<input class={Class} bind:value on:keypress={(e) => onchange(e)} />
{#if item}
    <Item {...item} {addToBasket} {takeItem} />
{/if}
