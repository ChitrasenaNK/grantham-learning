import React from 'react';
import { Box, Typography, Button, Container, Grid } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import { useNavigate } from 'react-router-dom';



import Navbar from '../components/Navbar';
import Carousel1 from '../assets/grantham.jpg';
import Carousel2 from '../assets/grantha.jpg';
import Carousel3 from '../assets/granthampalm.jpg';
//import BannerImage from '../assets/grantha.jpg';

export default function Home() {
    const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fff' }}>
      <Navbar />

      {/* Hero Section */}
      <Container sx={{ pt: { xs: 7, sm: 8 } }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 4,
            
            py: { xs: 6, md: 6 },
          }}
        >
          {/* Text Content */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h3" sx={{ fontWeight: 600, color: '#4c4c4c' }}>
              Explore and Learn Grantha Lipi
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mt: 3,
                color: '#6a6a6a',
                textAlign: 'justify',
                fontSize: '1.2rem',
              }}
            >
              The objective of this endeavour is to spread awareness and help aspirants get educated and even get basic training to learn the Grantha scripts in its pure native form.
              It is to make this endeavor accessible to all aspirants who wish to benefit from it.
            </Typography>

            <Button
              variant="contained"
              onClick={() => navigate('/library')}
              sx={{
                mt: 4,
                backgroundColor: '#fe9e0d',
                borderRadius: '2rem',
                paddingX: 4,
                paddingY: 1.2,
                fontSize: '1rem',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: '#e48f0f',
                },
              }}
            >
              Visit our Library
            </Button>
          </Box>

          {/* Carousel */}
          <Box
            sx={{
              flex: 1,
              maxWidth: 400,
              height: { xs: 250, md: 300 },
            }}
          >
            <Swiper
              modules={[Autoplay]}
              spaceBetween={10}
              slidesPerView={1}
              loop
              autoplay={{ delay: 3000 }}
              style={{
                height: '100%',
                borderRadius: '16px',
              }}
            >
              {[Carousel1, Carousel2, Carousel3].map((img, index) => (
                <SwiperSlide key={index}>
                  <Box
                    component="img"
                    src={img}
                    alt={`Slide ${index + 1}`}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: 2,
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </Box>
      </Container>

      {/* About Section */}
      <Container sx={{ py: 4 }}>
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={7}>
            <Typography variant="h4" sx={{ fontWeight: 600, color: '#4c4c4c', mb: 2 }}>
              About Grantha
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#6a6a6a',
                textAlign: 'justify',
                fontSize: '1.1rem',
              }}
            >
              The Grantha script or Grantha Lipi is a classical Brahmi script developed around the 5th century CE to write Sanskrit in South India.
              It differs from Devanagari and was widely used in temples and palm-leaf manuscripts. Grantha evolved through early, middle, and modern forms,
              and played a key role in writing classical texts, especially in Dravidian regions.
            </Typography>
          </Grid>

          
        </Grid>
      </Container>
    </Box>
  );
}
