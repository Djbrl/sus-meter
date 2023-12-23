<template>
  <GradingSystem :parentState="state" :showGradingSystem="state.showGradingSystem" :toggleGradingSystem="toggleGradingSystem" :gradeClass="gradeClass"/>
  <WhyBlur :showWhyBlur="state.showWhyBlur" :toggleWhyBlur="toggleWhyBlur"/>

  <div class="min-h-[110vh] bg-stone-900 flex-col flex">
    <header class="min-w-[700px] mb-auto">
      <GoToGithub/>
      <p @click="toggleGradingSystem" class="text-xs text-center hover:text-stone-300 hover:cursor-pointer text-stone-400 rounded-lg px-2 py-1 m-1 inline-block">Grading System</p>
      <p @click="toggleWhyBlur" class="text-xs text-center hover:text-stone-300 hover:cursor-pointer text-stone-400 rounded-lg px-2 py-1 m-1 inline-block">Why are results blurred ?</p>
    </header>

    <body class="flex min-h-screen">
      <sidebar class="w-1/5"></sidebar>
      <!-- Main Body -->
      <div class="rounded-lg p-4 m-4 h-[80vh] items-center w-3/5 min-w-[900px] flex flex-col">
        <div class="min-h-[10vh]"></div>
          
          <!-- Title box -->
          <TitleBox/>
          
          <!-- Search Box -->
          <SearchBox :state="state" :cancelFetch="cancelFetch" :fetchData="fetchData"/>
          
          <!-- Results Box -->
          <div v-if="state.results.length > 0 || state.noResults === true" class="">
            <div class="flex justify-center items-center">
              <UserCard :state="state" :toggleGradingSystem="toggleGradingSystem" :susMeter="susMeter"/>
            </div>
            <p v-if="state.displayResults.length > 1" class="text-xs text-center text-stone-400 m-4"> <span class="font-bold">{{ state.displayResults.length }}</span> out of <span class="font-bold">{{ state.user.friends_count }}</span> results found for @{{ state.user.screen_name }} </p>
            <p v-if="state.displayResults.length == 1" class="text-xs text-center text-stone-400 m-4"> {{ state.displayResults.length }} out of <span class="font-bold">{{ state.user.friends_count }}</span> results found for @{{ state.user.screen_name }} </p>
            <p v-if="state.displayResults.length == 0" class="text-xs text-center text-stone-400 m-4"> {{ state.displayResults.length }} results found for @{{ state.user.screen_name }} </p>
            <div class="max-h-80 overflow-y-auto rounded-lg p-2 bg-stone-900 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 max-w-[800px]">
              <div v-for="item in state.displayResults" :key="item.id" class="bg-stone-800 hover:cursor-pointer rounded-lg p-4 shadow-md text-xs flex flex-col">
                <ResultCard :state="state" :item="item" :toggleWhyBlur="toggleWhyBlur" :toggleGradingSystem="toggleGradingSystem" :gradeClass="gradeClass"/>
              </div>
            </div>
          </div>
      </div>
      <sidebar class="w-1/5"></sidebar>
    </body>

    <footer class="mt-auto bg-stone-900 flex justify-center text-stone-400 text-xs p-4 text-center w-full">
      <p class=""><a href="https://ko-fi.com/susmeter" target="_blank" class="underline">Ko-Fi</a></p>
      <p class="ml-3"><a href="https://github.com/Djbrl/sus-meter" target="_blank" class="underline">GitHub</a></p>
    </footer>
  </div>
</template>

<script>
import { reactive, onUnmounted } from 'vue';
import GradingSystem from './components/Buttons/GradingSystem.vue'
import WhyBlur from './components/Buttons/WhyBlur.vue'
import GoToGithub from './components/Buttons/GoToGithub.vue'
import SearchBox from './components/SusMeter/SearchBox.vue'
import UserCard from './components/SusMeter/UserCard.vue'
import ResultCard from './components/SusMeter/ResultCard.vue'
import TitleBox from './components/SusMeter/TitleBox.vue'


const state = reactive({
  cachedResults: [],
  displayResults: [],
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
  showGradingSystem: false,
  showWhyBlur: false,
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

const resetDataState = () => {
  state.results = []
  state.username = ''
  state.noUser = false
  state.noResults = false
  state.fetchLoader = false
  state.cancelTime = 0
  state.sus_meter = 0
}

//TODO : Improve this with caching
const fetchData = async (input) => {
  resetDataState()
  let username = input.trim();
  if (username === '') {
    return ;
  }

  state.abortController = new AbortController();
  const signal = state.abortController.signal;
  const intervalId = setInterval(() => {
    state.cancelTime += 1;
  }, 1000);

  try {
    state.fetchLoader = true;
    const apiResponse = await fetch(`${process.env.VUE_APP_BACKEND_IP}/getSusFollowingForUser/${username}`, { signal });
    const data = await apiResponse.json();
    clearInterval(intervalId);
    state.cancelTime = 0;
    if (data.listOwner === null) {
      await showNoUser();
      resetDataState()
      return ;
    }

    if (data.list.length === 0) {
      state.noResults = true;
    }

    state.fetchLoader = false
    state.user = data.listOwner;
    state.results = data.list
    state.displayResults = data.list.filter( user => user.susMeter > 3)
    calculateUserSusMeter()
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
    resetDataState()
  }
};

const calculateUserSusMeter = () => {
  if (state.displayResults.length === 0){
    state.sus_meter = 0;
    return 
  }
  state.displayResults.forEach(user => {
    state.sus_meter += user.susMeter
  });
}

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
  if (susMeter < 15) {
    return 'text-sm inline-block text-center hover:cursor-pointer hover:bg-emerald-600/90 bg-emerald-500/90 rounded-lg text-stone-100 px-2 py-1'; // Change this to the desired color class for susMeter < 2
  } else if (susMeter >= 15 && susMeter < 100) {
    return 'text-sm inline-block text-center hover:cursor-pointer hover:bg-orange-600/90 bg-orange-500/90 rounded-lg text-stone-100 px-2 py-1'; // Change this to the desired color class for susMeter between 3 and 8
  } else if (susMeter >= 100 && susMeter <500) {
    return 'text-sm inline-block text-center hover:cursor-pointer hover:bg-violet-700/90 bg-violet-600/90 rounded-lg text-stone-100 px-2 py-1'; // Change this to the desired color class for susMeter between 8 and 12
  } else if (susMeter >= 500 && susMeter < 1000) {
    return 'text-sm inline-block text-center hover:cursor-pointer hover:bg-pink-700/90 bg-pink-600/90 rounded-lg text-stone-100 px-2 py-1'; // Change this to the desired color class for susMeter > 12
  } else if (susMeter >= 1000) {
    return 'text-sm inline-block text-center hover:cursor-pointer bg-gradient-to-r from-pink-600/90 to-blue-500/90 rounded-lg text-stone-100 px-2 py-1'; // Change this to the desired color class for susMeter > 12
  }
}
  
const goToTwitter = (screen_name) => {
  window.open(`https://twitter.com/${screen_name}`, '_blank');
}

const cancelFetch = () => {
  if (state.abortController) {
    state.abortController.abort();
  }
};

const toggleGradingSystem = () => {
  state.showGradingSystem = !state.showGradingSystem;
}

const toggleWhyBlur = () => {
  state.showWhyBlur = !state.showWhyBlur;
}

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
      toggleGradingSystem,
      toggleWhyBlur,
      resetDataState,
      calculateUserSusMeter,
    };
  },
  components: {
    GradingSystem,
    WhyBlur,
    GoToGithub,
    SearchBox,
    UserCard,
    ResultCard,
    TitleBox,
  }
};
</script>
