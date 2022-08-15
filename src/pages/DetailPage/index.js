import axios from '../../api/axios';
import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import '../../components/MovieModal/MovieModal.css'
export default function DetailPage() {
  const {movieId} = useParams();
  const [movie, setMovie] = useState({});
  const fetchMovieData = async () => {
    const request = await axios.get(`/movie/${movieId}`);
    setMovie(request.data)
    console.log(request);
};

  useEffect(() => {
    fetchMovieData();
  }, [movieId]);// eslint-disable-line react-hooks/exhaustive-deps

  if (!movie) return <div>No Infomation</div>
  else{
    return (
      <section>
        <img
          className='modal__poster-img'
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt='poster'
        />
      </section>
    )
  }

}
