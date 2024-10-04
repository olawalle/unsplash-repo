<template>
  <div class="">
    <div
      class="relative z-10 mb-8 cursor-pointer"
      v-if="!loading"
      @click="openModal"
    >
      <NuxtImg
        :src="image.urls.small"
        :alt="image.user.name"
        class="w-full h-auto object-cover rounded-lg min-h-[100px]"
      />
      <div
        class="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 flex flex-col justify-end p-6 rounded-lg"
      >
        <div class="text-white">
          <div class="text-[20px]">{{ image.user.name }}</div>
          <div class="text-[14px] font-light">
            {{ image.user.location || "Unknown" }}
          </div>
        </div>
      </div>
    </div>

    <div
      v-else
      class="bg-[#f6f6f6] break-inside-avoid p-5 mb-5 rounded-lg relative"
      :style="{ height: randomHeight + 'px' }"
    >
      <div class="absolute bottom-6 left-0 px-4 w-full">
        <div class="h-4 bg-[#e6e7e6] rounded w-7/10"></div>
        <div class="h-4 bg-[#e6e7e6] rounded mt-3 w-1/2"></div>
      </div>
    </div>

    <div
      v-if="isModalOpen"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-20"
      @click="closeModal"
    >
      <span
        class="absolute top-12 right-4 md:right-12 cursor-pointer text-[40px] text-white"
        @click="closeModal"
        >&times;</span
      >
      <div
        class="rounded-[12px] overflow-hidden relative w-[90%] md:w-auto"
        @click.stop
      >
        <div
          class="h-auto lg:h-[600px] w-full overflow-hidden bg-[#000000] flex items-center justify-center"
        >
          <NuxtImg
            :src="image.urls.regular"
            :alt="image.user.name"
            class="w-full md:w-auto h-auto md:h-full mx-auto"
          />
        </div>
        <div class="text-left bg-white p-4 md:p-6">
          <h2 class="text-[24px] md:text-[40px] font-semibold capitalize">
            {{ image.user.name }}
          </h2>
          <p class="text-gray-600 text-[14px] md:text-[20px]">
            {{ image.user.location || "Unknown" }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  props: {
    image: {
      type: Object,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const randomHeight = ref(Math.floor(Math.random() * 300) + 300);
    const isModalOpen = ref(false);

    const openModal = () => {
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
    };

    return {
      randomHeight,
      isModalOpen,
      openModal,
      closeModal,
    };
  },
};
</script>
