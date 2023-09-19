import { Tabs } from 'antd';
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

  return <Tabs centered defaultActiveKey="1" items={items} />;
}

export default TabsView;
