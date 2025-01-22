import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function useRouteData() {
    const location = useLocation();
    const params = useParams();
    const [routeData, setRouteData] = useState({
        pathname: location.pathname,
        params: params,
    });

    useEffect(() => {
        setRouteData({
            pathname: location.pathname,
            params: params,
        });
    }, [location, params]);

    return routeData;
}
