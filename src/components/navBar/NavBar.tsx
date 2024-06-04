import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import { ReactNode, useContext } from "react"
import { toastAlerta } from "../../utils/ToastAlerta"

function Navbar() {

    const navigate = useNavigate()

    const { usuario, handleLogout } = useContext(AuthContext)

    function logout(){
        handleLogout()
        toastAlerta('O usuário foi desconectado com sucesso!', "info")
        navigate('/')
    }

    let compenent: ReactNode;

    if (usuario.token !== ""){

        compenent = (
        <div className='w-full flex justify-center py-3 
        bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-950 ... text-white'>
            
                <div className="container flex justify-between pl-6 pr-20 text-lg">
                    <Link to="/" className="text-2 font-poppins font-semibold">BLOG!</Link>

                    <div className='flex gap-10'>
                        <Link to='/postagens' className='hover:underline'>Postagens</Link>
                        <Link to='/temas' className='hover:underline'>Temas</Link>
                        <Link to='/cadastrartema' className='hover:underline'>Cadastrar Tema</Link>
                        <Link to='/perfil' className='hover:underline'>Perfil</Link>
                        <Link to="" onClick={logout} className="hover:underline">Sair</Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            { compenent }
        </>
    )
}

export default Navbar