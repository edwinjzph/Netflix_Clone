const API_KEY = "87190a28db999d54126f0ec19e7b207e";
const requests ={
fetchNetflixOriginals:`/discover/tv?api_key=${API_KEY}&with_networks=213`,
fetchComedyMovies:`/discover/movie?api_key=${API_KEY}&with_genres=35`,
fetchHorrorMovies:`/discover/movie?api_key=${API_KEY}&with_genres=27`,
fetchDocumentaries:`/discover/movie?api_key=${API_KEY}&with_genres=99`,
}
export default requests;
