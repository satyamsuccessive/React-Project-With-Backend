import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { IconButton } from '@mui/material';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Paper from '@mui/material/Paper';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { useEffect, useState } from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom'


// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0),
//   createData('Ice cream sandwich', 237, 9.0),
//   createData('Eclair', 262, 16.0),
//   createData('Cupcake', 305, 3.7),
//   createData('Gingerbread', 356, 16.0),
// ];




function ListPost() {

  const [items, setItems] = useState([]);

  function deletePost(id){
    let items =JSON.parse(localStorage.getItem("PostList"));
    items = items.filter((item) => item.id !== id);
    localStorage.setItem("PostList", JSON.stringify(items));
    setItems(items)
    if (items.length === 0) {
      localStorage.removeItem("PostList");
    }
  }

  
 

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('PostList'));
    if (items) {
      setItems(items);
    }
  }, [])

  // console.log(items)
  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Post Title</TableCell>
            <TableCell align="right">Post Content</TableCell>
            <TableCell align="right">Action</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>

          {items.map((item) => (


            <TableRow
              key={item.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >

              <TableCell component="th" scope="row">
                {item.postname}
              </TableCell>
              <TableCell align="right"> {item.postcontent}</TableCell>

              <TableCell align="right">

              <Link to ={{
                pathname:"viewPost",
                search: `?id=${item.id}`
              }} style = {{textDecoration:'none'}} >
                 <IconButton aria-label="view" >
                  <VisibilityIcon  color="success" />
                </IconButton>
              </Link>
             

              <Link to={{
                pathname: "updatePost",
                search: `?id=${item.id}`,
              }} style={{ textDecoration: 'none' }}>
                <IconButton aria-label="edit">
                  <EditIcon  color="primary"/>
                </IconButton>
              </Link>
                <IconButton aria-label="delete" onClick={() => deletePost(item.id)} >
                  <DeleteIcon  color="secondary" />
                </IconButton>
              </TableCell>  

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default ListPost