import useSWR, { mutate } from "swr";

// Define the fetcher function to handle GET requests
const fetcher = (...args) => fetch(...args).then(res => res.json());

// Custom hook to fetch data with optional method and payload
export const useDataFetching = (url) => {
    const { data, error, isValidating } = useSWR(url, fetcher);

    // Function to handle POST requests
    const postData = async (postUrl, payload) => {
        try {
            const res = await fetch(postUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await res.json();
            // Mutate the SWR cache to update data after the POST request
            mutate(url);
            return result;
        } catch (err) {
            console.error('Error in POST request:', err);
            throw err;
        }
    };

    return {
        data,
        error,
        isLoading: !data && !error,
        isValidating,
        mutate,
        postData, // Include the postData function in the returned object
    };
};
