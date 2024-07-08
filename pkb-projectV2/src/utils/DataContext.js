import React, { createContext, useContext, useEffect } from 'react';
import { API_URL } from '../constants';
import { useDataFetching } from './dataFetching';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const { data: dataArticles, error: errorArticles } = useDataFetching(`${API_URL}/articoli-gdprs`);
    const { data: dataISOs, error: errorISOs } = useDataFetching(`${API_URL}/isos`);
    const { data: dataCWEs, error: errorCWEs } = useDataFetching(`${API_URL}/cwes`);
    const { data: dataMVCs, error: errorMVCs } = useDataFetching(`${API_URL}/mvcs`);
    const { data: dataOWASPs, error: errorOWASPs } = useDataFetching(`${API_URL}/owasps`);
    const { data: dataPatterns, error: errorPatterns } = useDataFetching(`${API_URL}/patterns`);
    const { data: dataPBDs, error: errorPBDs } = useDataFetching(`${API_URL}/pbds`);
    const { data: dataStrategies, error: errorStrategies } = useDataFetching(`${API_URL}/strategies`);

    useEffect(() => {
        if (errorArticles || errorISOs || errorCWEs || errorMVCs || errorOWASPs || errorPatterns || errorPBDs || errorStrategies) {
            console.error('Error fetching data:', errorArticles || errorISOs || errorCWEs || errorMVCs || errorOWASPs || errorPatterns || errorPBDs || errorStrategies);
        }
    }, [errorArticles, errorISOs, errorCWEs, errorMVCs, errorOWASPs, errorPatterns, errorPBDs, errorStrategies]);

    const isLoading = !dataArticles || !dataISOs || !dataCWEs || !dataOWASPs || !dataMVCs || !dataPBDs || !dataPatterns || !dataStrategies;

    return (
        <DataContext.Provider value={{ dataArticles, dataISOs, dataCWEs, dataMVCs, dataOWASPs, dataPatterns, dataPBDs, dataStrategies, isLoading }}>
            {children}
        </DataContext.Provider>
    );
};

export const useDataContext = () => useContext(DataContext);
