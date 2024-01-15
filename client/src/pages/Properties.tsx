import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdAddchart } from "react-icons/md";
import { TiLocationArrow } from "react-icons/ti";
import { Link } from "react-router-dom";

interface SidebarProps {
    user: String,
}

const Properties: React.FC<SidebarProps> = (props) => {
    const host = import.meta.env.VITE_API_HOST as string;
    const user = props.user
    const [allProperties, setAllProperties] = useState([])
    useEffect(() => {
        const fetchUserProperties = async () => {
            try {
                //// const url = `${host}/api/property/${user}`;
                const url = `${host}/api/property`;
                const { data: resp } = await axios.get(url);
                setAllProperties(resp.properties);
            } catch (error) {
                console.error('Error fetching user properties:', error);
            }
        };

        fetchUserProperties();
    }, [user]);

    console.log(allProperties)
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
                        <div className="card">
                            <div className="image">
                                <img src={property.imageURL} alt="Property Image" />
                            </div>
                            <div className="row desc-price">
                                <div className="description">
                                    Rentione, Villa
                                </div>
                                <div className="price">
                                    $5000
                                </div>
                            </div>
                            <div className="row">
                                <span className="icon">
                                    <TiLocationArrow />
                                </span>
                                <div className="text">
                                    Banglore
                                </div>
                            </div>
                        </div>
                    ))}
                    {allProperties.map((property: any) => (
                        <div className="card">
                            <div className="image">
                                <img src={property.imageURL} alt="Property Image" />
                            </div>
                            <div className="row desc-price">
                                <div className="description">
                                    Rentione, Villa
                                </div>
                                <div className="price">
                                    $5000
                                </div>
                            </div>
                            <div className="row">
                                <span className="icon">
                                    <TiLocationArrow />
                                </span>
                                <div className="text">
                                    Banglore
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Properties;
