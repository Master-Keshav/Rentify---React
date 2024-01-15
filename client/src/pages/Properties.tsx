import React from "react";
import { MdAddchart } from "react-icons/md";
import { Link } from "react-router-dom";

const Properties: React.FC = () => {
    return (
        <>
            <div className="container">
                <div className="title">
                    <div className="text">
                        Properties
                    </div>
                    <div className="create">
                        <div className="text">
                            Add Property
                        </div>
                        <span className="icon">
                            <Link to="/properties/create" className="link">
                                <MdAddchart />
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Properties;
