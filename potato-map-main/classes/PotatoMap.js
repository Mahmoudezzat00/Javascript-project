   export default class PotatoMap {
      /**
       *
       * @param {*} canvas
       * @param {CanvasRenderingContext2D} ctx
       * @param {*} width
       * @param {*} height
       * @param {*} bg
       */
      constructor(canvas, ctx, width = 1347, height = 911, bg = './assets/theme.png') {
         this.width = width;
         this.height = height;
         this.canvas = canvas;
         this.ctx = ctx;
         this.bg = bg;
         this.image = new Image();
         canvas.width = width;
         canvas.height = height;
      }

      async drawBackground() {
         await this.getImage(); // Wait for the image to load
         this.ctx.drawImage(this.image, 0, 0);
         this.ctx.fillStyle = '#00000070';
         this.ctx.fillRect(0, 0, this.width, this.height);
         this.ctx.fillStyle = '#ffffff70';
         this.ctx.fillRect(0, 0, this.width, this.height);
      }

      getImage() {
         return new Promise((resolve, reject) => {
            this.image.onload = () => resolve(this.image);
            this.image.src = this.bg; // Set the image source here
         });
      }
   }
