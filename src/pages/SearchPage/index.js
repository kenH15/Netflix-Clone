import React,{useState,useEffect} from 'react'
import {useLocation,useNavigate} from 'react-router-dom';
import axios from '../../api/axios';
import { useDebounce } from '../../hooks/useDebounce';
import './SearchPage.css'

export default function SearchPage() {
    const [searchResults, setsearchResults] = useState([]);
    const navigate = useNavigate();
    const useQuery = ()=>{
        return new URLSearchParams(useLocation().search)
    }
    let query = useQuery();
    const debouncedSearchTerm = useDebounce(query.get("q"),500);

    useEffect(() => {
        if(debouncedSearchTerm){
            fetchSearchMovie(debouncedSearchTerm);
        }
    }, [debouncedSearchTerm]);

    const fetchSearchMovie = async (debouncedSearchTerm)=>{
        try {
            const request = await axios.get(`/search/multi?query=${debouncedSearchTerm}`)
            console.log(request);
            setsearchResults(request.data.results);
            
        } catch (error) {
            console.log('error')
        }
    }
   
    const renderSearchResults = ()=>{
        return searchResults.length >0?(
            <section className='search-container'>
                {searchResults.map((movie)=>{
                    if(movie.backdrop_path !==null && movie.media_type !== "person"){
                        const movieImageUrl = "https://image.tmdb.org/t/p/w500"+movie.backdrop_path;
                        return(
                            <div className='movie' key={movie.id}>
                                <div 
                                    onClick={()=>navigate(`/${movie.id}`)}
                                    className='movie__colum-poster'
                                >
                                    <img
                                        src={movieImageUrl}
                                        alt="movieImage"
                                        className='movie__poster'
                                    />
                                </div>

                            </div>
                        )
                    }
                })}
            </section>
        ):<section className='no-results'>
            <div className='no-results-text'>
                <p>
                    {debouncedSearchTerm}에 관한 영화가 없습니다.
                </p>
            </div>
        </section>
    }
    return renderSearchResults();
}
