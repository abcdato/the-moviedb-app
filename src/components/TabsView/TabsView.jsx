import { Tabs } from 'antd';
import DataContext from '../Context/DataContext';

import SearchTab from '../SearchTab/SearchTab';
import RatedTab from '../RatedTab/RatedTab';
import './TabsView.scss';

function TabsView() {
  const items = [
    {
      key: '1',
      label: 'Search',
      children: <SearchTab />,
    },
    {
      key: '2',
      label: 'Rated',
      children: <RatedTab />,
    },
  ];

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = {};

  return (
    <DataContext.Provider value={value}>
      <Tabs centered defaultActiveKey="1" items={items} />
    </DataContext.Provider>
  );
}

export default TabsView;
