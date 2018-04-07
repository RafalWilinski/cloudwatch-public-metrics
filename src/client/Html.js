const Html = ({ body, styles, script, title }) => `
  <!DOCTYPE html>
  <html>
    <head>
      <title>${title}</title>
      ${styles}
    </head>
    <body style="margin:0">
      <div id="app">${body}</div>
    </body>
    <script src="${script}" />
  </html>
`;

export default Html;
