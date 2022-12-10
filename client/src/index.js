import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
//import reportWebVitals from './reportWebVitals';

import Login from './login_page';
import Main from './main_page';
import ChatWindow from './chat_window';

//crea un cliente para react-query
const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path='/home' element={<Main />}>
          <Route path=':groupID/:subgroupID' element={<ChatWindow />}/>
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<>Not Found</>} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

// If you want to start measuring performance in your App, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
