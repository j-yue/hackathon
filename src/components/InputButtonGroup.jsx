import InputButton from "./InputButton";

const InputButtonGroup = ({ options, handleClick, ...props }) => {
  return (
    <div className="inputButtonGroup">
      {options.map((option, index) => (
        <InputButton
          label={option}
          handleClick={handleClick}
          key={index}
          {...props}
        />
      ))}
    </div>
  );
};

export default InputButtonGroup;
