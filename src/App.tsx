import React from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Layout from "./components/common/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Todo from "./pages/Todo";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    element={
                        <>
                            <Layout>
                                <Outlet />
                            </Layout>
                        </>
                    }
                >
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/todo" element={<Todo />} />
                    <Route path="/*" element={<>not found</>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
