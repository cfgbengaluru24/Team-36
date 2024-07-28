import "./App.css";

import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import Login from "./components/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DoctorNavbar } from "./components/DoctorNavbar";
import Option from "./components/Option";
import Doctorviewdata from "./components/Doctorviewdata";
import Chatbot from "./components/Chatbot";
import Viewdata from "./components/Viewdata";
import Form from './components/Form.js'
import CoordinatorForm from './components/CoordinatorForm.js'
import ChatComponent from "./components/ChatComponent.js";

export default class App extends Component {
  render() {
    const router = createBrowserRouter([
      {
        path: "/",
        element: (
          <>
            <Navbar />
            <News />
          </>
        ),
      },
      {
        path: "/form",
        element: (
          <>
            <Navbar />
            <div className="my-10">
              <Form/>
            </div>
            
          </>
        ),
      },
      {
        path: "/link",
        element: (
          <>
            <Login />
            
          </>
        ),
      },
      {
        path: "/doctor/uploaddata",
        element: (
          <>
            <DoctorNavbar />
            <div className="my-10">
              <Option />
            </div>
          </>
        ),
      },
      // {
      //   path: "/doctor/uploaddata/chatbot",
      //   element: (
      //     <>
      //       <div className="my-10">
      //         <Chatbot />
      //       </div>
      //     </>
      //   ),
      // },
      {
        path: "/doctor/updates",
        element: (
          <>
            <DoctorNavbar />
            <div className="my-10"></div>
          </>
        ),
      },
      {
        path: "/doctor/viewdata",
        element: (
          <>
            <DoctorNavbar />
            <div className="my-10">
              <Viewdata />
            </div>
          </>
        ),
      },
      {
        path: "/coordinator/upload",
        element: (
          <>
            <CoordinatorForm/>
          </>
        ),
      },
      // {
      //   path: "/doctor/uploaddata/chatbot",
      //   element: (
      //     <>
      //       <ChatComponent/>
      //     </>
      //   ),
      // },
    ]);
    return (
      <>
        <RouterProvider router={router} />
      </>
    );
  }
}
