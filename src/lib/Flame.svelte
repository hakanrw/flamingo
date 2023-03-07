<script>
  import { Link } from "svelte-navigator";
  import Avatar from "./Avatar.svelte";
  import stc from "string-to-color";
  import { user } from "./store";
  import { firestore } from "./firebase";
  import { deleteDoc, doc } from "firebase/firestore";

  export let data = null;
  export let forTag = null;

  function deleteFlame() {

    console.log("delete");

    /** @type {any}*/
    const elem = document.activeElement;
    elem?.blur();


    deleteDoc(doc(firestore, "flames", data.id)).then(console.log).catch(console.error);
  }
</script>

<div class={"paper p-4 " + (data ? "min-h-[200px]" : "md:min-h-[200px]")}>
  {#if data}
    <div>
      <div class="flex gap-2 items-center gap-4">
        <Avatar small url={data.authorPicture}/>
        <div class="text-lg flex-1">{data.authorName}</div>
        {#if $user && (JSON.parse($user).uid === data.author)}
          <div class="dropdown dropdown-end">
            <label tabindex="0" class="btn m-1 btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
              </svg>
            </label>
            <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 paper">
              <li>
                <button on:click={deleteFlame} class="flex gap-2 text-error hover:bg-error hover:text-primary-content">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>                  
                  Delete
                </button>
              </li>
            </ul>
          </div>
        {/if}
      </div>
      <div class="flex gap-2 mt-4 mb-1 flex-wrap">
        {#each data.tags || [] as tag (tag)}
          <Link to={`/tag/${encodeURIComponent(tag)}`} class="badge badge-lg" style="background-color: {stc(tag)}; border-color: {stc(tag)}">{tag}</Link>
        {/each}
      </div>
      <div class="break-words">
        {data.message}
      </div>
    </div>
  {:else}
    <Link to={"/write" + (forTag ? "?tag=" + encodeURIComponent(forTag) : "")} class="flex h-full flex-col justify-center items-center text-primary">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-14 h-14 md:w-20 md:h-20">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
      <div class="my-2">
        write flame 
        {#if forTag} 
          for <div class="badge p-3 ml-1 badge-primary" style="background-color: {stc(forTag)}; border-color: {stc(forTag)}">{forTag}</div>
        {/if}
      </div>
    </Link>
  {/if}
</div>

<style>
</style>