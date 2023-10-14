import { useContext } from 'react';
import { Tabs } from 'antd';
import { DataContext } from '../Context/DataContext';

import SearchTab from '../SearchTab/SearchTab';
import RatedTab from '../RatedTab/RatedTab';

import './TabsView.scss';

function TabsView() {
  const { loadRatedData, setLoading } = useContext(DataContext);

  const onTabClick = (key) => {
    if (key === '2') {
      setLoading(true);
      loadRatedData();
    }
  };

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

  return (
    <Tabs centered defaultActiveKey="1" items={items} onTabClick={onTabClick} />
  );
}

export default TabsView;
