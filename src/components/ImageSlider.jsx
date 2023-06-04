import Image from "./Image";

const ImageSlider = ({ srcList, size = "sm" }) => {
  return (
    <div className="imageSlider">
      <div className="imageSlider-scroll">
        {srcList.map((src, index) => (
          <Image src={src} size={size} key={index} />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
