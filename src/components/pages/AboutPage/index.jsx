import React from "react";
import Container from "../../atoms/Container";
import Layout from "../../templates/Layout";

import classes from "./style.css";

const AboutPage = () => {
  return (
    <Layout>
      <Container>
        <div className={classes.AboutPageWrapper}>
          <div>
            <p>
              Приложение EnglishCards позволяет учить английские слова. Каждый
              неправильный ответ или пропуск слова увеличивает вероятность того,
              что это слово скоро выпадет снова. Приложение также автоматически
              сохраняет твои баллы, поэтому, когда ты вернёшься через неделю,
              сможешь легко продолжить учить слова под своим именем, и всё это
              без регистрации!
            </p>
            <p>
              Приложение было сделано с нуля в рамках изучения React,
              Объектно-Ориентированного программирования и тестирования руками
              одного человека
              <a
                href="https://github.com/olga-urentseva"
                target="_blank"
                className={classes.AboutPageLink}
              >
                (меня)
              </a>
              и не имеет никакого коммерческого бэкграунда.
            </p>
            <p className={classes.TextAccent}>
              Если у вас есть идеи по улучшению приложения или предложения
              поработать в интересных проектах, можно смело мне написать.
            </p>
          </div>
          <p>&#128149;&#128105;&#8205;&#128187;</p>
          <div>
            <p>
              The EnglishCards app allows you to learn English words. Each wrong
              answer or omission of a word increases the possibility that the
              word will be dropped again soon. The app also automatically saves
              your points, so when you return a week later, you can easily
              continue to learn words under your name, and this is without
              registration!
            </p>
            <p>
              The application was made as part of the study of React,
              Object-Oriented Programming and testing libraries by one person
              <a
                href="https://github.com/olga-urentseva"
                target="_blank"
                className={classes.AboutPageLink}
              >
                (me)
              </a>
              and doesn't carry any commercial background.
            </p>
            <p className={classes.TextAccent}>
              Feel free to text me if you have a ideas for improving this SPA or
              maybe you can offer me a job in interesting projects.
            </p>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default AboutPage;
