const name = document.querySelector('#name')
const email = document.querySelector('#email')
const subject = document.querySelector('#subject')
const message = document.querySelector('#message')
const send = document.querySelector('#send')

send.addEventListener('click',function(){
    window.location.href=`add/${name.value}/${email.value}/${subject.value}/${message.value}`
})
// import {conector} from '../mysql_conector.js'
// function saveMessage(req, res){
//     const {namess,address,subject,message}= req.body;
//     const added= {
//         namess,address,subject,message
//     }
//     // const sql = 'INSERT INTO contact_messages (namess,address,subject,message) VALUES (namess,address,subject,message)'
//     pool.query('INSERT INTO contact_messages (namess,address,subject,message) SET ?',[added])
// //     conector.query(sql,[namess,address,subject,message],(err, result)=>{
// //         if(err){
// //             console.error('Error al insertar datos en MySQL: ' + err.message);
// //             callback(err);
// //         }else{
// //             callback(null, result);
// //         }
// //     });
// // }
// }
// export {saveMessage}