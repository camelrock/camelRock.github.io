
class Recipe {
    constructor(id, year, ingredients, description, name) {
        this.id = id;
        this.year = year;
        this.ingredients = ingredients;
        this.description = description;
        this.name = name;
    }
    display() {
        document.getElementById("showThisRecipe").showThis = this.id;
        document.getElementById("showThisRecipe").display = "block";
    }
}
let recipesList = [
    new Recipe(1, 1944, ["bread"], "plain bread", "breadOnItsOwn"),
    new Recipe(2, 1945, ["water", "bread"], "wet bread", "bread and water"),
    new Recipe(3, 1946, ["eel", "bread"], "eely bread", "eel with bread"),
    new Recipe(4, 1947, ["eel", "water"], "wet eels", "water with eels"),
    new Recipe(5, 1948, ["eel"], "plain eel", "plainEel")
]

function findRecipes() {
    rehide();
    const term = document.getElementById("ingredientsInput").value.toLowerCase();
    document.getElementById("ingredientsInput").value = "";
    let k = 0;
    let options = [];
    for (i in recipesList) {
        for (j in recipesList[i].ingredients) {
            if (recipesList[i].ingredients[j] == term) {
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
    document.getElementById("tellIt").style.display = "block";
}

function searchYears() {
    rehide();
    let term = Number(document.getElementById("year").value);
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
            alert(`${options[opt].ingredients} is an option from ${options[opt].year}. get recipe number ${options[opt].id}`)
        }
    }
}

function getRecipe() {
    rehide();
    let recipe = document.getElementById("displayRecipe").value.toLowerCase();
    for (i in recipesList) {
        if (recipesList[i].id == recipe || recipesList[i].name.toLowerCase() == recipe) {
            document.getElementById("showIt").src = "./recipes/" + recipesList[i].id + ".jpg";
            document.getElementById("showIt").style.display = "block";
            return;
        }
    }

    document.getElementById("tellIt").style.display = "block";
}

function rehide() {
    document.getElementById("showIt").style.display = "none";
    document.getElementById("tellIt").style.display = "none";
    document.getElementById("suggestionsDescription0").style.display = "none";
    document.getElementById("suggestionsDescription1").style.display = "none";
    document.getElementById("suggestionsDescription2").style.display = "none";
}

function descriptionLookup() {
    rehide();
    let term = document.getElementById("wordy").value.toLowerCase();
    let options = [];
    let opt = 0;
    let s = "";
    let j = 0;
    for (i in recipesList) {
        const len = recipesList[i].description.length;
        j = 0;
        s = "";
        while (j < len) {
            if (recipesList[i].description[j] == " ") {
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
            s += recipesList[i].description[j];
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
    document.getElementById("div" + String(i)).src = "./recipes/" + recipeSuggestion.id + ".jpg";
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