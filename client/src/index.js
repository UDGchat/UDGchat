import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import reportWebVitals from './reportWebVitals';

import Login from './login_page';
import Main from './main_page';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/home' element={<Main />} />
      <Route path='/login' element={<Login />} />
      <Route path='*' element={<Main />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your App, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
