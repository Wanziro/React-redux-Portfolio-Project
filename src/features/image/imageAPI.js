import axios from "axios";

export const fetchImages = async () => {
  const key = process.env.REACT_APP_IMAGE_API_KEY;
  // console.log("Key is " + key);
  const API_URL = `https://api.unsplash.com/photos/random?client_id=${key}&count=5&query=nature`;

  const response = await axios.get(API_URL);
  const result = {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(response.data.map((image) => image.urls.regular)),
  };
  return result.body;
};
