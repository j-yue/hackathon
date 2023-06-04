import { useState } from "react";

// it will have metadata...
// updateImageList will add or delete selection
const Image = ({ src, size = "sm", metadata = "", index, updateImageList }) => {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    updateImageList(!selected, index, metadata);
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
