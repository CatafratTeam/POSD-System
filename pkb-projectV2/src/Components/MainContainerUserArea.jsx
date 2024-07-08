import Container from '@mui/material/Container';
import UserCard from './UserInfos';
import '../css/index.css';

export default function MainContainer() {

  return (
    <div>
      <Container maxWidth="sm" style={{ height: '200vh' }}>
        <UserCard/>
      </Container>
    </div>
  );
}
