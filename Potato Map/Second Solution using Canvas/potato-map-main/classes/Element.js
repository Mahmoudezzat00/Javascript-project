export default class Element {
   constructor(
      time,
      type,
      shape = [
         [0, 0, 0],
         [0, 0, 0],
         [0, 0, 0],
      ]
   ) {
      this.time = time;
      this.type = type;
      this.shape = shape;
      this.rotation = 0;
      this.isMirror = false;
   }

   drawElement(ctx, x, y, cellWidth, cellHeight, cellMargin, tileImages) {
      ctx.fillStyle = 'black';
      ctx.font = '16pt "Bree Serif"';
      ctx.fillText(this.time, x + cellWidth * 3, y - 8);

      this.shape.forEach((row, rowIndex) => {
         row.forEach((col, colIndex) => {
            const elementX = x + colIndex * (cellWidth + cellMargin) + cellMargin;
            const elementY = y + rowIndex * (cellHeight + cellMargin) + cellMargin;

            if (col) {
               // Draw the preloaded tile image
               ctx.drawImage(
                  tileImages[this.type],
                  elementX,
                  elementY,
                  cellWidth,
                  cellHeight
               );
            } else {
               ctx.fillStyle = 'white';
               ctx.fillRect(elementX, elementY, cellWidth, cellHeight);
            }
         });
      });
   }

   rotate() {
      const newShape = this.shape[0].map((_, index) =>
         this.shape.map((row) => row[index]).reverse()
      );
      this.shape = newShape;
      this.rotation = (this.rotation + 1) % 4;
   }

   mirror() {
      const newShape = this.shape.map((row) => row.slice().reverse());
      this.shape = newShape;
      this.isMirror = !this.isMirror;
   }
}
