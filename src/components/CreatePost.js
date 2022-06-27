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
  const [message, setMessage] = useState("");


  const uniqueId = () => parseInt(Date.now() * Math.random(), 10).toString();


  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let res = [];
    let postcontent = data.get('postContentForm');
    let posttitle = data.get('postTitleForm')

    try {
      res = await axios.post('http://localhost:3002/api/post', {
        posttitle: posttitle,
        postcontent: postcontent
      })
      if (res.status === 200) {
        setMessage("Post created successfully");
        console.log(res)
      }
      else {
        setMessage("Some error occured");
      }
    }
    catch (err) {
      console.log(err)
    }

  };



  // console.log({
  //   "postname":postTitleForm,
  //   "postcontent":postContentForm
  // })

  //   setState(prevState=> [
  //     ...prevState, 
  //     {
  //       "id" : uniqueId(),
  //       "postname": postTitleForm,
  //       "postcontent": postContentForm
  //     }
  //   ])

  //   if (postContentForm === '' || postTitleForm === '') {
  //     setError(true)
  //     SetSuccess(false)
  //   }
  //   else{
  //     setError(false);
  //     SetSuccess(true)
  //   }

  // };

  // console.log(state)

  // localStorage.setItem("PostList",JSON.stringify(state))


  return (
    <div>

    <div className="message">{message ? <p>{message}</p> : null}</div>


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