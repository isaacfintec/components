import React from 'react';
import './App.css';
import Theme from './theme';
import SimulationCard from './components/SimulationCard';
import ProviderContainer from './components/Provider/ProviderContainer';
import Provider from './components/Provider';


const App = () => {
  return (
    <div className="App" style={{ padding: '10px' }}>
      <Theme>
        {/* <SimulationCard
          amount='$3,000'
          term='48'
          period='Quincenal'
          payment='$98.39'/> */}
        <Provider>
          <ProviderContainer />
        </Provider>
      </Theme>
    </div>
  );
};

export default App;
