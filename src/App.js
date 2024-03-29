import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import { publicRoutes, privateRoutes } from './routes';
import DefaultLayout from './components/layouts/frontend/DefaultLayout';
import 'bootstrap/dist/css/bootstrap.min.css';
import MasterLayout from './components/layouts/admin/MasterLayout';
import API from './API';
import { AuthContext } from './helpers/AuthContext';
import Swal from "sweetalert2";
import Login from './components/frontend/auth/Login';
import Register from './components/frontend/auth/Register';
import Page404 from './components/errors/Page404';
import PersistentDrawerLeft from './components/layouts/admin/Layout';
import Profile from './components/admin/profile/Profile';


function App() {
  useEffect(() => {
    document.title = "Shop sóc xanh";
  }, [])

  const [permission, setPermission] = useState([]);

  const [authState, setAuthState] = useState({
    email: "",
    id: 0,
    hoTen: '',
    diaChi: '',
    sdt: "",
    phanQuyen: '',
    status: false,
    VaiTroId: '',
  });

  useEffect(() => {
    API({
      method: 'get',
      url: `/auth/auth`,
    }).then((res) => {
      console.log(res.data)
      if (res.data.error) {
        setAuthState({ ...authState, status: false });
      } else {
        setAuthState({
          email: res.data.email,
          id: res.data.id,
          hoTen: res.data.hoTen,
          diaChi: res.data.diaChi,
          sdt: res.data.sdt,
          phanQuyen: res.data.phanQuyen,
          status: true,
          VaiTroId: res.data.VaiTroId,
        });
      }
    })
  }, [])

  useEffect(() => {
    API({
      method: 'get',
      url: `admin-permission/permission/${authState.VaiTroId}`,
    }).then((res) => {
      setPermission(res.data.RolePermissions);
      console.log(res.data.RolePermissions);
    })
  }, [authState.VaiTroId])


  return (
    <div className='App'>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <Routes>
            <Route path='*'
              element={
                <DefaultLayout>
                  <Page404 />
                </DefaultLayout>
              }
            />
            <Route path='admin/*'
              element={
                <DefaultLayout>
                  <Page404 />
                </DefaultLayout>
              }
            />
            <Route
              path='/login'
              element={
                localStorage.getItem('accessToken') ?
                  <Navigate to="/account" /> :
                  (<DefaultLayout>
                    <Login />
                  </DefaultLayout>)
              }
            />
            <Route
              path='/register'
              element={
                localStorage.getItem('accessToken') ?
                  <Navigate to="/" /> :
                  (<DefaultLayout>
                    <Register />
                  </DefaultLayout>)
              }
            />
            {
              publicRoutes.map((route, index) => {
                const Layout = route.layout || DefaultLayout;
                const Page = route.component;
                return (route.path == "/pay" ?
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <Page />
                    }
                  /> :
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <Layout>
                        <Page />
                      </Layout>
                    }
                  />
                );
              })}
            {
              authState.phanQuyen != 0 &&
              <Route path='/admin' name="Admin" element={<PersistentDrawerLeft />} >
                {
                  authState.phanQuyen === 1 ?
                    privateRoutes.map((route, index) => {
                      const Page = route.component;
                      return (
                        <Route
                          key={index}
                          path={`/admin${route.path}`}
                          element={
                            <Page />
                          }
                        />)
                    })
                    :
                    authState.phanQuyen === 2 ?
                      privateRoutes.map((route, index) => {
                        for (let i = 0; i < permission.length; i++) {
                          if (permission[i].PhanQuyenId === route.value) {
                            const Page = route.component;
                            return (
                              <Route
                                key={index}
                                path={`/admin${route.path}`}
                                element={
                                  <Page />
                                }
                              />)
                          }
                        }
                      })
                      : ""
                }
                <Route
                  path={`/admin/profile`}
                  element={
                    <Profile />
                  }
                />
              </Route>
            }
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  )
}

export default App