const addIngredientsBtn = document.getElementById('addIngredientsBtn');
const ingredientList = document.querySelector('.ingredientList');
const ingredeintDiv = document.querySelectorAll('.ingredeintDiv')[0];

addIngredientsBtn.addEventListener('click', function(){
    let newIngredients = ingredeintDiv.cloneNode(true);
    let input = newIngredients.getElementsByTagName('input')[0];
    input.value = '';
    ingredientList.appendChild(newIngredients)
});

