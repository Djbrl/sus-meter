<template>
  <div class="bg-stone-900 min-h-screen">
    <header class="">
      <div class="p-2 shadow-md bg-stone-900 hover:bg-stone-800 hover:cursor-pointer text-xs border-4 border-stone-400 rounded-lg m-4 inline-block">
        <div class="flex">
          <div class="flex-col flex justify-center">
            <a href="https://github.com/Djbrl" target="_blank" class="text-xs font-bold font-sans text-stone-200 antialiased">Find it on <span class="text-purple-400">GitHub</span></a>
          </div>
          <img src="/github-mark/github-mark.svg" class="bg-stone-200 rounded-full p-1 w-7 h-7 ml-2"/>
        </div>
      </div>
      <p class="text-xs text-center hover:text-stone-300 hover:cursor-pointer text-stone-400 bg-stone-700 rounded-lg px-2 py-1 m-1 inline-block">Grading System</p>
    </header>
    <body class="flex">
      <sidebar class="w-1/5">
      </sidebar>

        <div class="rounded-lg p-4 m-4 items-center w-3/5">
          <div class="rounded-lg p-4 m-4 min-w-700 items-center">
            <!-- <p class=" text-center text-stone-200 font-bigger ">sus-meter</p> -->
            <!-- <p class="text-9xl text-center text-stone-200 font-martianmono ">sus-meter</p> -->
            <p class="text-9xl text-center text-purple-400 font-shrimp ">sus-meter</p>
            <p class="text-xs text-center text-stone-400">Find out how nsfw your twitter following is 🫣</p>
            <div class="flex flex-col border-black-3 items-center">
              <div class="m-5 flex">
                <div class="flex-col flex justify-center ">
                  <p class="text-xl m-2 text-zinc-400">@</p>
                </div>
                <input v-model="state.username" @keyup.enter="fetchData(state.username)" class="p-2 text-sm text-stone-500 bg-stone-800 rounded-lg outline-none" placeholder="username"/>
              </div>
              <div v-if="state.fetchLoader" class="animate-bounce text-3xl text-peach-500">
                🍑
              </div>
            </div>
      
            <div v-if="state.apiData.length > 0" class="max-h-80 overflow-y-auto rounded-lg p-2 bg-stone-900 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              <div v-for="item in state.apiData" :key="item.id" class="bg-stone-800 rounded-lg p-4 shadow-md text-xs flex">
                <!-- Left block with rounded profile picture -->
                <div class="flex-shrink-0  mr-4">
                  <img :src="item.profile_picture" alt="Profile Picture" class="rounded-full">
                </div>
      
                <!-- Right block with details -->
                <div class="flex-grow text-stone-200">
                  <p class="text-xl font-bold">{{ item.screen_name }}</p>
                  <p class="mb-4">{{ item.name }}</p>
                  <p>{{ item.description }}</p>
      
                  <!-- Two blocks at the bottom -->
                  <div class="flex mt-2">
                    <div class="mr-4">
                      <p>{{ item.friends_count }} <span class="font-bold"> Following</span> </p>
                    </div>
                    <div>
                      <p>{{ item.followers_count }} <span class="font-bold"> Followers</span> </p>
                    </div>
                  </div>
                  
                  <div class="">
                    <div class="">
                      <div class="rounded-lg items-center inline-block">
                        <div class="flex-col justify-center items-center">
                          <p v-if="item.susMeter < 2"><span class="font-bold text-3xl text-center"> 😌 </span></p>
                          <p v-if="item.susMeter === 2 || item.susMeter === 3"><span class="font-bold text-3xl text-center"> 🧐 </span></p>
                          <p v-if="item.susMeter > 3 && item.susMeter < 8"><span class="font-bold text-3xl text-center"> 🤨 </span></p>
                          <p v-if="item.susMeter > 8 && item.susMeter < 12"><span class="font-bold text-3xl text-center"> 🍑 </span></p>
                          <p v-if="item.susMeter > 12"><span class="font-bold text-3xl text-center"> 😈 </span></p>
                          <p v-if="item.susMeter > 14"><span class="font-bold text-3xl text-center"> 🍑🍑🍑 </span></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
      
              </div>
            </div>
          </div>
        </div>  
      
      <sidebar class="w-1/5">
      </sidebar>
      </body>
  </div>
</template>

<script>
import { reactive, onMounted } from 'vue';

const state = reactive({
  apiData: [],
  username: '',
  fetchLoader: false,
});


const fetchData = async (username) => {
  state.apiData = []
  if (username === ''){
    console.log("no input.")
    state.username = '';
    return ;
  }
  try {
    state.fetchLoader = true;
    const response = await fetch(`http://localhost:3001/getSusFollowingForUser/${username}`);
    const data = await response.json();
    if (data.length === 0){
      console.log("no results.");
      state.username = '';
      state.fetchLoader = false;
      return ;
    }
    state.username = ''
    state.fetchLoader = false
    state.apiData = data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const openUrlInNewTab = () => {
      const url = 'https://github.com/Djbrl'; // Replace with your desired URL
      window.open(url, '_blank');
    }

onMounted(() => {
  fetchData();
});

export default {
  setup() {
    return {
      state,
      fetchData,
      openUrlInNewTab,
    };
  },
};
</script>
