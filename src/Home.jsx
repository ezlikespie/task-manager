import React, {useState} from "react"
import {Typography, Button, Fab, Card, TextField} from '@mui/material';
import {Add} from "@mui/icons-material";
import { v4 as uuidv4 } from 'uuid';
import Task from "./Task"

const Home = () => {

    const [tasks, setTasks] = useState([])
    const TASK_PROTOTYPE = {"Title":"","Description":""}
    const TASK_PROPS = ["Title","Description","Priority"]
    const [createData, setCreateData] = useState(TASK_PROTOTYPE)

    const addTask = () => {
        createData["id"] = uuidv4()
        setTasks([...tasks, createData])
        setCreateData(TASK_PROTOTYPE)
    }

    const createObject = (key, prop) => {
        var temp = new Object()
        temp[key] = prop
        return temp
    }
    const removeTask = (id) => {
        setTasks(tasks.filter(function(task) { 
            return task["id"] !== id 
        }))
        console.log(tasks.length)
    }
    const editTask = (id, task) => {
        var curTask = findElementById(tasks, id)
        for(var i = 0; i<TASK_PROPS.length; i++)
            curTask[TASK_PROPS[i]] = task[TASK_PROPS[i]]
        setTasks(tasks)
    }
    const findElementById = (array, id) => {
        return array.find((element) => {
            return element["id"] === id;
        })
    }

    return (
        <div style={{maxWidth: "60%", margin: "auto", padding: "2em 1em"}}>
            <div style={{height: "fit-content"}}>
                <Typography variant="h1" style={{fontWeight: "bold", textAlign: "center", fontSize: "2em"}}>Awesome Task App</Typography>
                <Card 
                    style={{
                        width: "100%", 
                        minHeight: "200px",
                        margin: "1em",
                        padding: "1em"
                    }} 
                >
                {Object.keys(TASK_PROTOTYPE).map((taskKey) => (
                    <TextField style={{marginTop: "8px"}} fullWidth label={taskKey} variant="outlined" value={createData[taskKey]} onChange={(e) => setCreateData({...createData, ...createObject(taskKey, e.target.value) }) } />
                ))}
                <Button style={{marginTop: "8px"}}onClick={addTask} >Add Task</Button>
                </Card>
            </div>
            <div style={{marginTop: "10px"}}>
                {tasks.map((task) => (
                    <Task task={task} callbackDelete={removeTask} callbackEdit={editTask} uuid={task["id"]} />
                ))}
            </div>
        </div>
    )
}

export default Home