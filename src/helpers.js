import axios from "axios";
import ENDPOINTS from "./endpoints";

// helper to format data in order to use chatscope's message component
const createMessageObj = (
  message,
  direction,
  isCustom = false,
  Component = null,
  props = null
) => {
  return { message, direction, isCustom, Component, props };
};

const { recommendation, generative } = ENDPOINTS;

// prompt - formatted inputs from user so far
// callback - will create image slider in chat history, given list of image objects
const fetchRecommendations = async (prompt, callback) => {
  const response = await axios(recommendation + prompt);
  console.log(response);
  const data = response.data;
  callback(data);
};

// prompt - string formed from users selected recommended clothes
const fetchGenerative = async (prompt) => {
  const response = await axios(generative + prompt);
  const data = response.data;
  return;
};

export { createMessageObj, fetchRecommendations };
