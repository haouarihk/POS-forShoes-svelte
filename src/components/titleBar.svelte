<script lang="ts">
</script>

<style>
    /* #electron-titlebar {
        background: white;
        margin-top: -0.2cm;
        margin-left: -0.2cm;
        height: 1.8em;
        -webkit-app-region: drag !important;
    }
    #electron-titlebar:hover {
        background: rgb(221, 220, 220);
        transition: background 0.1s;
        cursor: default;
    }
    #electron-titlebar:active {
        background: rgb(202, 200, 200);
        transition: background 0.1s;
        cursor: default;
    }
    .drag {
        color: black !important;
        top: 0.05cm;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        position: absolute;
    }*/
    #button-close {
        margin-left: 98.5%;
        margin-top: -0.1cm;
        height: 2em;
        border: 0 !important;
        background: rgb(200, 0, 0);
        text-align: center;

        -webkit-app-region: no-drag !important;
    }
    #button-close:focus {
        background: red;
        border: 0;
    }
</style>

<!-- 
<div id="electron-titlebar">
    <div class="drag container">{document.title}</div>
    <button
        id="exit"
        on:click={() => {
            window.close();
        }}>x</button>
</div> -->
<!-- svelte-ignore a11y-missing-attribute -->

<div id="electron-titlebar" />
