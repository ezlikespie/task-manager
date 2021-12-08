import React, {useState} from "react"
import {Typography, Card, Button, TextField} from "@mui/material";

const Task = ({task, callbackDelete, callbackEdit}) => {

    const [raised, setRaised] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [editData, setEditData] = useState(task)

    const createObject = (key, prop) => {
        var temp = new Object()
        temp[key] = prop
        return temp
    }
    const editTask = () => {
        if(editMode)
            callbackEdit(task["id"], editData)
        setEditMode(!editMode)
    }

    return (
        <Card 
            raised={raised} 
            style={{
                width: "100%", 
                minHeight: "200px",
                margin: "1em",
                padding: "1em",
                position: "relative"
            }} 
            onMouseOver={() => setRaised(true)} 
            onMouseLeave={() => setRaised(false)}
        >
            <div style={{
                display: (editMode)?"none":"initial"
            }}>
            <Typography variant="h6">{task["Title"]}</Typography>
            <Typography>{task["Description"]}</Typography>
            </div>
            <div style={{
                display: (editMode)?"initial":"none"
            }}>
            <TextField label="Title" defaultValue={task["Title"]} fullWidth variant="outlined" onChange={(e) => setEditData({...editData, ...createObject("Title", e.target.value) }) }/>
            <TextField label="Description" defaultValue={task["Description"]} fullWidth variant="outlined" onChange={(e) => setEditData({...editData, ...createObject("Description", e.target.value) }) }/>
            </div>
            <Button onClick={() => callbackDelete(task["id"])} style={{display:(editMode)?"none":"initial"}}>Delete Task</Button>
            <Button onClick={editTask}>{(editMode)?"Save Task":"Edit Task"}</Button>
        </Card>
    )
}

export default Task