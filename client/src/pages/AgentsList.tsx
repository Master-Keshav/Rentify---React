import { useEffect } from "react";
import { connect } from "react-redux";
import { setAllAgents } from "../actions/userActions";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const AgentsList = (props: any) => {
    const host = import.meta.env.VITE_API_HOST as string;
    const { setIsLoading } = props;

    useEffect(() => {
        const getAllAgents = async () => {
            try {
                setIsLoading(true);
                const url = `${host}/api/user/agents`;
                const { data: resp } = await axios.get(url);
                const agents = resp.agents;
                props.setAgents(agents);
            } catch (error) {
                console.error("Error fetching user properties:", error);
            } finally {
                setTimeout(() => {
                    setIsLoading(false);
                }, 2000);
            }
        };
        getAllAgents();
    }, []);

    const { agents } = props;

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
        <div className="container">
            <div className="title">Agents</div>
            {agents.map((agent: any) => (
                <Link to={`/agent/${agent?._id}`} key={agent?._id}>
                    <motion.div
                        className="agent-card"
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <div className="img">
                            <img src={agent.avatar} alt="agent_image" />
                        </div>
                        <div className="details">
                            <div className="upper">
                                <span className="bolder">{agent.name}</span>
                                <span className="agent">{agent.role.toUpperCase()}</span>
                            </div>
                            <div className="lower">
                                <div className="sub">{agent.email}</div>
                                <div className="sub">{agent.properties} properties</div>
                            </div>
                        </div>
                    </motion.div>
                </Link>
            ))}
        </div>
    );
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
