import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { MdAddchart } from 'react-icons/md';
import { TiLocationArrow } from 'react-icons/ti';

interface PropertiesProps {
    user: String,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const Properties: React.FC<PropertiesProps> = (props) => {
    const host = import.meta.env.VITE_API_HOST as string;
    const { user, setIsLoading } = props;
    const [allProperties, setAllProperties]: any = useState([]);

    useEffect(() => {
        const fetchUserProperties = async () => {
            try {
                setIsLoading(true);
                const url = `${host}/api/property`;
                const { data: resp } = await axios.get(url);
                if (resp.properties) setAllProperties(resp.properties);
                else console.log('Error fetching properties');
            } catch (error) {
                console.error('Error fetching user properties:', error);
            } finally {
                setTimeout(() => {
                    setIsLoading(false);
                }, 2000);
            }
        };

        fetchUserProperties();
    }, [user]);

    const cardVariants = {
        hidden: {
            opacity: 0,
            y: -20,
            transition: {
                duration: 1,
            },
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
            },
        },
    };

    return (
        <>
            <div className="container">
                <div className="title">
                    <div className="text">Properties</div>
                    <Link to="/properties/create" className="link">
                        <span className="icon">
                            <MdAddchart />
                        </span>
                        <div className="text">Add Property</div>
                    </Link>
                </div>
                <div className="properties">
                    {
                        allProperties && allProperties.map((property: any, index: number) => (
                            <motion.div
                                className="card"
                                key={index}
                                variants={cardVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <Link to={`/properties/${property?._id}`}>
                                    <div className="image">
                                        <img src={property.imageURL} alt="Property Image" />
                                    </div>
                                    <div className="row desc-price">
                                        <div className="description">{property.name}</div>
                                        <div className="price">${property.price}</div>
                                    </div>
                                    <div className="row">
                                        <span className="icon">
                                            <TiLocationArrow />
                                        </span>
                                        <div className="text">{property.location}</div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    {
                        allProperties && allProperties.map((property: any, index: number) => (
                            <motion.div
                                className="card"
                                key={index}
                                variants={cardVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <Link to={`/properties/${property?._id}`}>
                                    <div className="image">
                                        <img src={property.imageURL} alt="Property Image" />
                                    </div>
                                    <div className="row desc-price">
                                        <div className="description">{property.name}</div>
                                        <div className="price">${property.price}</div>
                                    </div>
                                    <div className="row">
                                        <span className="icon">
                                            <TiLocationArrow />
                                        </span>
                                        <div className="text">{property.location}</div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                </div>
            </div>
        </>
    );
};

export default Properties;
