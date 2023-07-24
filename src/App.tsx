import { Table } from './components/table/Table';
import logo from './assets/logo.png';
import { FC } from 'react';
import { Logo, Main } from './App.styles';

const App: FC = () => {
  return (
    <Main>
      <div>
        <Logo src={logo} width={100} height={62} alt="logo" />
        <Table />
      </div>
    </Main>
  );
};

export default App;
