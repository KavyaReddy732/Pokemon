import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useLocation, NavLink } from "react-router-dom";
import useQuery from "../hooks/useQuery";
import qs from "query-string";
import './styles/index.css';
import Sort from "./Sort";
import Search from "./Search";

export default function List() {
    const query = useQuery();
    const { pathname, search } = useLocation();
    const history = useHistory();
    const [pokemonList, setPokemonList] = useState([]);
    const [cardsPerPage, setCardsPerPage] = useState(10);
    const [sortValue, setSortValue] = useState();
    const limit = cardsPerPage;
    const page = query.get("page");

    const fetchPokemon = async () => {
        try {
            const {
                data: { results }
            } = await axios.get(
                `https://pokeapi.co/api/v2/pokemon?limit=${limit || 10
                }&offset=${page * limit || 0}`
                );

            const pokemonData = await Promise.all(
                results.map(({ url }) => axios.get(url))
            );
            const sortedData = pokemonData
                .map((res) => res.data)
                .sort((a, b) => {
                    const aValue = a[sortValue];
                    const bValue = b[sortValue];
                    return typeof aValue === "string"
                        ? aValue.localeCompare(bValue)
                        : aValue - bValue;
                });
            setPokemonList(sortedData);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchPokemon();
    }, [search, cardsPerPage]);

    const handleNextPage = (e) => {
        e.preventDefault()
        history.replace({
            pathname: pathname,
            search: qs.stringify({
                ...qs.parse(search),
                limit: cardsPerPage,
                page: `${Number(query.get("page")) + 1}`,
            })
        });
    };
    const handlePreviousPage = (e) => {
        e.preventDefault()
        history.replace({
            pathname: pathname,
            search: qs.stringify({
                ...qs.parse(search),
                limit: cardsPerPage,
                page: `${Number(query.get("page")) - 1}`,
            })
        });
    };

    const cardsToRender = (e) => {
        setCardsPerPage(e.target.value)
    }

    return (
        <>
            <Search />
            <div className='main-div'>
                {query.get("search") ? null :
                    <div>
                        <div className='card-sort-option'>
                            <div className='select-cards-option'>
                                <label className='option-label'>cards to display</label>
                                <select className='card-select' value={cardsPerPage} onChange={cardsToRender}>
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                    <option value={50}>50</option>
                                </select>
                            </div>
                            <Sort sortValue={sortValue} setSortValue={setSortValue} />
                        </div>
                        <div className='cards'>
                            {pokemonList &&
                                pokemonList.map(({ name, height, weight, sprites, abilities }) => (
                                    <div key={name} className='card'>
                                        <NavLink to={'/pokemon/' + name} className='card-content'>
                                            <img src={sprites.front_default} alt='pokemon' />
                                            <h4>{name}</h4>
                                            <p>height: {height}</p>
                                            <p>weight: {weight}</p>
                                            <ul className='list-items'>abilities: {abilities.map((element, i) =>
                                                <li key={i}>{element.ability.name}</li>
                                            )}</ul>
                                        </NavLink>
                                    </div>
                                ))}
                        </div>
                        <div className='next-previous-btn'>
                            <button className='btn-btn' onClick={handlePreviousPage}>previous</button>
                            <button className='btn-btn' onClick={handleNextPage}>next</button>
                        </div>
                    </div>}
            </div>
        </>
    );
}
