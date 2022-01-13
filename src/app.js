// let body = document.querySelector('body');
let loadingimg = document.querySelector('.loading-img');
let loadingsc = document.querySelector('.loading');

loadingimg.style.opacity =0;

window.addEventListener('load', () => {
setTimeout(() => {loadingimg.style.opacity =1; loadingimg.style.transform = "scale(1)";},100);
setTimeout(() => {loadingimg.classList.add("glowload")},1000);
setTimeout(() => {loadingimg.style.transform = "scale(5)"; loadingimg.style.opacity =0},2500);
setTimeout(() => {loadingsc.style.opacity = 0;},3000);
setTimeout(() => {loadingsc.style.display = "none";},3500);


});