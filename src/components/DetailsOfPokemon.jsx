import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


export default function DetailsOfPokemon() {
    const [deatils, setDetails] = useState();

    const { id } = useParams();

    const individualPokemon = async () => {
        console.log(id)
        const result = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        const response = await result.json();
        setDetails(response)
    }

    useEffect(() => {
        individualPokemon()
    }, [id])

    return (
        <div>
            <p>name:{deatils.name}</p>
            <p>height:{deatils.height}</p>
            <p>weight:{deatils.weight}</p>
            {deatils.abilities.map(({ ability }) => <p>Abilities:{ability.name}</p>)}
            <p>base_experience:{deatils.base_experience}</p>
            {deatils.forms.map(({ name }) => <p>form Name: {name}</p>)}
            <div>
                <h4>moves:</h4>
                {deatils.moves.map(({ move }) => <p> {move.name}</p>)}
            </div>
            <div>
                <h4>stats:</h4>
                {deatils.stats.map(({ base_stat, stat }) =>
                    <p> {stat.name}:{base_stat}</p>
                )}
            </div>
            <div>
                <h4>types:</h4>
                {deatils.types.map(({ type }) =>
                    <p> {type.name}</p>
                )}
            </div>

        </div>
    )
}
