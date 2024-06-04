import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Tema from "../../../models/Tema";
import { RotatingLines } from "react-loader-spinner";
import { buscar, deletar } from "../../../services/Services";
import { AuthContext } from "../../../context/AuthContext";
import { toastAlerta } from "../../../utils/ToastAlerta";


function DeletarTema() {

    const navigate = useNavigate()

    // Receber os dados do Tema, que será cadastrado ou atualizado
    const [tema, setTema] = useState<Tema>({} as Tema);
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    const { id } = useParams<{ id: string }>()

    async function buscarPorId(id: string) {
        try {
            await buscar(`/tema/${id}`, setTema, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                toastAlerta('O token expirou!', 'info')
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            toastAlerta('Você precisa estar logado!', 'info')
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    function retornar() {
        navigate('/tema')
    }

    async function deletarTema() {
        setIsLoading(true)

        try {
            await deletar(`/tema/${id}`, {
                headers: { Authorization: token }
            })
            toastAlerta('O Tema foi apagado com sucesso!', 'sucesso')
        } catch (error: any) {
            if (error.toString().includes('401')) {
                toastAlerta('O token expirou!', 'info')
                handleLogout()
            }else{
                toastAlerta('Erro ao Excluir o Tema!', 'info')
            }
        }

        setIsLoading(false)
        retornar()
    }

    

    return (
        <div className='container w-1/3 mx-auto font-poppins'>
            <h1 className='text-4xl text-center my-6 font-semibold text-white'>Deletar tema</h1>
            <p className='text-center mb-4 text-white'>
                Você tem certeza de que deseja apagar o tema a seguir?</p>
            <div className='shadow-2xl shadow-black border flex flex-col rounded-2xl overflow-hidden text-center mx-10'>
                <header 
                    className='py-2 px-6 bg-white text-black font-semibold text-lg border border-silve'>
                    Tema
                </header>
                <p className='p-8 text-2xl bg-white h-full'>{tema.descricao}</p>
                <div className="flex flex-col bg-white">
                    <div className='p-1'>
                    <button 
                        className='text-white bg-gradient-to-r from-red-400 to-red-600 hover:from-indigo-950 w-full flex items-center justify-center py-2 rounded-full'
                        onClick={retornar}
                        >
                        Não
                    </button>
                    </div>
                    <div className='p-1 pb-4'>
                    <button 
                        className='w-full text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-indigo-950 flex items-center justify-center py-2 rounded-full'
                        onClick={deletarTema}
                        >
                        {isLoading ? <RotatingLines
                        strokeColor="white"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="24"
                        visible={true}
                    /> :
                        <span>Sim</span>
                    }
                    </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DeletarTema