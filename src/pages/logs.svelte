<script lang="ts">
    import firebase from "firebase";
    let db = firebase.database();
    let fStorage = firebase.storage();

    import LogItem from "../components/logs/logItem.svelte";
    import { toArray } from "../components/utils/utils";

    let logs: any = [];

    async function deleteAll() {
        await db.ref("logs").set({});
    }

    async function getLogs() {
        await db.ref("logs").on("value", (snap) => {
            logs = toArray(snap.val() || {}) || [];
        });
    }

    getLogs();
</script>

<div class="console">
    <div class="logs">
        {#if logs[0]}
            {#each logs as log}
                <LogItem {log} />
            {/each}
        {/if}
    </div>
    <div class="control">
        <button color="red" on:click={deleteAll}>delete all logs</button>
    </div>
</div>

<style>
    .console {
        display: flex;
    }
    .control {
        position: relative;
    }
    .logs {
        position: absolute;
        height: 80% !important;
        width: 68%;
        border: black solid 0.3em;
        overflow-y: scroll;
        overflow-x: hidden;
    }
</style>
