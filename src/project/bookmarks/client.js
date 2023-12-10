import axios from "axios";

const request = axios.create({
  withCredentials: true,
});

export const BASE_API = process.env.REACT_APP_API_BASE;
export const BOOKMARKS_API = `${BASE_API}/bookmarks`;


export const createBookmark = async (jobID, userID) => {
  const response = await request.post(`${BOOKMARKS_API}/${jobID}/${userID}`);
  return response.data;
};
  
export const findAllBookmarks = async () => {
  const response = await request.get(`${BOOKMARKS_API}`);
  return response.data;
};


export const findBookmarksByJob = async (jobID) => {
  const response = await request.get(`${BOOKMARKS_API}/job/${jobID}`);
  return response.data;
};

export const findBookmarksByUser = async (userID) => {
    const response = await request.get(`${BOOKMARKS_API}/user/${userID}`);
    return response.data;
  };

export const findBookmark = async (jobID, userID) => {
    const response = await request.get(`${BOOKMARKS_API}/${jobID}/${userID}`);
    return response.data;
}

export const deleteBookmark = async (jobID, userID) => {
  const response = await request.delete(
    `${BOOKMARKS_API}/${jobID}/${userID}`);
  return response.data;
};


