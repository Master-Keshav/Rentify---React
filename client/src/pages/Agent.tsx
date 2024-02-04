import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { setAgent } from "../actions/userActions";
import axios from "axios";
import { Link } from "react-router-dom";

const agentProfileFields = ['name', 'role', 'location', 'phone', 'email']
const propertyFields = ['name', 'location', 'price']

const Agent = (props: any) => {
    const host = import.meta.env.VITE_API_HOST as string;
    const { id } = useParams()
    useEffect(() => {
        const getAgentDetails = async () => {
            try {
                const url = `${host}/api/user/${id}`;
                const { data: resp } = await axios.get(url);
                const agent = resp.agent
                props.setAgent(agent)
            } catch (error) {
                console.error('Error fetching user properties:', error);
            }
        };
        getAgentDetails()
    }, []);

    const { agent } = props
    const properties = agent?.properties

    console.log(properties && properties[0])
    return <div className="container">
        <div className="title">Agents</div>
        <div className="agent-profile">
            <div className="avatar">
                <img src={agent?.avatar} alt="avatar" />
            </div>
            <div className="info">
                {agent && agentProfileFields.map((field, index) => (
                    <div className={`${field} field`} key={index}>
                        {agent && agent[field] ? agent[field] : properties && properties[0][field] ? properties[0][field] : null}
                    </div>
                ))}
            </div>
        </div>
        <div className="agent-property">
            <div className="title">Properties</div>
            <div className="properties">
                {properties && properties.map((property: any, index: number) => (
                    <Link to={`/properties/${property._id}`}>
                        <div key={index} className="property-card">
                            <div className="img">
                                <img src={property.imageURL} alt="" />
                            </div>
                            {
                                propertyFields.map((field, index) => (
                                    <span className={`${field} field`} key={index}>
                                        {field == "price" && '$'} {property[field]}
                                    </span>
                                ))
                            }
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    </div>
};

const mapStateToProps = (state: any) => {
    return {
        agent: state.user.agent
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        setAgent: (user: any) => dispatch(setAgent(user))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Agent);