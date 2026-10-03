import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useParams, useNavigate } from 'react-router-dom'

const Player = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [apiData, setApiData] = useState({
        name: "",
        key: "",
        published_at: "",
        type: ""
    })

    useEffect(() => {

        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzE1ZmYzNzkzMGI2MjQ2MWQ4OTAyNWUxNzQxMDVjNiIsIm5iZiI6MTc5MDc5NTM1My40MzYsInN1YiI6IjZhYmQ1ZTU5NDljODVlNWJhZTM0MTYzMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YKrX7QDO_jYt-Bp3BuqYuvhHMewzCzaXimIZtnJtisg';

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        };

        if (id) {

            fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
                .then(res => {
                    if (!res.ok) {
                        throw new Error("Movie ID not found");
                    }
                    return res.json();
                })
                .then(res => {

                    if (res.results && res.results.length > 0) {

                        const trailer = res.results.find(
                            v => v.type === 'Trailer' && v.site === 'YouTube'
                        );

                        if (trailer) {
                            setApiData(trailer);
                        } else {
                            setApiData(res.results[0]);
                        }
                    }

                })
                .catch(err => {
                    console.error(err);

                    fetch(
                        `https://api.themoviedb.org/3/search/movie?query=${id}&language=en-US`,
                        options
                    )
                        .then(res => res.json())
                        .then(searchData => {

                            if (
                                searchData.results &&
                                searchData.results.length > 0
                            ) {

                                const movieId = searchData.results[0].id;

                                return fetch(
                                    `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
                                    options
                                );
                            }

                            throw new Error("Movie not found");
                        })
                        .then(res => res.json())
                        .then(res => {

                            if (res.results && res.results.length > 0) {

                                const trailer = res.results.find(
                                    v =>
                                        v.type === 'Trailer' &&
                                        v.site === 'YouTube'
                                );

                                if (trailer) {
                                    setApiData(trailer);
                                } else {
                                    setApiData(res.results[0]);
                                }
                            }
                        })
                        .catch(err => console.error(err));
                });
        }

    }, [id])

    return (
        <div className='player'>

            <img
                src={back_arrow_icon}
                alt=""
                onClick={() => navigate(-1)}
            />

            {apiData.key && (
                <iframe
                    width='90%'
                    height='90%'
                    src={`https://www.youtube.com/embed/${apiData.key}`}
                    title='trailer'
                    frameBorder='0'
                    allowFullScreen
                ></iframe>
            )}

            <div className="player-info">
                <p>
                    {apiData.published_at
                        ? apiData.published_at.slice(0, 10)
                        : ''}
                </p>

                <p>{apiData.name}</p>

                <p>{apiData.type}</p>
            </div>

        </div>
    )
}

export default Player