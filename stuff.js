setInterval(function() {
    console.log(new Date().getSeconds());
    document.querySelector('#my-id').textContent = new Date().getSeconds();
}, 1000);

