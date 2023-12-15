<template>
  <div class="bg-stone-900 min-h-screen">
    <header class="min-w-[700px]">
      <div class="p-2 shadow-md bg-stone-900 hover:bg-stone-800 hover:cursor-pointer text-xs border-4 border-stone-600 rounded-lg m-4 inline-block" @click="goToGithub">
        <div class="flex">
          <div class="flex-col flex justify-center">
            <p class="text-xs font-bold font-sans text-stone-400 antialiased">Find it on <span class="text-purple-400">GitHub</span></p>
          </div>
          <img src="/github-mark/github-mark.svg" class="bg-stone-200 rounded-full p-1 w-7 h-7 ml-2"/>
        </div>
      </div>
      <p class="text-xs text-center hover:text-stone-300 hover:cursor-pointer text-stone-400 bg-stone-700 rounded-lg px-2 py-1 m-1 inline-block">Grading System</p>
    </header>
    <body class="flex">
      <sidebar class="w-1/5">
      </sidebar>

        <div class="rounded-lg p-4 m-4 items-center w-3/5 min-w-[900px]">
          <div class="rounded-lg p-4 m-4 items-center">
            <p class="text-9xl text-center text-purple-400 font-shrimp ">sus-meter</p>
            <p class="text-xs text-center text-stone-400">Find out how nsfw your twitter following is 🫣</p>
            <div class="flex flex-col border-black-3 items-center">
              <div class="m-5 flex text-stone-500">
                <div class="flex-col flex justify-center ">
                  <p class="text-xl m-2">@</p>
                </div>
                <input v-model="state.username" @keyup.enter="fetchData(state.username)" class="p-2 text-sm bg-stone-800 rounded-lg outline-none placeholder-stone-500" placeholder="username" :disabled="state.fetchLoader"/>
              </div>
              <p v-if="state.noUser" class="text-xs text-center text-stone-400">User @{{ state.username }} doesn't exist.</p>
              <div v-if="state.fetchLoader" class="animate-bounce text-3xl text-peach-500">
                🍑
              </div>

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
            
            <div v-if="state.results.length > 0 || state.noResults === true">
              <!-- try again the 400x400 method for avatar -->
              <div class="flex justify-center items-center">
                <div class="bg-stone-800 rounded-lg min-w-[300px] max-w-[500-px] p-4 shadow-md text-xs flex justify-center inline-block max-w-[450px]">
                  <div class="flex m-1">
                    <!-- Left block with rounded profile picture -->
                    <div class="min-w-[100px] max-w-[100px] mr-4">
                      <img :src="state.user.profile_picture" alt="Profile Picture" class="hover:cursor-pointer w-55 h-55 object-cover rounded-full" @click="goToTwitter(state.user.screen_name)">
                    </div>
          
                    <!-- Right block with details -->
                    <div class="flex-grow text-stone-200">
  
                      <!-- username and grade -->
                      <div class="flex mb-4">
                        
                        <div class="hover:bg-stone-700 inline-block rounded-lg px-2 py-1 hover:cursor-pointer hover:bg-stone-600 mr-2 max-w-[200px]" @click="goToTwitter(state.user.screen_name)">
                          <p class="text-xl font-bold whitespace-nowrap overflow-ellipsis overflow-hidden">{{ state.user.screen_name }}</p>
                          <p class="text-stone-400 whitespace-nowrap overflow-ellipsis overflow-hidden">{{ state.user.name }}</p>
                        </div>
                        
                        <!-- Grade -->
                        <div class="flex-grow"></div>
                        <div classs="inline-block">
                          <div class="flex justify-center text-sm">
                            <div :class="susMeter(state.sus_meter)">
                              <p v-if="state.sus_meter < 4"><span class="font-bold"> Sus Meter <span class="rounded-lg px-2 py-1 bg-black/30 text-base ml-1 mt-1 mb-1">😌</span></span></p>
                              <p v-if="state.sus_meter >= 4 && state.sus_meter < 8"><span class="font-bold"> Sus Meter <span class="rounded-lg px-2 py-1 bg-black/30 text-base ml-1 mt-1 mb-1">🤨</span></span></p>
                              <p v-if="state.sus_meter >= 8 && state.sus_meter < 15"><span class="font-bold"> Sus Meter <span class="rounded-lg px-2 py-1 bg-black/30 text-base ml-1 mt-1 mb-1">🍑</span></span></p>
                              <p v-if="state.sus_meter >= 15 && state.sus_meter < 20"><span class="font-bold"> Sus Meter <span class="rounded-lg px-2 py-1 bg-black/30 text-base ml-1 mt-1 mb-1">😈</span></span></p>
                              <p v-if="state.sus_meter > 20"><span class="font-bold"> Sus Meter <span class="rounded-lg px-2 py-1 bg-black/30 text-base ml-1 mt-1 mb-1">🍑👑</span></span></p>
                            </div>
  
                          </div>
                        </div>
  
                      </div>
                  
  
  
                      <p>{{ state.user.description }}</p>
          
                      <!-- Two blocks at the bottom -->
                      <div class="flex mt-2">
                        <div class="mr-4">
                          <p>{{ state.user.friends_count }} <span class="font-bold"> Following</span> </p>
                        </div>
                        <div>
                          <p>{{ state.user.followers_count }} <span class="font-bold"> Followers</span> </p>
                        </div>
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>

              <p class="text-xs text-center text-stone-400 m-4"> {{ state.results.length }} results found for @{{ state.user.screen_name }} </p>
              <div class="max-h-80 overflow-y-auto rounded-lg p-2 bg-stone-900 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
                <div v-for="item in state.results" :key="item.id" class="bg-stone-800 rounded-lg min-w-[350px] max-w-[350-px] p-4 shadow-md text-xs flex flex-col">
                  <div class="flex">
                    <!-- Left block with rounded profile picture -->
                    <div class="max-w-[60px] min-w-[60px]">
                      <img :src="item.profile_picture" alt="Profile Picture" class="hover:cursor-pointer w-15 h-15 rounded-full" @click="goToTwitter(item.screen_name)">
                    </div>
          
                    <!-- Right block with details -->
                    <div class="flex-grow text-stone-200">
  
                      <!-- username and grade -->
                      <div class="flex mb-4">
                        
                        <div class="hover:bg-stone-700 inline-block rounded-lg px-2 py-1 hover:cursor-pointer hover:bg-stone-600 mr-2 max-w-[200px]" @click="goToTwitter(item.screen_name)">
                          <p class="text-xl font-bold whitespace-nowrap overflow-ellipsis overflow-hidden">{{ item.screen_name }}</p>
                          <p class="text-stone-400 whitespace-nowrap overflow-ellipsis overflow-hidden">{{ item.name }}</p>
                        </div>
                        
                        <!-- Grade -->
                        <div class="flex-grow"></div> <!-- This will push the Grade block to the bottom -->
                        <div classs="inline-block">
                          <div class="flex justify-center text-sm">
                            <div :class="gradeClass(item.susMeter)">
                              <p v-if="item.susMeter < 2"><span class="font-bold"> Grade <span class="rounded-lg px-2 py-1 bg-black/30 text-base ml-1 mt-1 mb-1">😌</span></span></p>
                              <p v-if="item.susMeter === 2 || item.susMeter === 3"><span class="font-bold"> Grade <span class="rounded-lg px-2 py-1 bg-black/30 text-base ml-1 mt-1 mb-1">🧐</span></span></p>
                              <p v-if="item.susMeter > 3 && item.susMeter < 8"><span class="font-bold"> Grade <span class="rounded-lg px-2 py-1 bg-black/30 text-base ml-1 mt-1 mb-1">🤨</span></span></p>
                              <p v-if="item.susMeter >= 8 && item.susMeter < 12"><span class="font-bold"> Grade <span class="rounded-lg px-2 py-1 bg-black/30 text-base ml-1 mt-1 mb-1">🍑</span></span></p>
                              <p v-if="item.susMeter >= 12"><span class="font-bold"> Grade <span class="rounded-lg px-2 py-1 bg-black/30 text-base ml-1 mt-1 mb-1">😈</span></span></p>
                              <p v-if="item.susMeter > 14"><span class="font-bold"> Grade <span class="rounded-lg px-2 py-1 bg-black/30 text-base ml-1 mt-1 mb-1">🍑👑</span></span></p>
                            </div>
  
                          </div>
                        </div>
  
                      </div>
  
  
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
import { reactive, onMounted, onUnmounted } from 'vue';

const state = reactive({
  user: {},
  username: '',
  results: [],
  sus_meter: 0,
  fetchLoader: false,
  noResults: false,
  noUser: false,
  resultSummary : false,
  cancelTime: 0,
  abortController: null,
});

const showNoResults = async () => {
  state.noResults = true; 
  state.fetchLoader = false;
  
  await new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });

  state.noResults = false;
}

const showNoUser = async () => {
  state.noUser = true; 
  state.fetchLoader = false;
  
  await new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });

  state.noUser = false;
}

const fetchData = async (input) => {
  let username = input.trim();
  if (username === ''){
    console.log("no input.")
    state.username = '';
    return ;
  }

  state.noResults = false;
  state.noUser = false;
  state.results = []
  state.abortController = new AbortController();
  const signal = state.abortController.signal;
  const intervalId = setInterval(() => {
    state.cancelTime += 1;
  }, 1000);

  try {
    state.fetchLoader = true;
    const response = await fetch(`http://localhost:3001/getSusFollowingForUser/${username}`, { signal });
    const data = await response.json();
    console.log(data)

    console.log(data)
    clearInterval(intervalId);
    state.cancelTime = 0;
    if (data.listOwner === null){
      await showNoUser();
      return ;
    }

    if (data.list.length === 0){
      state.noResults = true;
    }

    state.username = ''
    state.fetchLoader = false
    state.user = data.listOwner;
    state.results = data.list
    state.sus_meter = (state.results.length / state.user.friends_count) * 100
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('Fetch operation aborted:', error.message);
    } 
    else if (error.name === 'TypeError') {
      await showNoUser()
    } else {
      console.error('Error fetching data:', error);
    }
    clearInterval(intervalId);
    state.cancelTime = 0;
    state.fetchLoader = false
    state.username = ''
    // console.error('Error fetching data:', error);
  }
};

const gradeClass = (susMeter) => {
      if (susMeter < 2) {
        return 'text-sm inline-block text-center hover:cursor-pointer hover:bg-emerald-600/90 bg-emerald-500/90 rounded-lg text-stone-100 px-2 py-1'; // Change this to the desired color class for susMeter < 2
      } else if (susMeter === 2 || susMeter === 3) {
        return 'text-sm inline-block text-center hover:cursor-pointer hover:bg-amber-600/90 bg-amber-500/90 rounded-lg text-stone-100 px-2 py-1'; // Change this to the desired color class for susMeter between 2 and 3
      } else if (susMeter > 3 && susMeter < 8) {
        return 'text-sm inline-block text-center hover:cursor-pointer hover:bg-orange-600/90 bg-orange-500/90 rounded-lg text-stone-100 px-2 py-1'; // Change this to the desired color class for susMeter between 3 and 8
      } else if (susMeter >= 8 && susMeter < 12) {
        return 'text-sm inline-block text-center hover:cursor-pointer hover:bg-violet-700/90 bg-violet-600/90 rounded-lg text-stone-100 px-2 py-1'; // Change this to the desired color class for susMeter between 8 and 12
      } else if (susMeter >= 12) {
        return 'text-sm inline-block text-center hover:cursor-pointer hover:bg-pink-700/90 bg-pink-600/90 rounded-lg text-stone-100 px-2 py-1'; // Change this to the desired color class for susMeter > 12
      }
    }
  
const susMeter = (susMeter) => {
      if (susMeter < 4) {
        return 'text-sm inline-block text-center hover:cursor-pointer hover:bg-emerald-600/90 bg-emerald-500/90 rounded-lg text-stone-100 px-2 py-1'; // Change this to the desired color class for susMeter < 2
      } else if (susMeter >= 4 && susMeter < 8) {
        return 'text-sm inline-block text-center hover:cursor-pointer hover:bg-orange-600/90 bg-orange-500/90 rounded-lg text-stone-100 px-2 py-1'; // Change this to the desired color class for susMeter between 3 and 8
      } else if (susMeter >= 8 && susMeter < 15) {
        return 'text-sm inline-block text-center hover:cursor-pointer hover:bg-violet-700/90 bg-violet-600/90 rounded-lg text-stone-100 px-2 py-1'; // Change this to the desired color class for susMeter between 8 and 12
      } else if (susMeter >= 15) {
        return 'text-sm inline-block text-center hover:cursor-pointer hover:bg-pink-700/90 bg-pink-600/90 rounded-lg text-stone-100 px-2 py-1'; // Change this to the desired color class for susMeter > 12
      }
    }
  
const goToTwitter = (screen_name) => {
  window.open(`https://twitter.com/${screen_name}`, '_blank');
}

const goToGithub = () => {
  window.open('https://github.com/Djbrl/sus-meter', '_blank');
}

const cancelFetch = () => {
  if (state.abortController) {
    state.abortController.abort();
  }
};

onMounted(() => {
  // fetchData();
});

onUnmounted(() => {
  if (state.abortController) {
    state.abortController.abort();
  }
});

export default {
  setup() {
    return {
      state,
      fetchData,
      gradeClass,
      showNoResults,
      susMeter,
      cancelFetch,
      goToTwitter,
      goToGithub,
    };
  },
};
</script>
