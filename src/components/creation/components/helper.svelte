<script lang="ts">
import { filterTheSame } from "../../utils/utils";


    export let posibilities: string[];
    let viewdPosi:string[];
    export let value: string="";
    let onFocus: boolean;

    //@ts-ignore
    // autocomplete(document.getElementById("myInput"), posibilities);
    $:{
        viewdPosi = filterTheSame(posibilities.filter(a=>a.indexOf(value)!=-1))
    }

</script>

<style>
    .oldautocomplete{
        overflow: hidden;
        transition: max-width 1s;
    }
    .autocomplete {
        /*the container must be positioned relative:*/
        position: relative;
        display: inline-block;
        max-height: 100% !important;
        transition: max-width 1s;
    }
    input {
        border: 1px solid transparent;
        background: #6c768f !important;
        padding: 10px;
        font-size: 16px;
    }
    input[type="text"] {
        background-color: #f1f1f1;
        width: 100%;
    }
    input[type="submit"] {
        background-color: DodgerBlue;
        color: #fff;
    }
    .autocomplete-items {
        position: absolute;
        border: 1px solid #696969;
        border-bottom: none;
        border-top: none;
        z-index: 99;
        /*position the autocomplete items to be the same width as the container:*/
        top: 100%;
        left: 0;
        right: 0;
    }
    .autocomplete-items div {
        padding: 10px;
        cursor: pointer;
        background: rgb(104, 101, 101);
        border-bottom: 1px solid #d4d4d4;
    }
    .autocomplete-items div:hover {
        /*when hovering an item:*/
        background: #555454;
    }
    .autocomplete-active {
        /*when navigating through the items using the arrow keys:*/
        background-color: DodgerBlue !important;
        color: #ffffff;
    }
</style>

<div class="autocomplete" style="width:300px;">
    <input
        type="text"
        name="helper"
        placeholder="helper"
        bind:value
        on:focus={() => (onFocus = true)}
        on:blur={() => setTimeout(() => (onFocus = false), 100)} />
    {#if onFocus}
        <div class="autocomplete-items oldautocomplete">
            {#each viewdPosi as pos}
                <div on:click={() => (value = pos)} >{pos}</div>
            {/each}
        </div>
    {/if}
</div>
