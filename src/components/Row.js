import React, { useEffect, useState } from 'react';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import axios from '../api/axios';
import MovieModal from './MovieModal';
import "./Row.css"
export default function Row({ isLarge, title, id, fetchUrl }) {
    const [movies, setMovies] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [movieSelected, setmovieSelected] = useState([]);
    useEffect(() => {
        fetchMovieData();
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    const fetchMovieData = async () => {
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results);
    };

    const handleClick = (movie) => {
        setModalOpen(true);
        setmovieSelected(movie);
    }
    return (
        <section className='row'>
            <h2>{title}</h2>

            <Swiper
                modules={[Navigation,Pagination,Scrollbar,A11y]}
                navigation
                pagination={{clickable:true}}
                breakpoints={{
                    1378:{
                        slidesPerView:6,
                        slidesPerGroup:6,
                    },
                    998:{
                        slidesPerView:5,
                        slidesPerGroup:5,
                    },
                    625:{
                        slidesPerView:4,
                        slidesPerGroup:4,
                    },
                    0:{
                        slidesPerView:3,
                        slidesPerGroup:3,
                    },
                }}
            >

                <div id={id} className="row__posters">
                    {movies.map((movie) => (
                        <SwiperSlide key={movie.id}> 
                            <img
                                className={`row__poster ${isLarge && "row__posterLarge"}`}
                                src={`https://image.tmdb.org/t/p/original${isLarge ? movie.poster_path : movie.backdrop_path}`}
                                alt={movie.name}
                                onClick={() => handleClick(movie)}
                            />
                        </SwiperSlide>
                    ))}
                </div>
            </Swiper>
            {modalOpen && <MovieModal {...movieSelected} setModalOpen={setModalOpen} />}

        </section>
    )
}

