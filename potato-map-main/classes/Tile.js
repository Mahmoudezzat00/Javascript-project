export default class Tile {
   constructor(tileName, locX = 0, locY = 0) {
      this.tilesPath = './assets/tiles/';
      this.tileName = tileName;
      this.image = new Image();
      this.imageSrc = `${this.tilesPath}${this.tileName}.png`;
      this.locX = locX;
      this.locY = locY;
      this.isChanged = true;
   }

   async getTileImage() {
      const image = await new Promise((resolve) => {
         this.image.src = this.imageSrc;
         this.image.onload = () => resolve(this.image);
      });
      return image;
   }
}
