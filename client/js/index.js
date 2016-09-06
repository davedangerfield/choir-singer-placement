var singerPositions = []; // global to store all positions

// Set up callbacks for drag and drop events
document.body.addEventListener('dragover', e => e.preventDefault(), false); // Allow drop anywhere
document.body.addEventListener('drop', drop, false);


document.addEventListener("DOMContentLoaded", function() {

	restoreAllPositions();

	// On refresh, cause browser to download file that is a snapshot of current positions
	// Enables a sort of manual "undo" to return to prior state if needed.
	// console.save(singerPositions, 'primary-program-seating.json');
});

const DRAG_DATA_KEY = 'dragData';

function dragInit (e) {
	var styles = window.getComputedStyle(e.target);

	e.dataTransfer.setData(DRAG_DATA_KEY, JSON.stringify(
		{
			id: e.target.id,
			xOffset: e.clientX - Number.parseInt(styles.getPropertyValue("left"), 10),
			yOffset: e.clientY - Number.parseInt(styles.getPropertyValue("top"), 10)
		}
	));
}

function drop (e) {
	var dragData = JSON.parse(e.dataTransfer.getData(DRAG_DATA_KEY));
	var dragged = document.getElementById(dragData.id);

	dragged.style.left = String(e.clientX - dragData.xOffset) + 'px';
	dragged.style.top = String(e.clientY - dragData.yOffset) + 'px';

	var styles = window.getComputedStyle(e.target);
	dragged.style.zIndex = Number.parseInt(styles.top) + Number.parseInt(styles.height)

	savePosition(dragData.id, dragged.style.left, dragged.style.top, dragged.style.zIndex);
	e.preventDefault();
}


const LOCAL_STORAGE_KEY = 'singer-positions';

// Saves a single position to localStorage
function savePosition (id, left, top, zIndex) {

	var singerPosition = singerPositions.filter(singer => singer.id == id)[0];

	if (!singerPosition) {
		singerPositions.push({
			id,
			left,
			top,
			zIndex,
		});
	}
	else {
		singerPosition.left = left;
		singerPosition.top = top;
		singerPosition.zIndex = zIndex;
	}
	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(singerPositions));
}

// Retrieves position data from localStorage and sets it on appropriate DOM elements
function restoreAllPositions () {
	// load localstorage
	singerPositions = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
	// set top and left
	if (singerPositions) {
		singerPositions.forEach(position => {
			var ele = document.getElementById(position.id);
			if (ele) {
				ele.style.left = position.left;
				ele.style.top = position.top;
				ele.style.zIndex = Number.parseInt(position.top) + Number.parseInt(window.getComputedStyle(ele).height);
			}
		});
	}
	else {
		singerPositions = [];
	}
}


// Decorate console with console.save() (to save data to client's downloads folder)
(function(console){

		console.save = function(data, filename){

				if(!data) {
						console.error('Console.save: No data')
						return;
				}

				if(!filename) filename = 'console.json'

				if(typeof data === "object"){
						data = JSON.stringify(data, undefined, 4)
				}

				var blob = new Blob([data], {type: 'text/json'}),
						e    = document.createEvent('MouseEvents'),
						a    = document.createElement('a')

				a.download = filename
				a.href = window.URL.createObjectURL(blob)
				a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
				e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
				a.dispatchEvent(e)
		}
})(console)
