var db = null;

function iniciarBanco() 
{
    db = openDatabase('senai', '1.0', 'Tarefa sobre banco de dados', 5000000);
    criarTabelas();
}

function criarTabelas() 
{
    db.transaction((tr)=>{
        let sql = 'create table cliente (cod integer primary key, nome text, celular text, cidade text)';

        tr.executeSql(sql, null, (tr, result)=>{
            console.log(result);
        }, (tr, error)=>{
            console.log(error);
        });

    });
}

function inserir(nome, celular, cidade) 
{
    return new Promise((fnSucesso, fnErro)=>{

        
        db.transaction((tr)=>{
            let sql = 'insert into cliente (nome, celular, cidade) values (?, ?, ?)';
    
            tr.executeSql(sql, [nome, celular, cidade], (tr, result)=>{
                console.log(result);
                fnSucesso(result);
            }, (tr, error)=>{
                console.log(error);
                fnErro(error);
            });
    
        });


    });
}

async function salvar() 
{
    let cod = document.getElementById('cod');
    let nome = document.getElementById('nome');
    let celular = document.getElementById('celular');
    let cidade = document.getElementById('cidade');
    let resultado = document.getElementById('resultado');

    await inserir(nome.value, celular.value, cidade.value);
    resultado.innerHTML = 'Cliente cadastrado com sucesso!';
      
}

function enviarFormulario() 
{
    salvar();
    return false;
}


function Delete(cod, nome, celular, cidade)
{
    return new Promise((fnSucesso, fnErro)=>{

        
        db.transaction((tr)=>{
            let sql = 'DELETE FROM cliente where cod = ?';
    
            tr.executeSql(sql, [cod], (tr, result)=>{
                console.log(result);
                fnSucesso(result);
                let resultado = document.getElementById('resultado');
                resultado.innerHTML = 'Cliente removido com sucesso!';
            }, (tr, error)=>{
                console.log(error);
                fnErro(error);
            });
    
        });


    });
}

function deletar(){
    let codDelete = document.getElementById('codDelete');
    Delete(codDelete.value);
}

function Update(cod, nome, celular, cidade)
{
    return new Promise((fnSucesso, fnErro)=>{

        
        db.transaction((tr)=>{
            let sql = 'UPDATE cliente SET nome = ?, celular = ?, cidade = ? WHERE cod= ?';
    
            tr.executeSql(sql, [nome, celular, cidade, cod], (tr, result)=>{
                console.log(result);
                fnSucesso(result);
            }, (tr, error)=>{
                console.log(error);
                fnErro(error);
            });
    
        });


    });
}
function enviarEdicao(){
    editar();
    return false;
}

async function editar(){
    let cod = document.getElementById('cod');
    let nome = document.getElementById('nome');
    let celular = document.getElementById('celular');
    let cidade = document.getElementById('cidade');
    let resultado = document.getElementById('resultado');

    await Update(cod.value, nome.value, celular.value, cidade.value);
    resultado.innerHTML = 'Cliente alterado com sucesso!';
}

function Search(nome)
{
    return new Promise((fnSucesso, fnErro)=>{        
        db.transaction((tr)=>{
            let sql = 'SELECT * FROM cliente WHERE nome LIKE ?';
    
            tr.executeSql(sql, [nome], (tr, result)=>{
                console.log(result);
                fnSucesso(result);
            }, (tr, error)=>{
                console.log(error);
                fnErro(error);
            });
    
        });
    });
}

async function search(){

    let cod = document.getElementById('cod');
    let nomeCliente = document.getElementById('nome');
    let celular = document.getElementById('celular');
    let cidade = document.getElementById('cidade');

    let nome = document.getElementById('buscar');
    let resultados = await Search('%' + nome.value + '%');
    console.log(resultados);

    let resultadosSelect = document.getElementById('resultadoSelect');
    resultadosSelect.innerHTML = '';
    
    let resultado = document.getElementById('resultado');
    let resultPesquisa = document.getElementById('resultPesquisa');
    let clienteNull = document.getElementById('casoClienteNull');

    let linha = null;
    for(let i = 0; i<resultados.rows.length; i++)
    {
        linha = resultados.rows[i];

        resultadosSelect.innerHTML += '<li class="list-group-item">'+linha.cod+' - '+linha.nome+' - '+linha.celular+' - '+linha.cidade+'</li>';
    }

    if(resultadosSelect.innerHTML == ''){
        resultado.innerHTML = 'Nenhum cliente encontrado!';
        clienteNull.innerHTML = 'Nenhum cliente encontrado.'
        resultPesquisa.innerHTML = 'Resultados da pesquisa:'
    }
    else{
        resultado.innerHTML = 'Consulta realizada com sucesso!';
        resultPesquisa.innerHTML = 'Resultados da pesquisa:'
        clienteNull.innerHTML = ''
    }

    

}

function SearchCod()
{
    return new Promise((fnSucesso, fnErro)=>{        

        let cod = document.getElementById('cod');

        db.transaction((tr)=>{
            let sql = 'SELECT * FROM cliente WHERE cod = ?';
    
            tr.executeSql(sql, [cod], (tr, result)=>{
                console.log(result);
                fnSucesso(result);
                let resultadosSelect = document.getElementById('resultadoSelect');
                resultadosSelect.innerHTML = result.nome;
            }, (tr, error)=>{
                console.log(error);
                fnErro(error);
            });
    
        });
    });
}
