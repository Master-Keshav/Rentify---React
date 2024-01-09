import React from "react";
import { MdAddchart } from "react-icons/md";
import { Link } from "react-router-dom";

const Properties: React.FC = () => {
    return (
        <>
            <div className="title">
                Properties
                <Link to="/properties/create">
                    <MdAddchart />
                </Link>
            </div>
        </>
    );
};

export default Properties;
