import { Link } from 'react-router-dom'
import Postagem from '../../../models/Postagem'

interface CardPostagemProps {
  post: Postagem
}

function CardPostagem({post}: CardPostagemProps) {
  return (
    <div className='shadow-2xl shadow-black border flex flex-col rounded-2xl overflow-hidden justify-between font-poppins m-5 bg-white'>
      <div>
        <div className="flex w-full py-2 px-6 items-center gap-4 border border-silver">
          <img src={post.usuario?.foto} className='h-12 w-12 rounded-full border border-black' alt="Foto do Usuário" />
          <h3 className='text-l font-bold text-center uppercase text-black'>{post.usuario?.nome}</h3>
        </div>
        <div className='border flex rounded-3xl justify-center mx-20 m-3 font-semibold py-1 bg-gradient-to-r from-pink-500 to-yellow-500 text-white'>
        <p>{post.tema?.descricao}</p>
        </div>
        <div className='p-3 pb-3 px-5'>
          <h4 className='text-lg font-semibold'>{post.titulo}</h4>
          <p>{post.texto}</p>
          <div className='pt-2 font-semibold'>
          <p>Data: {new Intl.DateTimeFormat(undefined, {
                    dateStyle: 'full',
                    timeStyle: 'medium',
                  }).format(new Date(post.data))}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col p-2 px-2">
        <div className='p-1'>
      <Link to={`/editarPostagem/${post.id}`} className='w-full text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-indigo-950 flex items-center justify-center py-2 rounded-full'>
          <button>Editar</button>
        </Link>
        </div>
        <div className='p-1'>
        <Link to={`/deletarPostagem/${post.id}`} className='text-white bg-gradient-to-r from-red-400 to-red-600 hover:from-indigo-950 w-full flex items-center justify-center py-2 rounded-full'>
          <button>Deletar</button>
        </Link>
        </div>
      </div>
    </div>
  )
}

export default CardPostagem