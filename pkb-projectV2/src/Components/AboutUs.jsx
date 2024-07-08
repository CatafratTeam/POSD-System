import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import ReactCardFlip from 'react-card-flip';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function FlippableCard({ image, name, description }) {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleClick = () => {
        setIsFlipped(prevState => !prevState);
    };

    const style = {
        minWidth: 300,
        minHeight: 500,
        backgroundColor: 'rgba(0, 0, 0, 0.195)', // Semi-transparent background
        color: 'customTextColor.secondary',
        margin: 5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: '0px 0px 15px #000000',
        borderRadius: '10px',
        backdropFilter: 'blur(10px)', // Blur effect
        webkitBackdropFilter: 'blur(10px)' // For Safari support
    }

    return (
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
            <Card sx={style} key="front">
                <CardMedia
                    component="img"
                    height="350"
                    image={image}
                    alt={name}
                />
                <CardContent>
                    <Typography variant="h5">{name}</Typography>
                </CardContent>
                <CardActions>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 1 }}>
                        <Button size="small" color="customTextColor" onClick={handleClick}>Flip</Button>
                    </Box>
                </CardActions>
            </Card>

            <Card sx={style} key="back">
                <CardContent>
                    <Typography variant="body1">{description}</Typography>
                </CardContent>
                <CardActions>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '100%', padding: 1 }}>
                        <IconButton aria-label="whatsapp" sx={{ color: '#ffffff' }}>
                            <WhatsAppIcon />
                        </IconButton>
                        <IconButton aria-label="email" sx={{ color: '#ffffff' }}>
                            <EmailIcon />
                        </IconButton>
                        <IconButton aria-label="instagram" sx={{ color: '#ffffff' }}>
                            <InstagramIcon />
                        </IconButton>
                        <IconButton aria-label="linkedin" sx={{ color: '#ffffff' }}>
                            <LinkedInIcon />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 1 }}>
                        <Button size="small" color="customTextColor" onClick={handleClick}>Flip Back</Button>
                    </Box>
                </CardActions>
            </Card>
        </ReactCardFlip>
    );
}

export default function CardGrid() {
    return (
        <Box sx={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: '12vh',
            boxSizing: 'border-box'
        }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <FlippableCard 
                    image="https://via.placeholder.com/350" 
                    name="Emanuele Lionetti" 
                    description="Studente universitario al secondo anno di ITPS all'Università degli studi di Bari Aldo Moro. Front-ender del progetto." 
                />
                <FlippableCard 
                    image="https://via.placeholder.com/350" 
                    name="Gabriele Franchini" 
                    description="Studente universitario al secondo anno di ITPS all'Università degli studi di Bari Aldo Moro. Back-ender del progetto." 
                />
                <FlippableCard 
                    image="https://via.placeholder.com/350" 
                    name="Nicolas Bello" 
                    description="Studente universitario al secondo anno di ITPS all'Università degli studi di Bari Aldo Moro. Project document manager." 
                />
            </Box>
        </Box>
    );
}
