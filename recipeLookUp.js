
class Recipe {
    constructor(id, year, ingredients, notes, name, rag) {
        this.id = id;
        this.year = year;
        this.ingredients = ingredients;
        this.notes = notes;
        this.name = name;
        this.rag = rag;
    }
    display() {
        document.getElementById("showThisRecipe").showThis = "./recipeRecords/" + this.id + ".jpg";
        document.getElementById("showThisRecipe").display = "block";
    }
}

let recipesList = [
    new Recipe(0, -1000000000, ["stone", "water"], "very soupy", "stone soup", "ORANGE"),
    new Recipe(1, -1000000, ["water", "stone", "spoon"], "easy soup", "stone soup with a spoon", "ORANGE"),
    new Recipe(26, 1945, ["bread", "water", "spoon"], "wet bread", "water with bread and spoon", "GREEN"),
    new Recipe(3, 2022, ["bread", "crumbly cheese", "cheese", "olives", "sandwich toaster"], "crumbly cheese and olive toasted sandwich", "cheese and olive sandwich", "GREEN")
]

function findRecipes() {
    rehide();
    const term = document.getElementById("ingredientsInput").value.toLowerCase();
    let k = 0;
    let options = [];
    for (i in recipesList) {
        for (j in recipesList[i].ingredients) {
            if (recipesList[i].ingredients[j].toLowerCase() == term) {
                options[k] = recipesList[i];
                k++;
            }
        }
    }
    if (k > 0) {
        const len = options.length;
        for (let k = 0; k < len; k++) {
            let m = suggest(options, k, options.length);
            if (k == 0) {
                return;
            }
        }
        document.getElementById("tellIt").textContent = `there appear to be no records of humans eating '${term}' so caution is to be advised. If you know '${term}[s]' to be edible, consider sending your recipe to jmlunlocked@gmail.com for consideration`
        document.getElementById("tellIt").style.display = "block";
    }
}

function searchYears() {
    rehide();
    let term;
    switch (term = document.getElementById("year").value.toUpperCase()) {
        case "":
            alert("input a time");
            return 1;
        case "STONE AGE":
            term = -1000000000;
            break
        case "IRON AGE":
            term = -1000000;
            break;
        case "NULL88":
            alert("NOT A DATE");
            return 1;
            break;
        default:
            term = Number(term);
            if (isNaN(term)) {
                term = 2023;
                alert("Not a year - 2023 has been inserted");
            }
    }
    let options = [];
    let i = 0;
    for (rec in recipesList) {
        if (Math.abs(recipesList[rec].year - term) < 2) {
            options[i] = recipesList[rec];
            i++;
        }
    }
    if (options.length > 0) {
        const len = options.length;
        for (let i = 0; i < len; i++) {
            let j = suggest(options, i, options.length);
        }
    }
    else {
        document.getElementById("tellIt").textContent = "no results returned... To help you locate yourself on the map of EDIBLE vs INEDIBLE, you can start by finding food from the STONE AGE or IRON AGE or 1945 - or - why not try searching ingrediets ?";
        document.getElementById("tellIt").style.display = "block";
    }
}

function getRecipe() {
    rehide();
    let recipe = document.getElementById("displayRecipe").value.toLowerCase();
    for (i in recipesList) {
        if (recipesList[i].id == recipe || recipesList[i].name.toLowerCase() == recipe) {
            document.getElementById("showIt").src = "./recipeRecords/" + recipesList[i].id + ".jpg";
            document.getElementById("showIt").style.display = "block";
            return;
        }
    }
    document.getElementById("tellIt").textContent = "there appears to be no recipe of that name/id - maybe try one of the other searches?";
    document.getElementById("tellIt").style.display = "block";
}

function rehide() {
    document.getElementById("showIt").style.display = "none";
    document.getElementById("tellIt").style.display = "none";
    document.getElementById("suggestionsDescription0").style.display = "none";
    document.getElementById("suggestionsDescription1").style.display = "none";
    document.getElementById("suggestionsDescription2").style.display = "none";
}

function checkNotes() {
    rehide();
    let term = document.getElementById("wordy").value.toLowerCase();
    let options = [];
    let opt = 0;
    let s = "";
    let j = 0;
    for (i in recipesList) {
        const len = recipesList[i].notes.length;
        j = 0;
        s = "";
        while (j < len) {
            if (recipesList[i].notes[j] == " ") {
                if (s == term) {
                    options[opt] = recipesList[i];
                    opt++;
                    s = "";
                    break;
                }
                s = "";
                j++;
                continue;
            }
            s += recipesList[i].notes[j];
            j++
        }
        if (s == term) {
            options[opt] = recipesList[i];
            opt++;
        }
    }
    if (options.length > 0) {
        const len = options.length;
        for (let i = 0; i < len; i++) {
            let j = suggest(options, i, options.length);
        }
    }
    else {
        document.getElementById("tellIt").textContent = `there appear to be no records of food being '${term}'. There's not much choice ATM but there is at least something wet`;
        document.getElementById("tellIt").style.display = "block";
    }
}

function suggest(recipeSuggestion, i, iMax) {
    if (i > 2) {
        if (i == 3) {
            alert("not all suggestions can be shown :(");
        }
        return 1;
    }

    document.getElementById("div" + String(i)).textContent = "recipe " + recipeSuggestion[i].id + " : '" + recipeSuggestion[i].name + "' requires : " + recipeSuggestion[i].ingredients;
    // this is wasteful
    document.getElementById("div" + String(i)).src = "./recipeRecords/" + recipeSuggestion[i].id + ".jpg";
    document.getElementById("button" + String(i)).style.backgroundColor = recipeSuggestion[i].rag;
    document.getElementById("suggestionsDescription" + String(i)).style.display = "block";
    return i;
}
function thisRecipe(ID) {
    document.getElementById("showIt").src = document.getElementById("div" + String(ID)).src;
    document.getElementById("showIt").style.display = "block";
}

function inputCutUp(inp, i, len) {
    let str = "";
    while (i < len) {
        if (inp[i] == " ") {
            return (i + 1, str);
        }
        str += inp[i];
        i++;
    }
    return (i, str);
}
