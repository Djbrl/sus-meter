<template>
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
                <p v-if="item.susMeter >= 14"><span class="font-bold"> Grade <span class="rounded-lg px-2 py-1 bg-black/30 text-base ml-1 mt-1 mb-1">😈</span></span></p>
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
</template>

<script>
const goToTwitter = (screen_name) => {
  window.open(`https://twitter.com/${screen_name}`, '_blank');
}

export default {
  props: {
    gradeClass: Function,
    toggleGradingSystem: Function,
    toggleWhyBlur: Function,
    state: Object,
    item: Object,
  },
  setup() {
    goToTwitter
  }
};
</script>