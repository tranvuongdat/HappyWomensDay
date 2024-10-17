const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const doiTuong = urlParams.get('doiTuong') ?? 'test';

var url = [
    `./${doiTuong}/01.html`,
    `./${doiTuong}/02.html`,
    `./${doiTuong}/03.html`,
    `./${doiTuong}/04.html`,
]

var flipbookEL = $('#flipbook');

if (screen.orientation.type.includes('portrait')){
    flipbookEL.replaceWith('Vui lòng xoay ngang và tải lại trang');
} else {

    screen.orientation.addEventListener("change", () => {
        flipbookEL.replaceWith('Vui lòng xoay ngang và tải lại trang');
    });

    window.addEventListener('resize', function (e) {
        // flipbookEL.style.width = '';
        // flipbookEL.style.height = '';
        flipbookEL.turn('resize')
        flipbookEL.turn('size', flipbookEL.clientWidth, flipbookEL.clientHeight);
    });

    flipbookEL.turn({
        autoCenter: true,
        page: 1,
        duration: 1000,
        display: 'double'
    });

    url.forEach(elem => {
        console.log(elem)
        fetch(elem)
        .then((response) => response.text())
        .then((text) => new DOMParser().parseFromString(text, "text/html"))
        .then((dom) => dom.getElementsByTagName('body')[0])
        .then((test) => {
            console.log(test);
            flipbookEL.turn('addPage', test);
            //Do something with test.
        });
    })
}

