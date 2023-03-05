<script>
  import { Link } from "svelte-navigator";
  import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
  import { auth } from "./firebase"; 

  let logged = false;

  const provider = new GoogleAuthProvider();

  auth.onAuthStateChanged(user => {
    console.log(user);
    if (user) logged = true;
    else logged = false;
  })

  function logIn() {
    signInWithPopup(auth, provider).then(console.log);

  }
</script>

<div class="navbar bg-primary text-primary-content">
  <div class="flex-1">
    <Link to="/" class="btn btn-ghost normal-case text-xl">flamingo</Link>
  </div>
  <div class="flex-none">
    {#if logged}
      <Link class="btn btn-ghost mr-2" to="/account">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>            
      </Link>
    {:else}
      <button class="btn btn-ghost mr-2" on:click={logIn}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
        </svg>
      </button>
    {/if}
  </div>
</div>
