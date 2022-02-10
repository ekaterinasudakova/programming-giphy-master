/**
 * Fetches GIFs from the Giphy API
 *
 * @param {String} searchTerm what you want to search giphy for
 * @param {Function} callback the function to call when giphy replies with some gifs
 */
let getGif = function(searchTerm, callback, limit) {
	// learn about how the giphy API wants you to construct your URLs to make a request here:
	// https://developers.giphy.com/docs/api/endpoint#search
	let offset = Math.floor(Math.random() * 500);
	const GIPHY_API = 'https://api.giphy.com/v1/gifs/search?api_key=' + GIPHY_API_KEY + '&limit=' + limit + '&offset=' + offset + '&rating=G&';
	
	// axios is a package for fetching data via ajax.
	axios.get(GIPHY_API + 'q=' + searchTerm)
		.then(function(response) {
			callback(response.data.data)
		})
		.catch(function (error) {
			console.warn(error);
		})
}



//repeated variables
const mainContentWrapper = document.querySelector('.main .main-content-wrapper')
let mainContentDivs = mainContentWrapper.children
let mainContentDivsArr = Array.from(mainContentDivs)
const scoreBox = document.querySelector('.score-box')
const timerBox = document.querySelector('.main .countdown-timer')
console.log(timerBox)


let generateGrid = function(){
	//primary gif group
	getGif('cat', function(gifData) {
		// console.log(gifData)
		gifData.forEach((gif,i) => {
			mainContentDivsArr[i].style.backgroundImage = "url(" + gif.images.original.url + ")"
			//replace hard-coded cat with searchTerm
			mainContentDivsArr[i].classList.add('cat')
		});
	}, 8)
	
	//outlier gif group
	getGif('dog', function(gifData) {
		// console.log(gifData[0].images.original.url)
		mainContentDivsArr[8].style.backgroundImage = "url(" + gifData[0].images.original.url + ")"
		mainContentDivsArr[8].classList.remove('cat')
	}, 1)
	
	
	//randomizing the order of the gifs
	let sortedMainContentDivsArr = mainContentDivsArr.sort(function(a,b){
		if (Math.random() > 0.5){
			return -1
		}
		else {
			return 1
		}
	})
}

//game timer
var seconds = 30;
let gameClockIntervalID = setInterval(function timer(){
	seconds--
	console.log(seconds)
	if (seconds == 0){
		clearInterval(gameClockIntervalID)
		alert('Times up')
	}
	timerBox.innerHTML = seconds
}, 1000)



//starting score
var score = 0
// console.log('starting score =' + score)

//Scoring on click
function markSelection(){
	if (this.classList.contains('cat')){
		score-=1
		// console.log('new score = ' + score)
		scoreBox.innerHTML = score
	} else {
		score+=1
		// console.log('new score = ' + score)
		scoreBox.innerHTML = score
	}
}
for (i = 0, len = mainContentDivsArr.length; i < len; i++ ){
	mainContentDivs[i].addEventListener('click', markSelection)
	mainContentDivs[i].addEventListener('click', generateGrid)
}

generateGrid()




