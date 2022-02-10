/**
 * Fetches GIFs from the Giphy API
 *
 * @param {String} searchTerm what you want to search giphy for
 * @param {Function} callback the function to call when giphy replies with some gifs
 */
let getGif = function(searchTerm, callback, limit) {
	// learn about how the giphy API wants you to construct your URLs to make a request here:
	// https://developers.giphy.com/docs/api/endpoint#search
	const GIPHY_API = 'https://api.giphy.com/v1/gifs/search?api_key=' + GIPHY_API_KEY + '&limit=' + limit + '&offset=15&rating=G&';
	
	// axios is a package for fetching data via ajax.
	axios.get(GIPHY_API + 'q=' + searchTerm)
		.then(function(response) {
			callback(response.data.data)
		})
		.catch(function (error) {
			console.warn(error);
		})
}


let mainContentWrapper = document.querySelector('.main .main-content-wrapper')
console.log(mainContentWrapper.children)

function markSelection(){
	if (mainContentWrapper.children.classList = 'cat'){
		console.log("good")
	} else {
		//why is it saying good for the dog container?
		console.log("wrong")
	}
}

for (i = 0, len = mainContentWrapper.children.length; i < len; i++ ){
	mainContentWrapper.children[i].onclick = markSelection;
}

/*
 * simple example of how to get cat gifs and console log the results
 */
getGif('cat', function(gifData) {
	console.log(gifData)
	gifData.forEach((gif,i) => {
		mainContentWrapper.children[i].style.backgroundImage = "url(" + gif.images.original.url + ")"
		//find way to replace hard-coded cat with searchTerm
		mainContentWrapper.children[i].classList.add('cat')
	});
}, 8)
getGif('dog', function(gifData) {
	console.log(gifData[0].images.original.url)
	//randomize the location of image by inserting it at different parts of array
	mainContentWrapper.children[8].style.backgroundImage = "url(" + gifData[0].images.original.url + ")"
}, 1)


