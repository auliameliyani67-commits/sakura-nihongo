
// Navigasi halaman
function showPage(pageId) {
    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    document.getElementById(pageId).classList.add("active");
}

// Data Hiragana
const hiragana = [
    ["あ", "A"], ["い", "I"], ["う", "U"],
    ["え", "E"], ["お", "O"],
    ["か", "Ka"], ["き", "Ki"], ["く", "Ku"],
    ["け", "Ke"], ["こ", "Ko"],
    ["さ", "Sa"], ["し", "Shi"], ["す", "Su"],
    ["せ", "Se"], ["そ", "So"],
    ["た", "Ta"], ["ち", "Chi"], ["つ", "Tsu"],
    ["て", "Te"], ["と", "To"],
    ["な", "Na"], ["に", "Ni"], ["ぬ", "Nu"],
    ["ね", "Ne"], ["の", "No"]
];

// Data Katakana
const katakana = [
    ["ア", "A"], ["イ", "I"], ["ウ", "U"],
    ["エ", "E"], ["オ", "O"],
    ["カ", "Ka"], ["キ", "Ki"], ["ク", "Ku"],
    ["ケ", "Ke"], ["コ", "Ko"],
    ["サ", "Sa"], ["シ", "Shi"], ["ス", "Su"],
    ["セ", "Se"], ["ソ", "So"],
    ["タ", "Ta"], ["チ", "Chi"], ["ツ", "Tsu"],
    ["テ", "Te"], ["ト", "To"]
];

// Data kosakata
const vocabulary = [
    ["こんにちは", "Konnichiwa", "Halo"],
    ["ありがとう", "Arigatou", "Terima kasih"],
    ["みず", "Mizu", "Air"],
    ["ねこ", "Neko", "Kucing"],
    ["いぬ", "Inu", "Anjing"],
    ["せんせい", "Sensei", "Guru"],
    ["がくせい", "Gakusei", "Siswa"],
    ["ともだち", "Tomodachi", "Teman"],
    ["ほん", "Hon", "Buku"],
    ["おいしい", "Oishii", "Enak"]
];

// Menampilkan materi
function displayData(data, elementId, type) {
    const container = document.getElementById(elementId);

    data.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";

        if (type === "alphabet") {
            card.innerHTML = `
                <strong>${item[0]}</strong>
                <span>${item[1]}</span>
            `;
        } else {
            card.innerHTML = `
                <strong>${item[0]}</strong>
                <span>${item[1]}</span>
                <p>${item[2]}</p>
            `;
        }

        container.appendChild(card);
    });
}

displayData(hiragana, "hiraganaList", "alphabet");
displayData(katakana, "katakanaList", "alphabet");
displayData(vocabulary, "vocabularyList", "vocab");

// Sistem kuis
let score = 0;
let currentQuestion = null;
let answered = false;

function startQuiz() {
    score = 0;
    document.getElementById("score").textContent = score;
    nextQuestion();
}

function nextQuestion() {
    answered = false;

    const randomIndex = Math.floor(
        Math.random() * vocabulary.length
    );

    currentQuestion = vocabulary[randomIndex];

    document.getElementById("question").textContent =
        `Apa arti dari ${currentQuestion[0]}?`;

    document.getElementById("result").textContent = "";

    const answers = document.getElementById("answers");
    answers.innerHTML = "";

    let options = [currentQuestion[2]];

    while (options.length < 4) {
        const random = vocabulary[
            Math.floor(Math.random() * vocabulary.length)
        ][2];

        if (!options.includes(random)) {
            options.push(random);
        }
    }

    options.sort(() => Math.random() - 0.5);

    options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;

        button.onclick = function() {
            if (answered) return;

            answered = true;

            if (option === currentQuestion[2]) {
                score += 10;

                document.getElementById("result").textContent =
                    "Benar! よくできました！";
            } else {
                document.getElementById("result").textContent =
                    "Kurang tepat! Jawaban: " +
                    currentQuestion[2];
            }

            document.getElementById("score").textContent = score;

            const next = document.createElement("button");
            next.textContent = "Soal Berikutnya";
            next.className = "start";
            next.onclick = nextQuestion;

            answers.appendChild(next);
        };

        answers.appendChild(button);
    });
}


