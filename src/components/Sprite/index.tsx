import React, { FC } from "react";

type SpriteDataTypes = {
  iconClass?: string;
  iconWidth: number;
  iconHeight: number;
  iconId: string;
};

export const SpriteSVG: FC<SpriteDataTypes> = ({
  iconClass,
  iconWidth,
  iconHeight,
  iconId,
}) => {
  return (
    <svg className={iconClass} width={iconWidth} height={iconHeight}>
      <use xlinkHref={`/sprite.svg#${iconId}`} />
    </svg>
  );
};
