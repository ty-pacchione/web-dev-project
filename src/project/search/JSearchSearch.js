import { JobSearch } from "../JSearchService";
import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams, useLocation } from "react-router-dom";

function JSearchSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') || '');

  const navigate = useNavigate();
  const location = useLocation();

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const search = async (text) => {
    setSearchParams({
      query: text
    });
    const response = await JobSearch(text);
    console.log(response);
    setResults(response);
  };

  useEffect(() => {
    if (query !== '') {
      //need to pick out the right data
      //setSearchTerm(searchParams);
      if (!results) {
          // const tempquery = searchParams.get
          // search();
          
          search(query);
          console.log('no results but yes search params')
      } 
      
    }
  }, [searchParams]);
 
//(e) => setSearchTerm(e.target.value)

const handleChange = (e) => {
  setQuery(e.target.value);
  console.log(query);
};

  return (
    <div>
      <h1>Job Search</h1>
      <input
        type="text"
        value={query}
        className="form-control"
        onChange={handleChange}
      />
      <button className="btn btn-primary" onClick={() => search(query)}>
        Search
      </button>
      <div className="list-group">
        {results && 
          results.data &&
          results.data.map((job) => (
            <div key={job.job_id} className="list-group-item list-group-item-secondary">
              <Link style={{ textDecoration: 'none', color: 'black' }} to={`/details/${job.job_id}`}>
                <h2>{job.employer_name}</h2>
                <div>
                  {job.employer_logo && <img className="float-start" style={{width: '150px',
  height: 'auto'}} src={job.employer_logo} />}
                  <h3 className="float-start">{job.job_title}</h3>
                  
                  <div className="float-end">{job.job_id}</div>

                  <h3 className="float-end">{job.job_city}</h3>
                  <h3 className="float-end">{job.job_state}</h3>
                  <h3 className="float-end">{job.job_country}</h3>
                </div>
              </Link>

            </div>
          ))
          // results.search.data.albums.map((album) => (
          //   <div key={album.id}>
          //     <Link to={`/project/album-details/${album.id}`}>
          //       <img src={albumImageUrl(album)} />
          //       <h2>{album.name}</h2>
          //     </Link>
          //   </div>))
          //results is array 
          
          }
      </div>
    </div>
  );
}

export default JSearchSearch;