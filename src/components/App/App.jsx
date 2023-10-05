import TabsView from '../TabsView/TabsView';
import { DataProvider } from '../Context/DataContext';
import MovieService from '../../api/MovieService';

import './App.scss';

function App() {
  const movieService = new MovieService();

  if (!JSON.parse(localStorage.getItem('guestToken'))) {
    movieService.createGuestSession().then((guestToken) => {
      localStorage.setItem('guestToken', JSON.stringify(guestToken));
    });
  }

  return (
    <div className="app">
      <DataProvider>
        <TabsView />
      </DataProvider>
    </div>
  );
}

export default App;
