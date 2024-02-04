import { useEffect } from "react";
import { connect } from "react-redux";
import { setAllAgents } from "../actions/userActions";
import axios from "axios";
import { Link } from "react-router-dom";

const AgentsList = (props: any) => {
    const host = import.meta.env.VITE_API_HOST as string;

    useEffect(() => {
        const getAllAgents = async () => {
            try {
                const url = `${host}/api/user/agents`;
                const { data: resp } = await axios.get(url);
                const agents = resp.agents
                props.setAgents(agents)
            } catch (error) {
                console.error('Error fetching user properties:', error);
            }
        };
        getAllAgents();
    }, []);

    const { agents } = props
    return <div className="container">
        <div className="title">Agents</div>
        {
            agents.map((agent: any) => (
                <Link to={`/agent/${agent?._id}`}>
                    <div className="agent-card">
                        <div className="img">
                            <img src={agent.avatar} alt="agent_image" />
                        </div>
                        <div className="details">
                            <div className="upper">
                                <span className="bolder">
                                    {agent.name}
                                </span>
                                <span className="agent">
                                    {agent.role.toUpperCase()}
                                </span>
                            </div>
                            <div className="lower">
                                <div className="sub">
                                    {agent.email}
                                </div>
                                <div className="sub">
                                    {agent.properties} properties
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            ))
        }
    </div>
};
const mapStateToProps = (state: any) => {
    return {
        agents: state.user.agents,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        setAgents: (agents: any) => dispatch(setAllAgents(agents)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AgentsList);