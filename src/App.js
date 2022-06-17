import SignInSide from './components/SignInSide'
import Dashboard from './components/Dashboard'
import CreatePost from './components/CreatePost'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ListPost from './components/ListPost'
import { useState } from 'react';
import UpdatePost from './components/UpdatePost';
import ViewPost from './components/ViewPost';

function App() {
  
 
  return (
    <div className="App">
       <BrowserRouter>
        <Routes>
          <Route index element={<SignInSide></SignInSide>} />
          <Route path = "home" element={<Dashboard></Dashboard>}>
            <Route path = "createPost" element={<CreatePost/>}> </Route>
            <Route path = "listPost">
              <Route index={true} element={<ListPost/>}></Route>
              <Route path = "updatePost" element={<UpdatePost/>}></Route>
              <Route path = "viewPost" element={<ViewPost/>}></Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>

     
    </div>
  );
}

export default App;
