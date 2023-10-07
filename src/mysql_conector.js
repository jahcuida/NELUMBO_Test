//Importar mysql
import mysql from 'mysql';


const conector = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'prueba_nodejs'
})

const connection = () =>{
    conector.connect(err =>{
        if(err) throw err
        console.log('connected')
    })
}   

export {connection,conector}