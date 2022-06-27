import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useState, useEffect } from 'react';
import axios from 'axios'
import Typography from '@mui/material/Typography';

import { useNavigate } from "react-router-dom"
import { ExitToApp, PostAddOutlined } from '@mui/icons-material';

import { Link, useLocation, BrowserRouter as Router } from "react-router-dom";


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function ViewPost() {

    let query = useQuery();
    let postId = query.get("id")

    const [items, setItems] = useState([]);
    const [state, setState] = useState([]);
    const [formInput, setFormInput] = useState({
        postContent: "",
        postTitle: ""
    });


    useEffect(() => {
        getPostById();
    }, [])


    const getPostById = () => {
        axios.get(`http://localhost:3002/api/getOne/${postId}`)
            .then((response) => {
                setItems(response.data);
                setFormInput({
                    ...formInput,
                    postTitle: response.data.posttitle,
                    postContent: response.data.postcontent

                })

            })
    }

    function handelInput(e) {
        const key = e.target.name;
        const value = e.target.value;
        setFormInput({ ...formInput, [key]: value })
    }


    const handleSubmit = (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        let postContentForm = data.get('postContent');
        let postTitleForm = data.get('postTitle');

        var items = JSON.parse(localStorage.getItem("PostList"))
        var item = items.find(item => item.id === postId)

        if (item) {
            item.postcontent = postContentForm
            item.postname = postTitleForm
        }

        localStorage.setItem('PostList', JSON.stringify(items))

        console.log(items)
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom component="div">
                Post Detail
            </Typography>
             <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name={"postTitle"}
                    value={formInput.postTitle}
                    // value={items[0].postname}
                    type="postTitle"
                    InputProps={{
                        readOnly: true,
                    }}
                    onChange={handelInput}
                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="postContent"
                    value={formInput.postContent}
                    // value={items[0].postcontent}
                    name={"postContent"}
                    autoComplete="postContentForm"
                    onChange={handelInput}
                    InputProps={{
                        readOnly: true,
                    }}

                />




            </Box> 
        </div>
    )
}

export default ViewPost