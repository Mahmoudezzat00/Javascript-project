class Mission {
   constructor(name, desc, points, image) {
      this.name = name;
      this.desc = desc;
      this.points = points;
      this.image = new Image();
      this.missionsPath = './assets/missions_eng';
      this.imageSrc = `${this.missionsPath}/${image}.png`;
   }

   async getImage() {
      const image = await new Promise((resolve) => {
         this.image.src = this.imageSrc;
         this.image.onload = () => resolve(this.image);
      });
      return image;
   }

   checkProgress(tiles) {
      console.log('not implemented yet');
   }
}

class EdgeOfTheForestMission extends Mission {
   constructor() {
      super(
         'Edge of the forest',
         'You get one point for each forest field adjacent to the edge of your map.',
         1,
         'The edge of the forest'
      );
   }

   checkProgress(tiles) {
      let points = 0;
      const numRows = tiles.length;
      const numCols = tiles[0].length;

      // Check top and bottom edges
      for (let col = 0; col < numCols; col++) {
         if (tiles[0][col].tileName === 'forest') {
            points += this.points;
         }
         if (tiles[numRows - 1][col].tileName === 'forest') {
            points += this.points;
         }
      }

      // Check left and right edges
      for (let row = 0; row < numRows; row++) {
         if (tiles[row][0].tileName === 'forest') {
            points += this.points;
         }
         if (tiles[row][numCols - 1].tileName === 'forest') {
            points += this.points;
         }
      }

      return points;
   }
}
class SleepyValleyMission extends Mission {
   constructor() {
      super(
         'Sleepy valley',
         'For every row with three forest fields, you get four points.',
         4,
         'Sleepy Valley'
      );
   }

   checkProgress(tiles) {
      let points = 0;
      for (let row = 0; row < tiles.length; row++) {
         let forestCount = 0;
         for (let col = 0; col < tiles[row].length; col++) {
            if (tiles[row][col].tileName === 'forest') {
               forestCount++;
            }
         }
         if (forestCount === 3) {
            points += this.points;
         }
      }
      return points;
   }
}

class WateringPotatoesMission extends Mission {
   constructor() {
      super(
         'Watering potatoes',
         'You get two points for each water field adjacent to your farm fields.',
         2,
         'Potato irrigation'
      );
   }

   checkProgress(tiles) {
      let points = 0;
      for (let row = 0; row < tiles.length; row++) {
         for (let col = 0; col < tiles[row].length; col++) {
            if (tiles[row][col].tileName === 'farm') {
               // Check adjacent tiles for water fields
               if (row > 0 && tiles[row - 1][col].tileName === 'water') {
                  points += this.points;
               }
               if (row < tiles.length - 1 && tiles[row + 1][col].tileName === 'water') {
                  points += this.points;
               }
               if (col > 0 && tiles[row][col - 1].tileName === 'water') {
                  points += this.points;
               }
               if (
                  col < tiles[row].length - 1 &&
                  tiles[row][col + 1].tileName === 'water'
               ) {
                  points += this.points;
               }
            }
         }
      }
      return points;
   }
}

class BorderlandsMission extends Mission {
   constructor() {
      super(
         'Borderlands',
         'For each full row or column, you get six points.',
         6,
         'Borderlands'
      );
   }

   checkProgress(tiles) {
      let fullRows = 0;
      let fullCols = 0;

      // Check for full rows
      for (let row of tiles) {
         if (row.every((tile) => tile.tileName !== 'empty')) {
            fullRows++;
         }
      }

      // Check for full columns
      for (let col = 0; col < tiles[0].length; col++) {
         let isFull = true;
         for (let row = 0; row < tiles.length; row++) {
            if (tiles[row][col].tileName == 'empty') {
               isFull = false;
               break;
            }
         }
         if (isFull) {
            fullCols++;
         }
      }

      // Calculate points based on full rows and columns
      let points = (fullRows + fullCols) * this.points;

      // Update collectedPoints property
      return points;
   }
}

class TreeLineMission extends Mission {
   constructor() {
      super(
         'Tree line',
         'You get two points for each of the fields in the longest vertically uninterrupted continuous forest. If there are two or more tree lines with the same longest length, only one counts.',
         2,
         'Row of Trees'
      );
   }

   checkProgress(tiles) {
      console.log('Checking progress for Tree Line Mission');
      // Implement your specific logic for this mission
   }
}

class WateringCanalMission extends Mission {
   constructor() {
      super(
         'Watering canal',
         'For each column of your map that has the same number of farm and water fields, you will receive four points. You must have at least one field of both terrain types in your column to score points.',
         4,
         'Irrigation channel'
      );
   }

   checkProgress(tiles) {
      console.log('Checking progress for Watering Canal Mission');
      // Implement your specific logic for this mission
   }
}

class WealthyTownMission extends Mission {
   constructor() {
      super(
         'Wealthy town',
         'You get three points for each of your village fields adjacent to at least three different terrain types.',
         3,
         'A rich city'
      );
   }

   checkProgress(tiles) {
      console.log('Checking progress for Wealthy Town Mission');
      // Implement your specific logic for this mission
   }
}

class MagiciansValleyMission extends Mission {
   constructor() {
      super(
         "Magicians' valley",
         'You get three points for your water fields adjacent to your mountain fields.',
         3,
         'Valley of Mages'
      );
   }

   checkProgress(tiles) {
      console.log("Checking progress for Magicians' Valley Mission");
      // Implement your specific logic for this mission
   }
}

class EmptySiteMission extends Mission {
   constructor() {
      super(
         'Empty site',
         'You get two points for empty fields adjacent to your village fields.',
         2,
         'Vacant lot'
      );
   }

   checkProgress(tiles) {
      console.log('Checking progress for Empty Site Mission');
      // Implement your specific logic for this mission
   }
}

class TerracedHouseMission extends Mission {
   constructor() {
      super(
         'Terraced house',
         'For each field in the longest village fields that are horizontally uninterrupted and contiguous you will get two points.',
         2,
         'Terraced house'
      );
   }

   checkProgress(tiles) {
      console.log('Checking progress for Terraced House Mission');
      // Implement your specific logic for this mission
   }
}

class OddNumberedSilosMission extends Mission {
   constructor() {
      super(
         'Odd numbered silos',
         'For each of your odd-numbered full columns you get 10 points.',
         10,
         'Unmatched silos'
      );
   }

   checkProgress(tiles) {
      console.log('Checking progress for Odd Numbered Silos Mission');
      // Implement your specific logic for this mission
   }
}

class RichCountrysideMission extends Mission {
   constructor() {
      super(
         'Rich countryside',
         'For each row with at least five different terrain types, you will receive four points.',
         4,
         'Rich countryside'
      );
   }

   checkProgress(tiles) {
      console.log('Checking progress for Rich Countryside Mission');
      // Implement your specific logic for this mission
   }
}

const missions = {
   basic: [
      EdgeOfTheForestMission,
      SleepyValleyMission,
      WateringPotatoesMission,
      BorderlandsMission,
   ],
   extra: [
      TreeLineMission,
      WateringCanalMission,
      WealthyTownMission,
      MagiciansValleyMission,
      EmptySiteMission,
      TerracedHouseMission,
      OddNumberedSilosMission,
      RichCountrysideMission,
   ],
};

export { missions };
