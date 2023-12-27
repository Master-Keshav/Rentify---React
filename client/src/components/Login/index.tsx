import React, { useState, ChangeEvent, FormEvent } from "react";
import axios, { AxiosError } from "axios";
import { Link } from "react-router-dom";
import "./index.scss";

type UserData = {
    email: string;
    password: string;
};

type MyErrorResponse = {
    errors: { detail: string }[];
};

const handleErrorsPostAuth = (error: AxiosError<MyErrorResponse>) => {
    if (error.isAxiosError && error.response) {
        if (error.response.data.errors && error.response.data.errors[0]) {
            throw new Error(error.response.data.errors[0].detail);
        }
        throw new Error(error.response.toString());
    }
    throw new Error(error.message);
};

const Login: React.FC = () => {
    const [data, setData] = useState<UserData>({ email: "", password: "" });
    const [error, setError] = useState<string | undefined>(undefined);

    const host: string = `${window.location.protocol}//${window.location.hostname}:8080`;
    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        try {
            const url = `${host}/api/auth`;
            const { data: res } = await axios.post(url, data);
            localStorage.setItem("token", res.data);
            window.location.href = "/";
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                const axiosError = err as AxiosError<MyErrorResponse> | undefined;

                if (axiosError) {
                    try {
                        handleErrorsPostAuth(axiosError);
                    } catch (error) {
                        if (error instanceof Error) {
                            setError(error.message);
                        }
                    }
                } else {
                    setError("An unknown error occurred.");
                }
            }
        }
    };

    return (
        <div className={"login_container"}>
            <div className={"login_form_container"}>
                <div className={"left"}>
                    <form
                        className={"form_container"}
                        onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)}
                    >
                        <h1>Login to Your Account</h1>
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                            value={data.email}
                            required
                            className={"input"}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                            value={data.password}
                            required
                            className={"input"}
                        />
                        {error && <div className={"error_msg"}>{error}</div>}
                        <button type="submit" className={"green_btn"}>
                            Sign In
                        </button>
                    </form>
                </div>
                <div className={"right"}>
                    <h1>New Here ?</h1>
                    <Link to="/signup">
                        <button type="button" className={"white_btn"}>
                            Sign Up
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
