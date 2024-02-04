import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { setAgent } from "../actions/userActions";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHouse } from "react-icons/fa6";
import { MdOutlineLocationOn } from "react-icons/md";

const agentProfileFields = ['name', 'role', 'location', 'phone', 'email'];
const propertyFields = ['name', 'location', 'price'];

const Agent = (props: any) => {
    const host = import.meta.env.VITE_API_HOST as string;
    const { id } = useParams();
    const { setIsLoading } = props;

    useEffect(() => {
        const getAgentDetails = async () => {
            try {
                setIsLoading(true);
                const url = `${host}/api/user/${id}`;
                const { data: resp } = await axios.get(url);
                const agent = resp.agent;
                props.setAgent(agent);
            } catch (error) {
                console.error('Error fetching user properties:', error);
            } finally {
                setTimeout(() => {
                    setIsLoading(false);
                }, 2000);
            }
        };
        getAgentDetails();
    }, []);

    const { agent } = props;
    const properties = agent?.properties;

    return (
        <div className="container">
            <div className="title">Agents</div>
            <motion.div
                className="agent-profile"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <div className="avatar">
                    <img src={agent?.avatar} alt="avatar" />
                </div>
                <div className="info">
                    {agent &&
                        agentProfileFields.map((field, index) => (
                            <div className={`${field} field`} key={index}>
                                {agent && agent[field] ? agent[field] : properties && properties[0][field] ? properties[0][field] : null}

                            </div>
                        ))}
                </div>
            </motion.div>
            <div className="agent-property">
                <div className="title">Properties</div>
                <div className="properties">
                    {properties &&
                        properties.map((property: any, index: number) => (
                            <Link to={`/properties/${property._id}`} key={index}>
                                <motion.div
                                    className="property-card"
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1 }}
                                >
                                    <div className="img">
                                        <img src={property.imageURL} alt="" />
                                    </div>
                                    {propertyFields.map((field, index) => (
                                        <span className={`${field} field`} key={index}>
                                            <div className="icon">
                                                {field == 'name' && <FaHouse />}
                                                {field == 'location' && <MdOutlineLocationOn />}
                                                {field === 'price' && '$'}
                                            </div>
                                            {property[field]}
                                        </span>
                                    ))}
                                </motion.div>
                            </Link>
                        ))}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        agent: state.user.agent,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        setAgent: (user: any) => dispatch(setAgent(user)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Agent);
