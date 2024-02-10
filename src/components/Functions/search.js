import axios from "axios"
export function search(addres,val, progres, result){
    let obj = {
        id: localStorage.getItem("id"),
        token: localStorage.getItem("token"),
        val:val
    }
    axios({
        url: addres,
        method: "POST",
        header : {'Content-Type': 'application/json;charset=utf-8'},
        data : JSON.stringify(obj),
        onUploadProgress: event => {
            progres(true)
        },
    })
    .then((data)=>{ 
        if(data.data == []) result(null)
        else result(data.data)
        progres(false)
        
    })
    .catch((error)=>console.log(error))  
}