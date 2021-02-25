import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';

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
    id?: number,
    name?: string,
    genreId?: string,
    genreList:  GenreLists[]
}

export const Genre: React.FC<SelectProps> = ({
    id,
    name,
    genreId,
    genreList
})  => {

    const genreProps:GenreLists[] = [];
    const movieProps:MovieLists[] = [];
    //const [genreList, setGenreList]: [GenreLists[], (data: GenreLists[]) => void] = useState(genreProps);
    const [genreSelect, setGenreSelect]: [number, (genre: number) => void] = useState(0);
    const [movieList, setMovieList]: [MovieLists[], (data: MovieLists[]) => void] = useState(movieProps);
    let api = 'e9029bc5d239bd2ec48b1330a107bb22';

    const requestOptions = {
        method: 'GET',
        headers: {"Content-Type": "application/json"}
    };

    const handleGenreSelect = (e : any) => {
      let genre = e.target.value; 
      setGenreSelect(genre);
    }

    useEffect(() => {
        if (id == 1 && genreId != null && genreId != "-1") {
          let genre = genreId == null ? -1 : +genreId;
          setGenreSelect(genre);
          //searchByGenre();
          fetch('http://localhost:8080/api/movies/genre/search?api_key=' + api + "&codeG=" + genre, requestOptions)
          .then(resps => resps.json())
          .then(data => setMovieList(data.results))
        }
        else {
          setMovieList(movieProps);
        }
    }, [genreId]);

    const searchByGenre = () => {
      /*fetch('http://localhost:8080/api/movies/genre/search?api_key=' + api + "&codeG=" + genreSelect, requestOptions)
      .then(resps => resps.json())
      .then(data => setMovieList(data.results))*/
      window.location.href = "/genre/1/" + genreSelect;
    }

    const onErrors = (e: any) => {
        e.target.src = window.location.origin + "/default.png";
    }

    return (
        <React.Fragment> 
            <div className="h-25 d-inline-block ml-1">
                <div className="input-group-sm mb-3">
                    <select value={genreSelect} className="custom-select" 
                    id="inputGroupSelect01" onChange={handleGenreSelect} >
                    <option value="-1">Choose...</option>
                    {
                        genreList.map((datas, i1) => {
                        return(
                            <option key={i1} value={datas.id}>{datas.name}</option>
                        );      
                        })
                    }
                    </select>
                </div>
            </div>
            <div className="h-25 d-inline-block ml-1">
                <Button
                    className="btn-sm"
                    onClick={searchByGenre}
                    >
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
                                                <span key={p}>{d2.name}&nbsp;</span>
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
        </React.Fragment> 
    );
}