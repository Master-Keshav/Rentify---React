export const setUser = (user: any) => ({
    type: "SET_USER",
    payload: user,
});

export const setToken = (token: string | null) => ({
    type: 'SET_TOKEN',
    payload: token,
});