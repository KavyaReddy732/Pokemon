import { useHistory, useLocation, NavLink } from "react-router-dom";
import qs from "query-string";
import useQuery from "../hooks/useQuery";
import { useState } from "react";

export default function Search() {
    const { pathname, search } = useLocation();
    const query = useQuery();
    const history = useHistory();
    const [searchType, setSearchType] = useState();
    const [searchInput, setSearchInput] = useState('')
    const [searchResult, setSearchResult] = useState([]);
    const [nameSearchResult, setNameSearchResult] = useState();
    console.log(searchResult)

    const onAbilitySearch = async () => {
        const result = await fetch(
            `https://pokeapi.co/api/v2/ability/${searchInput}`
        );
        const response = await result.json();
        history.replace({
            pathname: pathname,
            search: qs.stringify({
                abilitysearch: searchInput
            })
        });
        setSearchResult(response.pokemon)
    };

    const onNameSearch = async () => {
        const result = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${searchInput}`
        );
        const response = await result.json();
        console.log(response)
        history.replace({
            pathname: pathname,
            search: qs.stringify({
                namesearch: searchInput
            })
        });
        // setNameSearchResult(response.pokemon)
    };

    return (
        <div>
            <select onChange={(e) => setSearchType(e.target.value)}>
                <option value='ability'>Ability</option>
                <option value='name'>name</option>
            </select>
            <input type='text' placeholder="search for pokemon" onChange={(e) => setSearchInput(e.target.value)} />
            <button type='submit' onClick={searchType === 'ability' ? onAbilitySearch : onNameSearch}>search</button>
            {searchResult.map(({ pokemon }) => (<div key={pokemon.name}>
                <NavLink to={'/' + pokemon.name}>
                    <p>{pokemon.name}</p>
                </NavLink>
            </div>))}
        </div>
    );
}