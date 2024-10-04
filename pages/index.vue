<template>
  <div class="w-full">
    <div
      class="bg-[#dde3ea] mx-auto py-[100px] sm:py-[140px] sm:px-0 px-[20px]"
    >
      <div class="container mx-auto">
        <template v-if="searchCompleted">
          <div class="flex justify-between items-center">
            <p class="text-[20px] md:text-[56px] font-medium">
              <span class="text-[#253955]">Search Results for</span>
              <span class="text-[#6f7b93]">"{{ searchTerm }}"</span>
            </p>

            <span
              class="cursor-pointer text-[40px] text-white"
              @click="openSearch"
              >&times;</span
            >
          </div>
        </template>
        <template v-else>
          <div class="w-full">
            <p class="text-[56px] font-medium" v-if="loading">
              <span class="text-[#253955]"
                >Searching <span v-if="searchTerm">for</span></span
              >
              <span class="text-[#6f7b93]" v-if="searchTerm"
                >"{{ searchTerm }}"</span
              >
            </p>
            <div class="relative flex items-center" v-else>
              <span class="absolute z-20 -mt-4 ml-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8 text-[#cfcece]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-4.35-4.35M16.5 10.5A6.5 6.5 0 1110 4a6.5 6.5 0 016.5 6.5z"
                  />
                </svg>
              </span>
              <input
                v-model="searchTerm"
                @input="debouncedFetchImages"
                placeholder="Search for photo"
                class="absolute z-10 text-[20px] sm:text-[30px] w-full p-3 !pl-[100px] sm:p-5 mb-5 border-0 rounded-lg outline-none"
              />
            </div>
          </div>
        </template>
      </div>
    </div>

    <div class="mx-auto py-[30px] container px-[20px] sm:px-[50px] -mt-[100px]">
      <div class="columns-1 lg:columns-2 xl:columns-3 gap-10">
        <ImageCard
          v-for="(image, index) in images"
          :key="index"
          :image="loading ? placeholderImage : image"
          :loading="loading"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "@vue/composition-api";
import { searchImages } from "~/services/apis";

export default defineComponent({
  setup() {
    const placeholderImage = {
      urls: { small: "path/to/placeholder-image.jpg" },
      user: { name: "Loading..." },
    };
    const searchTerm = ref("");
    const images = ref([]);
    const loading = ref(false);
    const searchCompleted = ref(false);
    let timeout = null;

    const fetchImages = async () => {
      images.value = new Array(9).fill(placeholderImage);
      loading.value = true;
      try {
        const response = await searchImages(searchTerm.value || "African");
        const urls = response.data.results.map((image) => ({
          urls: image.urls,
          user: image.user,
        }));
        images.value = urls;
        if (searchTerm.value) {
          searchCompleted.value = true;
        }
      } catch (error) {
        alert("an error occurred");
      } finally {
        loading.value = false;
      }
    };

    const openSearch = () => {
      searchCompleted.value = false;
      searchTerm.value = "";
    };

    const debouncedFetchImages = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        fetchImages();
      }, 500);
    };

    onMounted(() => {
      fetchImages();
    });

    return {
      searchTerm,
      images,
      fetchImages,
      loading,
      debouncedFetchImages,
      placeholderImage,
      searchCompleted,
      openSearch,
    };
  },
});
</script>
