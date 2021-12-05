export const openCenteredWindow = ({ url, title, width, height }) => {
  const dualScreenLeft = window.screenLeft || window.screenX;
  const dualScreenTop = window.screenTop || window.screenY;

  const left = (window.screen.width - width) / 2 + dualScreenLeft;
  const top = (window.screen.height - height) / 2 + dualScreenTop;

  return window.open(
    url,
    title,
    `
    toolbar=no,
    location=no,
    directories=no,
    status=no,
    menubar=no,
    scrollbars=no,
    resizable=no,
    copyhistory=no,
    width=${width},
    height=${height}, 
    top=${top}, 
    left=${left}
    `,
  );
};
