import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import BlogDetail from './pages/BlogDetail'
import MyBlog from './pages/MyBlogs'
import CreateBlogs from './pages/CreateBlogs'
import EditBlog from './pages/EditBlog'
import ProtectedRoute from './components/ProtectedRoute';
function App() {
 return(
    <div>
    
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/signin' element={<Signin/>}/>
            <Route path='/blogs' element={<ProtectedRoute>
                    <MyBlog/>
                </ProtectedRoute>}/>
            <Route path='/create' element={<ProtectedRoute>
                   <CreateBlogs/>
                </ProtectedRoute>}/>
            <Route path="/blogs/:id" element={<BlogDetail />} />
                <Route path="/edit-blog/:id" element={<ProtectedRoute>
                   <EditBlog />
                </ProtectedRoute>} />
            <Route
                path="/dashboard"
                element={
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
}
            />

            
        </Routes>
    </BrowserRouter>
    </div>)
}

export default App
