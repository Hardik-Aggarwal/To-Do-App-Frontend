import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { Context, server } from "../main";
import toast  from "react-hot-toast";
import ToDoItem from "../components/ToDoItem";
import { Navigate } from "react-router-dom";

const Home = () => {

  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const [loading,setLoading] = useState(false);//separate loading for task (purpose:task 
                                        //  loading should not interfere with user loading)
  const [tasks,setTasks] = useState([]);
  const [refresh,setRefresh] = useState(false);
  const {isAuthenticated} = useContext(Context);


  const titleChange = (event)=>{
    setTitle(event.target.value);
  }
  const descriptionChange = (event)=>{
    setDescription(event.target.value);
  }

  const updateHandler = async (id)=>{
    try {
      const {data} = await axios.put(`${server}/task/${id}`,{},{
        withCredentials:true,
      });
      toast.success(data.message);
      setRefresh((prev) => !prev);

    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  const deleteHandler = async (id)=>{
    try {
      const {data} = await axios.delete(`${server}/task/${id}`,{
        withCredentials:true,
      });
      toast.success(data.message);
      setRefresh((prev) => !prev);

    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  const submitHandler = async (event)=>{
    event.preventDefault();
    setLoading(true);
    try {
      const {data} = await axios.post(`${server}/task/new`,{title,description},{
        withCredentials:true,
        headers:{
          "Content-Type":"application/json"
        }
      });
      setTitle("");
      setDescription("");
      toast.success(data.message);
      setLoading(false);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    axios
      .get(`${server}/task/my`, {
        withCredentials: true,
      })
      .then((res) => {
        setTasks(res.data.tasks);
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  }, [refresh]);

  if(!isAuthenticated)
    return <Navigate to="/login"/>

  return (
    <div className="container">
      <div className="login">
            <section>
                <form onSubmit={submitHandler}>
                    <input value={title} onChange={titleChange} type='text' placeholder="Title" required/>
                    <input value={description} onChange={descriptionChange} type='text' placeholder="Description"/>
                    <button disabled={loading} type='submit'>Add Task</button>
                </form>
            </section>
        </div>
        <section className="todosContainer">
          {tasks.map((item,index)=>{
           return  <ToDoItem key = {item._id} id={item._id} title={item.title} 
           description={item.description} isCompleted={item.isCompleted} 
           updateHandler={updateHandler} deleteHandler={deleteHandler}/>
          })}
        </section>
        
    </div>    
  )
}

export default Home