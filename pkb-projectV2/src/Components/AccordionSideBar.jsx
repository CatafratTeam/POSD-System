import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useState, useEffect } from 'react';
import { API_URL } from "../constants";
import { useDataFetching } from "../utils/dataFetching";

export default function ContentPage() {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedContent, setSelectedContent] = useState(null);
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const { data: dataArticles, error: errorArticles } = useDataFetching(`${API_URL}/articoli-gdprs`);
    const { data: dataISO, error: errorISO } = useDataFetching(`${API_URL}/isos`);
    const { data: dataCWEs, error: errorCWEs } = useDataFetching(`${API_URL}/cwes`);
    const { data: dataMVCs, error: errorMVCs } = useDataFetching(`${API_URL}/mvcs`);
    const { data: dataOWASPs, error: errorOWASPs } = useDataFetching(`${API_URL}/owasps`);
    const { data: dataPatterns, error: errorPatterns } = useDataFetching(`${API_URL}/patterns`);
    const { data: dataPBDs, error: errorPBDs } = useDataFetching(`${API_URL}/pbds`);
    const { data: dataStrategie, error: errorStrategie } = useDataFetching(`${API_URL}/strategies`);

    const style = {
        backgroundColor: '#0c0a10',
        color: 'customTextColor.secondary',
        fontFamily: 'fontFamily'
    };

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: '#0c0a10',
        boxShadow: '0px 0px 15px #fa1e4e',
        borderRadius: '10px',
        p: 4,
        color: '#ffffff',
        width: '100vh',
        height: '60vh',
        overflowY: 'auto',
    };

    useEffect(() => {
        if (dataArticles && dataISO && dataCWEs && dataOWASPs) {
            const formattedArticles = dataArticles.data
                .map(item => ({
                    text: `${item.attributes.numeroArticolo}: ${item.attributes.Articolo}`,
                    content: item.attributes.Articolo,
                    numero: item.attributes.numeroArticolo
                }))
                .sort((a, b) => a.numero - b.numero);

            const formattedISO = dataISO.data
                .map(item => ({
                    text: `${item.attributes.numero}: ${item.attributes.Iso}`,
                    content: item.attributes.Iso,
                    numero: item.attributes.numero
                }))
                .sort((a, b) => a.numero - b.numero);

            const formattedCWE = dataCWEs.data
                .map(item => ({
                    text: `${item.attributes.Codice}: ${item.attributes.Descrizione}`,
                    content: item.attributes.Descrizione,
                    numero: item.attributes.Codice
                }))
                .sort((a, b) => a.numero - b.numero);

            const formattedOWASPs = dataOWASPs.data
                .map(item => ({
                    text: `${item.attributes.numero}: ${item.attributes.owasp}`,
                    content: item.attributes.owasp,
                    numero: item.attributes.numero
                }))
                .sort((a, b) => a.numero - b.numero);

            const formattedPatterns = dataPatterns.data
                .map(item => ({
                    text: item.attributes.Name,
                    content: `<font color="#fa1e4e">${item.attributes.Name}</font><br><br><font color="#fa1e4e">Description:</font> ${item.attributes.Description}<br><br><font color="#fa1e4e">Context:</font> ${item.attributes.Context}<br><br><font color="#fa1e4e">Example: </font>${item.attributes.Example}`,
                }));

            setData({
                articles: formattedArticles,
                iso: formattedISO,
                cwes: formattedCWE,
                owasps: formattedOWASPs,
                mvcs: dataMVCs.data,
                patterns: formattedPatterns,
                pbds: dataPBDs.data,
                strategies: dataStrategie.data
            });

            setIsLoading(false);
        }

        if (errorArticles || errorISO || errorCWEs || errorOWASPs || errorMVCs || errorPBDs || errorPatterns || errorStrategie) {
            console.error('Error fetching data:', errorArticles || errorISO || errorCWEs || errorOWASPs || errorMVCs || errorPBDs || errorPatterns || errorStrategie);
        }
    }, [dataArticles, dataISO, dataCWEs, dataOWASPs, dataMVCs, dataPBDs, dataPatterns, dataStrategie, errorArticles, errorISO, errorCWEs, errorOWASPs, errorMVCs, errorPBDs, errorPatterns, errorStrategie]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const handleItemClick = (content) => () => {
        setSelectedContent(content);
        setModalOpen(true);
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
                    {data.articles.map((article, index) => (
                        <ListItemButton
                            key={index}
                            sx={{
                                color: '#ffffff',
                                transition: 'color 0.3s',
                                '&:hover': { color: 'customTextColor.main' }
                            }}
                        >
                            <Typography variant="body2" sx={{ fontSize: '0.8rem', marginBottom: '8px' }}>
                                {article.text}
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
                    {data.iso.map((iso, index) => (
                        <ListItemButton
                            key={index}
                            sx={{
                                color: '#ffffff',
                                transition: 'color 0.3s',
                                '&:hover': { color: 'customTextColor.main' }
                            }}
                        >
                            <Typography variant="body2" sx={{ fontSize: '0.8rem', marginBottom: '8px' }}>
                                {iso.text}
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
                    {data.cwes.map((cwe, index) => (
                        <ListItemButton
                            key={index}
                            sx={{
                                color: '#ffffff',
                                transition: 'color 0.3s',
                                '&:hover': { color: 'customTextColor.main' }
                            }}
                        >
                            <Typography variant="body2" sx={{ fontSize: '0.8rem', marginBottom: '8px' }}>
                                {cwe.text}
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
                    <Typography sx={{ color: '#ffffff', transition: 'color 0.3s' }}>MVC</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ display: 'flex', flexDirection: 'column' }}>
                    {data.mvcs.map((mvc, index) => (
                        <ListItemButton
                            key={index}
                            sx={{
                                color: '#ffffff',
                                transition: 'color 0.3s',
                                '&:hover': { color: 'customTextColor.main' }
                            }}
                        >
                            <Typography variant="body2" sx={{ fontSize: '0.8rem', marginBottom: '8px' }}>
                                {mvc.attributes.MVC}
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
                    <Typography sx={{ color: '#ffffff', transition: 'color 0.3s' }}>OWASP</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ display: 'flex', flexDirection: 'column' }}>
                    {data.owasps.map((owasp, index) => (
                        <ListItemButton
                            key={index}
                            sx={{
                                color: '#ffffff',
                                transition: 'color 0.3s',
                                '&:hover': { color: 'customTextColor.main' }
                            }}
                        >
                            <Typography variant="body2" sx={{ fontSize: '0.8rem', marginBottom: '8px' }}>
                                {owasp.text}
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
                    <Typography sx={{ color: '#ffffff', transition: 'color 0.3s' }}>Pattern</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ display: 'flex', flexDirection: 'column' }}>
                    {data.patterns.map((pattern, index) => (
                        <ListItemButton
                            key={index}
                            onClick={handleItemClick(pattern.content)}
                            sx={{
                                color: '#ffffff',
                                transition: 'color 0.3s',
                                '&:hover': { color: 'customTextColor.main' }
                            }}
                        >
                            <Typography variant="body2" sx={{ fontSize: '0.8rem', marginBottom: '8px' }}>
                                {pattern.text}
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
                    <Typography sx={{ color: '#ffffff', transition: 'color 0.3s' }}>PBD</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ display: 'flex', flexDirection: 'column' }}>
                    {data.pbds.map((pbd, index) => (
                        <ListItemButton
                            key={index}
                            sx={{
                                color: '#ffffff',
                                transition: 'color 0.3s',
                                '&:hover': { color: 'customTextColor.main' }
                            }}
                        >
                            <Typography variant="body2" sx={{ fontSize: '0.8rem', marginBottom: '8px' }}>
                                {pbd.attributes.PBD}
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
                    <Typography sx={{ color: '#ffffff', transition: 'color 0.3s' }}>Strategy</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ display: 'flex', flexDirection: 'column' }}>
                    {data.strategies.map((strategy, index) => (
                        <ListItemButton
                            key={index}
                            sx={{
                                color: '#ffffff',
                                transition: 'color 0.3s',
                                '&:hover': { color: 'customTextColor.main' }
                            }}
                        >
                            <Typography variant="body2" sx={{ fontSize: '0.8rem', marginBottom: '8px' }}>
                                {strategy.attributes.Name}
                            </Typography>
                        </ListItemButton>
                    ))}
                </AccordionDetails>
            </Accordion>
            <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                <Box sx={modalStyle}>
                    <IconButton
                        onClick={() => setModalOpen(false)}
                        sx={{ position: 'absolute', top: 8, right: 8, color: '#ffffff' }}
                    >
                        <CloseOutlinedIcon />
                    </IconButton>
                    <Typography id="modal-title" variant="h4" component="h4" color="customTextColor.main" sx={{ paddingBottom: 1 }}>
                        Details
                    </Typography>
                    <Typography dangerouslySetInnerHTML={{ __html: selectedContent }} />
                </Box>
            </Modal>
        </Box>
    );
}
