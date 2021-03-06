import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';
import axios, { AxiosResponse } from "axios"
import PropTypes from 'prop-types';
import {Genre} from './Genre';
import {Title} from './Title';
import {People} from './People';
import {RouteComponentProps} from 'react-router';

interface GenreLists {
  id: number,
  name: string,
}

export const App = () => {
  //const params = new URLSearchParams(window.location.search)
  const genreProps:GenreLists[] = [];
  const [genreList, setGenreList]: [GenreLists[], (data: GenreLists[]) => void] = useState(genreProps);
  const [genreSelect, setGenreSelect]: [number, (genre: number) => void] = useState(0);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchPeople, setSearchPeople] = useState("");
  const [genreGrp, setGenreGrp] = useState(false);
  const [category, setCategory] = useState(0);
  const [idG, setIDG] = useState(0);

  let api = 'e9029bc5d239bd2ec48b1330a107bb22';

  const requestOptions = {
    method: 'GET',
    headers: {"Content-Type": "application/json"}
  };

  const handleGenreSelect = (e : any) => {
    let genre = e.target.value; 
    setGenreSelect(genre);
  }

  const handleCategory = (e: any) => {
    let category = e.target.value;
    if (category == 1) {
      setGenreGrp(true);
    }
    else {
      setGenreGrp(false);
    }
    setCategory(category);
  }

  useEffect(() => {
      fetch('http://localhost:8080/api/movies/genre?api_key=' + api, requestOptions)
      .then(resps => resps.json())
      .then(data => {
          setGenreList(data.genres);
      })

    }, []);

  return (
    <React.StrictMode> 
        <div className="container-fluid mt-4">
            <div className="container-fluid">
              <div className="input-group">
                <div className="h-25 d-inline-block ml-1">
                  <div className="input-group-sm mb-3">
                    <select className="custom-select" onChange={handleCategory} >
                      <option value="0">Title</option>
                      <option value="1">Genre</option>
                      <option value="2">People</option>
                    </select>
                  </div>
                </div>
                {
                  genreGrp ?
                    <Genre id={idG} genreList={genreList} />
                    :
                      category == 2 ?
                      <People />
                      :
                      <Title genreList={genreList} />
                  }
              </div>
            </div>
        </div>
    </React.StrictMode> 
  );
}

//export default App;
