import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';
import { Link } from 'react-router-dom'

interface GenreLists {
  id: number,
  name: string,
}

interface MovieLists {
  title: string,
  id: number,
  genre_ids: number[],
  release_date: Date,
  vote_average: number,
  backdrop_path: string,
  poster_path: string
}


interface SelectProps {
    genreList: GenreLists[];
}

export const Title: React.FC<SelectProps> = ({
    genreList}) => {
    const genreProps:GenreLists[] = [];
    const movieProps:MovieLists[] = [];
    const [movieList, setMovieList]: [MovieLists[], (data: MovieLists[]) => void] = useState(movieProps);
    //const [genreList, setGenreList]: [GenreLists[], (data: GenreLists[]) => void] = useState(genreProps);
    const [searchTitle, setSearchTitle] = useState("");
    let api = 'e9029bc5d239bd2ec48b1330a107bb22';

    const requestOptions = {
        method: 'GET',
        headers: {"Content-Type": "application/json"}
    };

  useEffect(() => {
    const fecthMovie = () => {
        fetch('http://localhost:8080/api/movies?api_key=' + api, requestOptions)
        .then(resps => resps.json())
        .then(datas => {
          setMovieList(datas.results);
        })
      }

    fecthMovie();
  }, [])

  const getSearchTitle = (e: any) => {
    let search = e.target.value; 
    setSearchTitle(search);
  }

    const searchByTitle = () => {
      /*fetch('http://localhost:8080/api/movies/title?api_key=' + api + "&query=" + searchTitle, requestOptions)
      .then(resps => resps.json())
      .then(data => {
        setMovieList(data.results);
      })*/
      window.location.href = "/title/0/" + searchTitle;
    }

    const onErrors = (e: any) => {
        e.target.src = window.location.origin + "/default.png";
    }

    const enterSearch = (event : React.KeyboardEvent, val: string) => {
      if (event.key == 'Enter') {
        /*fetch('http://localhost:8080/api/movies/title?api_key=' + api + "&query=" + val, requestOptions)
        .then(resps => resps.json())
        .then(data => setMovieList(data.results))*/
        window.location.href = "/title/0/" + val;
      }
    }

    return (
        <React.StrictMode> 
            <div className="h-25 d-inline-block ml-1">
                <input id="searchMovie" className="form-control form-control-sm" 
                type="text" 
                value={searchTitle}
                onChange={getSearchTitle}
                onKeyUp={(e) => enterSearch(e, searchTitle)} 
                placeholder="Search" 
                aria-label="Search" />
            </div>
            <div className="h-25 d-inline-block ml-1">
                <Button
                    onClick={searchByTitle}
                    className="btn-sm">
                    Search
                </Button>
            </div>
            <div className="container-fluid mt-4">
                    {
                        movieList.map((d, i) => {
                          return (
                              <div className="row pt-2" key={i}>
                                <div className="col-auto">
                                    <a href={"https://www.themoviedb.org/movie/" + d.id + "-" + d.title} target="_blank">
                                      <img src={"http://image.tmdb.org/t/p/w300" + d.backdrop_path}
                                      onError={onErrors}
                                      className="img-thumbnail"/>
                                    </a>
                                </div>
                                <div className="col-auto mt-4 tbody">
                                  <div className="row">
                                      <h4>{d.title}</h4>
                                  </div>
                                  <div className="row">
                                      {d.genre_ids.map((d1, o) => {
                                          return (
                                            <span key={o}>{genreList.filter(g => g.id == d1).map((d2, p) => {
                                              return (
                                                <span key={p}><Link to={"/1/" + d2.id}>{d2.name}&nbsp;</Link></span>
                                              );
                                            })}&nbsp;</span>
                                          );
                                        })}
                                  </div>
                                  <div className="row">
                                    {d.vote_average}
                                  </div>
                                  <div className="row">
                                    {d.release_date}
                                  </div>
                                </div>
                              </div>
                          );
                        })
                    }
          </div>
        </React.StrictMode> 
    );
}