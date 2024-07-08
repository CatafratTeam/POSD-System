import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useState } from 'react';
import { useDataContext } from '../utils/DataContext';
import { API_URL } from '../constants';
import axios from 'axios';
import Tooltip from '@mui/material/Tooltip';

export default function ContentPage() {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedContent, setSelectedContent] = useState(null);
    const [isSaved, setIsSaved] = useState(false);

    const { dataArticles, dataISOs, dataCWEs, dataMVCs, dataOWASPs, dataPatterns, dataPBDs, dataStrategies } = useDataContext();

    const style = {
        backdropFilter: 'blur(15px)',
        webkitBackdropFilter: 'blur(15px)',
        backgroundColor: 'transparent',
        color: 'customTextColor.secondary',
        fontFamily: 'fontFamily'
    };

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: '0px 0px 15px #fa1e4e',
        borderRadius: '10px',
        p: 4,
        color: '#ffffff',
        width: '100vh',
        height: '60vh',
        overflowY: 'auto',
        backdropFilter: 'blur(15px)',
        webkitBackdropFilter: 'blur(15px)',
        backgroundColor: 'transparent'
    };

    const formatData = (rawData, type) => {
        if (!rawData) return [];

        const formattedData = rawData.data.map(item => {
            switch (type) {
                case 'articles':
                    return {
                        Numero: item.attributes.numeroArticolo,
                        Articolo: item.attributes.Articolo
                    };
                case 'iso':
                    return {
                        Numero: item.attributes.numero,
                        Iso: item.attributes.Iso
                    };
                case 'cwe':
                    return {
                        Codice: item.attributes.Codice,
                        Descrizione: item.attributes.Descrizione
                    };
                case 'owasp':
                    return {
                        Numero: item.attributes.numero,
                        Owasp: item.attributes.owasp
                    };
                case 'patterns':
                    return {
                        Name: item.attributes.Name,
                        Description: item.attributes.Description,
                        Context: item.attributes.Context,
                        Example: item.attributes.Example
                    };
                case 'mvcs':
                    return {
                        MVC: item.attributes.MVC
                    };
                case 'pbds':
                    return {
                        PBD: item.attributes.PBD
                    };
                case 'strategies':
                    return {
                        Strategies: item.attributes.strategies
                    };
                default:
                    return {};
            }
        });

        return formattedData.sort((a, b) => a.Numero - b.Numero);
    };

    const formattedArticles = formatData(dataArticles, 'articles');
    const formattedISO = formatData(dataISOs, 'iso');
    const formattedCWE = formatData(dataCWEs, 'cwe');
    const formattedOWASPs = formatData(dataOWASPs, 'owasp');
    const formattedPatterns = formatData(dataPatterns, 'patterns');
    const formattedMVCs = dataMVCs ? dataMVCs.data : [];
    const formattedPBDs = dataPBDs ? dataPBDs.data : [];
    const formattedStrategies = dataStrategies ? dataStrategies.data : [];

    const isLoading = !dataArticles || !dataISOs || !dataCWEs || !dataOWASPs || !dataMVCs || !dataPBDs || !dataPatterns || !dataStrategies;

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const handleItemClick = (content) => () => {
        setSelectedContent(content);
        setModalOpen(true);
        setIsSaved(false);
    };

    const handleBookmarkClick = async (pattern) => {
        const token = localStorage.getItem('token');
        var userData, patternIds;
        if (token) {
            try {
                const response = await fetch(`${API_URL}/users/me`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                userData = await response.json();
            } catch (error) {
                console.error('Error fetching or logging data:', error);
                return;
            }
    
            if (isSaved === false) {
                try {
                    const requestData = {
                        data: {
                            username: userData.username,
                            Name: pattern.Name,
                            Context: pattern.Context,
                            Description: pattern.Description,
                            Example: pattern.Example
                        }
                    };
                    await axios.post(`${API_URL}/preferitis`, requestData, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        }
                    });
                    setIsSaved(true);
                } catch (error) {
                    console.error('Error saving pattern:', error);
                }
            } else {
                try {
                    const response = await fetch(`${API_URL}/preferitis?filters[username][$eq]=${userData.username}&filters[Name][$eq]=${pattern.Name}`);
                    if (response.ok) {
                        const patternsData = await response.json();
                        patternIds = patternsData.data.map(pattern => pattern.id);
                    } else {
                        console.error('Error fetching patterns:', response.status, response.statusText);
                    }
                } catch (error) {
                    console.error('Error fetching patterns:', error);
                    return;
                }
    
                for (const id of patternIds) {
                    try {
                        const response = await fetch(`${API_URL}/preferitis/${id}`, {
                            method: 'DELETE',
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        });
                        if (response.ok) {
                            setIsSaved(false);
                        } else {
                            console.error('Failed to delete pattern:', response.statusText);
                        }
                    } catch (error) {
                        console.error('Error deleting pattern:', error);
                    }
                }
            }
        }
    };
    

    return (
        <Box>
            <Accordion sx={style}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: '#ffffff', transition: 'color 0.3s' }} />}
                    aria-controls="panel1-content"
                    id="panel1-content"
                    sx={{
                        '&:hover': {
                            '& .MuiTypography-root': { color: 'customTextColor.main' },
                            '& .MuiSvgIcon-root': { color: 'customTextColor.main' }
                        }
                    }}
                >
                    <Typography sx={{ color: '#ffffff', transition: 'color 0.3s' }}>Articoli GDPR</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ display: 'flex', flexDirection: 'column' }}>
                    {formattedArticles.map((article, index) => (
                        <ListItemButton
                            key={index}
                            sx={{
                                color: '#ffffff',
                                transition: 'color 0.3s',
                                '&:hover': { color: 'customTextColor.main' }
                            }}
                        >
                            <Typography variant="body2" sx={{ fontSize: '0.8rem', marginBottom: '8px' }}>
                                {`${article.Numero}: ${article.Articolo}`}
                            </Typography>
                        </ListItemButton>
                    ))}
                </AccordionDetails>
            </Accordion>
            <Accordion sx={style}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: '#ffffff', transition: 'color 0.3s' }} />}
                    aria-controls="panel2-content"
                    id="panel2-content"
                    sx={{
                        '&:hover': {
                            '& .MuiTypography-root': { color: 'customTextColor.main' },
                            '& .MuiSvgIcon-root': { color: 'customTextColor.main' }
                        }
                    }}
                >
                    <Typography sx={{ color: '#ffffff', transition: 'color 0.3s' }}>ISO</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ display: 'flex', flexDirection: 'column' }}>
                    {formattedISO.map((iso, index) => (
                        <ListItemButton
                            key={index}
                            sx={{
                                color: '#ffffff',
                                transition: 'color 0.3s',
                                '&:hover': { color: 'customTextColor.main' }
                            }}
                        >
                            <Typography variant="body2" sx={{ fontSize: '0.8rem', marginBottom: '8px' }}>
                                {`${iso.Numero}: ${iso.Iso}`}
                            </Typography>
                        </ListItemButton>
                    ))}
                </AccordionDetails>
            </Accordion>
            <Accordion sx={style}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: '#ffffff', transition: 'color 0.3s' }} />}
                    aria-controls="panel3-content"
                    id="panel3-content"
                    sx={{
                        '&:hover': {
                            '& .MuiTypography-root': { color: 'customTextColor.main' },
                            '& .MuiSvgIcon-root': { color: 'customTextColor.main' }
                        }
                    }}
                >
                    <Typography sx={{ color: '#ffffff', transition: 'color 0.3s' }}>CWE</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ display: 'flex', flexDirection: 'column' }}>
                    {formattedCWE.map((cwe, index) => (
                        <ListItemButton
                            key={index}
                            sx={{
                                color: '#ffffff',
                                transition: 'color 0.3s',
                                '&:hover': { color: 'customTextColor.main' }
                            }}
                        >
                            <Typography variant="body2" sx={{ fontSize: '0.8rem', marginBottom: '8px' }}>
                                {`${cwe.Codice}: ${cwe.Descrizione}`}
                            </Typography>
                        </ListItemButton>
                    ))}
                </AccordionDetails>
            </Accordion>
            <Accordion sx={style}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: '#ffffff', transition: 'color 0.3s' }} />}
                    aria-controls="panel4-content"
                    id="panel4-content"
                    sx={{
                        '&:hover': {
                            '& .MuiTypography-root': { color: 'customTextColor.main' },
                            '& .MuiSvgIcon-root': { color: 'customTextColor.main' }
                        }
                    }}
                >
                    <Typography sx={{ color: '#ffffff', transition: 'color 0.3s' }}>OWASP</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ display: 'flex', flexDirection: 'column' }}>
                    {formattedOWASPs.map((owasp, index) => (
                        <ListItemButton
                            key={index}
                            sx={{
                                color: '#ffffff',
                                transition: 'color 0.3s',
                                '&:hover': { color: 'customTextColor.main' }
                            }}
                        >
                            <Typography variant="body2" sx={{ fontSize: '0.8rem', marginBottom: '8px' }}>
                                {`${owasp.Numero}: ${owasp.Owasp}`}
                            </Typography>
                        </ListItemButton>
                    ))}
                </AccordionDetails>
            </Accordion>
            <Accordion sx={style}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: '#ffffff', transition: 'color 0.3s' }} />}
                    aria-controls="panel5-content"
                    id="panel5-content"
                    sx={{
                        '&:hover': {
                            '& .MuiTypography-root': { color: 'customTextColor.main' },
                            '& .MuiSvgIcon-root': { color: 'customTextColor.main' }
                        }
                    }}
                >
                    <Typography sx={{ color: '#ffffff', transition: 'color 0.3s' }}>Patterns</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ display: 'flex', flexDirection: 'column' }}>
                    {formattedPatterns.map((pattern, index) => (
                        <ListItemButton
                            key={index}
                            onClick={handleItemClick(pattern)}
                            sx={{
                                color: '#ffffff',
                                transition: 'color 0.3s',
                                '&:hover': { color: 'customTextColor.main' }
                            }}
                        >
                            <Typography variant="body2" sx={{ fontSize: '0.8rem', marginBottom: '8px' }}>
                                {`${pattern.Name}`}
                            </Typography>
                        </ListItemButton>
                    ))}
                </AccordionDetails>
            </Accordion>
            <Accordion sx={style}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: '#ffffff', transition: 'color 0.3s' }} />}
                    aria-controls="panel6-content"
                    id="panel6-content"
                    sx={{
                        '&:hover': {
                            '& .MuiTypography-root': { color: 'customTextColor.main' },
                            '& .MuiSvgIcon-root': { color: 'customTextColor.main' }
                        }
                    }}
                >
                    <Typography sx={{ color: '#ffffff', transition: 'color 0.3s' }}>MVCs</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ display: 'flex', flexDirection: 'column' }}>
                    {formattedMVCs.map((mvc, index) => (
                        <ListItemButton
                            key={index}
                            sx={{
                                color: '#ffffff',
                                transition: 'color 0.3s',
                                '&:hover': { color: 'customTextColor.main' }
                            }}
                        >
                            <Typography variant="body2" sx={{ fontSize: '0.8rem', marginBottom: '8px' }}>
                                {`${mvc.attributes.MVC}`}
                            </Typography>
                        </ListItemButton>
                    ))}
                </AccordionDetails>
            </Accordion>
            <Accordion sx={style}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: '#ffffff', transition: 'color 0.3s' }} />}
                    aria-controls="panel7-content"
                    id="panel7-content"
                    sx={{
                        '&:hover': {
                            '& .MuiTypography-root': { color: 'customTextColor.main' },
                            '& .MuiSvgIcon-root': { color: 'customTextColor.main' }
                        }
                    }}
                >
                    <Typography sx={{ color: '#ffffff', transition: 'color 0.3s' }}>PBDs</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ display: 'flex', flexDirection: 'column' }}>
                    {formattedPBDs.map((pbd, index) => (
                        <ListItemButton
                            key={index}
                            sx={{
                                color: '#ffffff',
                                transition: 'color 0.3s',
                                '&:hover': { color: 'customTextColor.main' }
                            }}
                        >
                            <Typography variant="body2" sx={{ fontSize: '0.8rem', marginBottom: '8px' }}>
                                {`${pbd.attributes.PBD}`}
                            </Typography>
                        </ListItemButton>
                    ))}
                </AccordionDetails>
            </Accordion>
            <Accordion sx={style}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: '#ffffff', transition: 'color 0.3s' }} />}
                    aria-controls="panel8-content"
                    id="panel8-content"
                    sx={{
                        '&:hover': {
                            '& .MuiTypography-root': { color: 'customTextColor.main' },
                            '& .MuiSvgIcon-root': { color: 'customTextColor.main' }
                        }
                    }}
                >
                    <Typography sx={{ color: '#ffffff', transition: 'color 0.3s' }}>Strategies</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ display: 'flex', flexDirection: 'column' }}>
                    {formattedStrategies.map((strategy, index) => (
                        <ListItemButton
                            key={index}
                            sx={{
                                color: '#ffffff',
                                transition: 'color 0.3s',
                                '&:hover': { color: 'customTextColor.main' }
                            }}
                        >
                            <Typography variant="body2" sx={{ fontSize: '0.8rem', marginBottom: '8px' }}>
                                {`${strategy.attributes.Name}: ${strategy.attributes.Description}`}
                            </Typography>
                        </ListItemButton>
                    ))}
                </AccordionDetails>
            </Accordion>
            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={modalStyle}>
                    <IconButton
                        aria-label="close"
                        onClick={() => setModalOpen(false)}
                        sx={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                            color: 'white'
                        }}
                    >
                        <CloseOutlinedIcon />
                    </IconButton>
                    {localStorage.getItem('token') &&
                        <IconButton
                            onClick={() => handleBookmarkClick(selectedContent)}
                            sx={{ color: 'customTextColor.main' }}
                        >
                            {isSaved ? <Tooltip title="Saved"><BookmarkIcon /></Tooltip> : <Tooltip title="Save"><BookmarkBorderIcon /></Tooltip>}
                        </IconButton>}
                    <Typography id="modal-title" variant="h6" component="h2">
                        {selectedContent?.Name}
                    </Typography>
                    <Typography id="modal-description" sx={{ mt: 2 }}>
                        {selectedContent?.Description}
                    </Typography>
                    <Typography id="modal-context" sx={{ mt: 2 }}>
                        {selectedContent?.Context}
                    </Typography>
                    <Typography id="modal-example" sx={{ mt: 2 }}>
                        {selectedContent?.Example}
                    </Typography>
                </Box>
            </Modal>
        </Box>
    );
}
