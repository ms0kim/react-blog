import {
    BrowserRouter as Router,
    Routes,
    Route
  } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import routes from './routes';
import Toast from './components/Toast';
import useToast from './hooks/toast';
import { useDispatch, useSelector } from 'react-redux';
import ProtectedRoute from './ProtectedRoute';
import { useEffect, useState } from 'react';
import { login } from './store/authSlice';
import Loading from './components/Loading';


function App() {
  const toasts = useSelector(state => state.toast.toasts);
  const { deleteToast } = useToast();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  //로그인 유지
  useEffect(() => {
    if (localStorage.getItem('isLoggedIn')) {
      dispatch(login());
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <Loading />
  }

  return (
    <div className='wrap'>
      <Router>
        <NavBar />
        <Toast 
          toasts={toasts}
          deleteToast={deleteToast}
        />
        <Routes>
          {routes.map((route) => {
            return <Route 
              key={route.path} 
              path={route.path} 
              element={route.auth ? <ProtectedRoute 
                element={route.element} 
              /> : route.element} 
            />
          })}
        </Routes>
  
      </Router>
    </div>
  );
}

export default App;