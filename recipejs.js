
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
    new Recipe(0, -1000000000, ["stone", "water"], "very soupy", "stone soup", "AMBER"),
    new Recipe(1, -1000000, ["water", "stone", "spoon"], "easy soup", "stone soup with a spoon", "AMBER"),
    new Recipe(2, 1945, ["bread", "water", "spoon"], "wet bread", "water with bread and spoon", "GREEN"),
    new Recipe(3, 2023, ["apple crumble", "moths"], "dry lemony crumble", "lemon moth crumble - see: https://medium.com/@jmlunlocked/lemon-moth-crumble-2fbbeac24280 for full recipe", "AMBER")
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
    while (k > 0) {
        k--;
        suggest(options[k], k)
        if (k == 0) {
            return;
        }
    }
    document.getElementById("tellIt").textContent = `there appear to be no records of humans eating '${term}' so caution is to be advised. If you know '${term}[s]' to be edible, consider sending your recipe to jmlunlocked@gmail.com for consideration`
    document.getElementById("tellIt").style.display = "block";
}

function searchYears() {
    rehide();
    let term;
    switch (term = document.getElementById("year").value.toUpperCase()) {
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
        for (opt in options) {
            suggest(options[opt], opt);
        }
    }
    else {
        document.getElementById("tellIt").textContent = "no results returned... To help you locate the map of human culinary knowledge, you can start by finding food from the 'STONE AGE', 'IRON AGE', or 1945... OR : why not search ingrediets ?";
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
        for (i in options) {
            suggest(options[i], i);
        }
    }
    else {
        document.getElementById("tellIt").textContent = `there appear to be no records of food being '${term}'. There's not much choice ATM but there is at least something wet`;
        document.getElementById("tellIt").style.display = "block";
    }
}

function suggest(recipeSuggestion, i) {
    if (i > 2) {
        if (i == 3) {
            alert("not all suggestions can be shown :(");
        }
        return 1;
    }
    document.getElementById("div" + String(i)).textContent = "recipe " + recipeSuggestion.id + ": '" + recipeSuggestion.name + "' requires : " + recipeSuggestion.ingredients;
    // this is wasteful
    document.getElementById("div" + String(i)).src = "./recipeRecords/" + recipeSuggestion.id + ".jpg";
    document.getElementById("suggestionsDescription" + String(i)).style.display = "block";
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
var para = document.createElement("p");
var node = document.createTextNode("node");
para.appendChild(node);
var parent = document.getElementById("div1");
parent.appendChild(para);