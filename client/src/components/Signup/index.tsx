import React, { useState, ChangeEvent, FormEvent } from "react";
import axios, { AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./index.scss";

type UserData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

const Signup: React.FC = () => {
    const [data, setData] = useState<UserData>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState<string | undefined>(undefined);
    const navigate = useNavigate();

    const host = import.meta.env.VITE_API_HOST as string;
    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        try {
            const url = `${host}/api/signup`;
            const { data: res } = await axios.post(url, data);
            navigate("/login");
            console.log(res.message);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                const axiosError = err as AxiosError | undefined;

                if (axiosError && axiosError.response) {
                    if (
                        axiosError.response.status >= 400 &&
                        axiosError.response.status <= 500
                    ) {
                        const errorData = axiosError.response.data as { message: string };
                        setError(errorData.message);
                    }
                }
            }
        }
    };

    return (
        <div className={"signup_container"}>
            <div className={"signup_form_container"}>
                <div className={"left"}>
                    <h1>Welcome Back</h1>
                    <Link to="/login">
                        <button type="button" className={"white_btn"}>
                            Sign in
                        </button>
                    </Link>
                </div>
                <div className={"right"}>
                    <form
                        className={"form_container"}
                        onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)}
                    >
                        <h1>Create Account</h1>
                        <input
                            type="text"
                            placeholder="First Name"
                            name="firstName"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                            value={data.firstName}
                            required
                            className={"input"}
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            name="lastName"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                            value={data.lastName}
                            required
                            className={"input"}
                        />
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
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
