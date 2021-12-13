import React, { VFC } from 'react';

type Props = {
  title: string;
};

export const StoryOgpTemplate: VFC<Props> = ({ title }) => {
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@700&display=swap');
    html,
    body {
      margin: 0;
      padding: 0;
    }
    .wrapper {
      width: 1200px;
      height: 630px;
      display: flex;
      position: relative;
      align-items: center;
      font-family: 'M PLUS Rounded 1c';
      font-weight: bold;
      justify-content: center;
    }
    .title {
      font-size: 50px;
      padding-left: 80px;
      padding-right: 80px;
    }
    .author {
      right: 0;
      bottom: 0;
      margin: 50px;
      position: absolute;
      font-size: 40px;
      font-weight: 700;
    }
  `;

  return (
    <html>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <body>
        <div className="wrapper">
          <div className="title">{title}</div>
        </div>
      </body>
    </html>
  );
};
