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



//Repeated variables section
const mainContentWrapper = document.querySelector('.main .main-content-wrapper')
let mainContentDivs = mainContentWrapper.children
let mainContentDivsArr = Array.from(mainContentDivs)
const scoreBox = document.querySelector('.score-box')
const timerBox = document.querySelector('.main .countdown-timer')
const searchInput = document.querySelector('.search-field')
const selectedCategory = document.querySelector('.main .selected-category')
const totalPoints = document.querySelector('.ending .total-points')
//buttons
const startButton = document.querySelector('.landing .button-wrapper button')
const restartButton = document.querySelector('.ending .button-wrapper button')
//page-state variables
const landingPage = document.querySelector('.landing')
const mainPage = document.querySelector('.main')
const endingPage = document.querySelector('.ending')





//click on start button
startButton.addEventListener('click', function (){
	
	//change display flex to display flex on .landing
	landingPage.style.display = "none"
	//change display none to display flex on .main
	mainPage.style.display = "flex"
	selectedCategory.innerHTML = searchInput.value
	
	generateGrid()

	//Game timer section
	var seconds = 30;
	let gameClockIntervalID = setInterval(function timer(){
		seconds--
		// console.log(seconds)
		if (seconds == 0){
			clearInterval(gameClockIntervalID)
			//display new div
			mainPage.style.display = "none"
			endingPage.style.display = "flex"
			//display total points
			totalPoints.innerHTML = scoreBox.innerHTML

			//click restart button
			restartButton.addEventListener('click', function (){
				endingPage.style.display = "none"
				landingPage.style.display = "flex"
				searchInput.value = ""
			})
		}
		timerBox.innerHTML = seconds
	}, 1000)
})


//Game grid generator & populator section
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
	getGif(searchInput.value, function(gifData) {
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




//Scoring section
var score = 0
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







