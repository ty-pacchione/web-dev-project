import axios from "axios";

const request = axios.create({
  withCredentials: true,
});

export const BASE_API = process.env.REACT_APP_API_BASE;
export const JOBS_API = `${BASE_API}/jobs`;


export const createJob = async (job) => {
  const response = await request.post(`${JOBS_API}`, job);
  return response.data;
};
  
export const updateJob = async (job) => {
  const response = await request.put(`${JOBS_API}/${job.job_id}`, job);
  return response.data;
};

export const findAllJobs = async () => {
  const response = await request.get(`${JOBS_API}`);
  return response.data;
};


export const findJobById = async (id) => {
  const response = await request.get(`${JOBS_API}/${id}`);
  return response.data;
};

export const deleteJob = async (job) => {
  const response = await request.delete(
    `${JOBS_API}/${job.job_id}`);
  return response.data;
};

export const findJobsByLocalId = async (id) => {
  const response = await request.get(`${JOBS_API}/localID/${id}`);
  return response.data;
}
