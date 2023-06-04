const InputButton = ({ label, handleClick, ...props }) => {
  return (
    <button
      className="inputButton"
      {...props}
      onClick={() => handleClick(label)}
    >
      {label}
    </button>
  );
};

export default InputButton;
