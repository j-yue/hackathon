import { useState } from "react";

// it will have metadata...
const Image = ({ src, size = "sm", metadata = "" }) => {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(() => !selected);
  };
  return (
    <img
      src={src}
      className={`image image--${size} ${selected && `image--selected`}`}
      onClick={handleClick}
      metadata={metadata}
    />
  );
};

export default Image;
