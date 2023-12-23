<template>
  <div v-if="parentState.showGradingSystem" class="fixed inset-0 flex items-center justify-center backdrop-filter backdrop-blur-[4px]">
    
    <div  class="bg-stone-800 text-stone-300 p-4 text-left text-sm rounded-lg max-w-[550px]">  
      <p class="font-semi-bold text-center text-purple-200 text-2xl mb-4"><span class="font-shrimp font-bold">sus-meter</span> Grading System</p>
      <div class="m-1 rounded-lg bg-stone-900 px-5 py-4">
        
        <div class="mb-4">
          <p><span class="font-shrimp font-semi-bold">sus-meter</span> is a <span class="underline">TwitterScraper</span> application that provides an overall NSFW rating for a Twitter account based on the percentage of accounts in their following list that are match suspicious keywords and links.</p>
        </div>
        
        <div  class="flex flex-col items-center">
          <div :class="gradeClass(0)">
            <p><span class="font-bold">Grade <span class="rounded-lg px-2 py-1 bg-black/30 text-base">😌</span></span></p>
          </div>
          <p class="m-2 text-xs font-bold">SFW (@username only)</p>
          <div :class="gradeClass(3)">
            <p><span class="font-bold">Grade <span class="rounded-lg px-2 py-1 bg-black/30 text-base">🧐</span></span></p>
          </div>
          <p class="m-2 text-xs font-bold">Mmmmh...</p>
          <div :class="gradeClass(6)">
            <p><span class="font-bold">Grade <span class="rounded-lg px-2 py-1 bg-black/30 text-base">🤨</span></span></p>
          </div>
          <p class="m-2 text-xs font-bold">Suspicious</p>
          <div :class="gradeClass(9)">
            <p><span class="font-bold">Grade <span class="rounded-lg px-2 py-1 bg-black/30 text-base">🍑</span></span></p>
          </div>
          <p class="m-2 text-xs font-bold">NSFW</p>
          <div :class="gradeClass(12)">
            <p><span class="font-bold">Grade <span class="rounded-lg px-2 py-1 bg-black/30 text-base">🍑🧲</span></span></p>
          </div>
          <p class="m-2 text-xs font-bold">Super NSFW</p>
          <div :class="gradeClass(15)">
            <p><span class="font-bold">Grade <span class="rounded-lg px-2 py-1 bg-black/30 text-base">😈</span></span></p>
          </div>
          <p class="m-2 text-xs font-bold">NSFW Magnet</p>
        </div>
        
        <p>The <span class="mt-1 font-shrimp font-semi-bold">sus-meter</span> of a @username is the <span class="font-bold">percentage</span> of <span class="font-bold text-orange-500">Suspicious</span> or above accounts they follow.</p>
        <div @click.self="toggleGradingSystem" class="fixed inset-0"></div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    gradeClass: Function,
    toggleGradingSystem: Function,
    parentState: Object,
  },
};
</script>