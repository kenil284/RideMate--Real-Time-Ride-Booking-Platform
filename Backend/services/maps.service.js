import axios from "axios"

//for ORS API
// export const getSuggestionsService = async (input) => {

//     if (!input || input.trim().length < 3) {
//         return [];
//     }

//     try {
//         const response = await axios.get(
//             "https://api.openrouteservice.org/geocode/autocomplete",
//             {
//                 headers: {
//                     Authorization: process.env.ORS_API_KEY,
//                 },
//                 params: {
//                     text: input,
//                     size: 5,
//                     "boundary.country": "IND",

//                     // optional Surat focus
//                     "focus.point.lat": 21.1702,
//                     "focus.point.lon": 72.8311,
//                 },
//             }
//         );

//         console.log(response.data.features)

//         const suggestions = response.data.features.map((item) => {
//             const props = item.properties;
//             const [lng, lat] = item.geometry.coordinates;

//             const buildDetailedAddress = (props) => {
//                 const parts = [
//                     props.housenumber && props.street
//                         ? `${props.housenumber}, ${props.street}`
//                         : props.street,

//                     props.neighbourhood,
//                     props.borough,
//                     props.localadmin,
//                     props.locality,
//                     props.county,
//                     props.region,
//                     props.postalcode,
//                     props.country,
//                 ].filter(Boolean);

//                 return [...new Set(parts)].join(", ");
//             };

//             return {
//                 title: props.name || props.label,
//                 address: buildDetailedAddress(props) || props.label,
//                 fullAddress: props.label,
//                 lat,
//                 lng,
//             };
//         });

//         return suggestions;

//     } catch (error) {
//         console.error("Error fetching suggestions:", error.response?.data || error.message);
//     }
// };


export const getSuggestionsService = async (input) => {
    if (!input || input.trim().length < 3) {
        return [];
    }

    const cleanInput = input.replace(/"/g, "").trim();

    const response = await axios.get(
        "https://api.geoapify.com/v1/geocode/autocomplete",
        {
            params: {
                text: cleanInput,
                apiKey: process.env.GEOAPIFY_API_KEY,
                limit: 8,

                // restrict to India
                filter: "countrycode:in",

                // prefer Surat results
                bias: "proximity:72.8311,21.1702",
            },
        }
    );


    const suggestions = response.data.features.map((item) => {
        const props = item.properties;
        const [lng, lat] = item.geometry.coordinates;

        return {
            title:
                props.address_line1 ||
                props.name ||
                props.street ||
                props.city ||
                "Unknown location",

            address:
                props.address_line2 ||
                props.formatted ||
                "",

            fullAddress: props.formatted || "",

            lat,
            lng,

            city: props.city || "",
            state: props.state || "",
            postcode: props.postcode || "",
            country: props.country || "",
            placeId: props.place_id || "",
        };
    });

    return suggestions;
};

export const getDistanceTimeService = async ({pickupLat,pickupLng,destinationLat,destinationLng,mode = "drive"}) => {

    if (!pickupLat || !pickupLng || !destinationLat || !destinationLng) {
        throw new Error("Pickup and destination coordinates are required");
    }

    const response = await axios.get("https://api.geoapify.com/v1/routing", {
        params: {
            waypoints: `${pickupLat},${pickupLng}|${destinationLat},${destinationLng}`,
            mode: mode,
            apiKey: process.env.GEOAPIFY_API_KEY,
        },
    });

    const route = response.data.features?.[0];

    if (!route) {
        throw new Error("Route not found");
    }

    const distanceMeters = route.properties.distance;
    const durationSeconds = route.properties.time;

    const distanceKm = Number((distanceMeters / 1000).toFixed(2));
    const durationMin = Math.ceil(durationSeconds / 60);

    const routeCoordinates = route.geometry.coordinates.map((coord) => {
        const [lng, lat] = coord;
        return [lat, lng];
    });

    return {
        distanceMeters,
        distanceKm,
        durationSeconds,
        durationMin,
        routeCoordinates,
    };
};


export const getAddressFromCoordinatesService = async ({ lat, lng }) => {
    const response = await axios.get(
        "https://api.geoapify.com/v1/geocode/reverse",
        {
            params: {
                lat,
                lon: lng,
                apiKey: process.env.GEOAPIFY_API_KEY,
            },
        }
    );

    const item = response.data.features[0];

    if (!item) {
        return {
            title: "Current Location",
            address: "",
            fullAddress: "Current Location",
            lat,
            lng,
        };
    }

    const props = item.properties;

    return {
        title:
            props.address_line1 ||
            props.name ||
            props.street ||
            props.city ||
            "Current Location",

        address:
            props.address_line2 ||
            props.formatted ||
            "",

        fullAddress: props.formatted || "Current Location",

        lat,
        lng,

        city: props.city || "",
        state: props.state || "",
        postcode: props.postcode || "",
        country: props.country || "",
        placeId: props.place_id || "",
    };
};