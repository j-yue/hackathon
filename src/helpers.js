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

export { createMessageObj };
