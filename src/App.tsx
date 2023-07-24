import styled from 'styled-components';
import { Table } from './components/table/Table';
import logo from './assets/logo.png';

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-block: 32px;
  align-items: center;
`;

const Logo = styled.img`
  padding-bottom: 12px;
`;

function App() {
  return (
    <Main>
      <div>
        <Logo src={logo} width={100} height={62} alt="logo" />
        <Table />
      </div>
    </Main>
  );
}

export default App;
