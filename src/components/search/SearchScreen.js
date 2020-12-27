import React, { useMemo } from 'react';
import queryString from 'query-string';

import { useForm } from '../../hooks/useForm';
import { HeroCard } from '../heroes/HeroCard';
import { useLocation } from 'react-router-dom';
import { getHeroesByName } from '../../selectors/getHeroesByName';

export const SearchScreen = ({ history }) => {

    const location = useLocation();

    const { q = '' } = queryString.parse(location.search);

    const [{ search }, handleInputChange] = useForm({
        search: q
    });

    const heroesFiltered = useMemo(() => getHeroesByName(q), [q]);

    const handleSearch = (e) => {
        e.preventDefault();
        history.push(`?q=${search}`);
    }

    return (
        <div>
            <h1>Search</h1>
            <hr />

            <div className="row">
                <div className="col-5">
                    <h4>Search form</h4>
                    <hr />
                    <form onSubmit={handleSearch}>
                        <input
                            onChange={handleInputChange}
                            name="search"
                            value={search ? search : ''}
                            className="form-control"
                            placeholder="Search"
                            autoComplete="off"
                            type="text" />
                        <button
                            type="submit"
                            className="btn btn-primary mt-3"
                        >
                            Search
                        </button>
                    </form>
                </div>

                <div className="col-7">
                    <h4>Resultado</h4>
                    <hr />
                    {
                        q === ''
                        &&
                        <div className="alert alert-info">
                            Por favor busque un heroe
                        </div>
                    }

                    {
                        q !== '' && heroesFiltered.length === 0
                        &&
                        <div className="alert alert-danger">
                            No existe información por {q}
                        </div>
                    }

                    {
                        heroesFiltered.map(hero => <HeroCard key={hero.id} {...hero} />)
                    }
                </div>
            </div>
        </div>
    )
}
