import { JobSearch } from "../JSearchService";
import { useState, useEffect } from "react";
import {
  Link,
  useNavigate,
  useSearchParams,
  useLocation,
} from "react-router-dom";

function JSearchSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query") || "");

  const navigate = useNavigate();
  const location = useLocation();

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const search = async (text) => {
    setSearchParams({
      query: text,
    });
    const response = await JobSearch(text);
    console.log(response);
    setResults(response);
  };

  useEffect(() => {
    if (query !== "") {
      //need to pick out the right data
      //setSearchTerm(searchParams);
      if (!results) {
        // const tempquery = searchParams.get
        // search();

        search(query);
        console.log("no results but yes search params");
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 20,
        }}
      >
        <input
          type="text"
          value={query}
          className="form-control"
          placeholder="Search by keywords"
          onChange={handleChange}
          style={{ width: "50%", marginRight: 10 }}
        />
        <button className="btn btn-primary" onClick={() => search(query)}>
          Search
        </button>
      </div>
      <div style={{ marginBottom: 10 }} className="list-group">
        {results &&
          results.data &&
          results.data.map((job) => (
            <Link
              key={job.job_id}
              to={`/details/${job.job_id}`}
              className="list-group-item"
              style={{
                backgroundColor: "white",
                border: "1px solid black",
                marginLeft: "10%",
                marginRight: "10%",
              }}
            >
              <h5>{job.job_title}</h5>
              <div className="d-flex">
                {job.employer_logo && (
                  <img
                    style={{ width: "100px" }}
                    src={job.employer_logo}
                    alt="Employer Logo"
                  />
                )}
                <div style={{ paddingLeft: 20 }}>
                  <div>
                    <h6>{job.employer_name}</h6>
                  </div>
                  <div className="d-flex">
                    {job.job_city}
                    {job.job_city && job.job_state && <span>,&nbsp;</span>}
                    {job.job_state}
                    {(job.job_city || job.job_state) && job.job_country && (
                      <span>,&nbsp;</span>
                    )}
                    {job.job_country}
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default JSearchSearch;
