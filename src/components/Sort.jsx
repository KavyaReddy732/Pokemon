import { useHistory, useLocation } from "react-router-dom";
import qs from "query-string";
import { useEffect } from "react";
import './styles/index.css';


export default function Sort({ sortValue, setSortValue }) {
    const { pathname } = useLocation();
    const history = useHistory();


    useEffect(() => {
        history.replace({
            pathname: pathname,
            search: qs.stringify({
                sort: sortValue
            })
        });
    }, [sortValue])


    return (
        <div>
            <select className='sort-select' onChange={(e) => setSortValue(e.target.value)} placeholder={sortValue}>
                <option value='select'>sort by</option>
                <option value='name'>Name</option>
                <option value='height'>Height</option>
                <option value='weight'>Weight</option>
            </select>
        </div>
    );
}