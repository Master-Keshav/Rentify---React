export const setUser = (user: any) => {
    return {
        type: "SET_USER",
        payload: user,
    };
};

export const setAgent = (agent: any) => {
    return {
        type: "SET_AGENT",
        payload: agent,
    };
};

export const setAllAgents = (agents: any) => {
    return {
        type: "SET_AGENTS",
        payload: agents,
    };
};
