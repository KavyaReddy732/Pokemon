import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useLocation, NavLink } from "react-router-dom";
import useQuery from "../hooks/useQuery";
import qs from "query-string";
import '../App.css';
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
                sort: query.get("sort")
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
                sort: query.get("sort")
            })
        });
    };

    const cardsToRender = (e) => {
        setCardsPerPage(e.target.value)
    }

    return (
        <div>
            <Search />
            <label>number of cards</label>
            <select value={cardsPerPage} onChange={cardsToRender}   >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
            </select>
            <Sort sortValue={sortValue} setSortValue={setSortValue} />

            {pokemonList &&
                pokemonList.map(({ id, name, height }) => (
                    <div className='App' key={id}>
                        <NavLink to={'/pokemon/' + id}>
                            <p>{name}</p>
                            <p>{height}</p>
                        </NavLink>
                    </div>
                ))}

            <button onClick={handlePreviousPage}>prev</button>
            <button onClick={handleNextPage}>next</button>
        </div>
    );
}
