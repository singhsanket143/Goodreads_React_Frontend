import Layout from "Layouts/Layout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "Redux/Slices/AuthSlice";

export default function Signup() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const state = useSelector((state) => state.auth);

    const [signupDetails, setSignupDetails] = useState({
        email: '',
        password: '',
        username: ''
    });

    function handleFormChange(e) {
        const {name, value} = e.target;
        setSignupDetails({
            ...signupDetails,
            [name]: value
        });
    }

    function resetForm() {
        setSignupDetails({
            email: '',
            password: '',
            username: ''
        });
    }
    
    async function onFormSubmit(e) {
        e.preventDefault();
        const response = await dispatch(signup(signupDetails));
        if(response?.payload?.data) {
            navigate("/signin");
        } 
        resetForm();
    }

    useEffect(() => {
        if(state.isLoggedIn) {
            navigate("/dashboard");
        }
    }, []);

    return (
        <Layout>
        <div className="h-[100vh] flex flex-col items-center justify-center">
            <div>
                <h1 className="text-white text-5xl">Create a new account</h1>
            </div>
            <div className="mt-4">
                <p className="text-white">
                    Already have an account ? 
                    <Link to="/signin">
                        <button className="btn btn-success rounded-md px-2 mx-5 hover:bg-green-400">
                            Sign In
                        </button>
                    </Link>
                </p>
            </div>
            <div className="w-full">
                <form onSubmit={onFormSubmit} className="flex flex-col justify-center items-center w-3/4 mx-auto" autoComplete="off">
                    <div className="my-5 w-1/3 text-black">
                        <input
                            autoComplete="off"
                            type="text"
                            placeholder="username..."
                            className="px-8 py-3 bg-white w-full"
                            name="username"
                            value={signupDetails.username}
                            onChange={handleFormChange}
                        />
                    </div>
                    <div className="my-5 w-1/3 text-black">
                        <input
                            autoComplete="off"
                            type="email"
                            placeholder="email..."
                            className="px-8 py-3 bg-white w-full"
                            name="email"
                            value={signupDetails.email}
                            onChange={handleFormChange}
                        />
                    </div>
                    <div className="my-5 w-1/3 text-black">
                        <input
                            autoComplete="off"
                            type="password"
                            placeholder="password..."
                            className="px-8 py-3 bg-white w-full"
                            name="password"
                            value={signupDetails.password}
                            onChange={handleFormChange}
                        />
                    </div>
                    <div className="my-5 w-1/3">
                        <button className="btn btn-success rounded-md px-2 py-1 w-full hover:bg-green-400" type="submit">
                            Submit
                        </button>
                    </div>
                    
                </form>
            </div>
        </div>
        </Layout>
    );
}