import React from 'react';

import FiltersList from './components/FiltersList';
import TicketsList from './components/TicketsList';

import dayjs from 'dayjs';
import 'dayjs/locale/ru';

const App = () => {
  dayjs.locale('ru');

  return (
    <div className="container">
      <FiltersList />
      <TicketsList />
    </div>
  );
};

export default App;
