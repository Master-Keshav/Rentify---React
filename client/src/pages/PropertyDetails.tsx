import { useEffect } from 'react'
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import axios from 'axios';
import { TiLocationArrow } from "react-icons/ti";

import { setAgent, setProperty } from '../actions/propertyActions';

const PropertyDetails = (props: any) => {
    const host = import.meta.env.VITE_API_HOST as string;
    const { id } = useParams()
    useEffect(() => {
        const fetchPropertyDetails = async () => {
            try {
                const url = `${host}/api/property/${id}`;
                const { data: resp } = await axios.get(url);
                const property = resp.property
                props.setProperty(property)
                const user = property.user
                props.setAgent(user)
            } catch (error) {
                console.error('Error fetching user properties:', error);
            }
        };

        if (id !== props?.property?._id) {
            fetchPropertyDetails();
        }
    }, [id, props?.property?._id]);

    const { agent, property } = props
    return (
        <div className="container">
            <div className="property-details">
                <div className="title">Details</div>
                {
                    property &&
                    <div className="details">
                        <div className="property">
                            <div className="image">
                                <img src={`${property.imageURL}`} alt="" />
                            </div>
                            <div className="row">
                                <div>{property.type}</div>
                                <div>⭐⭐⭐⭐⭐</div>
                            </div>
                            <div className="row">
                                <div>
                                    <span className="name">{property.name}</span>
                                    <br />
                                    <div className="location"><span className="icon"><TiLocationArrow /></span>{property.location}</div>
                                </div>
                                <div>
                                    <span>Price</span>
                                    <div><span className="price">${property.price} </span>for one day</div>
                                </div>
                            </div>
                            <div className="description">
                                Description:
                                <br />
                                {property.description}
                            </div>
                        </div>
                        <div className="agent">
                            <Link to={`/agent/${agent?._id}`}>
                                <div className="card">
                                    <div className="image">
                                        <img src={`${agent.avatar}`} alt="" />
                                    </div>
                                    <div className="name">
                                        {agent.firstName} {agent.lastName}
                                    </div>
                                    <div className="agent-title">
                                        Agent
                                    </div>
                                </div>
                            </Link>
                            <div className="property-facility">
                                Property Facilities:
                            </div>
                            <div className="facilities">
                                {property.facilities.map((facility: any) => (
                                    <div className='facility'>
                                        {facility}
                                    </div>
                                ))}
                            </div>
                            <div className="rate">
                                <button type="submit" className="rate-button">
                                    Rate Now
                                </button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div >
    )
}

const mapStateToProps = (state: any) => {
    return {
        agent: state.property.user,
        property: state.property.property
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        setAgent: (user: any) => dispatch(setAgent(user)),
        setProperty: (property: any) => dispatch(setProperty(property)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PropertyDetails)