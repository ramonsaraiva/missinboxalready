let COUNTER_SELECTOR = 'js-counter';
let counter_element = document.getElementsByClassName(COUNTER_SELECTOR)[0];

let CTA_SELECTOR = 'js-cta';
let cta_element = document.getElementsByClassName(CTA_SELECTOR)[0];

let polling_xhttp = new XMLHttpRequest();
let misser_xhttp = new XMLHttpRequest();

let poll_count = function() {
    polling_xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(this.responseText);
            counter_element.innerHTML = response.count;
        }
    };

    polling_xhttp.open('GET', '/api/v1/missers/count/', true);
    polling_xhttp.send();
};

let post_misser = function() {
    misser_xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 201) {
            counter_element.innerHTML = parseInt(counter_element.innerHTML) + 1;
            miss_it();
        }
    }

    misser_xhttp.open('POST', '/api/v1/missers/', true);
    misser_xhttp.setRequestHeader('X-CSRFToken', CSRF_TOKEN);
    misser_xhttp.send()
};

let miss_it = function() {
    cta_element.setAttribute('disabled', 'disabled')
    cta_element.innerHTML = 'Thanks for letting us know you miss it as well';
    localStorage.setItem('misses', true);
};

window.onload = function() {
    window.setInterval(poll_count, 5000);

    if (localStorage.getItem('misses')) {
        miss_it();
    }
    else {
        cta_element.addEventListener('click', post_misser);
    }
};
