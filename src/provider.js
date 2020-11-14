import React, { useState } from 'react';

export const AudioContext = React.createContext();

const Provider = props => {
  const [audio, setAudio] = useState(new Audio());

  return (
    <AudioContext.Provider value={{
        audio,
        setAudio
    }}>
      {props.children}
    </AudioContext.Provider>
  )
};

export default ({ element }) => (
    <Provider>
      {element}
    </Provider>
  );