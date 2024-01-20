import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import axios from 'axios';
import { MdAddchart } from "react-icons/md";
import { TiLocationArrow } from "react-icons/ti";

interface SidebarProps {
    user: String,
}

const Properties: React.FC<SidebarProps> = (props) => {
    const host = import.meta.env.VITE_API_HOST as string;
    const user = props.user
    const [allProperties, setAllProperties]: any = useState([])
    useEffect(() => {
        const fetchUserProperties = async () => {
            try {
                const url = `${host}/api/property`;
                const { data: resp } = await axios.get(url);
                setAllProperties(resp.properties);
            } catch (error) {
                console.error('Error fetching user properties:', error);
            }
        };

        fetchUserProperties();
    }, [user]);

    return (
        <>
            <div className="container">
                <div className="title">
                    <div className="text">
                        Properties
                    </div>
                    <Link to="/properties/create" className="link">
                        <span className="icon">
                            <MdAddchart />
                        </span>
                        <div className="text">
                            Add Property
                        </div>
                    </Link>
                </div>
                <div className="properties">
                    {allProperties.map((property: any) => (
                        <Link to={`/properties/${allProperties[0]?._id}`}>
                            <div className="card">
                                <div className="image">
                                    <img src={property.imageURL} alt="Property Image" />
                                </div>
                                <div className="row desc-price">
                                    <div className="description">
                                        {property.name}
                                    </div>
                                    <div className="price">
                                        ${property.price}
                                    </div>
                                </div>
                                <div className="row">
                                    <span className="icon">
                                        <TiLocationArrow />
                                    </span>
                                    <div className="text">
                                        {property.location}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                    {allProperties.map((property: any) => (
                        <Link to={`/properties/${allProperties[0]?._id}`}>
                            <div className="card">
                                <div className="image">
                                    <img src={property.imageURL} alt="Property Image" />
                                </div>
                                <div className="row desc-price">
                                    <div className="description">
                                        {property.name}
                                    </div>
                                    <div className="price">
                                        ${property.price}
                                    </div>
                                </div>
                                <div className="row">
                                    <span className="icon">
                                        <TiLocationArrow />
                                    </span>
                                    <div className="text">
                                        {property.location}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Properties;
