import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Clientes from './pages/Clientes';
import Veiculos from './pages/Veiculos';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Router>
      <div className={`h-screen ${darkMode ? 'dark' : ''}`}>
        <div className="flex h-full bg-gray-100 dark:bg-gray-900">
          <Sidebar />
          <div className="flex flex-col flex-1">
            <Header darkMode={darkMode} setDarkMode={setDarkMode} />
            <main className="flex-1 overflow-y-auto p-4">
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route path="/clientes" component={Clientes} />
                <Route path="/veiculos" component={Veiculos} />
              </Switch>
            </main>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;