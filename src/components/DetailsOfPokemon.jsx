import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useParams, useHistory } from 'react-router-dom';
import './styles/details.css';


export default function DetailsOfPokemon() {
    const history = useHistory();
    const [deatils, setDetails] = useState();
    const { name } = useParams();
    console.log(deatils)

    const individualPokemon = async () => {
        try {
            const result = await axios.get(
                `https://pokeapi.co/api/v2/pokemon/${name}`
            );
            setDetails(result.data)
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        individualPokemon()
    }, [name])

    const redirectToMain = () => {
        history.push('/')
    }

    return (
        <>
            <div className='details-of-pokemon'>
                {deatils &&
                    <div>
                    <img className='pokemon-image' src={deatils.sprites.front_default} alt='pokemon' />
                    <h2>{deatils.name}</h2>
                    <p><b>height :</b>  {deatils.height}</p>
                    <p><b>weight : </b> {deatils.weight}</p>
                    <ul className='details-list-items'><b>abilities :</b>
                        {deatils.abilities.map(({ ability }) =>
                            <li >{ability.name}</li>
                        )}
                    </ul>
                    <p><b>base_experience :</b> {deatils.base_experience}</p>
                    <ul className='details-list-items'><b>Forms:  </b>
                        {deatils.forms.map(({ name }) => <li> {name} </li>)}
                    </ul>
                    <div>
                        <ul className='details-list-items'>
                            <b>moves:</b>
                            {deatils.moves.map(({ move }) => <li> {move.name} </li>)}
                        </ul>
                    </div>
                    <div>
                        <ul className='details-list-items'>
                            <b>stats:</b>
                            {deatils.stats.map(({ base_stat, stat }) =>
                                <li> {stat.name}:{base_stat} </li>
                            )}
                        </ul>
                    </div>
                    <div>
                        <ul className='details-list-items'>
                            <b>types:</b>
                            {deatils.types.map(({ type }) =>
                                <li> {type.name}</li>
                            )}
                        </ul>
                    </div>
                </div>
                }
            </div>
            <div>
                <button className='details-btn' type='button' onClick={redirectToMain}>back</button>
            </div>
        </>
    )
}
