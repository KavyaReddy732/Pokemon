import { useHistory, useLocation } from "react-router-dom";
import qs from "query-string";


export default function Sort({ sortValue, setSortValue }) {
    const { pathname, search } = useLocation();
    const history = useHistory();

    const sortList = (e) => {
        setSortValue(e.target.value)
        history.replace({
            pathname: pathname,
            search: qs.stringify({
                ...qs.parse(search),
                sort: sortValue
            })
        });
    };


    return (
        <div>
            <select onChange={sortList} placeholder={sortValue}>
                <option value='select'>select</option>
                <option value='name'>Name</option>
                <option value='height'>Height</option>
                <option value='weight'>Weight</option>
            </select>
        </div>
    );
}