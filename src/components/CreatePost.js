import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { ExitToApp } from '@mui/icons-material';


function CreatePost(props) {

  
  

  const personList = []

  let navigate = useNavigate();

  const postListItems = JSON.parse(localStorage.getItem('PostList'));
  

  const [state, setState] = useState(postListItems ?? []);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [success, SetSuccess] = useState(false);

  const uniqueId = () => parseInt(Date.now() * Math.random(), 10).toString();


  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    let postContentForm = data.get('postContentForm');
    let postTitleForm = data.get('postTitleForm')

    // console.log({
    //   "postname":postTitleForm,
    //   "postcontent":postContentForm
    // })

    setState(prevState=> [
      ...prevState, 
      {
        "id" : uniqueId(),
        "postname": postTitleForm,
        "postcontent": postContentForm
      }
    ])

    if (postContentForm === '' || postTitleForm === '') {
      setError(true)
      SetSuccess(false)
    }
    else{
      setError(false);
      SetSuccess(true)
    }

  };

  console.log(state)

  localStorage.setItem("PostList",JSON.stringify(state))


  // Showing error message if error is true
  const errorMessage = () => {

    return (
      <div
        className="error"
        style={{
          display: error ? '' : 'none',
        }}>
        <p>Please input the data!!</p>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div className='success' style={{
        display: success ? '' : 'none',
      }}>
        <p>Your Post Has been Successfully Created!!</p>
      </div>
    );
  };

  return (
    <div>

      <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div>

      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>

        <TextField
          margin="normal"
          required
          fullWidth
          name="postTitleForm"
          label="Post Title"
          type="postTitle"
          id="postTitleForm"

        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="postContentForm"
          label="Post Content"
          name="postContentForm"
          autoComplete="postContentForm"
          autoFocus

        />


        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 1, mb: 2 }}
        >
          Create Post
        </Button>


      </Box>

    </div>
  )
}

export default CreatePost