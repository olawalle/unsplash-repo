import axios from "axios";

const searchImages = (searchTerm) => {
  return axios.get(`https://api.unsplash.com/search/photos`, {
    params: {
      query: searchTerm,
      client_id:
        "38ea2fdc9b05d669f05e17fe07697f876853a32dbd6f00d51e7d28a6091afb3b",
    },
  });
};

export { searchImages };
