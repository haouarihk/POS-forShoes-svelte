<script lang="ts">
    import firebase from "firebase";
    import "firebase/firestore";
    import "firebase/auth";
    import "firebase/storage";

    const db = firebase.database();

    interface _User {
        uid: string;
    }

    interface _Auth {
        signOut: Function;
        signInAnonymously: Function;
    }
    export let user: _User;
    export let auth: _Auth;

    export let userData: any = {};

    function syco() {
        return db.ref(`users/${user.uid}`).on("value", (snap) => {
            userData = snap.val() || {};
        });
    }
</script>

<p class="my-auto mx-1">
    {#await syco()}
        awaiting
    {:then _}
        {userData.displayName}
    {:catch}
        you don't have perms
    {/await}

    <button
        class="nav-item mx-1 my-auto my-sm-0 btn"
        on:click={() => auth.signOut()}
        >LogOut
    </button>
</p>

<style>
    .nav-item {
        border: 0;
    }
    .btn:hover {
        color: burlywood !important;
        outline-color: cadetblue;
    }
</style>
