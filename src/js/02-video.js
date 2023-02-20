import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';


// const player = new Vimeo(document.querySelector('iframe'), { /* опции */ }); 
const iframe = document.querySelector('iframe');
const player = new Vimeo(iframe);

player.play();

player.on('timeupdate', throttle(storeVideoTime, 1000));

function storeVideoTime(data) {
	// console.log(data);
    // data is an object containing properties specific to that event
	localStorage.setItem('videoplayer-current-time', JSON.stringify(data));
};

const savedTime = localStorage.getItem('videoplayer-current-time');
// console.log(savedTime);
const parsedTime = JSON.parse(savedTime);
// console.log(parsedTime.seconds);

player.setCurrentTime(parsedTime.seconds).then(function(seconds) {
    // seconds = the actual time that the player seeked to
}).catch(function(error) {
	switch (error.name) {
	case 'RangeError':
	// the time was less than 0 or greater than the video’s duration
	break;

	default:
	// some other error occurred
	break;
	}
});