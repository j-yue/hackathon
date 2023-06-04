import Image from "./Image";

const ImageSlider = ({ srcList, size = "sm", updateImageList }) => {
  return (
    <div className="imageSlider">
      <div className="imageSlider-scroll">
        {srcList.map((src, index) => (
          <Image
            src={src}
            size={size}
            key={index}
            index={index}
            updateImageList={updateImageList}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
