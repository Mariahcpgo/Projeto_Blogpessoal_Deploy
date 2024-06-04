import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/navBar/NavBar'
import Cadastro from './pages/cadastro/Cadastro'
import ListaTemas from './components/tema/listatemas/ListaTemas'
import FormTema from './components/tema/formtema/FormTema'
import DeletarTema from './components/tema/deletartema/DeletarTema'
import { AuthProvider } from './context/AuthContext'
import ListaPostagens from './components/postagens/listaPostagens/ListaPostagens'
import FormularioPostagem from './components/postagens/formularioPostagem/FormularioPostagem'
import DeletarPostagem from './components/postagens/deletarPostagem/DeletarPostagem'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Perfil from './pages/perfil/Perfil'
import Login from './pages/login/Login'
import Home from './pages/home/Home'
import Footer from './components/footer/Footer'

function App() {
    return (
        <>
            <AuthProvider>
                <ToastContainer/>
                <BrowserRouter>
                    <Navbar />
                    <div className='min-h-[80vh]'>
                        <Routes>
                            <Route path="/" element={<Login />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/cadastro" element={<Cadastro />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/temas" element={<ListaTemas />} />
                            <Route path="/cadastrartema" element={<FormTema />} />
                            <Route path="/editartema/:id" element={<FormTema />} />
                            <Route path="/deletartema/:id" element={<DeletarTema />} />
                            <Route path="/postagens" element={<ListaPostagens />} />
                            <Route path="/cadastroPostagem" element={<FormularioPostagem />} />
                            <Route path="/editarPostagem/:id" element={<FormularioPostagem />} />
                            <Route path="/deletarPostagem/:id" element={<DeletarPostagem />} />
                            <Route path="/perfil" element={<Perfil />} />
                        </Routes>
                    </div>
                    <Footer />
                </BrowserRouter>
            </AuthProvider>
        </>
    )
}

export default App