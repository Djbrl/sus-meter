<template>
    <div v-if="showWhyBlur" class="fixed inset-0 flex items-center justify-center backdrop-filter backdrop-blur-[4px]">

        <div  class="bg-stone-800 text-stone-300 p-4 text-left text-sm rounded-lg max-w-[550px]">
            <!-- Your modal content goes here -->
            <p class="font-semi-bold text-center text-purple-200 text-2xl mb-4"><span class="font-shrimp font-bold">sus-meter</span> Privacy and Protection Policy</p>
            
            <div class="m-1 rounded-lg bg-stone-900 px-5 py-4">
                <!-- Explaination of Sus Meter -->
                <div class="mb-4">
                <p class="text-center"><span class="font-shrimp font-semi-bold">sus-meter</span> takes a playful approach to self-moderation and assists its users in building a safer environment for themselves online. However, to make sure that our application is used for its intended purpose and to protect underage users from exposure to NSFW content, search results are intentionally blurred. <br><br>By concealing specific details, such as profile pictures, screen names and potentially sensitive information, <span class="font-bold font-shrimp">sus-meter</span> aims to minimize ways to reach listed accounts. <br><br>This strategy isn't infallible and ultimately blurring serves as a road-blocking measure, so we call every user of our application to act responsibly and in accordance with our vision.<br><br>🌡️</p>
                </div>
                <div @click.self="toggleWhyBlur" class="fixed inset-0"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    showWhyBlur: Boolean,
    toggleWhyBlur: Function,
  },
};
</script>