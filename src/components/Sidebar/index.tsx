import React from "react";
import { SpriteSVG } from "../Sprite";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar__photo">
        <img src="img/avatar.png" alt="" />
      </div>
      <div className="sidebar-wrapper">
        <ul className="sidebar__about">
          <div className="sidebar__info">
            <span>
              <SpriteSVG iconWidth={18} iconHeight={18} iconId="age" />
            </span>
            <p>20 лет</p>
          </div>
          <div className="sidebar__info">
            <span>
              <SpriteSVG iconHeight={18} iconWidth={20} iconId="location" />
            </span>
            <p>Россия, Уссурийск</p>
          </div>
          <div className="sidebar__info">
            <span>
              <SpriteSVG iconHeight={18} iconWidth={20} iconId="phone" />
            </span>
            <p>8 999 040 51 97</p>
          </div>
        </ul>
        <section className="sidebar__skills">
          <h2 className="title">Hard Skills</h2>
          <ul className="sidebar__list">
            <li className="sidebar__item">
              <span></span> HTML 5 / Bootstrap
            </li>
          </ul>
          <div className="downland"></div>
        </section>
      </div>
    </aside>
  );
};

export default Sidebar;
