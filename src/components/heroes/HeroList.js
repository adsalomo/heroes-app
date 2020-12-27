import React, { useMemo } from 'react'
import { getHeroByPublisher } from '../../selectors/getHeroByPublisher'
import { HeroCard } from './HeroCard';

export const HeroList = ({ publisher }) => {

    // Si existen useState en este componente, esta funcion no se llama
    // porque quedo memorizada
    // Se usa cuando hay procesos pesados
    // Cada vez que un estado cambia, se ejecutan las funciones
    const heroes = useMemo(() => getHeroByPublisher(publisher), [publisher])

    return (
        <div className="card-deck animate__animated animate__fadeIn">
            {
                heroes.map(hero => <HeroCard key={hero.id} {...hero} />)
            }
        </div>
    )
}
