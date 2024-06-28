import Container from '@mui/material/Container';
import AboutUs from './AboutUs';
import SearchBar from './SearchBar';
import '../css/index.css';

export default function MainContainer() {

  return (
    <div>
      <Container maxWidth="sm" style={{ height: '60vh' }}>
        <SearchBar/>
      </Container>
      <Container maxWidth="sm" style={{ height: '100vh' }}>
        <AboutUs />
      </Container>
    </div>
  );
}
