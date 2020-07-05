import React, { createContext, useState } from 'react';

export const UIContext = createContext({
  loginModalHidden: true,
  toggleLoginModal: () => {},
});

const UIProvider = ({ children }) => {
  const [loginModalHidden, setLoginModalHidden] = useState(true);

  const toggleLoginModal = () => setLoginModalHidden(!loginModalHidden);

  return (
    <UIContext.Provider value={{ loginModalHidden, toggleLoginModal }}>
      {children}
    </UIContext.Provider>
  );
};

export default UIProvider;
