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
    this.Recipes = [];
  }
}

class MenuManager {
  constructor() {
    this.Menus = [];
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
        case '4':
          this.displayMenus();
          break;
        default:
          selection = 0;
      }
      selection = this.showMainMenuOptions();
    }

    alert('Goodbye!');
  }

  showMainMenuOptions() {
    return prompt(`
    0) exit
    1) create new Menu
    2) view Menu
    3) delete Menu
    4) display all Menus
    `);
  }

  showMenuMenuOptions(MenuInfo) {
    return prompt(`
      0) back
      1) create Recipe
      2) delete Recipe
      ------------------------
      ${MenuInfo}
    `);
  }

  displayMenus() {
    let MenuString = '';
    for (let i = 0; i < this.Menus.length; i++) {
      MenuString += i + ') ' + this.Menus[i].name + '\n';
    }
    alert(MenuString);
  }

  createMenu() {
    let name = prompt('Enter name of new Menu.');
    this.Menus.push(new Menu(name));
  }

  viewMenu() {
    let index = prompt('Enter the index of the Menu you want to view');
    if (index > -1 && index < this.Menus.length) {
      this.selectedMenu = this.Menus[index];
      let description =  'Menu Name: ' + this.selectedMenu.name + '\n';
      
      for(let i = 0; i < this.selectedMenu.Recipes.length; i++) {
        description += i + ') ' + this.selectedMenu.Recipes[i].name
          + ' - ' + this.selectedMenu.Recipes[i].description 
          + ' $' + this.selectedMenu.Recipes[i].price + '\n';
      }

      let selection = this.showMenuMenuOptions(description);
      switch (selection) {
        case '1':
          this.createRecipe();
          break;
        case '2':
          this.deleteRecipe();
      }
    }
  }

  deleteMenu() {
    let index = prompt('Enter the index of the Menu you wish to delete');
    if (index > -1 && index < this.Menus.length) {
      this.Menus.splice(index, 1);
    }
  }

  createRecipe() {
    let name = prompt('Enter name for new recipe.');
    let description = prompt('Enter description for new recipe');
    let price = prompt('Enter price for new Recipe');
    this.selectedMenu.Recipes.push(new Recipe(name, description, price));
  }

  deleteRecipe() {
    let index = prompt('Enter the index of the Recipe you wish to delete');
    if (index > -1 && index < this.selectedMenu.Recipes.length) {
      this.selectedMenu.Recipes.splice(index, 1);
    }
  }
}

let menu = new MenuManager;
menu.start();