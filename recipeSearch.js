let ingredientsList = [
    ["bread", "bread and water", "bread"],
    ["water", "bread and water", "glass of water"]
]

class Recipe {
    constructor(id, year, ingredients) {
        this.id = id;
        this.year = year;
        this.ingredients = ingredients;
    }
    display() {
        document.getElementById("showThisRecipe").showThis = this.id;
        document.getElementById("showThisRecipe").display = "block";
    }
}
let recipesList = [
    new Recipe(1, 1989, ["bread"]),
    new Recipe(2, 1999, ["water", "bread"])
]


function searchTerms() {
    let i = 0;
    const term = document.getElementById("ingredientsInput").value.toLowerCase();
    for (ingredient in ingredientsList) {
        if (term == ingredientsList[ingredient][0]) {
            while (i < ingredientsList.length) {
                i++;
                alert(`${term} is used in ${ingredientsList[ingredient][i]}`);
            }
            return;
        }
    }
    document.getElementById("tellIt").style.display = "block";
}

function searchYears() {
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