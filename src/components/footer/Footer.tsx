import { GithubLogo, InstagramLogo, LinkedinLogo } from '@phosphor-icons/react'
import { ReactNode, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

function Footer() {

  const data = new Date().getFullYear()

  const { usuario } = useContext(AuthContext)

  let component: ReactNode

  if (usuario.token !== ""){
    component = (
    <div className="flex justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-950 text-white">
    <div className="container flex flex-col items-center py-4">
      <p className='text-1xl font-semibold'>BLOG! - Generation Brasil | Copyright: Mariah Garcia &copy; {data}</p>
      <p className='text-lg'>Acesse nossas redes sociais:</p>
      <div className='flex gap-4'>
        <LinkedinLogo size={35} weight='bold' />
        <InstagramLogo size={35} weight='bold' />
        <GithubLogo size={35} weight='bold' />
      </div>
    </div>
  </div>
    )
  }
 
    return (
      <>
        { component }
        </>
    )
  }
  
  export default Footer