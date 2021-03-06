import React, {useState} from "react"
import {Typography, Button, Fab, Card, TextField, Slider, ToggleButton, FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import {Add} from "@mui/icons-material";
import { v4 as uuidv4 } from 'uuid';
import Task from "./Task"
import DatePicker from "react-datepicker"
import DarkModeIcon from '@mui/icons-material/DarkMode';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import "react-datepicker/dist/react-datepicker.css";

const Home = ({themeCallback}) => {

    const [tasks, setTasks] = useState([])
    const TASK_PROTOTYPE = {"Title":"","Description":"","Class":"","Date":new Date(),"Priority":5}
    const TASK_PROPS = ["Title","Description","Class","Date","Priority"]
    const TEXTFIELD_PROPS = ["Title", "Description", "Class"]
    const [showError, setShowError] = useState(false)
    const [darkMode, setDarkMode] = useState(false)
    const [sort, setSort] = useState(1)
    const [filterData, setFilterData] = useState({"class":"","priority":"","startDate":new Date(),"endDate":new Date()})
    const [filter, setFilter] = useState([])
    const [createData, setCreateData] = useState(TASK_PROTOTYPE)

    const addTask = () => {
        let invalidProp = false;
        TASK_PROPS.map((prop)=>{if(createData[prop]==null||createData[prop]==""){invalidProp = true;}})
        if(invalidProp)
            setShowError(true)
        else {
            createData["id"] = uuidv4()
            setTasks([...tasks, createData])
            setCreateData(TASK_PROTOTYPE)
            setShowError(false)
        }
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

    const [myTheme, setMyTheme] = useState(createTheme({
    palette: {
        mode: 'light',
    }
    }))
    const toggleTheme = () => {
    setMyTheme(createTheme({
        palette: {
        mode: (darkMode)?'light':'dark',
        }
    }))
    setDarkMode(!darkMode)
    }

    const sortTasks = (a,b) => {
        if(sort==1)
            return (a["Date"] > b["Date"])?1:-1
        if(sort==2)
            return (a["Date"] < b["Date"])?1:-1
        if(sort==3)
            return (a["Class"] > b["Class"])?1:-1
        if(sort==4)
            return (a["Priority"] > b["Priority"])?1:-1
        if(sort==5)
            return (a["Priority"] < b["Priority"])?1:-1
    }
    const filterTasks = (task) => {
        console.log(filterData["class"]!="")
        if(filter.includes(1)&&filterData["class"]!=""&&!task["Class"].toLowerCase().startsWith(filterData["class"].toLowerCase()))
            return false
        if(filter.includes(2)&&filterData["priority"]!=""&&filterData["priority"]!=task["Priority"])
            return false
        if(filter.includes(3))
            if(!(filterData["startDate"]<=task["Date"]&&filterData["endDate"]>=task["Date"]))
                return false
        return true
    }

    return (
        <ThemeProvider theme={myTheme}>
        <div style={{maxWidth: "60%", margin: "auto", padding: "2em 1em"}}>
            <div style={{height: "fit-content"}}>
                <Typography variant="h1" style={{fontWeight: "bold", textAlign: "center", fontSize: "2em"}}>Awesome Task App</Typography>
                {/*<ToggleButton
                    value="check"
                    selected={darkMode}
                    onChange={toggleTheme}
                    >
                    <DarkModeIcon />
                </ToggleButton>*/}
                <Card 
                    style={{
                        width: "100%", 
                        minHeight: "200px",
                        margin: "1em",
                        padding: "1em"
                    }} 
                >
                {TEXTFIELD_PROPS.map((taskKey) => (
                    <TextField style={{marginTop: "8px"}} fullWidth label={taskKey} variant="outlined" value={createData[taskKey]} onChange={(e) => setCreateData({...createData, ...createObject(taskKey, e.target.value) }) } />
                ))}

                <DatePicker style={{display: "block", marginTop: "8px"}} selected={createData["Date"]} onChange={(date) => {setCreateData({...createData, ...createObject("Date", date)})}} />
                <Typography variant="p">Priority:</Typography>
                <Slider
                    aria-label="Priority"
                    defaultValue={createData["Priority"]}
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    onChange={(e) => {setCreateData({...createData, ...createObject("Priority", e.target.value)})}}
                    min={1}
                    max={10}
                    />
                <div>
                <Button style={{ marginTop: "8px"}} onClick={addTask}>Add Task</Button>
                <Typography variant="p" style={{display: (showError)?"block":"none", marginLeft: "1em"}}>One or more fields are incorrect</Typography>
                </div>
                </Card>
                <FormControl>
                    <InputLabel>Sort</InputLabel>
                    <Select
                        value={sort}
                        label="Sort"
                        onChange={(e)=>setSort(e.target.value)}
                    >
                        <MenuItem value={1}>Date Ascending</MenuItem>
                        <MenuItem value={2}>Date Descending</MenuItem>
                        <MenuItem value={3}>Class</MenuItem>
                        <MenuItem value={4}>Priority Ascending</MenuItem>
                        <MenuItem value={5}>Priority Descending</MenuItem>
                    </Select>
                </FormControl>
                <FormControl style={{minWidth: "160px", marginLeft: "8px"}}>
                    <InputLabel>Filter</InputLabel>
                    <Select
                        value={filter}
                        multiple
                        label="Filter"
                        onChange={(e)=>setFilter(e.target.value)}
                    >
                        <MenuItem value={1}>Class</MenuItem>
                        <MenuItem value={2}>Priority</MenuItem>
                        <MenuItem value={3}>Date</MenuItem>
                    </Select>
                </FormControl>
                <TextField label="Filter Class" style={{display: (filter.includes(1))?"inline-block":"none", minWidth: "160px", marginLeft: "8px"}} variant="outlined" value={filterData["class"]} onChange={(e) => setFilterData({...filterData, ...createObject("class", e.target.value) }) } />
                <TextField label="Filter Priority" style={{display: (filter.includes(2))?"inline-block":"none", minWidth: "160px", marginLeft: "8px"}} variant="outlined" value={filterData["priority"]} onChange={(e) => setFilterData({...filterData, ...createObject("priority", e.target.value) }) } />
                <div style={{display: (filter.includes(3))?"inline-block":"none", marginLeft:"8px"}}>
                <InputLabel>Start Date</InputLabel>
                <DatePicker selected={filterData["startDate"]} onChange={(date) => setFilterData({...filterData, ...createObject("startDate", date) })} />
                <InputLabel>End Date</InputLabel>
                <DatePicker style={{marginLeft: "8px"}} selected={filterData["endDate"]} onChange={(date) => setFilterData({...filterData, ...createObject("endDate", date) })} />
                </div>
            </div>
            <div>
                
            </div>
            <div style={{marginTop: "10px"}}>
                {tasks.filter(filterTasks).sort(sortTasks).map((task) => (
                    <Task task={task} callbackDelete={removeTask} callbackEdit={editTask} uuid={task["id"]} />
                ))}
            </div>
        </div>
        </ThemeProvider>
    )
}

export default Home