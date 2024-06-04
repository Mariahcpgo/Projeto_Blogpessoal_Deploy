import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Postagem from '../../../models/Postagem'
import { AuthContext } from '../../../context/AuthContext'
import { buscar, deletar } from '../../../services/Services'
import { toastAlerta } from '../../../utils/ToastAlerta'


function DeletarPostagem() {
  const [postagem, setPostagem] = useState<Postagem>({} as Postagem)

  let navigate = useNavigate()

  const { id } = useParams<{ id: string }>()

  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token

  async function buscarPorId(id: string) {
    try {
      await buscar(`/postagens/${id}`, setPostagem, {
        headers: {
          'Authorization': token
        }
      })
    } catch (error: any) {
      if (error.toString().includes('403')) {
        toastAlerta('O token expirou, favor logar novamente', 'info')
        handleLogout()
      }
    }
  }

  useEffect(() => {
    if (token === '') {
      toastAlerta('Você precisa estar logado', 'info')
      navigate('/login')
    }
  }, [token])

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id)
    }
  }, [id])

  function retornar() {
    navigate("/postagens")
  }

  async function deletarPostagem() {
    try {
      await deletar(`/postagens/${id}`, {
        headers: {
          'Authorization': token
        }
      })

      toastAlerta('Postagem apagada com sucesso', 'sucesso')

    } catch (error) {
      toastAlerta('Erro ao apagar a Postagem', 'erro')
    }

    retornar()
  }
  return (
    <div className='container w-1/3 mx-auto font-poppins'>
      <h1 className='text-4xl text-center my-4 text-white'>Deletar postagem</h1>

      <p className='text-center mb-4 text-white'>Você tem certeza de que deseja apagar a postagem a seguir?</p>

      <div className='shadow-2xl shadow-black border flex flex-col rounded-2xl overflow-hidden justify-between'>
        <header className='py-2 px-6 bg-white text-black font-semibold text-2xl border border-silve'>Postagem</header>
        <div className="p-6 bg-white">
          <p className='text-xl h-full font-semibold'>{postagem.titulo}</p>
          <p>{postagem.texto}</p>
        </div>
        <div className="flex flex-col bg-white">
          <div className='p-1'>
          <button className='text-white bg-gradient-to-r from-red-400 to-red-600 hover:from-indigo-950 w-full flex items-center justify-center py-2 rounded-full' onClick={retornar}>Não</button>
          </div>
          <div className='p-1 pb-2'>
          <button className='w-full text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-indigo-950 flex items-center justify-center py-2 rounded-full' onClick={deletarPostagem}>
            Sim
          </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeletarPostagem