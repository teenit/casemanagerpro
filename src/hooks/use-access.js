import {useSelector} from 'react-redux';

export function useAccess(){
    const {access} = useSelector(state => state.access)
    
    return {
        access
    }
}
