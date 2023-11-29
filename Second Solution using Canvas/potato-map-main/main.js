import Grid from './classes/Grid.js';
import ElementGrid from './classes/ElementGrid.js';
import PotatoMap from './classes/PotatoMap.js';

const canvas = document.getElementsByTagName('canvas')[0];
const ctx = canvas.getContext('2d');

async function gameLoop() {
   const potatoMap = new PotatoMap(canvas, ctx);
   const grid = new Grid(potatoMap, 50, 50, 40, 170);
   await potatoMap.drawBackground();

   const elementGrid = new ElementGrid(ctx, grid);
   await elementGrid.preloadTileImages(); // Preload tile images
   grid.createGrid();
   elementGrid.drawElementGrid();
   grid.drawInfo();

   async function update() {
      // if (!isWindowFocused) {
      //    return;
      // }
      await grid.updateTiles();
      grid.checkMissionsProgress();
      await grid.initializeInfo();
      
      grid.updateSeasonCycle();
      grid.checkForGameEnd();
      elementGrid.updateCells();
      elementGrid.drawRoundedRectangle();
      elementGrid.updateCells();
      requestAnimationFrame(update);
   }

   await update();
}

gameLoop();
