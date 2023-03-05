<script>
  import { auth, firestore } from "../lib/firebase";
  import { useNavigate } from "svelte-navigator";
  import { onMount } from "svelte";
  import { collection, getDocs, query, where } from "firebase/firestore";
  import Avatar from "../lib/Avatar.svelte";

  const navigate = useNavigate();

  let profile;

  function logOut() {
    auth.signOut();
    navigate("/")
  }

  async function getData() {
    const users = collection(firestore, "users");
    console.log(auth.currentUser)
    const pData = (await getDocs(query(users, where("email", "==", auth.currentUser.email)))).docs[0].data();
    
    profile = { ...pData, ...auth.currentUser};
    console.log(profile)
  }

  auth.onAuthStateChanged(getData);
</script>

<div class="paper my-5 mx-10 md:mx-auto md:w-[500px] p-5 text-center">
  <Avatar url={profile && profile.photoURL} />
  <h4 class="text-4xl bold my-3 text-primary">
    {#if profile}
      {profile.displayName}
    {:else}
      user
    {/if}
  </h4>
  <div class="text-primary text-xl">
    {#if profile}
      {profile.bio}
    {:else}
      placeholder
    {/if}
  </div>
  <button class="btn btn-primary my-5 mx-auto block flex gap-2" on:click={logOut}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
    </svg>    
    Log Out
  </button>
</div>

