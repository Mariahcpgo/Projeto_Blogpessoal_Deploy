import ListaPostagens from "../../components/postagens/listaPostagens/ListaPostagens";
import ModalPostagem from "../../components/postagens/modalPostagem/ModalPostagem";

function Home(){

    return(
        <>
        <div className="p-1">
        <div className="flex justify-center">
            <div className="container grid grid-cols-2 text-white">
                <div className="flex flex-col items-center gap-4 justify-center py-4">
                    <h2 className="text-9xl font-mono font-bold">BLOG</h2>
                    <p className="text-1xl">Expresse aqui seus pensamentos</p>
                
                    <div className="flex justify-around gap-4">
                    <ModalPostagem />
                    </div>

                </div>

                <div className="flex justify-center">
                    <img src="https://ik.imagekit.io/4kqnwi1lux/Generation/tela.svg?updatedAt=1717518874196" alt="" className="w-3/3"/>
                </div>
            </div>
        </div>
        <ListaPostagens />
        </div>
        </>
    );
}
export default Home;