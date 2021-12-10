import React, {useState} from "react"
import {Typography, Card, Button, TextField, Slider} from "@mui/material"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

const Task = ({task, callbackDelete, callbackEdit}) => {

    const [raised, setRaised] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [editData, setEditData] = useState(task)
    const [startDate, setStartDate] = useState(task["Date"])

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

    function getFormattedDate(date) {
        var year = date.getFullYear();
        
        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        
        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        
        return month + '/' + day + '/' + year;
    }

    return (
        <Card 
            raised={raised} 
            style={{
                width: "100%", 
                minHeight: "200px",
                margin: "1em",
                padding: "1em",
                position: "relative",
                overflow: "visible"
            }} 
            onMouseOver={() => setRaised(true)} 
            onMouseLeave={() => setRaised(false)}
        >
            <div style={{
                display: (editMode)?"none":"initial"
            }}>
            <Typography variant="h6">Title: {task["Title"]}</Typography>
            <Typography>Description: {task["Description"]}</Typography>
            <Typography>Class: {task["Class"]}</Typography>
            <Typography>Date: {getFormattedDate(task["Date"])}</Typography>
            <Typography>Priority: {task["Priority"]}</Typography>
            </div>
            <div style={{
                display: (editMode)?"initial":"none"
            }}>
            <TextField label="Title" defaultValue={task["Title"]} fullWidth variant="outlined" onChange={(e) => setEditData({...editData, ...createObject("Title", e.target.value) }) }/>
            <TextField label="Description" defaultValue={task["Description"]} style={{marginTop: "8px"}} fullWidth variant="outlined" onChange={(e) => setEditData({...editData, ...createObject("Description", e.target.value) }) }/>
            <TextField label="Class" defaultValue={task["Class"]} style={{marginTop: "8px"}} fullWidth variant="outlined" onChange={(e) => setEditData({...editData, ...createObject("Class", e.target.value) }) }/>
            <DatePicker style={{display: "block", marginTop: "8px"}} selected={startDate} onChange={(date) => {setStartDate(date); setEditData({...editData, ...createObject("Date", date)})}} />
            <Typography style={{marginTop: "8px"}} variant="p">Priority:</Typography>
            <Slider
                style={{marginTop: "8px", display:"block", zIndex: 10 }}
                aria-label="Priority"
                defaultValue={task["Priority"]}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={10}
                onChange={(e) => setEditData({...editData, ...createObject("Priority", e.target.value)})}
                />
            </div>
            <Button onClick={() => callbackDelete(task["id"])} style={{display:(editMode)?"none":"initial"}}>Mark Complete</Button>
            <Button onClick={editTask}>{(editMode)?"Save Task":"Edit Task"}</Button>
        </Card>
    )
}

export default Task