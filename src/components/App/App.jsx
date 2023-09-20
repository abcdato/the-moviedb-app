import TabsView from '../TabsView/TabsView';
import { DataProvider } from '../Context/DataContext';

import './App.scss';

function App() {
  return (
    <div className="app">
      <DataProvider>
        <TabsView />
      </DataProvider>
    </div>
  );
}

export default App;
