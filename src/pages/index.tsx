import { useState } from "react";
import apiBuscaCep from "../services/apiBuscaCep";

function App() {

    const [input, setInput] = useState('');
    const [cep, setCep] = useState({});

    async function procurarCep(){
        if(input === ''){
            alert("Favor digitar o cep corretamente! ");
            return;
        }
        try{
            const response = await apiBuscaCep.get(`${input}/json`);
            console.log(response);
            setCep(response.data);
            setInput("");
        }catch{
            alert("Erro ao buscar");
            setInput("");
        }
    }   
    
    return (
        
        <div>
            <h1>Buscador de CEP</h1>
            <div className="form-busca">
                <input type="text" placeholder="Digite aqui seu CEP" value={input} onChange={(e) => setInput(e.target.value)}/>

                <button className="buscar-cep" onClick={procurarCep}>
                    Procurar
                </button>
            </div>

            {Object.keys(cep).length > 0 &&(
                <main className="main">
                    <div className="retorno-busca">
                    <p>Retorno da Busca:</p>
                        <ul>
                            <li>CEP: {cep.cep}</li>
                            <li>RUA: {cep.logradouro}</li>
                            <li>COMPLEMENTO: {cep.bairro}</li>
                            <li>LOGRADURA: {cep.localidade} - {cep.uf}</li>
                        </ul>
                    </div>
                </main>
            )}

        </div>
    );
}

export default App;