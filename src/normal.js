let loader = document.getElementById('preloader');
window.addEventListener('load', function() 
{     
	// loader.style.display = 'none';
	setTimeout(() => {loader.style.opacity = 0;},500);
	setTimeout(() => {loader.style.display='none';},1500);
});




