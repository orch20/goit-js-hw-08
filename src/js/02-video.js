import throttle from 'lodash.throttle';
const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

const STORAGE_KEY = 'videoplayer-current-time';

player.on('play', function () {
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

player
  .setCurrentTime(localStorage.getItem(STORAGE_KEY))
  .then(function (seconds) {
    seconds = 0;
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });

const throttledTimeUpdate = throttle(timeUpdate, 1000);

function timeUpdate({ seconds }) {
  localStorage.setItem(STORAGE_KEY, seconds);
}

player.on('timeupdate', throttledTimeUpdate);
