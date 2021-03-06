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

  // Loads the main menu for the app
  start() {
    let selection = this.showMainMenuOptions();

    while (selection != 0) {
      switch (selection) {
        case null:
          alert('Goodbye!');
          return;
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

      //Displays the list of menu names on the main menu
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
      --Restaraunt Menu Manager--
      0) Exit
      1) Create New Menu
      2) Edit Menu
      3) Delete Menu
      --------------------------
      ${menus ? menus : ''}
    `);
  }

  showMenuMenuOptions(menuInfo, index) {
    this.selectedMenu = this.menus[index];
    return prompt(`
      --${this.selectedMenu.name} Menu--
      0) Back
      1) Create Recipe
      2) Delete Recipe
      --------------------------
      ${menuInfo ? menuInfo : ''}
    `);
  }

  createMenu() {
    let name = prompt('Enter name of the new Menu.');
    if (name === null) {return;}
    this.menus.push(new Menu(name));
  }

  //Loads the individual menu to create and delete recipes
  viewMenu() {
    let index = prompt('Enter the index of the Menu you want to view');
    if (index === null) {return;}
    if (index > -1 && index < this.menus.length) {
      this.selectedMenu = this.menus[index];
      let selection = this.showMenuMenuOptions('', index);

      while (selection != 0) {

        switch (selection) {
          case null:
            return;
          case '1':
            this.createRecipe();
            break;
          case '2':
            this.deleteRecipe();
            break;
          default:
            selection = 0;
        }
        
        //Displays the recipe list on the menu
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

        selection = this.showMenuMenuOptions(recipeList, index);
      }
    }
  }

  deleteMenu() {
    let index = prompt('Enter the index of the Menu you wish to delete');
    if (index === null) {return;}
    if (index > -1 && index < this.menus.length) {
      this.menus.splice(index, 1);
    }
  }

  createRecipe() {
    let name = prompt('Enter name for new recipe.');
    if (name === null) {return;}
    let description = prompt('Enter description for new recipe');
    if (description === null) {return;}
    let price = prompt('Enter price for new recipe');
    if (price === null) {return;}
    this.selectedMenu.recipes.push(new Recipe(name, description, price));
  }

  deleteRecipe() {
    let index = prompt('Enter the index of the recipe you wish to delete');
    if (index === null) {return;}
    if (index > -1 && index < this.selectedMenu.recipes.length) {
      this.selectedMenu.recipes.splice(index, 1);
    }
  }
}

let menu = new MenuManager;
menu.start();