import InputButton from "./InputButton";

const InputButtonGroup = ({ options, handleClick, className, ...props }) => {
  return (
    <div className={`inputButtonGroup ${className}`}>
      <div className="inputButtonGroup-scroll">
        {options.map((option, index) => (
          <InputButton
            label={option}
            handleClick={handleClick}
            key={index}
            {...props}
          />
        ))}
      </div>
    </div>
  );
};

export default InputButtonGroup;
