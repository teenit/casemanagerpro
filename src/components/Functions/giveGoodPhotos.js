function ext(name) {
    return name.match(/\.([^.]+)$|$/)[1];
}
export function giveGoodPhotosCase(mas){
    let newMas = [];
    let a = {
       title:"",
       format:"",
       link:""
    }
    for(let i = 0; i < mas.length; i++){
        newMas.push({
           title:mas[i].title,
           format:ext(mas[i].url),
           link:mas[i].url
       })
    }

    return newMas;
}