import { useHistory, useLocation, NavLink } from "react-router-dom";
import axios from "axios";
import useQuery from "../hooks/useQuery";
import qs from "query-string";
import { useState } from "react";
import './styles/search.css';

export default function Search() {
    const { pathname, search } = useLocation();
    const query = useQuery();
    const history = useHistory();
    const [searchType, setSearchType] = useState();
    const [searchInput, setSearchInput] = useState('')
    const [searchResult, setSearchResult] = useState([]);
    const [nameSearchResult, setNameSearchResult] = useState();

    const onAbilitySearch = async () => {
        const results = await axios.get(
            `https://pokeapi.co/api/v2/ability/${searchInput}`
        );
        const response = await results.data;
        history.replace({
            pathname: pathname,
            search: qs.stringify({
                search: searchInput
            })
        });
        setSearchResult(response.pokemon)
    };

    const onNameSearch = async () => {
        const result = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${searchInput}`
        );
        history.replace({
            pathname: pathname,
            search: qs.stringify({
                search: searchInput
            })
        });
        setNameSearchResult(result.data)
    };

    const redirectToMain = () => {
        query.delete(search)
        history.replace({
            pathname: pathname
        });
    }

    return (
        <div>
            <div className='search-box'>
                <select className='search-select' onChange={(e) => setSearchType(e.target.value)}>
                    <option value='select'>select</option>
                    <option value='ability'>Ability</option>
                    <option value='name'>name</option>
                </select>
                <input type='text' className='search-input' placeholder="search for pokemon" onChange={(e) => setSearchInput(e.target.value)} />
                <button type='submit' className='search-btn' onClick={searchType === 'ability' ? onAbilitySearch : onNameSearch}>search</button>
            </div>
            {searchType === 'ability' && query.get("search") ? (
                <div>
                    <div className='search-list'>
                        {searchResult.map(({ pokemon }) => (
                            <div key={pokemon.name}>
                                <NavLink to={'/pokemon/' + pokemon.name} className='individual-links' >
                                    <p>{pokemon.name}</p>
                                </NavLink>
                            </div>))}
                    </div>
                    < div >
                        <button className='search-back-btn' type='button' onClick={redirectToMain}>back</button>
                    </div>
                </div>
            ) : query.get("search") && nameSearchResult && <div>
                <div className='search-name-list'>
                    <NavLink to={'/pokemon/' + nameSearchResult.name} className='individual-links'>
                        <img src={nameSearchResult.sprites.front_default} />
                        <p>{nameSearchResult.name}</p>
                    </NavLink>
                </div>
                < div >
                    <button className='search-back-btn' type='button' onClick={redirectToMain}>back</button>
                </div>
            </div>
            }
        </div>
    );
}