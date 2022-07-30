import React from "react";

const ProjectList = () => {
  return (
    <section className="projects">
      <h2 className="title">Опыт работы </h2>
      <ul className="project__list">
        <li className="project__item">
          <div className="project__header">
            <h3 className="project__title">Социальная сеть</h3>
            <div className="project__date">01.12.2021 - 20.03.2022</div>
          </div>

          <p>
            Самый крупный проект на данный момент. Имеется страница входа (все
            формы валидированы). Страница профиля (редактируемая, все данные
            хранятся на сервере). Страница новостей (сортировка новостей,
            бесконечная пагинация). Страница с личными сообщениями. Общий чат
            (используется WebSocket). Страница пользователя (пагинация страниц,
            возможность подписки/отписки, просмотр профиля, написание личного
            сообщения, поиск по имени, сортировка по подписке).
          </p>
          <p>
            Используемые технологии: React, Redux, React-router, TypeScript,
            Redux-final-form, formik, webSocket, Rest APi, axios, redux-thunk
          </p>
          <a
            href="https://github.com/Myakis/social-network-app"
            className="project__link">
            Больше об этом и других проектах на гитхабе
          </a>
        </li>
      </ul>
    </section>
  );
};

export default ProjectList;
