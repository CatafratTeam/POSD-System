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
import { useDataFetching } from "../utils/dataFetching";
import { useLazyQuery } from '@apollo/client';
import * as queries from '../utils/queries';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const useDynamicQuery = (categoryFrom, att, value, categoryTo) => {
    const [executeQuery, { data, loading, error }] = useLazyQuery(queries.QUERY_GET_ARTICOLO);
    useEffect(() => {
        let queryToExecute = null;
        switch (categoryTo) {
            case 'articoli_gdprs':
                switch (categoryFrom) {
                    case 'articoliGdprs': queryToExecute = queries.QUERY_GET_ARTICOLO; break;
                    case 'isos': queryToExecute = queries.QUERY_ISO_TO_ARTICOLOGDPR; break;
                    case 'cwes': queryToExecute = queries.QUERY_CWE_TO_ARTICOLOGDPR; break;
                    case 'mvcs': queryToExecute = queries.QUERY_MVC_TO_ARTICOLOGDPR; break;
                    case 'owasps': queryToExecute = queries.QUERY_OWASP_TO_ARTICOLOGDPR; break;
                    case 'patterns':
                        switch (att) {
                            case 'Name': queryToExecute = queries.QUERY_PATTERNNAME_TO_ARTICOLOGDPR; break;
                            case 'Context': queryToExecute = queries.QUERY_PATTERNCONTEXT_TO_ARTICOLOGDPR; break;
                            case 'Description': queryToExecute = queries.QUERY_PATTERNDESCRIPTION_TO_ARTICOLOGDPR; break;
                            default:
                        } break;
                    case 'pbds': queryToExecute = queries.QUERY_PBD_TO_ARTICOLOGDPR; break;
                    case 'strategies': queryToExecute = queries.QUERY_STRATEGIA_TO_ARTICOLOGDPR; break;
                    default: queryToExecute = queries.QUERY_GET_ALL_ARTICOLO;
                } break;

            case 'isos':
                switch (categoryFrom) {
                    case 'articoliGdprs': queryToExecute = queries.QUERY_ARTICOLO_TO_ISO; break;
                    case 'isos': queryToExecute = queries.QUERY_GET_ISO; break;
                    case 'cwes': queryToExecute = queries.QUERY_CWE_DESCRIPTION_TO_ISO; break;
                    case 'mvcs': queryToExecute = queries.QUERY_MVC_TO_ISO; break;
                    case 'owasps': queryToExecute = queries.QUERY_OWASP_TO_ISO; break;
                    case 'patterns':
                        switch (att) {
                            case 'Name': queryToExecute = queries.QUERY_PATTERN_NAME_TO_ISO; break;
                            case 'Context': queryToExecute = queries.QUERY_PATTERN_CONTEXT_TO_ISO; break;
                            case 'Description': queryToExecute = queries.QUERY_PATTERN_DESCRIPTION_TO_ISO; break;
                            default:
                        } break;
                    case 'pbds': queryToExecute = queries.QUERY_PBD_TO_ISO; break;
                    case 'strategies': queryToExecute = queries.QUERY_STRATEGIA_NAME_TO_ISO; break;
                    default: queryToExecute = queries.QUERY_GET_ALL_ISO;
                } break;

            case 'cwes':
                switch (categoryFrom) {
                    case 'articoliGdprs': queryToExecute = queries.QUERY_ARTICOLO_TO_CWE; break;
                    case 'isos': queryToExecute = queries.QUERY_ISO_TO_CWE; break;
                    case 'cwes': queryToExecute = queries.QUERY_GET_CWE; break;
                    case 'mvcs': queryToExecute = queries.QUERY_MVC_TO_CWE; break;
                    case 'owasps': queryToExecute = queries.QUERY_OWASP_TO_CWE; break;
                    case 'patterns':
                        switch (att) {
                            case 'Name': queryToExecute = queries.QUERY_PATTERN_NAME_TO_CWE; break;
                            case 'Context': queryToExecute = queries.QUERY_PATTERN_CONTEXT_TO_CWE; break;
                            case 'Description': queryToExecute = queries.QUERY_PATTERN_DESCRIPTION_TO_CWE; break;
                            default:
                        } break;
                    case 'pbds': queryToExecute = queries.QUERY_PBD_TO_CWE; break;
                    case 'strategies': queryToExecute = queries.QUERY_STRATEGY_NAME_TO_CWE; break;
                    default: queryToExecute = queries.QUERY_GET_ALL_CWE;
                } break;

            case 'mvcs':
                switch (categoryFrom) {
                    case 'articoliGdprs': queryToExecute = queries.QUERY_ARTICOLO_TO_MVC; break;
                    case 'isos': queryToExecute = queries.QUERY_ISO_TO_MVC; break;
                    case 'cwes': queryToExecute = queries.QUERY_CWE_DESCRIPTION_TO_MVC; break;
                    case 'mvcs': queryToExecute = queries.QUERY_GET_MVC; break;
                    case 'owasps': queryToExecute = queries.QUERY_OWASP_TO_MVC; break;
                    case 'patterns':
                        switch (att) {
                            case 'Name': queryToExecute = queries.QUERY_PATTERN_NAME_TO_MVC; break;
                            case 'Context': queryToExecute = queries.QUERY_PATTERN_CONTEXT_TO_MVC; break;
                            case 'Description': queryToExecute = queries.QUERY_PATTERN_DESCRIPTION_TO_MVC; break;
                            default:
                        } break;
                    case 'pbds': queryToExecute = queries.QUERY_PBD_TO_MVC; break;
                    case 'strategies': queryToExecute = queries.QUERY_STRATEGY_NAME_TO_MVC; break;
                    default: queryToExecute = queries.QUERY_GET_ALL_MVC;
                } break;

            case 'owasps':
                switch (categoryFrom) {
                    case 'articoliGdprs': queryToExecute = queries.QUERY_ARTICOLO_TO_OWASP; break;
                    case 'isos': queryToExecute = queries.QUERY_ISO_TO_OWASP; break;
                    case 'cwes': queryToExecute = queries.QUERY_CWE_DESCRIPTION_TO_OWASP; break;
                    case 'mvcs': queryToExecute = queries.QUERY_MVC_TO_OWASP; break;
                    case 'owasps': queryToExecute = queries.QUERY_GET_OWASP; break;
                    case 'patterns':
                        switch (att) {
                            case 'Name': queryToExecute = queries.QUERY_PATTERN_NAME_TO_OWASP; break;
                            case 'Context': queryToExecute = queries.QUERY_PATTERN_CONTEXT_TO_OWASP; break;
                            case 'Description': queryToExecute = queries.QUERY_PATTERN_DESCRIPTION_TO_OWASP; break;
                            default:
                        } break;
                    case 'pbds': queryToExecute = queries.QUERY_PBD_TO_OWASP; break;
                    case 'strategies': queryToExecute = queries.QUERY_STRATEGY_NAME_TO_OWASP; break;
                    default: queryToExecute = queries.QUERY_GET_ALL_OWASP;
                } break;

            case 'patterns':
                switch (categoryFrom) {
                    case 'articoliGdprs': queryToExecute = queries.QUERY_ARTICOLO_TO_PATTERN; break;
                    case 'isos': queryToExecute = queries.QUERY_ISO_TO_PATTERN; break;
                    case 'cwes': queryToExecute = queries.QUERY_CWE_TO_PATTERN; break;
                    case 'mvcs': queryToExecute = queries.QUERY_MVC_TO_PATTERN; break;
                    case 'owasps': queryToExecute = queries.QUERY_OWASP_TO_PATTERN; break;
                    case 'patterns':
                        switch (att) {
                            case 'Name': queryToExecute = queries.QUERY_GET_PATTERN_NAME; break;
                            case 'Context': queryToExecute = queries.QUERY_GET_PATTERN_CONTEXT; break;
                            case 'Description': queryToExecute = queries.QUERY_GET_PATTERN_DESCRIPTION; break;
                            default:
                        } break;
                    case 'pbds': queryToExecute = queries.QUERY_PBD_TO_PATTERN; break;
                    case 'strategies': queryToExecute = queries.QUERY_STRATEGY_NAME_TO_PATTERN; break;
                    default: queryToExecute = queries.QUERY_GET_ALL_PATTERN;
                } break;

            case 'pbds':
                switch (categoryFrom) {
                    case 'articoliGdprs': queryToExecute = queries.QUERY_ARTICOLO_TO_PBD; break;
                    case 'isos': queryToExecute = queries.QUERY_ISO_TO_PBD; break;
                    case 'cwes': queryToExecute = queries.QUERY_CWE_TO_PBD; break;
                    case 'mvcs': queryToExecute = queries.QUERY_MVC_TO_PBD; break;
                    case 'owasps': queryToExecute = queries.QUERY_OWASP_TO_PBD; break;
                    case 'patterns':
                        switch (att) {
                            case 'Name': queryToExecute = queries.QUERY_PATTERN_NAME_TO_PBD; break;
                            case 'Context': queryToExecute = queries.QUERY_PATTERN_CONTEXT_TO_PBD; break;
                            case 'Description': queryToExecute = queries.QUERY_PATTERN_DESCRIPTION_TO_PBD; break;
                            default:
                        } break;
                    case 'pbds': queryToExecute = queries.QUERY_GET_PBD; break;
                    case 'strategies': queryToExecute = queries.QUERY_STRATEGY_NAME_TO_PBD; break;
                    default: queryToExecute = queries.QUERY_GET_ALL_PBD;
                } break;

            case 'strategies':
                switch (categoryFrom) {
                    case 'articoliGdprs': queryToExecute = queries.QUERY_ARTICOLO_TO_STRATEGY; break;
                    case 'isos': queryToExecute = queries.QUERY_ISO_TO_STRATEGY; break;
                    case 'cwes': queryToExecute = queries.QUERY_CWE_TO_STRATEGY; break;
                    case 'mvcs': queryToExecute = queries.QUERY_MVC_TO_STRATEGY; break;
                    case 'owasps': queryToExecute = queries.QUERY_OWASP_TO_STRATEGY; break;
                    case 'patterns':
                        switch (att) {
                            case 'Name': queryToExecute = queries.QUERY_PATTERN_NAME_TO_STRATEGY; break;
                            case 'Context': queryToExecute = queries.QUERY_PATTERN_CONTEXT_TO_STRATEGY; break;
                            case 'Description': queryToExecute = queries.QUERY_PATTERN_DESCRIPTION_TO_STRATEGY; break;
                            default:
                        } break;
                    case 'pbds': queryToExecute = queries.QUERY_PBD_TO_STRATEGY; break;
                    case 'strategies': queryToExecute = queries.QUERY_GET_STRATEGY; break;
                    default: queryToExecute = queries.QUERY_GET_ALL_STRATEGY;
                } break;

            default:
                switch (categoryFrom) {
                    case 'articoliGdprs': queryToExecute = queries.QUERY_GET_ARTICOLO; break;
                    case 'isos': queryToExecute = queries.QUERY_GET_ISO; break;
                    case 'cwes': queryToExecute = queries.QUERY_GET_CWE; break;
                    case 'mvcs': queryToExecute = queries.QUERY_GET_MVC; break;
                    case 'owasps': queryToExecute = queries.QUERY_GET_OWASP; break;
                    case 'patterns':
                        switch (att) {
                            case 'Name': queryToExecute = queries.QUERY_GET_PATTERN_NAME; break;
                            case 'Context': queryToExecute = queries.QUERY_GET_PATTERN_CONTEXT; break;
                            case 'Description': queryToExecute = queries.QUERY_GET_PATTERN_DESCRIPTION; break;
                            default:
                        } break;
                    case 'pbds': queryToExecute = queries.QUERY_GET_PBD; break;
                    case 'strategies': queryToExecute = queries.QUERY_GET_STRATEGY; break;
                    default:
                }
        }
        if (queryToExecute) {
            executeQuery({ query: queryToExecute, variables: { value } });
        }
    }, [categoryTo, categoryFrom, att, value, executeQuery]);
    return {
        data,
        loading,
        error
    };
};

export default function SearchBar() {
    const [value, setValue] = useState('');
    const [categoryTo, setCategoryTo] = useState('');
    const [categoryFrom, setCategoryFrom] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [att, setAtt] = useState('');
    const { data, loading, error } = useDynamicQuery(categoryFrom, att, value, categoryTo);
    const [results, setResults] = useState([])
    const [isVisible, setIsVisible] = useState(true);
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showResults, setShowResults] = useState(true);


    const { data: Articles, error: errorArticles } = useDataFetching(`${API_URL}/articoli-gdprs`);
    const { data: ISOs, error: errorISOs } = useDataFetching(`${API_URL}/isos`);
    const { data: CWEs, error: errorCWEs } = useDataFetching(`${API_URL}/cwes`);
    const { data: MVCs, error: errorMVCs } = useDataFetching(`${API_URL}/mvcs`);
    const { data: OWASPs, error: errorOWASPs } = useDataFetching(`${API_URL}/owasps`);
    const { data: Patterns, error: errorPatterns } = useDataFetching(`${API_URL}/patterns`);
    const { data: PBDs, error: errorPBDs } = useDataFetching(`${API_URL}/pbds`);
    const { data: Strategies, error: errorStrategies } = useDataFetching(`${API_URL}/strategies`);

    useEffect(() => {
        if (errorArticles || errorISOs || errorCWEs || errorMVCs || errorOWASPs || errorPatterns || errorPBDs || errorStrategies) {
            console.error('Error fetching data:', errorArticles || errorISOs || errorCWEs || errorMVCs || errorOWASPs || errorPatterns || errorPBDs || errorStrategies);
        }
    }, [errorArticles, errorISOs, errorCWEs, errorMVCs, errorOWASPs, errorPatterns, errorPBDs, errorStrategies]);

    const handleChange = (event) => {
        setCategoryTo(event.target.value);
    };

    const handleClose = () => setOpen(false);
    const handleOpen = (item) => {
        setSelectedItem(item);
        setOpen(true);
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
        if (!loading && !error && data) {
            setIsVisible(false);
            console.log("Data received:", data);
            const resApp = [];
            var categoryDataFrom;
            if (categoryFrom) {
                categoryDataFrom = data?.[categoryFrom]?.data?.[0]?.attributes;
            } else {
                categoryDataFrom = data?.['patterns']?.data?.[0]?.attributes;
            }


            switch (categoryFrom) {
                case 'patterns':
                    switch (categoryTo) {
                        case '': case 'patterns':
                            resApp.push(categoryDataFrom);
                            break;
                        default:
                            let length = categoryDataFrom[categoryTo].data.length;
                            for (let i = 0; i < length; i++) {
                                resApp.push(categoryDataFrom[categoryTo].data[i].attributes);
                            }
                            break;
                    }
                    break;
                case '':
                    if (categoryTo === 'articoli_gdprs') {
                        let length = data['articoliGdprs'].data.length;
                        for (let i = 0; i < length; i++) {
                            resApp.push(data['articoliGdprs'].data[i].attributes);
                        }
                    } else {
                        let length = data?.[categoryTo]?.data?.length;
                        for (let i = 0; i < length; i++) {
                            resApp.push(data?.[categoryTo]?.data?.[i]?.attributes);
                        }
                    }
                    break;
                default:
                    if ((categoryTo === categoryFrom) || (categoryTo === 'articoli_gdprs' && categoryFrom === 'articoliGdprs')) {
                        resApp.push(categoryDataFrom);
                    }
                    else {
                        let lengthP;
                        switch (categoryTo) {
                            case '':
                                resApp.push(categoryDataFrom);
                                break;
                            case 'patterns':
                                let length = categoryDataFrom[categoryTo]?.data?.length;
                                for (let i = 0; i < length; i++) {
                                    resApp.push(categoryDataFrom[categoryTo].data[i].attributes);
                                }
                                break;
                            case 'articoli_gdprs':
                                lengthP = categoryDataFrom.patterns.data.length;
                                let lengthA;
                                for (let i = 0; i < lengthP; i++) {
                                    lengthA = categoryDataFrom.patterns.data[i].attributes.articoli_gdprs.data.length;
                                    for (let j = 0; j < lengthA; j++) {
                                        resApp.push(categoryDataFrom.patterns.data[i].attributes.articoli_gdprs.data[j].attributes);
                                    }
                                }
                                break;
                            case 'isos':
                                lengthP = categoryDataFrom.patterns.data.length;
                                let lengthI;
                                for (let i = 0; i < lengthP; i++) {
                                    lengthI = categoryDataFrom.patterns.data[i].attributes.isos.data.length;
                                    for (let j = 0; j < lengthI; j++) {
                                        resApp.push(categoryDataFrom.patterns.data[i].attributes.isos.data[j].attributes);
                                    }
                                }
                                break;
                            case 'cwes':
                                lengthP = categoryDataFrom.patterns.data.length;
                                let lengthC;
                                for (let i = 0; i < lengthP; i++) {
                                    lengthC = categoryDataFrom.patterns.data[i].attributes.cwes.data.length;
                                    for (let j = 0; j < lengthC; j++) {
                                        resApp.push(categoryDataFrom.patterns.data[i].attributes.cwes.data[j].attributes);
                                    }
                                }
                                break;
                            case 'mvcs':
                                lengthP = categoryDataFrom.patterns.data.length;
                                let lengthM;
                                for (let i = 0; i < lengthP; i++) {
                                    lengthM = categoryDataFrom.patterns.data[i].attributes.mvcs.data.length;
                                    for (let j = 0; j < lengthM; j++) {
                                        resApp.push(categoryDataFrom.patterns.data[i].attributes.mvcs.data[j].attributes);
                                    }
                                }
                                break;
                            case 'owasps':
                                lengthP = categoryDataFrom.patterns.data.length;
                                let lengthO;
                                for (let i = 0; i < lengthP; i++) {
                                    lengthO = categoryDataFrom.patterns.data[i].attributes.owasps.data.length;
                                    for (let j = 0; j < lengthO; j++) {
                                        resApp.push(categoryDataFrom.patterns.data[i].attributes.owasps.data[j].attributes);
                                    }
                                }
                                break;
                            case 'strategies':
                                lengthP = categoryDataFrom.patterns.data.length;
                                let lengthS;
                                for (let i = 0; i < lengthP; i++) {
                                    lengthS = categoryDataFrom.patterns.data[i].attributes.strategies.data.length;
                                    for (let j = 0; j < lengthS; j++) {
                                        resApp.push(categoryDataFrom.patterns.data[i].attributes.strategies.data[j].attributes);
                                    }
                                }
                                break;
                            case 'pbds':
                                lengthP = categoryDataFrom.patterns.data.length;
                                let lengthPb;
                                for (let i = 0; i < lengthP; i++) {
                                    lengthPb = categoryDataFrom.patterns.data[i].attributes.pbds.data.length;
                                    for (let j = 0; j < lengthPb; j++) {
                                        resApp.push(categoryDataFrom.patterns.data[i].attributes.pbds.data[j].attributes);
                                    }
                                }
                                break;
                            default: console.log("Unexpected value of categoyTo");
                        }
                    }
            }
            const res = removeDuplicates(resApp);
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
                    const logResponse = await axios.post(`${API_URL}/logs`, requestData, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        }
                    });
                    console.log("Log response:", logResponse.data);
                } catch (error) {
                    console.error('Error fetching or logging data:', error);
                }
            }
        }
    }, [error, loading, data, categoryFrom, categoryTo, value]);


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

            const filteredArticles = Articles?.data.filter(item =>
                item.attributes.Articolo.toLowerCase().includes(lowerValue)
            ) || [];

            const filteredISOs = ISOs?.data.filter(item =>
                item.attributes.Iso.toLowerCase().includes(lowerValue)
            ) || [];

            const filteredCWEs = CWEs?.data.filter(item =>
                item.attributes.Descrizione.toLowerCase().includes(lowerValue)
            ) || [];

            const filteredMVCs = MVCs?.data.filter(item =>
                item.attributes.MVC.toLowerCase().includes(lowerValue)
            ) || [];

            const filteredOWASPs = OWASPs?.data.filter(item =>
                item.attributes.owasp.toLowerCase().includes(lowerValue)
            ) || [];

            const filteredPatterns = Patterns?.data.filter(item =>
                item.attributes.Name.toLowerCase().includes(lowerValue) ||
                item.attributes.Context.toLowerCase().includes(lowerValue) ||
                item.attributes.Description.toLowerCase().includes(lowerValue)
            ) || [];

            const filteredPBDs = PBDs?.data.filter(item =>
                item.attributes.PBD.toLowerCase().includes(lowerValue)
            ) || [];

            const filteredStrategies = Strategies?.data.filter(item =>
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
    }, [value, Articles, ISOs, CWEs, MVCs, OWASPs, Patterns, PBDs, Strategies]);

    useEffect(() => {
        filterData();
    }, [value, Articles, ISOs, CWEs, MVCs, OWASPs, Patterns, PBDs, Strategies, filterData]);

    const onChange = (e) => {
        setValue(e.target.value);
        setIsVisible(true);
    };

    const getItemLabel = useCallback((item) => {
        const handleAttributeClick = (attribute, category) => {
            setAtt(attribute);
            setCategoryFrom(category);
        };

        switch (item.type) {
            case 'Articolo':
                return [{ label: item.attributes.Articolo, onClick: () => handleAttributeClick('Articolo', 'articoliGdprs') }];
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
                    type="search"
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
                <FormControl sx={{ m: 1, minWidth: 150}}>
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
                        <MenuItem value="" sx={menuItemStyle}> Categoria </MenuItem>
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
                {!showResults && <ExpandMoreIcon />}
            </IconButton>
            {showResults && (
                <Box sx={{ overflowY: 'auto', marginTop: '10px' }}>
                    <Grid container spacing={1} style={{ width: '150vh', padding: 10, height: '30vh' }}>
                        {results.map((item, index) => (
                            <Grid item xs={12} sm={4} md={4} key={index}>
                                <Card
                                    style={{ height: '20vh', backgroundColor: '#1b1724', color: '#e7edf1', boxShadow: '0px 5px 10px #000000' }}
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
                    <Typography id="modal-title" variant="h4" component="h4" color="customTextColor.main" sx={{ paddingBottom: 1 }}>
                        Details
                    </Typography>
                    {selectedItem && (
                        <CardContent>
                            {Object.keys(selectedItem).map((key) => (
                                <Typography key={key} variant="body2" component="p"><br></br>
                                    <Typography color = "customTextColor.main">{key}:</Typography>
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
