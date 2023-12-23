<template>
  <!-- Results Box -->
  <div v-if="state.results.length > 0 || state.noResults === true" class="">
    <!-- Centering -->
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
              <div class="inline-block" @click="toggleGradingSystem">
                <div class="flex justify-center text-sm">
                  <div :class="susMeter(state.sus_meter)">
                    <p v-if="state.sus_meter < 4"><span class="font-bold"> Sus Meter <span class="rounded-lg px-2 py-1 bg-black/30 text-base ml-1 mt-1 mb-1">😌</span></span></p>
                    <p v-if="state.sus_meter >= 4 && state.sus_meter < 8"><span class="font-bold"> Sus Meter <span class="rounded-lg px-2 py-1 bg-black/30 text-base ml-1 mt-1 mb-1">🤨</span></span></p>
                    <p v-if="state.sus_meter >= 8 && state.sus_meter < 15"><span class="font-bold"> Sus Meter <span class="rounded-lg px-2 py-1 bg-black/30 text-base ml-1 mt-1 mb-1">🍑</span></span></p>
                    <p v-if="state.sus_meter >= 15 && state.sus_meter < 20"><span class="font-bold"> Sus Meter <span class="rounded-lg px-2 py-1 bg-black/30 text-base ml-1 mt-1 mb-1">🍑👀</span></span></p>
                    <p v-if="state.sus_meter > 20"><span class="font-bold"> Sus Meter <span class="rounded-lg px-2 py-1 bg-black/30 text-base ml-1 mt-1 mb-1">😈👑</span></span></p>
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

    <p v-if="state.displayResults.length > 1" class="text-xs text-center text-stone-400 m-4"> {{ state.displayResults.length }} results out of <span class="font-bold">{{ state.user.friends_count }}</span> found for @{{ state.user.screen_name }} </p>
    <p v-if="state.displayResults.length == 1" class="text-xs text-center text-stone-400 m-4"> {{ state.displayResults.length }} result out of <span class="font-bold">{{ state.user.friends_count }}</span> found for @{{ state.user.screen_name }} </p>
    <p v-if="state.displayResults.length == 0" class="text-xs text-center text-stone-400 m-4"> {{ state.displayResults.length }} results found for @{{ state.user.screen_name }} </p>
    <div class="max-h-80 overflow-y-auto rounded-lg p-2 bg-stone-900 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 max-w-[800px]">
      <div v-for="item in state.displayResults" :key="item.id" class="bg-stone-800 hover:cursor-pointer rounded-lg p-4 shadow-md text-xs flex flex-col">

        <div v-if="item.susMeter > 3" class="flex">
          <!-- Left block with rounded profile picture -->
          <div class="max-w-[60px] min-w-[60px]" @click="toggleWhyBlur">
            <img :src="item.profile_picture" alt="Profile Picture" class="w-15 h-15 rounded-full blur-[6px]">
          </div>

          <!-- Right block with details -->
          <div class="flex-grow text-stone-200">

            <!-- username and grade -->
            <div class="flex mb-4">
              
              <div class="inline-block rounded-lg px-2 py-1 mr-2 max-w-[150px] blur-[6px]" @click="toggleWhyBlur">
                <p class="text-xl font-bold whitespace-nowrap overflow-ellipsis overflow-hidden">{{ item.screen_name }}</p>
                <p class="text-stone-400 whitespace-nowrap overflow-ellipsis overflow-hidden">{{ item.name }}</p>
              </div>
              
              <!-- Grade -->
              <div class="flex-grow"></div> <!-- This will push the Grade block to the bottom -->
              <div classs="inline-block" @click="toggleGradingSystem">
                <div class="flex justify-center text-sm">
                  <div :class="gradeClass(item.susMeter)">
                    <p v-if="item.susMeter < 2"><span class="font-bold"> Grade <span class="rounded-lg px-2 py-1 bg-black/30 text-base ml-1 mt-1 mb-1">😌</span></span></p>
                    <p v-if="item.susMeter === 2 || item.susMeter === 3"><span class="font-bold"> Grade <span class="rounded-lg px-2 py-1 bg-black/30 text-base ml-1 mt-1 mb-1">🧐</span></span></p>
                    <p v-if="item.susMeter > 3 && item.susMeter < 8"><span class="font-bold"> Grade <span class="rounded-lg px-2 py-1 bg-black/30 text-base ml-1 mt-1 mb-1">🤨</span></span></p>
                    <p v-if="item.susMeter >= 8 && item.susMeter < 12"><span class="font-bold"> Grade <span class="rounded-lg px-2 py-1 bg-black/30 text-base ml-1 mt-1 mb-1">🍑</span></span></p>
                    <p v-if="item.susMeter >= 12 && item.susMeter < 14"><span class="font-bold"> Grade <span class="rounded-lg px-2 py-1 bg-black/30 text-base ml-1 mt-1 mb-1">🍑🧲</span></span></p>
                    <p v-if="item.susMeter > 14"><span class="font-bold"> Grade <span class="rounded-lg px-2 py-1 bg-black/30 text-base ml-1 mt-1 mb-1">😈</span></span></p>
                  </div>

                </div>
              </div>

            </div>


            <p class="blur-[5px]" @click="toggleWhyBlur">{{ item.description }}</p>

            <!-- Two blocks at the bottom -->
            <div class="flex mt-2 blur-[5px]" @click="toggleWhyBlur">
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
</template>

<script>

const goToTwitter = (screen_name) => {
  window.open(`https://twitter.com/${screen_name}`, '_blank');
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

export default {
  props: {
    gradeClass: Function,
    toggleGradingSystem: Function,
    toggleWhyBlur: Function,
    state: Object,
  },
  setup() {
    goToTwitter,
    susMeter
  }
};
</script>