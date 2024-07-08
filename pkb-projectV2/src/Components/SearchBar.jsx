import { useState, useEffect, useCallback } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import { API_URL } from "../constants";
import { useDataContext } from '../utils/DataContext';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Tooltip from '@mui/material/Tooltip';

export default function SearchBar() {
    const [value, setValue] = useState('');
    const [categoryTo, setCategoryTo] = useState('');
    const [categoryFrom, setCategoryFrom] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [att, setAtt] = useState('');
    const [results, setResults] = useState([])
    const [isVisible, setIsVisible] = useState(true);
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showResults, setShowResults] = useState(false);
    const [isSaved, setIsSaved] = useState(false);


    const { dataArticles } = useDataContext();
    const { dataISOs } = useDataContext();
    const { dataCWEs } = useDataContext();
    const { dataMVCs } = useDataContext();
    const { dataOWASPs } = useDataContext();
    const { dataPatterns } = useDataContext();
    const { dataPBDs } = useDataContext();
    const { dataStrategies } = useDataContext();

    const handleChange = (event) => {
        setCategoryTo(event.target.value);
    };

    const handleClose = () => setOpen(false);
    const handleOpen = (item) => {
        setSelectedItem(item);
        setOpen(true);
        setIsSaved(false);
    };
    const toggleResults = () => setShowResults(!showResults);

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
        height: '40vh',
        overflowY: 'auto',
    };

    const handleSearch = useCallback(async () => {
        const resApp = [];
        var categoryFromResponse = [];
        var patternsResponse = [];
        var categoryFromData = [];
        var categoryFromId = [];
        var patternsData = [];
        var patternIds = [];
        var query = '';
        var CategoryToResponse = [];
        var CategoryToData = [];

        if ((!categoryTo && !categoryFrom) || ((categoryFrom === '' || value === '') && categoryTo === '')) {
            console.log('no results');
            return;
        }
        if
            ((categoryFrom && !categoryTo) || (categoryTo === '' && categoryFrom !== '')) {
            console.log('no to')
            categoryFromResponse = await fetch(`${API_URL}/${categoryFrom}?filters[${att}][$eq]=${value}`);
            categoryFromData = await categoryFromResponse.json();
            for (var i = 0; i < categoryFromData.data.length; i++) {
                resApp.push(categoryFromData.data[i].attributes);
            }
        } else if ((!categoryFrom && categoryTo) || (categoryFrom === '' && categoryTo !== '')) {
            console.log('no from')
            if (categoryTo === 'articoli_gdprs') {
                categoryFromResponse = await fetch(`${API_URL}/articoli-gdprs`);
            } else {
                categoryFromResponse = await fetch(`${API_URL}/${categoryTo}`);
            }
            categoryFromData = await categoryFromResponse.json();
            for (i = 0; i < categoryFromData.data.length; i++) {
                resApp.push(categoryFromData.data[i].attributes);
            }
        }
        else if ((categoryFrom && categoryTo) || (categoryFrom !== '' && categoryFrom !== '')) {
            if (categoryTo === categoryFrom) {
                console.log('uguali')
                if (categoryTo !== 'patterns') {
                    categoryFromResponse = await fetch(`${API_URL}/${categoryFrom}?filters[${att}][$eq]=${value}`);
                    categoryFromData = await categoryFromResponse.json();
                    categoryFromId = categoryFromData.data[0].id;
                    console.log(categoryFromData);
                    for (i = 0; i < categoryFromData.data.length; i++) {
                        resApp.push(categoryFromData.data[i].attributes);
                    }
                } else {
                    categoryFromResponse = await fetch(`${API_URL}/${categoryFrom}`);
                    categoryFromData = await categoryFromResponse.json();
                    for(i = 0; i < categoryFromData.data.length; i++){
                        if(categoryFromData.data[i].attributes.Name === value){
                            resApp.push(categoryFromData.data[i].attributes);
                        } else if(categoryFromData.data[i].attributes.Context === value){
                            resApp.push(categoryFromData.data[i].attributes);
                        } else if(categoryFromData.data[i].attributes.Description === value){
                            resApp.push(categoryFromData.data[i].attributes);
                        }
                    }
                }
            }
            else if (categoryTo !== categoryFrom && categoryTo !== 'patterns' && categoryFrom !== '' && categoryFrom !== 'patterns' && categoryTo !== '' && value !== '') {
                categoryFromResponse = await fetch(`${API_URL}/${categoryFrom}?filters[${att}][$eq]=${value}`);
                categoryFromData = await categoryFromResponse.json();
                categoryFromId = categoryFromData.data[0].id;
                if (categoryFrom === 'articoli-gdprs' && categoryTo === 'articoli_gdprs') {
                    for (i = 0; i < categoryFromData.data.length; i++) {
                        resApp.push(categoryFromData.data[i].attributes);
                    }
                } else {
                    if (categoryFrom === 'articoli-gdprs') {
                        patternsResponse = await fetch(`${API_URL}/patterns?filters[articoli_gdprs][id][$eq]=${categoryFromId}`);
                    } else {
                        patternsResponse = await fetch(`${API_URL}/patterns?filters[${categoryFrom}][id][$eq]=${categoryFromId}`);
                    }
                    patternsData = await patternsResponse.json();
                    patternIds = patternsData.data.map(pattern => pattern.id);
                    query = patternIds.map(id => `filters[patterns][id][$eq]=${id}`).join('&');
                    if (categoryTo === 'articoli_gdprs') {
                        CategoryToResponse = await fetch(`${API_URL}/articoli-gdprs?${query}`);
                    } else {
                        CategoryToResponse = await fetch(`${API_URL}/${categoryTo}?${query}`);
                    }
                    CategoryToData = await CategoryToResponse.json();
                    for (i = 0; i < CategoryToData.data.length; i++) {
                        resApp.push(CategoryToData.data[i].attributes);
                    }
                }
            }
            else if (categoryTo !== categoryFrom && categoryTo === 'patterns' && categoryTo !== '' && (categoryFrom !== '' || value !== '')) {
                console.log('diversi ma to patterns')
                categoryFromResponse = await fetch(`${API_URL}/${categoryFrom}?filters[${att}][$eq]=${value}`);
                categoryFromData = await categoryFromResponse.json();
                categoryFromId = categoryFromData.data[0].id;
                if (categoryFrom === 'articoli-gdprs') {
                    patternsResponse = await fetch(`${API_URL}/patterns?filters[articoli_gdprs][id][$eq]=${categoryFromId}`);
                } else {
                    patternsResponse = await fetch(`${API_URL}/patterns?filters[${categoryFrom}][id][$eq]=${categoryFromId}`);
                }
                patternsData = await patternsResponse.json();
                for (i = 0; i < patternsData.data.length; i++) {
                    resApp.push(patternsData.data[i].attributes);
                }
            } else if (categoryTo !== categoryFrom && categoryTo !== 'patterns' && categoryFrom === 'patterns' && categoryTo !== '') {
                console.log('diversi ma from patterns')
                categoryFromResponse = await fetch(`${API_URL}/${categoryFrom}`);
                categoryFromData = await categoryFromResponse.json();
                for(i = 0; i < categoryFromData.data.length; i++){
                    if(categoryFromData.data[i].attributes.Name === value){
                        patternIds = categoryFromData.data[i].id;
                    } else if(categoryFromData.data[i].attributes.Context === value){
                        patternIds = categoryFromData.data[i].id;
                    } else if(categoryFromData.data[i].attributes.Description === value){
                        patternIds = categoryFromData.data[i].id;
                    }
                }
                query = `filters[patterns][id][$eq]=${patternIds}`;
                if (categoryTo === 'articoli_gdprs') {
                    CategoryToResponse = await fetch(`${API_URL}/articoli-gdprs?${query}`);
                } else {
                    CategoryToResponse = await fetch(`${API_URL}/${categoryTo}?${query}`);
                }
                CategoryToData = await CategoryToResponse.json();
                for (i = 0; i < CategoryToData.data.length; i++) {
                    resApp.push(CategoryToData.data[i].attributes);
                }
            }
        }
        const filteredResApp = resApp.map(item => {
            const { createdAt, updatedAt, publishedAt, ...rest } = item;
            return rest;
        });
        const res = removeDuplicates(filteredResApp);
        setResults(res);
        const token = localStorage.getItem('token');
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
                const userData = await response.json();
                const requestData = {
                    data: {
                        Query: `${value}:${categoryTo}`,
                        username: `${userData.username}`
                    }
                };
                await axios.post(`${API_URL}/logs`, requestData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });
            } catch (error) {
                console.error('Error fetching or logging data:', error);
            }
        }
        setShowResults(true);
    }, [categoryFrom, categoryTo, value, att]);


    const removeDuplicates = (data) => {
        const seen = new Set();
        return data.filter(item => {
            const itemString = JSON.stringify(item);
            const isDuplicate = seen.has(itemString);
            seen.add(itemString);
            return !isDuplicate;
        });
    };



    const filterData = useCallback(() => {
        if (value.trim() !== '') {
            const lowerValue = value.toLowerCase().trim();

            const filteredArticles = dataArticles?.data.filter(item =>
                item.attributes.Articolo.toLowerCase().includes(lowerValue)
            ) || [];

            const filteredISOs = dataISOs?.data.filter(item =>
                item.attributes.Iso.toLowerCase().includes(lowerValue)
            ) || [];

            const filteredCWEs = dataCWEs?.data.filter(item =>
                item.attributes.Descrizione.toLowerCase().includes(lowerValue)
            ) || [];

            const filteredMVCs = dataMVCs?.data.filter(item =>
                item.attributes.MVC.toLowerCase().includes(lowerValue)
            ) || [];

            const filteredOWASPs = dataOWASPs?.data.filter(item =>
                item.attributes.owasp.toLowerCase().includes(lowerValue)
            ) || [];

            const filteredPatterns = dataPatterns?.data.filter(item =>
                item.attributes.Name.toLowerCase().includes(lowerValue) ||
                item.attributes.Context.toLowerCase().includes(lowerValue) ||
                item.attributes.Description.toLowerCase().includes(lowerValue)
            ) || [];

            const filteredPBDs = dataPBDs?.data.filter(item =>
                item.attributes.PBD.toLowerCase().includes(lowerValue)
            ) || [];

            const filteredStrategies = dataStrategies?.data.filter(item =>
                item.attributes.Name.toLowerCase().includes(lowerValue)
            ) || [];

            const allFilteredData = [
                ...filteredArticles.map(item => ({ ...item, type: 'Articolo' })),
                ...filteredISOs.map(item => ({ ...item, type: 'ISO' })),
                ...filteredCWEs.map(item => ({ ...item, type: 'CWE' })),
                ...filteredMVCs.map(item => ({ ...item, type: 'MVC' })),
                ...filteredOWASPs.map(item => ({ ...item, type: 'OWASP' })),
                ...filteredPatterns.map(item => ({ ...item, type: 'Pattern' })),
                ...filteredPBDs.map(item => ({ ...item, type: 'PBD' })),
                ...filteredStrategies.map(item => ({ ...item, type: 'Strategia' }))
            ];

            setFilteredData(allFilteredData);
        } else {
            setFilteredData([]);
        }
    }, [value, dataArticles, dataISOs, dataCWEs, dataMVCs, dataOWASPs, dataPatterns, dataPBDs, dataStrategies]);

    useEffect(() => {
        filterData();
    }, [value, dataArticles, dataISOs, dataCWEs, dataMVCs, dataOWASPs, dataPatterns, dataPBDs, dataStrategies, filterData]);

    const onChange = (e) => {
        setValue(e.target.value);
        if (e.target.value === '') {
            setAtt('');
            setCategoryFrom('');
        }
        setIsVisible(true);
    };

    const getItemLabel = useCallback((item) => {
        const handleAttributeClick = (attribute, category) => {
            setAtt(attribute);
            setCategoryFrom(category);
        };

        switch (item.type) {
            case 'Articolo':
                return [{ label: item.attributes.Articolo, onClick: () => handleAttributeClick('Articolo', 'articoli-gdprs') }];
            case 'ISO':
                return [{ label: item.attributes.Iso, onClick: () => handleAttributeClick('Iso', 'isos') }];
            case 'CWE':
                return [{ label: item.attributes.Descrizione, onClick: () => handleAttributeClick('Descrizione', 'cwes') }];
            case 'MVC':
                return [{ label: item.attributes.MVC, onClick: () => handleAttributeClick('MVC', 'mvcs') }];
            case 'OWASP':
                return [{ label: item.attributes.owasp, onClick: () => handleAttributeClick('owasp', 'owasps') }];
            case 'Pattern':
                return [
                    { label: item.attributes.Name, onClick: () => handleAttributeClick('Name', 'patterns') },
                    { label: item.attributes.Context, onClick: () => handleAttributeClick('Context', 'patterns') },
                    { label: item.attributes.Description, onClick: () => handleAttributeClick('Description', 'patterns') }
                ];
            case 'PBD':
                return [{ label: item.attributes.PBD, onClick: () => handleAttributeClick('PBD', 'pbds') }];
            case 'Strategia':
                return [{ label: item.attributes.Name, onClick: () => handleAttributeClick('Name', 'strategies') }];
            default:
                return [];
        }
    }, []);

    const menuItemStyle = {
        color: 'customTextColor.secondary',
        backgroundColor: 'primary.main',
        '&:hover': {
            backgroundColor: '#262032',
        },
        '&.Mui-selected': {
            backgroundColor: '#262032',
            fontWeight: 'bold',
        },
        '&.Mui-selected:hover': {
            backgroundColor: '#262032',
        }
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
        <div style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            marginTop: "31vh",
            alignItems: "center",
            boxSizing: "border-box",
            position: "relative",
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '90vh', position: 'relative', marginBottom: '1rem' }}>
                <IconButton
                    type="submit"
                    aria-label="search"
                    onClick={handleSearch}
                    sx={{
                        color: "customTextColor.secondary",
                        backgroundColor: "primary.main",
                        border: "1px solid #fa1e4e",
                        '&:hover': { boxShadow: '0px 0px 15px #fa1e4e' },
                        borderRadius: '5px',
                        height: '3.5rem',
                        margin: 1
                    }}
                >
                    <SearchIcon style={{ fill: "customTextColor.secondary", fontSize: "2rem" }} />
                </IconButton>
                <TextField
                    onChange={onChange}
                    value={value}
                    variant="outlined"
                    placeholder="Cerca nel PKB..."
                    type='search'
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'customTextColor.secondary',
                            },
                            '&:hover fieldset': {
                                borderColor: 'customTextColor.secondary',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'customTextColor.secondary',
                            },
                            '& input': {
                                color: 'customTextColor.secondary',
                                height: '3.5rem',
                                fontSize: '1rem',
                                padding: '10px 14px',
                                boxSizing: 'border-box',
                            },
                        },
                        '& .MuiInputLabel-outlined': {
                            color: 'customTextColor.secondary',
                        },
                        '& .MuiInputLabel-outlined.Mui-focused': {
                            color: 'customTextColor.secondary',
                        },
                        width: "100%",
                    }}
                />
                <FormControl sx={{ m: 1, minWidth: 150 }}>
                    <Select
                        onChange={handleChange}
                        value={categoryTo}
                        displayEmpty
                        sx={{
                            color: 'customTextColor.secondary',
                            border: '1px solid customTextColor.main',
                            fontWeight: 'bold',
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'customTextColor.main',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'customTextColor.main',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'customTextColor.main',
                                boxShadow: '0px 0px 15px #fa1e4e'
                            },
                            '& .MuiSvgIcon-root': {
                                color: 'customTextColor.main',
                            },
                            '& .MuiSelect-select': {
                                backgroundColor: 'primary.main',
                                color: 'customTextColor.secondary',
                            },
                            '&:hover': { boxShadow: '0px 0px 15px #fa1e4e' }
                        }}
                    >
                        <MenuItem value="" sx={menuItemStyle}> Category </MenuItem>
                        <MenuItem value="articoli_gdprs" sx={menuItemStyle}> Article </MenuItem>
                        <MenuItem value="isos" sx={menuItemStyle}> ISO </MenuItem>
                        <MenuItem value="cwes" sx={menuItemStyle}> CWE </MenuItem>
                        <MenuItem value="mvcs" sx={menuItemStyle}> MVC </MenuItem>
                        <MenuItem value="owasps" sx={menuItemStyle}> OWASP </MenuItem>
                        <MenuItem value="patterns" sx={menuItemStyle}> Pattern </MenuItem>
                        <MenuItem value="pbds" sx={menuItemStyle}> PBD </MenuItem>
                        <MenuItem value="strategies" sx={menuItemStyle}> Strategy </MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{
                width: '90vh',
                maxHeight: '50vh',
                overflowY: 'auto',
                borderRadius: '5px',
            }}>
                {isVisible && value && filteredData.map(item =>
                    getItemLabel(item).map((label, index) => (
                        <ListItemButton
                            onClick={() => {
                                setValue(label.label);
                                if (label.onClick) label.onClick();
                                setIsVisible(false);
                            }}
                            key={`${item.type}-${item.id}-${index}`}
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "100%",
                                backgroundColor: "primary.main",
                                color: "customTextColor.secondary",
                                '&:hover': {
                                    color: "customTextColor.secondary",
                                    backgroundColor: "#262032"
                                },
                                marginBottom: 1
                            }}
                        >
                            <Typography sx={{
                                fontSize: "1rem",
                                color: "customTextColor.secondary",
                                margin: 1,
                                flexGrow: 1,
                                textAlign: 'left'
                            }}>
                                {label.label}
                            </Typography>
                            <Typography sx={{
                                fontSize: "1rem",
                                color: "customTextColor.faded",
                                margin: 1,
                                flexGrow: 1,
                                textAlign: 'right'
                            }}>
                                {item.type}
                            </Typography>
                        </ListItemButton>
                    ))
                )}
            </Box>
            <Box>
                <IconButton onClick={toggleResults} sx={{ color: '#ffffff', marginBottom: '10px' }}>
                    {showResults && <CloseIcon />}
                    {!showResults && results[0] && <ExpandMoreIcon />}
                </IconButton>
                {showResults && (
                    <Box sx={{ overflowY: 'auto', marginTop: '10px' }}>
                        <Grid container spacing={1} style={{ width: '150vh', padding: 10, height: '30vh' }}>
                            {results.map((item, index) => (
                                <Grid item xs={12} sm={4} md={4} key={index}>
                                    <Card
                                        style={{ height: '20vh', backgroundColor: '#1b1724', color: '#e7edf1', boxShadow: '0px 5px 10px #000000', cursor: 'pointer' }}
                                        onClick={() => handleOpen(item)}
                                    >
                                        <CardContent>
                                            {Object.keys(item).map((key) => (
                                                <Typography key={key} variant="body2" component="p">
                                                    {key}: {item[key]}
                                                </Typography>
                                            ))}
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}
                <Modal open={open} onClose={handleClose}>
                    <Box sx={modalStyle}>
                        <IconButton
                            onClick={handleClose}
                            sx={{ position: 'absolute', top: 8, right: 8, color: '#ffffff' }}
                        >
                            <CloseIcon />
                        </IconButton>
                        {localStorage.getItem('token') && (categoryTo === 'patterns' || (categoryFrom === 'patterns' && (categoryTo === '' || !categoryTo)))  &&
                        <IconButton
                            onClick={() => handleBookmarkClick(selectedItem)}
                            sx={{ color: 'customTextColor.main' }}
                        >
                            {isSaved
                            ? <Tooltip title="Saved"><BookmarkIcon /></Tooltip> : <Tooltip title="Save"><BookmarkBorderIcon /></Tooltip>}
                        </IconButton>}
                        <Typography id="modal-title" variant="h4" component="h4" color="customTextColor.main" sx={{ paddingBottom: 1 }}>
                            Details
                        </Typography>
                        {selectedItem && (
                            <CardContent>
                                {Object.keys(selectedItem).map((key) => (
                                    <Typography key={key} variant="body2" component="div"><br></br>
                                        <Typography color="customTextColor.main">{key}:</Typography>
                                        {selectedItem[key]}
                                    </Typography>
                                ))}
                            </CardContent>
                        )}
                    </Box>
                </Modal>
            </Box>
        </div>
    );
}
