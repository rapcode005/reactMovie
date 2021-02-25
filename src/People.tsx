import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';

interface SelectProps {
    id?: number,
    name?: string
}

interface PeopleLists {
    name: string,
    id: number,
    known_for_department: string,
    popularity: number,
    profile_path: string
}

export const People: React.FC<SelectProps> = ({
    id,
    name
})  => {

    let api = 'e9029bc5d239bd2ec48b1330a107bb22';
    const peopleProps:PeopleLists[] = [];
    const [peopleList, setPeopleList]: [PeopleLists[], (data: PeopleLists[]) => void] = useState(peopleProps);
    const [searchPeople, setSearchPeople] = useState("");

    const requestOptions = {
        method: 'GET',
        headers: {"Content-Type": "application/json"}
    };

    const getSearchPeople = (e: any) => {
      let search = e.target.value; 
      setSearchPeople(search);
    }

    const searchByPeople = () => {
      fetch('http://localhost:8080/api/movies/people?api_key=' + api + "&query=" + searchPeople, requestOptions)
      .then(resps => resps.json())
      .then(data => {
        console.log(data.results);
        //setMovieList(data.results);
      })
    }

    const enterSearchPeople = (event : React.KeyboardEvent, val: string) => {
      if (event.key == 'Enter') {
        fetch('http://localhost:8080/api/movies/people?api_key=' + api + "&query=" + val, requestOptions)
        .then(resps => resps.json())
        .then(data => setPeopleList(data.results))
      }
    }

    
    const onErrors = (e: any) => {
        e.target.src = window.location.origin + "/default.png";
    }

    return (
        <React.Fragment> 
             <div className="h-25 d-inline-block ml-1">
                <input id="searchMovie" className="form-control form-control-sm" 
                type="text" 
                value={searchPeople}
                onChange={getSearchPeople}
                onKeyUp={(e) => enterSearchPeople(e, searchPeople)} 
                placeholder="Search" 
                aria-label="Search" />
            </div>
            <div className="h-25 d-inline-block ml-1">
                <Button
                    onClick={searchByPeople}
                    className="btn-sm">
                    Search
                </Button>
            </div>
            <div className="container-fluid mt-4">
                {
                    peopleList.map((d, i) => {
                        return (
                            <div className="row pt-2" key={i}>
                                <div className="col-auto">
                                    <a href={"https://www.themoviedb.org/person/" + d.id + "-" + d.name} target="_blank">
                                      <img src={"http://image.tmdb.org/t/p/w300" + d.profile_path}
                                      onError={onErrors}
                                      className="img-thumbnail"/>
                                    </a>
                                </div>
                                <div className="col-auto mt-4">
                                    <div className="row">
                                        <h3>{d.name}</h3>
                                    </div>
                                    <div className="row">
                                        {d.known_for_department}
                                    </div>
                                    <div className="row">
                                        {d.popularity}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </React.Fragment>
    );

};
