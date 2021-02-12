import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';
import axios, { AxiosResponse } from "axios"

interface GenreLists {
  id: number,
  name: string,
}

interface MovieLists {
  title: string,
  id: number,
  genre_ids: number[],
  release_date: Date,
  vote_average: number
}

const App = () => {

  const genreProps:GenreLists[] = [];
  const movieProps:MovieLists[] = [];
  const [genreList, setGenreList]: [GenreLists[], (data: GenreLists[]) => void] = useState(genreProps);
  const [movieList, setMovieList]: [MovieLists[], (data: MovieLists[]) => void] = useState(movieProps);
  const [genreSelect, setGenreSelect]: [number, (genre: number) => void] = useState(0);
  const [searchTitle, setSearchTitle] = useState("");
  const [genreGrp, setGenreGrp] = useState(false);

  let api = 'e9029bc5d239bd2ec48b1330a107bb22';
  
  const getSearchTitle = (e: any) => {
      let search = e.target.value; 
      setSearchTitle(search);
  }

  const requestOptions = {
    method: 'GET',
    headers: {"Content-Type": "application/json"}
  };

  useEffect(() => {
      function refresh() {
          const fecthMovie = async() => {
            fetch('http://localhost:8080/api/movies?api_key=' + api, requestOptions)
            .then(resps => resps.json())
            .then(datas => {
              setMovieList(datas.results);
              })
          }

          fecthMovie();

          fetch('http://localhost:8080/api/movies/genre?api_key=' + api, requestOptions)
          .then(resps => resps.json())
          .then(data => setGenreList(data.genres))
      }
      
      refresh();
  }, []);

  const handleGenreSelect = (e : any) => {
      let genre = e.target.value; 
      setGenreSelect(genre);
  }

  const handleCategory = (e: any) => {
    let category = e.target.value;
    if (category == 1) {
      //refreshGenreList();
      setGenreGrp(true);
    }
    else {
      //setGenreList([]);
      setGenreGrp(false);
    }
  }

  const searchByGenre = () => {
      fetch('http://localhost:8080/api/movies/genre/search?api_key=' + api + "&codeG=" + genreSelect, requestOptions)
      .then(resps => resps.json())
      .then(data => setMovieList(data.results))
  }

  const searchByTitle = () => {
      fetch('http://localhost:8080/api/movies/title?api_key=' + api + "&query=" + searchTitle, requestOptions)
      .then(resps => resps.json())
      .then(data => setMovieList(data.results))
  }

  const enterSearch = (event : React.KeyboardEvent, val: string) => {
      if (event.key == 'Enter') {
        fetch('http://localhost:8080/api/movies/title?api_key=' + api + "&query=" + val, requestOptions)
        .then(resps => resps.json())
        .then(data => setMovieList(data.results))
      }
  }

  return (
    <React.Fragment> 
      <div className="container-fluid mt-4">
          <div className="container-fluid">
            <div className="input-group">
              <div className="h-25 d-inline-block ml-1">
                <div className="input-group-sm mb-3">
                  <select className="custom-select" onChange={handleCategory} >
                    <option value="0">Title</option>
                    <option value="1">Genre</option>
                  </select>
                </div>
              </div>
              {
                genreGrp ?
                  <div>
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
                  </div>
                  :
                  <div>
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
                  </div>
                }
            </div>
          </div>
          <div className="container-fluid mt-4">
                <table className="table table-bordered table-sm">
                    <thead>
                        <tr>
                          <th>
                              Title
                          </th>
                          <th>
                              Genre
                          </th>
                          <th>
                              Release Date
                          </th>
                          <th>
                              Rate
                          </th>
                        </tr>
                    </thead>
                    <tbody>
                      {
                         movieList.map((d, i) => {
                            return (
                                <tr key={i}>
                                  <td>{d.title}</td>
                                  <td>{d.genre_ids.map((d1, o) => {
                                    return (
                                      <span key={o}>{genreList.filter(g => g.id == d1).map((d2, p) => {
                                        return (
                                          <span key={p}>{d2.name}&nbsp;</span>
                                        );
                                      })}&nbsp;</span>
                                    );
                                  })}</td>
                                  <td>{d.release_date}</td>
                                  <td>{d.vote_average}</td>
                                </tr>
                            );
                          })
                      }
                    </tbody>
                </table>
          </div>
      </div>
    </React.Fragment> 
  );
}

export default App;
