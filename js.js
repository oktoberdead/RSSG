
// кучка массивов, содержащих названия станций и координаты для указателя, а также цвета веток метро
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

let pCol = ["red", "blue", "green", "orange", "purple"];

// переменные для "управления" блоками
let mapPic = document.getElementById("mapPic");
let ptr = document.getElementById("ptr");
let outerPtr = document.getElementById("outerPtr");

let infoBox = document.getElementById("infoBox");
let rBut = document.getElementById("rBut");



let mapSizeRatio;
let tN = 0; // эээ... номер.. ветки..... пока что.

const picW = 1577; // Ширина картинки в пикселях
const picH = 1931; // Высота картинки... в пикселях

const selSize = 30; // Это, в общем-то, бесполезная переменная, ну и хрен с ней :)

let newH, newW, newSelSize; // переменные для значений высоты и ширины для картинки и стрелочки-указателя.


function sizeChange(){		// объяснено ниже

// Условие для последующего задания картинке карты необходимого размера.
// Нужно подобрать такие высоту и ширину, чтобы картинка ВСЕГДА помещалась на странице ПОЛНОСТЬЮ.
// рассматриваем две ситуации:
// 1. -окно имеет большую высоту, чем ширину. 
// В таком случае мы опираемся именно на ширину, ибо нам необходимо вписать картинку по ширине, а высота не имеет значения.
// Окно с кнопкой будет над картой. При недостатке места карта будет уменьшена таким образом, чтобы окошко поместилось.
// 2. -окно имеет большую ширину, чем высоту.
// Тут всё наоборот.
// Также при наличии достаточного места слева от карты появится окошко с кнопкой. В обратном случае оно будет "впихнуто" над картой.
// НО! Есть один нюанс. При приближении к границе перехода между "опорами", по которым считается размер картинки, происходит неведомая хрень, 
// вследствие которой картинка продолжает вписываться по ширине, хотя должна начать вписываться по высоте. В итоге картинка вылезает вверх и вниз.
// Для устранения этой параши я чутка изменил порог перехода. 1.225 - это и есть коэффициент, решающий эту проблему.
// Переход теперь (почти) идеально плавный.
if(window.innerWidth * 1.225 <= window.innerHeight) {
	newW = window.innerWidth;
	newH = picH * newW / picW;			// первый вариант. Ширина окна меньше высоты.
	newSelSize = selSize * newW/picW;

	// Код ниже представляет собой проверку на то, имеется ли нужное для окошка пространство и последующее его позиционирование
	if(window.innerHeight > newH * 80 * newSelSize / window.innerHeight) {
		infoBox.style.left = (window.innerWidth - 1000 * (window.innerHeight - newH) / window.innerHeight) / 2 + "px";
		infoBox.style.top = "10px";

		rBut.style.left = (window.innerWidth - 1000 * (window.innerHeight - newH) / window.innerHeight) / 2 + "px";
		
		if(window.innerWidth - 1000 * (window.innerHeight - newH) / window.innerHeight >= 20){
		infoBox.style.width = 1000 * (window.innerHeight - newH) / window.innerHeight + "px";
		infoBox.style.height = 250 * (window.innerHeight - newH) / window.innerHeight + "px";
		infoBox.style.fontSize = 95 * (window.innerHeight - newH) / window.innerHeight + "px";

		rBut.style.width = 1000 * (window.innerHeight - newH) / window.innerHeight + "px";
		rBut.style.height = 250 * (window.innerHeight - newH) / window.innerHeight + "px";
		rBut.style.top = 250 * (window.innerHeight - newH) / window.innerHeight + 12 + "px";

	}
		
	} else {
		infoBox.style.left = 0.0025 * newW + "px";
		infoBox.style.top = window.innerHeight - 0.525 * newH + "px";

		rBut.style.left = 0.0025 * newW + "px";
		rBut.style.top = window.innerHeight - 0.525 * newH + 3 * newSelSize + 2 + "px";

		infoBox.style.width = 12 * newSelSize + "px";
		infoBox.style.height = 3 * newSelSize + "px";
		infoBox.style.fontSize = 1.15 * newSelSize + "px";

		rBut.style.width = 12 * newSelSize + "px";
		rBut.style.height = 3 * newSelSize + "px";
		}
}

else {

	newH = window.innerHeight;
	newW = picW * newH / picH;	
	
	mapPic.style.left = (window.innerWidth - newW)  / 2 + "px";		// соответственно второй вариант - ширина окна больше высоты.
	newSelSize = selSize * newH/picH;
		infoBox.style.left = 0.0025 * window.innerWidth + (window.innerWidth - newW) / 2 + "px";
		infoBox.style.top = window.innerHeight - 0.525 * newH + "px";

		rBut.style.left = 0.0025 * window.innerWidth + (window.innerWidth - newW) / 2 + "px";
		rBut.style.top = window.innerHeight - 0.525 * newH + 3 * newSelSize + 2 + "px";

		infoBox.style.width = 12 * newSelSize + "px";
		infoBox.style.height = 3 * newSelSize + "px";
		infoBox.style.fontSize = 1.15 * newSelSize + "px";

		rBut.style.width = 12 * newSelSize + "px";
		rBut.style.height = 3 * newSelSize + "px";
}


// Далее идёт магия, которую я сам не в силах понять. (шутка!)





mapPic.style.top = window.innerHeight - newH + "px";
mapPic.style.width = newW + "px";							// тут мы задаём размер картинке карты
mapPic.style.height = newH + "px";

ptr.style.fontSize = newSelSize - 2 + "px";
ptr.style.width = 8 * newSelSize + "px";					// тут мы задаём размер внутренней(цветной) части стрелки
ptr.style.height = newSelSize + "px";

ptr.style.left = xPosStationArray[0][tN] / 10000 * newW + (window.innerWidth - newW) / 2 - newSelSize * 10 + "px";
ptr.style.top = yPosStationArray[0][tN] / 10000 * newH + window.innerHeight - newH  - newSelSize / 2 + 1 + "px";			// а тут мы этой внутренней части стрелки задаём положение
ptr.style.clipPath = "polygon(85% 0%, 100% 50%, 85% 100%, 0% 100%, 15% 50%, 0% 0%)";										// и ФОРМУ!!!

outerPtr.style.clipPath = "polygon(80% 0%, 100% 50%, 80% 100%, 0% 100%, 10% 50%, 0% 0%)";
outerPtr.style.left = xPosStationArray[0][tN] / 10000 * newW + (window.innerWidth - newW) / 2 - newSelSize * 10 - 4 + "px";
outerPtr.style.top = yPosStationArray[0][tN] / 10000 * newH + window.innerHeight - newH  - newSelSize / 2 - 1 + "px";		// для внешней части стрелки всё то же самое, но она чуть шире и выше
outerPtr.style.width = 8 * newSelSize + 8 +"px";
outerPtr.style.height = newSelSize + 4 + "px";
}

// так как я имбецил и не особо шарю в вебе, я решил добавить изменение положения и размера элементов в реальном времени. Боже, звучит ужасно.
// короче, онресайз позволяет мне мутить дичь, при этом наблюдая элементы правильного размера в правильных местах. Вне зависимости от размера окна. Наверное.
window.onresize = sizeChange;

sizeChange();	// вызываем функцию один раз. по приколу.


// а вот эта хрень вызывается, когда мы получаем рандомные числа - номер ветки и номер станции. Собственно, параметры функции - это и есть ветка и станция
function displayPointer(branchNum){
	ptr.style.background = pCol[branchNum];
	ptr.style.opacity = 1;
}
displayPointer(0);

// надо:
// добавить генератор рандомных чисел
// выделить под него место над картой
// заполнить массивы (мама...)
