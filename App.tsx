import React from 'react'
import KeyScreen from './screens/KeyScreen/KeyScreen';

function App() {
  let dummyKey = 'mNvoeJKrQylpHcFGxbtqauPZSsdRwUOimNvoeJKrQylpHcFGxbtqauPZSsdRwUOi';
  
  return (
    <KeyScreen keyCode={dummyKey}/>
  );
}

export default App;