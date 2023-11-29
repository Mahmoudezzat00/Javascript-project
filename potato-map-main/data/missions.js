const missions = {
   basic: [
      {
         title: 'Edge of the forest',
         description:
            'You get one point for each forest field adjacent to the edge of your map.',
         points: 1,
         image: 'The edge of the forest',
      },
      {
         title: 'Sleepy valley',
         description: 'For every row with three forest fields, you get four points.',
         points: 4,
         image: 'Sleepy Valley',
      },
      {
         title: 'Watering potatoes',
         description:
            'You get two points for each water field adjacent to your farm fields.',
         points: 2,
         image: 'Potato irrigation',
      },
      {
         title: 'Borderlands',
         description: 'For each full row or column, you get six points.',
         points: 6,
         image: 'Borderlands',
      },
   ],
   extra: [
      {
         title: 'Tree line',
         description:
            'You get two points for each of the fields in the longest vertically uninterrupted continuous forest. If there are two or more tree lines with the same longest length, only one counts.',
         points: 2,
         image: 'Row of Trees',
      },
      {
         title: 'Watering canal',
         description:
            'For each column of your map that has the same number of farm and water fields, you will receive four points. You must have at least one field of both terrain types in your column to score points.',
         points: 4,
         image: 'Irrigation channel',
      },
      {
         title: 'Wealthy town',
         description:
            'You get three points for each of your village fields adjacent to at least three different terrain types.',
         points: 3,
         image: 'A rich city',
      },
      {
         title: "Magicians' valley",
         description:
            'You get three points for your water fields adjacent to your mountain fields.',
         points: 3,
         image: 'Valley of Mages',
      },
      {
         title: 'Empty site',
         description:
            'You get two points for empty fields adjacent to your village fields.',
         points: 2,
         image: 'Vacant lot',
      },
      {
         title: 'Terraced house',
         description:
            'For each field in the longest village fields that are horizontally uninterrupted and contiguous you will get two points.',
         points: 2,
         image: 'Terraced house',
      },
      {
         title: 'Odd numbered silos',
         description: 'For each of your odd-numbered full columns you get 10 points.',
         points: 10,
         image: 'Unmatched silos',
      },
      {
         title: 'Rich countryside',
         description:
            'For each row with at least five different terrain types, you will receive four points.',
         points: 4,
         image: 'Rich countryside',
      },
   ],
};

const allMission = [...missions.basic, ...missions.extra];
