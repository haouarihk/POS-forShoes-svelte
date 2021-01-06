<script lang="ts">
    export let isOpen: boolean = false;
    function open() {
        isOpen = true;
    }
    function close() {
        isOpen = false;
    }
</script>

<style>
    .modal {
        transition: opacity 0.25s ease;
       
    }
    .modal-content{
        margin: 100px !important;
        background: #494949;
    }
    body.modal-active {
        overflow-x: hidden;
        overflow-y: visible !important;
    }
    div.modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        min-width: 200px !important;
        min-height: 400px !important;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    div.backdrop {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4);
    }
    div.content-wrapper {
        z-index: 10;
        max-width: 70vw;
        border-radius: 0.3rem;
        background-color: rgb(58, 56, 56);
        overflow: hidden;
    }
    div.content {
        max-height: 50vh;
        overflow: auto;
    }
</style>




{#if isOpen}
    <div class="modal">
        <div class="backdrop" on:click={close} />

        <div class="modal-content p-4">
            <slot name="header">
                <!-- fallback -->
                <div>
                    <h1>Your Modal Heading Goes Here...</h1>
                </div>
            </slot>
            <hr/>
            <div class="content p-1">
                <slot name="content" />
            </div>
            <hr/>

            <slot name="footer" {close}>
                <!-- fallback -->
                <div>
                    <h1>Your Modal Footer Goes Here...</h1>
                    <button on:click={close}>close</button>
                </div>
            </slot>
        </div>
    </div>
{/if}
