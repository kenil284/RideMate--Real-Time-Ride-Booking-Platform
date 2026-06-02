import { useEffect, useState } from "react";
import { getLocationSuggestions } from "../Service/location.api";

const useLocationSearch = ({ stage, activeField, rideData }) => {
    const [suggestions, setSuggestions] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const searchValue = rideData[activeField]?.address || "";

    useEffect(() => {
        if (stage !== "search") return;

        if (!searchValue.trim() || searchValue.trim().length < 2) {
            setSuggestions([]);
            return;
        }

        const timer = setTimeout(async () => {
            try {
                setIsSearching(true);

                const data = await getLocationSuggestions(searchValue);

                setSuggestions(data);
            } catch (error) {
                setSuggestions([]);
            } finally {
                setIsSearching(false);
            }
        }, 400);

        return () => clearTimeout(timer);
    }, [searchValue, stage]);

    return {
        searchValue,
        suggestions,
        isSearching,
    };
};

export default useLocationSearch;