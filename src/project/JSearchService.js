import axios from "axios";

const KEY = 'ffac3032b7mshf737a6380694e0bp1194f0jsnb73f2b71b6ab';
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
