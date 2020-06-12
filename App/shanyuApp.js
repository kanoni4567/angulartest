const NUM_ROWS = 7;
const NUM_COLUMNS = 6;

var shanyuApp = angular.module('shanyuApp', []);

shanyuApp.service('GameService', function() {
  let units = new Array();


})

shanyuApp.controller('shanyuController', ['$scope', function($scope) {
  function makeInitialTiles(numOfRows, numOfColumns) {
    let initialTiles = new Array(numOfRows);
    for (let i = 0; i < initialTiles.length; i++) {
      initialTiles[i] = new Array(numOfColumns);
      initialTiles[i].fill({
        type: "I am a tile"
      })
    }
    return initialTiles;
  }

  function makeInitialUnits() {
    let units = [];
    for (let i = 0; i < 4; i++) {
      let unit = {};
      unit.position = {
        x: i,
        y: i
      }
      unit.icon = 'x'
      unit.alive = true;
      units.push(unit);
    }
    return units;
  }

  $scope.selectTile = function(y, x) {
    $scope.selectedTile = {x, y};
  }

  // $scope.isGridSelected = function(y, x) {
  //   return $scope.selectedTile.x === x && $scope.selectedTile.y === y;
  // }

  $scope.tiles = makeInitialTiles(NUM_ROWS, NUM_COLUMNS);

  $scope.units = makeInitialUnits();

  $scope.selectedTile = {
    x: -1,
    y: -1
  };


}])