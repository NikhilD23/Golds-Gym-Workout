export const exerciseOptions = {
	method: 'GET',
    hostname: 'exercisedb.p.rapidapi.com',
	port: null,
	path: '/status',
	headers: {
		'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
		'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
	}
};

export const youtubeOptions = {
	method: 'GET',
	headers: {
	  'x-rapidapi-host': 'youtube-search-and-download.p.rapidapi.com',
	  'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
	}
  };

export const fetchData = async (url, options) => {
    const response = await fetch(url, options);
    const data = await response.json();

    return data;
}