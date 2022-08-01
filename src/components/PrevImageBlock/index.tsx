import React, { FC, useState } from "react";

interface IProps {
  file?: File | null;
}

const PrevImageBlock: FC<IProps> = ({ file }) => {
  const [prevImg, setPrevImg] = useState<any>(null);
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPrevImg(reader.result);
    };
  }

  return (
    <div className="sidebar__photo-prev prev-photo">
      <div className="prev-photo__full">
        <img src={prevImg} alt="" />
      </div>
      <div className="prev-photo__circle">
        <img src={prevImg} alt="" />
      </div>
    </div>
  );
};

export default PrevImageBlock;
