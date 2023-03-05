<script>
  import { httpsCallable } from "firebase/functions";
  import stc from "string-to-color";
  import { useNavigate } from "svelte-navigator";
  import { functions } from "./firebase";

  let tags = [];

  let message;

  let status;

  let navigate = useNavigate();

  function tagsChange(e) {
    removeTag(e.target.value);
    tags = [ ...tags, e.target.value];
    e.target.value = "";
  }

  function removeTag(tag) {
    tags = tags.filter(t => t !== tag);
  }

  function sendFlame() {
    status = ["info", "sending flame..."];
    const addFlame = httpsCallable(functions, "addFlame");
    addFlame({ message, tags})
      .then((data) => {
        console.log(data);
        status = ["success", "successfully sent!"];

        message = null;
        tags = [];

        navigate("/");
        
      })
      .catch(error => {
        status = ["error", error]
      })
  }
</script>

<div class="paper my-5 mx-10 md:mx-auto md:w-[600px] p-5">
  <textarea placeholder="message" class="textarea textarea-bordered textarea-lg w-full h-[200px] p-3" bind:value={message}></textarea>
  <input type="text" placeholder="type tags and enter" class="input input-bordered w-full my-2" on:change={tagsChange}>
  <div class="my-1 flex flex-wrap gap-2">
    {#each tags as tag (tag)}
      <button class="badge badge-lg" style="background-color: {stc(tag)}; border-color: {stc(tag)};" on:click={() => removeTag(tag)}>
        {tag}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mt-[2px]">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>        
      </button>
    {/each}
  </div>
  {#if status && status[0] == "info"}
    <div class="alert alert-info shadow-lg mb-4">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <span>{status[1]}</span>
      </div>
    </div>
  {/if}
  {#if status && status[0] == "error"}
    <div class="alert alert-error shadow-lg mb-4">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>{status[1]}</span>
      </div>
    </div>
  {/if}
  {#if status && status[0] == "success"}
    <div class="alert alert-success shadow-lg mb-4">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>{status[1]}</span>
      </div>
    </div>
  {/if}
  <button class="ml-auto block my-2 btn btn-primary flex gap-2" on:click={sendFlame}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
    </svg>    
    send
  </button>
</div>