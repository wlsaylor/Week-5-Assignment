class Recipe {
  constructor(name, description, price) {
    this.name = name;
    this.description = description;
    this.price = price;
  }
}

class Menu {
  constructor(name) {
    this.name = name;
    this.recipes = [];
  }
}

class MenuManager {
  constructor() {
    this.menus = [];
    this.selected = null;
  }

  start() {
    let selection = this.showMainMenuOptions();

    while (selection != 0) {
      switch (selection) {
        case '1':
          this.createMenu();
          break;
        case '2':
          this.viewMenu();
          break;
        case '3':
          this.deleteMenu();
          break;
        default:
          selection = 0;
      }

      let menuList = '';
      for (let i = 0; i < this.menus.length; i++) {
          if (i === 0) {
            menuList += i + ') ' + this.menus[i].name + '\n';
          } else {
            menuList += '      ' + i + ') ' + this.menus[i].name + '\n';
          }
      }

      selection = this.showMainMenuOptions(menuList);
    }

    alert('Goodbye!');
  }

  showMainMenuOptions(menus) {
    return prompt(`
      --Restaraunt Menu Manager-- Menus
      0) Exit
      1) Create New Menu
      2) Edit Menu
      3) Delete Menu
      --------------------------
      ${menus ? menus : ''}
    `);
  }

  showMenuMenuOptions(menuInfo) {
    return prompt(`
      --Restaraunt Menu Manager-- Recipes
      0) Back
      1) Create Recipe
      2) Delete Recipe
      --------------------------
      ${menuInfo ? menuInfo : ''}
    `);
  }

  createMenu() {
    let name = prompt('Enter name of the new Menu.');
    this.menus.push(new Menu(name));
  }

  viewMenu() {
    let index = prompt('Enter the index of the Menu you want to view');
    if (index > -1 && index < this.menus.length) {
      this.selectedMenu = this.menus[index];
      let description =  'Menu Name: ' + this.selectedMenu.name + '\n';
      let selection = this.showMenuMenuOptions();

      while (selection != 0) {

        switch (selection) {
          case '1':
            this.createRecipe();
            break;
          case '2':
            this.deleteRecipe();
            break;
          default:
            selection = 0;
        }

        let recipeList = '';
        for(let i = 0; i < this.selectedMenu.recipes.length; i++) {
          if (i === 0 ) {
            recipeList += i + ') ' + this.selectedMenu.recipes[i].name
            + ' - ' + this.selectedMenu.recipes[i].description 
            + ' $' + this.selectedMenu.recipes[i].price + '\n';
          } else {
            recipeList += '      ' + i + ') ' + this.selectedMenu.recipes[i].name
            + ' - ' + this.selectedMenu.recipes[i].description 
            + ' $' + this.selectedMenu.recipes[i].price + '\n';
          }
        }

        selection = this.showMenuMenuOptions(recipeList);
      }
    }
  }

  deleteMenu() {
    let index = prompt('Enter the index of the Menu you wish to delete');
    if (index > -1 && index < this.menus.length) {
      this.menus.splice(index, 1);
    }
  }

  createRecipe() {
    let name = prompt('Enter name for new recipe.');
    let description = prompt('Enter description for new recipe');
    let price = prompt('Enter price for new recipe');
    this.selectedMenu.recipes.push(new Recipe(name, description, price));
  }

  deleteRecipe() {
    let index = prompt('Enter the index of the recipe you wish to delete');
    if (index > -1 && index < this.selectedMenu.recipes.length) {
      this.selectedMenu.recipes.splice(index, 1);
    }
  }
}

let menu = new MenuManager;
menu.start();