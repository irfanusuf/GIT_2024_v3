const url = 'https://real-time-news-data.p.rapidapi.com/search?query=Donal%20trump&limit=10&time_published=anytime&country=US&lang=en';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '79bd850338msh2791f9644fac656p197751jsnac6970a86c03',
		'x-rapidapi-host': 'real-time-news-data.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}