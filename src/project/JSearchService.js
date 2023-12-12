import axios from "axios";

const KEY = '0e1d6916c9msh1a4e9c7c8961c71p17dd25jsn8688d986a922';
const JSearch_API = "https://jsearch.p.rapidapi.com";



const options = {
    method: 'GET',
    url: '', //MUST FILL IN METHOD
    params: {}, //ALSO MUST FILL IN METHOD
    headers: {
      'X-RapidAPI-Key': KEY,
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    }
  };

export const JobSearch = async (text) => {
    options.url = `${JSearch_API}/search`;
    options.params = {    
        query: text,
        page: '1',
        num_pages: '1'
    };
    const response = await axios.request(options);
    options.params = {}; //reset params
    return response.data;
}

export const JobDetails = async (jobID) => {
    options.url = `${JSearch_API}/job-details`;
    options.params = {    
        job_id: jobID,
        extended_publisher_details: 'false'
    };
    const response = await axios.request(options);
    options.params = {}; //reset params
    return response.data;
}
