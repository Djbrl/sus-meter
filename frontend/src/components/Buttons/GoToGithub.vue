<template>
    <div class="p-2 bg-stone-900 hover:bg-stone-800 hover:cursor-pointer text-xs rounded-lg ml-4 mr-2 mt-2 inline-block" @click="goToGithub">
        <div class="flex">
        <div class="flex-col flex justify-center">
            <p class="text-xs font-bold font-sans text-stone-400 antialiased">Find us on <span class="text-purple-400">GitHub</span></p>
        </div>
        <img src="/github-mark/github-mark.svg" class="bg-stone-200 rounded-full p-1 w-7 h-7 ml-2"/>
        </div>
    </div>
</template>

<script>  
const goToGithub = () => {
  window.open(`https://github.com/Djbrl/sus-meter`, '_blank');
}

export default {
  setup() {
    return {
      goToGithub,
    };
  }
};
</script>
