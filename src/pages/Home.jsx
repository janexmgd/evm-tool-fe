import { Fragment } from 'react';
import Navbar from '../components/Navbar.jsx';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import '../assets/css/Home.css';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer.jsx';
const Home = () => {
  const handleRandomTransform = (event) => {
    const serviceItem = event.currentTarget;
    const randomTransform = `translateX(${getRandomNumber(5, 10)}px)`;
    serviceItem.style.transform = randomTransform;
  };
  const ResetTransform = (e) => {
    const serviceItem = e.currentTarget;
    const randomTransform = `translateX(0px)`;
    serviceItem.style.transform = randomTransform;
  };
  const services = [
    {
      id: 1,
      title: 'Generate evm wallet',
      description: 'For generate evm wallet return private key and address',
      link: '/genevm',
    },
    {
      id: 2,
      title: 'Check balance evm wallet',
      description: 'For check the balance of evm wallet',
      link: '/evmbalance',
    },
    {
      id: 3,
      title: 'Service 3',
      description: 'wir',
      link: '/',
    },
  ];
  const getRandomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
  };
  return (
    <Fragment>
      <div>
        <Navbar />
        <Container
          className='services-container mt-2 h=100'
          maxWidth='md'
          style={{ minHeight: '70vh' }}
        >
          <Typography variant='h2' align='center' gutterBottom>
            List Service
          </Typography>
          <List>
            {services.map((service) => (
              <ListItem
                key={service.id}
                className='service-item mt-1 mb-1'
                onMouseEnter={handleRandomTransform}
                onMouseLeave={ResetTransform}
              >
                <Link
                  to={service.link}
                  className='text-decoration-none text-black'
                >
                  <ListItemText
                    primary={service.title}
                    secondary={service.description}
                  />
                </Link>
              </ListItem>
            ))}
          </List>
        </Container>
        <Footer />
      </div>
    </Fragment>
  );
};
export default Home;
