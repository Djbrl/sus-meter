<template>
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
                    <p v-if="state.sus_meter < 15"><span class="font-bold"> Sus Meter <span class="rounded-lg px-2 py-1 bg-black/30 text-base ml-1 mt-1 mb-1">😌</span></span></p>
                    <p v-if="state.sus_meter >= 15 && state.sus_meter < 30"><span class="font-bold"> Sus Meter <span class="rounded-lg px-2 py-1 bg-black/30 text-base ml-1 mt-1 mb-1">🤨</span></span></p>
                    <p v-if="state.sus_meter >= 30 && state.sus_meter < 100"><span class="font-bold"> Sus Meter <span class="rounded-lg px-2 py-1 bg-black/30 text-base ml-1 mt-1 mb-1">🍑</span></span></p>
                    <p v-if="state.sus_meter >= 100 && state.sus_meter < 500"><span class="font-bold"> Sus Meter <span class="rounded-lg px-2 py-1 bg-black/30 text-base ml-1 mt-1 mb-1">🍑👀</span></span></p>
                    <p v-if="state.sus_meter >= 500 && state.sus_meter < 1000"><span class="font-bold"> Sus Meter <span class="rounded-lg px-2 py-1 bg-black/30 text-base ml-1 mt-1 mb-1">😈</span></span></p>
                    <p v-if="state.sus_meter >= 1000"><span class="font-bold"> Sus Meter <span class="rounded-lg px-2 py-1 bg-black/30 text-base ml-1 mt-1 mb-1">😈👑</span></span></p>
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
</template>

<script>
const goToTwitter = (screen_name) => {
  window.open(`https://twitter.com/${screen_name}`, '_blank');
}

export default {
  props: {
    susMeter: Function,
    toggleGradingSystem: Function,
    state: Object,
  },
  setup() {
    goToTwitter
  }
};
</script>