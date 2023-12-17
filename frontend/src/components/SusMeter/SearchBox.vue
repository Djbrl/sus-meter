<template>
    <div class="flex flex-col border-black-3 items-center">
        
        <!-- Input Box -->
        <div class="m-5 flex text-stone-500">
        <div class="flex-col flex justify-center ">
        </div>
        <input v-model="state.username" @keyup.enter="fetchData(state.username)" class="px-4 py-2 text-sm bg-stone-800 rounded-full outline-none placeholder-stone-500" :disabled="state.fetchLoader" placeholder="username"/>
        </div>

        <!-- Loader -->
        <p v-if="state.noUser" class="text-xs text-center text-stone-400">User @{{ state.username }} doesn't exist.</p>
        <div v-if="state.fetchLoader" class="animate-bounce text-3xl text-peach-500">
        🤔
        </div>

        <!-- Cancel block -->
        <div v-if="state.cancelTime > 2">
        <div class="flex justify-center">
            <div
            @click="cancelFetch"
            class="rounded-lg px-3 py-1 bg-stone-700 text-stone-400 m-2 flex justify-center inline-block hover:cursor-pointer hover:bg-stone-600"
            >
            Cancel
            </div>
        </div>
        <div>
            <p class="text-xs text-center text-stone-400">
            Elon jacked up the price of the API so we made our own. You can help make it faster.
            <br />
            <a href="https://ko-fi.com/susmeter" target="_blank" class="text-xs text-center underline text-stone-400"
                >Support us on Ko-Fi</a
            >
            </p>
        </div>
        </div>

    </div>
</template>

<script>

export default {
  props: {
    fetchData: Function,
    cancelFetch: Function,
    state: Object,
  },
  setup() {
    
  }
};
</script>