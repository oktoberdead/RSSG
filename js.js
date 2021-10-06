let mapPic = document.getElementById("mapPic");
let test = document.getElementById("test");



let tN = 0;

const picW = 1577;
const picH = 1931;

const selSize = 35;

let newH, newW, newSelSize;

if(window.innerWidth * 1.225 <= window.innerHeight) {
	newW = window.innerWidth;
	newH = picH * newW / picW;
	mapPic.style.top = (window.innerHeight - newH)  / 2 + "px";
	newSelSize = selSize * newW/picW;
}

else {
	newH = window.innerHeight;
	newW = picW * newH / picH;
	mapPic.style.left = (window.innerWidth - newW)  / 2 + "px";
	newSelSize = selSize * newH/picH;
}


test.style.width = newSelSize + "px";
test.style.height = newSelSize + "px";
mapPic.style.width = newW + "px";
mapPic.style.height = newH + "px";

let branchStationCount = [19, 18, 12, 8, 15];
let stationNames = [
["Проспект Ветеранов", "Ленинский проспект", "Автово", "Кировский завод", "Нарвская", "Балтийская", "Технологический институт", "Пушкинская", "Владимирская", "Площадь восстания", "Чернышевская", "Площадь Ленина", "Выборгская", "Лесная", "Площадь мужества", "Политехническая", "Академическая", "Гражданский проспект", "Девяткино"],
[],
[],
[],
[]
];

let xPosStationArray = [
[2775],
[],
[],
[],
[]
];

let yPosStationArray = [
[8337],
[],
[],
[],
[]
];

test.style.left = xPosStationArray[0][tN] / 10000 * newW + (window.innerWidth - newW) / 2 - newSelSize / 2 + "px";
test.style.top = yPosStationArray[0][tN] / 10000 * newH + (window.innerHeight - newH) / 2  - newSelSize / 2 + "px";