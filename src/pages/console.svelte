<script lang="ts">
    import firebase from "firebase";
    let db = firebase.database();
    let fStorage = firebase.storage();

    import LogItem from "../components/logs/logItem.svelte";
    import { toArray } from "../components/utils/utils";

    let logs: any = [];

    async function getLogs() {
        await db.ref("logs").on("value", (snap) => {
            logs = toArray(snap.val() || {}) || [];
        });
    }
    getLogs();
</script>

<style>
    .console {
        position: absolute;
        height: 80% !important;
        width: 68%;
        border: black solid 0.3em;
        overflow-y: scroll;
        overflow-x: hidden;
    }
</style>

<div class="console">
    {#if logs[0]}
        {#each logs as log}
            <LogItem {log} />
        {/each}
    {/if}
</div>
