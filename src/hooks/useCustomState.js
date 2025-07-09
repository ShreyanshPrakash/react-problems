const { useReducer } = require("react");

let initialValue;

export const useCustomState = (value) => {
  initialValue = initialValue ?? value;

  const [, reRender] = useReducer(() => ({}));

  const forceUpdate = () => {
    reRender();
  };

  const setValue = (newValue) => {

    if(typeof newValue === "function"){
        newValue = newValue(initialValue);
    }

    const isValueChanged = !Object.is(newValue, initialValue);

    initialValue = newValue;
    isValueChanged && forceUpdate();
  };

  return [initialValue, setValue];
};
