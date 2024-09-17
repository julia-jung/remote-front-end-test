import React, { useState, useEffect } from 'react';
import PropertyCard from '../PropertyCard';
import './PropertyListing.scss';

const PropertyListing = () => {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        const fetchAllProperties = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/properties');

                if (!response.ok) {
                    throw new Error(`Request failed with status ${response.status}`);
                }
                const allProperties = await response.json();
                setProperties(allProperties);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchAllProperties();
    }, []);

    return (
        <ul className="PropertyListing">
            {properties.map((property) => (
                <li key={property.id}>
                    <PropertyCard {...property} />
                </li>
            ))}
        </ul>
    );
};

export default PropertyListing;
