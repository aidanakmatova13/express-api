import React, {useEffect, useState} from 'react';
import axios from 'axios'

const TasksList = () => {
    const [tasks, setTasks] = useState([])
    useEffect(() =>{
        axios("http://localhost:8000/api/tasks")
            .then(({data}) => setTasks(data))
    },[])
    return (
        <div className="my-4">
            <ul className="list-group">
                {
                    tasks.map(el =>
                        <li key={el.id} className="list-group-item">{el.title}</li>
                    )
                }
            </ul>
        </div>
    );
};

export default TasksList;