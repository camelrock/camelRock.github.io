let ingredientsList = [
    ["bread", "bread and water", "bread"],
    ["water", "bread and water", "glass of water"]
]

class Recipe {
    constructor(id, year, ingredients, description) {
        this.id = id;
        this.year = year;
        this.ingredients = ingredients;
        this.description = description;
    }
    display() {
        document.getElementById("showThisRecipe").showThis = this.id;
        document.getElementById("showThisRecipe").display = "block";
    }
}
let recipesList = [
    new Recipe(1, 1989, ["bread"], "plain bread"),
    new Recipe(2, 1999, ["water", "bread"], "wet bread")
]
function findRecipes() {
    rehide();
    const term = document.getElementById("ingredientsInput").value.toLowerCase();
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
        alert(`consider recipe ${options[k - 1].id} : ${options[k - 1].description} `)
        k--;
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
    let recipe = document.getElementById("displayRecipe").value;
    for (i in recipesList) {
        if (recipesList[i].id == recipe) {
            document.getElementById("showIt").src = "./recipes/" + recipe + ".jpg";
            document.getElementById("showIt").style.display = "block";
            return;
        }
    }
    document.getElementById("tellIt").style.display = "block";
}

function rehide() {
    document.getElementById("showIt").style.display = "none";
    document.getElementById("tellIt").style.display = "none";
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
            break;
        }
    }
    if (options.length > 0) {
        for (i in options) {
            alert(`${options[i].ingredients} is an option from ${options[i].year}. get recipe number ${options[i].id}`)
        }
    }
}