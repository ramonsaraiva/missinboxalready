let COUNTER_SELECTOR = 'js-counter';
let counter_element = document.getElementsByClassName(COUNTER_SELECTOR)[0];

let CTA_SELECTOR = 'js-cta';
let cta_element = document.getElementsByClassName(CTA_SELECTOR)[0];

let CHART_SELECTOR = 'statistics-chart';
let chart_element = document.getElementById(CHART_SELECTOR);

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

    let chart = new Chart(chart_element, {
        type: 'pie',
        options: {
            responsive: true,
            maintainAspectRatio: true,
            legend: {
                display: true,
            }
        },
        data: {
            labels: chart_labels,
            datasets: [{
                'label': '# of people',
                data: chart_dataset,
                backgroundColor: [
                    'rgba(85, 239, 196,1.0)',
                    'rgba(129, 236, 236,1.0)',
                    'rgba(116, 185, 255,1.0)',
                    'rgba(9, 132, 227,1.0)',
                    'rgba(0, 206, 201,1.0)',
                    'rgba(0, 184, 148,1.0)',
                    'rgba(162, 155, 254,1.0)',
                    'rgba(108, 92, 231,1.0)',
                    'rgba(223, 230, 233,1.0)',
                    'rgba(178, 190, 195,1.0)',
                    'rgba(255, 234, 167,1.0)',
                    'rgba(250, 177, 160,1.0)',
                    'rgba(255, 118, 117,1.0)',
                    'rgba(253, 121, 168,1.0)',
                    'rgba(99, 110, 114,1.0)',
                    'rgba(253, 203, 110,1.0)',
                    'rgba(225, 112, 85,1.0)',
                    'rgba(214, 48, 49,1.0)',
                    'rgba(232, 67, 147,1.0)',
                    'rgba(45, 52, 54,1.0)',
                    // replicate
                    'rgba(85, 239, 196,1.0)',
                    'rgba(129, 236, 236,1.0)',
                    'rgba(116, 185, 255,1.0)',
                    'rgba(9, 132, 227,1.0)',
                    'rgba(0, 206, 201,1.0)',
                    'rgba(0, 184, 148,1.0)',
                    'rgba(162, 155, 254,1.0)',
                    'rgba(108, 92, 231,1.0)',
                    'rgba(223, 230, 233,1.0)',
                    'rgba(178, 190, 195,1.0)',
                    'rgba(255, 234, 167,1.0)',
                    'rgba(250, 177, 160,1.0)',
                    'rgba(255, 118, 117,1.0)',
                    'rgba(253, 121, 168,1.0)',
                    'rgba(99, 110, 114,1.0)',
                    'rgba(253, 203, 110,1.0)',
                    'rgba(225, 112, 85,1.0)',
                    'rgba(214, 48, 49,1.0)',
                    'rgba(232, 67, 147,1.0)',
                    'rgba(45, 52, 54,1.0)',
                ]
            }],
        }
    });
};
