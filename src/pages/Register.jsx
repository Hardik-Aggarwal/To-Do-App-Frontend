import { Link, Navigate } from "react-router-dom"
import {useContext, useState} from "react"
import { Context, server } from "../main";
import axios from "axios";
import toast from "react-hot-toast";
const Register = () => {

    const [name,setName] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const {isAuthenticated,setIsAuthenticated,loading,setLoading} = useContext(Context);

    const nameChange = (event)=>(
         setName(event.target.value))
    const emailChange = (event)=>{
        return setEmail(event.target.value);
    }
    const passwordChange = (event)=>{
        setPassword(event.target.value);
    }
    const handleSubmit = async (event)=>{
        
        event.preventDefault();
        setLoading(true);
        try {
            const {data} = await axios.post(`${server}/users/new`,{
                name,email,password
            },{
                headers:{
                    "Content-Type":"application/json",
                },
                    withCredentials:true
            });
            setIsAuthenticated(true);
            toast.success(data.message);
            setLoading(false);
        } catch (error) {
            toast.error(error.data.response.message);
            setIsAuthenticated(false);
            setLoading(false);
        }
        
    }

    if(isAuthenticated)
        <Navigate to="/"/>

    return (
        <div className="login">
        <section>
            <form onSubmit={handleSubmit}>
                <input value={name} onChange={nameChange} type='text' placeholder="Name" required/>
                <input value={email} onChange={emailChange} type='email' placeholder="Email" required/>
                <input value={password} onChange={passwordChange} type='password' placeholder="Password" required/>
                <button disabled={loading} type='submit'>Sign Up</button>
                <h4>Or</h4>
                <Link to="/login">Log In</Link>
            </form>
        </section>
    </div>
    )
}

export default Register