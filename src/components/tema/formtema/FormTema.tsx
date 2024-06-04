import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Tema from "../../../models/Tema";
import { RotatingLines } from "react-loader-spinner";
import { atualizar, buscar, cadastrar } from "../../../services/Services";
import { AuthContext } from "../../../context/AuthContext";
import { toastAlerta } from "../../../utils/ToastAlerta";


function FormTema() {

    const navigate = useNavigate()

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

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setTema({
            ...tema,
            [e.target.name]: e.target.value
        })
    }

    function retornar() {
        navigate('/tema')
    }

    async function gerarNovoTema(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        if (id !== undefined) {

            try {
                await atualizar(`/tema`, tema, setTema, {
                    headers: { 'Authorization': token }
                });
                toastAlerta('Tema atualizado com sucesso!', 'sucesso');
            } catch (error: any) {
                if (error.toString().includes('401')) {
                    toastAlerta('O token Expirou!', 'info')
                    handleLogout()
                } else {
                    toastAlerta('Erro ao atualizar o Tema!', 'erro')
                }
            }

        } else {

            try {
                await cadastrar(`/tema`, tema, setTema, {
                    headers: { 'Authorization': token }
                });
                toastAlerta('Tema cadastrado com sucesso!', 'sucesso')
            } catch (error: any) {
                if (error.toString().includes('401')) {
                    toastAlerta('O token Expirou!', 'info')
                    handleLogout()
                } else {
                    toastAlerta('Erro ao cadastrar o Tema!', 'erro')
                }
            }

        }

        setIsLoading(false)
        retornar()
    }

    console.log(JSON.stringify(tema))

    return (
        <div className="flex flex-col items-center justify-center mx-auto pb-80">
            <h1 className="text-4xl text-center my-8 font-poppins font-semibold text-white">
                {id === undefined ? 'Cadastrar Tema' : 'Editar Tema'}
            </h1>

            <form className="w-1/2 flex flex-col gap-4"
                onSubmit={gerarNovoTema}
            >
                <div className="flex flex-col gap-2 font-poppins text-white">
                    <label htmlFor="descricao">Descrição do Tema</label>
                    <input
                        type="text"
                        placeholder="Descreva aqui seu tema"
                        name='descricao'
                        className="border shadow-md shadow-black rounded p-2 bg-gray-100 text-black"
                        value={tema.descricao}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <button
                    className="rounded text-white border-white border-solid border-2 py-2 px-4 hover:bg-white hover:text-indigo-950"
                    type="submit">

                    {isLoading ? <RotatingLines
                        strokeColor="white"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="24"
                        visible={true}
                    /> :
                        <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>
                    }

                </button>
            </form>
        </div>
    );
}

export default FormTema;