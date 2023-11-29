import elements from '../data/elements.js';
import Element from './Element.js';
import Tile from './Tile.js';

const DEFAULTS = {
   posX: 1050,
   posY: 530,
   rows: 3,
   cols: 3,
   cellWidth: 50,
   cellHeight: 50,
   cellMargin: 3,
   padding: 30,
   buttonWidth: 100,
   buttonHeight: 40,
};

export default class ElementGrid {
   constructor(ctx, grid) {
      this.ctx = ctx;
      this.grid = grid;
      Object.assign(this, DEFAULTS);
      this.currentElement = null;
      this.elements = elements.map((elem) => new Element(elem.time, elem.type, elem.shape));
      this.tileImages = {};
   }

   async preloadTileImages() {
      // Preload tile images and store them in the dictionary
      await Promise.all(
         this.elements.map(async (element) => {
            const tile = new Tile(element.type);
            this.tileImages[element.type] = await tile.getTileImage();
         })
      );
   }

   drawRoundedRectangle() {
      const { posX, posY, cellWidth, cellHeight, cellMargin, padding } = this;
      const width = cellWidth * this.cols + cellMargin * (this.cols - 1) + 2.3 * padding;
      const height = cellHeight * this.rows + cellMargin * (this.rows - 1) + 2.3 * padding;

      this.ctx.beginPath();
      this.ctx.roundRect(posX - padding, posY - padding, width, height, 10);
      this.ctx.fillStyle = 'white';
      this.ctx.fill();
   }

   drawGridCells() {
      const { posX, posY, cellWidth, cellHeight, cellMargin } = this;
      this.ctx.fillStyle = 'white';
      for (let row = 0; row < this.rows; row++) {
         for (let col = 0; col < this.cols; col++) {
            const x = posX + col * (cellWidth + cellMargin) + cellMargin;
            const y = posY + row * (cellHeight + cellMargin) + cellMargin;
            this.ctx.fillRect(x, y, cellWidth, cellHeight);
         }
      }
   }

   drawButtons() {
      const { posX, posY, buttonWidth, buttonHeight } = this;
      const rotateButtonX = posX - (buttonWidth + 50);
      const rotateButtonY = posY;

      this.ctx.font = ' 20pt "Bree Serif"';
      this.drawButton(rotateButtonX, rotateButtonY, 'Rotate');

      const mirrorButtonX = rotateButtonX;
      const mirrorButtonY = rotateButtonY + buttonHeight + 10;
      this.drawButton(mirrorButtonX, mirrorButtonY, 'Mirror');

      this.ctx.canvas.addEventListener('click', (event) => {
         const mouseX = event.clientX - this.ctx.canvas.getBoundingClientRect().left;
         const mouseY = event.clientY - this.ctx.canvas.getBoundingClientRect().top;

         this.handleButtonClick(
            mouseX,
            mouseY,
            rotateButtonX,
            rotateButtonY,
            this.rotateElement.bind(this)
         );
         this.handleButtonClick(
            mouseX,
            mouseY,
            mirrorButtonX,
            mirrorButtonY,
            this.mirrorElement.bind(this)
         );
      });
   }

   drawButton(x, y, text) {
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(x, y, this.buttonWidth, this.buttonHeight);
      this.ctx.fillStyle = 'black';
      this.ctx.fillText(text, x + 10, y + 30);
   }

   handleButtonClick(mouseX, mouseY, buttonX, buttonY, callback) {
      if (
         mouseX >= buttonX &&
         mouseX <= buttonX + this.buttonWidth &&
         mouseY >= buttonY &&
         mouseY <= buttonY + this.buttonHeight
      ) {
         callback();
      }
   }

   rotateElement() {
      if (this.currentElement) {
         console.log('Rotate button clicked');
         this.currentElement.rotate();
      }
   }

   mirrorElement() {
      if (this.currentElement) {
         console.log('Mirror button clicked');
         this.currentElement.mirror();
      }
   }

   updateElementGrid() {
      if (this.currentElement) {
         const { posX, posY, cellWidth, cellHeight, cellMargin } = this;
         this.currentElement.drawElement(
            this.ctx,
            posX,
            posY,
            cellWidth,
            cellHeight,
            cellMargin,
            this.tileImages
         );
      }
   }

   createRandomElement() {
      const { posX, posY, cellWidth, cellHeight, cellMargin } = this;
      const randomIndex = Math.floor(Math.random() * this.elements.length);
      this.currentElement = this.elements[randomIndex];

      this.currentElement.drawElement(
         this.ctx,
         posX,
         posY,
         cellWidth,
         cellHeight,
         cellMargin,
         this.tileImages
      );
   }

   drawElementGrid() {
      this.drawRoundedRectangle();
      this.drawGridCells();
      this.createRandomElement();
      this.drawButtons();
      this.updateCells();
   }

   updateCells() {
      this.grid.currentElement = this.currentElement;
      this.grid.elementGrid = this;
      this.updateElementGrid();
   }
}
