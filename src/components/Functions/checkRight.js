export function checkRight(arg,right){
    if(arg?.root){
        if(arg.root == "true"){
            return true;
        }
    }
    if(arg?.[right]){
        if(arg[right] == true){
            return true;
        }else{
            return false;
        }
    }else{
        return false
    }
}