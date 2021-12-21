import React from 'react';

const CloseWindow = () => {
  React.useEffect(() => {
    window.close();
  }, []);

  return null;
};

export default CloseWindow;
