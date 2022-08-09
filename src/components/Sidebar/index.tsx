import { useRef } from "react";
import cn from "classnames";

import { useTypedSelector } from "../../store";
import { SpriteSVG } from "../Sprite";
import mockIMG from "../../assets/img/no-image.jpg";
import { declinationOfNumeral } from "../../utils/declinationOfNumeral";
import { SvgAge, SvgLocation, SvgPhone } from "../Sprite/svg";

const Sidebar = () => {
  const allHardSkills = useTypedSelector(state => state.resume.hardSkills);
  const image = useTypedSelector(state => state.resume.aboutMe.imgUrl);
  const isEditor = useTypedSelector(state => state.resume.editor);
  const { aboutMe } = useTypedSelector(state => state.resume);

  const imageRef = useRef<HTMLInputElement>(null);
  return (
    <aside className="sidebar">
      <div className="sidebar__photo-container">
        <div
          className={cn({ touch: isEditor }, "sidebar__photo ")}
          onClick={() => imageRef.current?.click()}>
          <img src={image || mockIMG} alt="" />
        </div>
      </div>
      <div className="sidebar-wrapper">
        <>
          <ul className="sidebar__about">
            <div className="sidebar__info">
              <span>
                {/* <SpriteSVG iconWidth={18} iconHeight={18} iconId="age" /> */}
                <SvgAge/>
              </span>
              <p>
                {declinationOfNumeral(Number(aboutMe.age), [
                  "год",
                  "года",
                  "лет",
                ])}
              </p>
            </div>
            <div className="sidebar__info">
              <span>
                {/* <SpriteSVG iconHeight={18} iconWidth={20} iconId="location" /> */}
                <SvgLocation/>

              </span>
              <p>{aboutMe.location}</p>
            </div>
            <div className="sidebar__info">
              <span>
                {/* <SpriteSVG iconHeight={18} iconWidth={20} iconId="phone" /> */}
                <SvgPhone/>

              </span>
              <p>{aboutMe.phone}</p>
            </div>
          </ul>
          <section className="sidebar__skills">
            <h2 className="title">Hard Skills</h2>
            <ul className="sidebar__list">
              {allHardSkills.map(item => (
                <li className="sidebar__item" key={item.name}>
                  <span></span> {item.name}
                </li>
              ))}
            </ul>
            <div className="downland"></div>
          </section>
        </>
      </div>
    </aside>
  );
};

export default Sidebar;
