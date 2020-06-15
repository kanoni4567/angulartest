const NUM_ROWS = 7;
const NUM_COLUMNS = 6;

function generateQuickGuid() {
  return Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
}

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
      let unit = makeRandomUnit(i, 0);
      units.push(unit);
    }
    for (let j = 0; j < 4; j++) {
      let unit = makeRandomUnit(5 - j, 6);
      units.push(unit);
    }
    return units;
  }

  function makeRandomUnit(x, y) {
    let unit = {};
    let types = ['rock', 'paper', 'scissor'];
    unit.position = {
      x,
      y
    }
    unit.movement = getRndInteger(2, 3);
    unit.range = getRndInteger(1, 2);
    unit.id = generateQuickGuid();
    unit.type = types[getRndInteger(0, 2)];
    unit.alive = true;
    return unit;
  }

  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

  function getUnitById(id) {
    return $scope.units.filter(unit => unit.id === id)[0];
  }

  $scope.selectTile = function(y, x) {
    for (let i = 0; i < $scope.units.length; i++) {
      const unit = $scope.units[i];
      if (unit.position.x === x && unit.position.y === y) {
        $scope.selectedUnit = unit.id;
        $scope.selectedTile = {x, y};
      }
    }
  }

  $scope.isInMoveRange = function(x, y) {
    let unit = getUnitById($scope.selectedUnit);
    if (unit && Math.abs(x - unit.position.x) + Math.abs(y - unit.position.y) <= unit.movement){
      return true;
    } else {
      return false;
    }
  }

  $scope.isInAttackRange = function(x, y) {
    let unit = getUnitById($scope.selectedUnit);
    if (unit && Math.abs(x - unit.position.x) + Math.abs(y - unit.position.y) <= unit.movement + unit.range){
      return true;
    } else {
      return false;
    }
  }

  $scope.handleClick = function(e) {
    if (e.which === 3) {
      clearSelection()
    }
  }

  function clearSelection() {
    $scope.selectedTile = {
      x: -1,
      y: -1
    };
    $scope.selectedUnit = null;
  }

  // $scope.isGridSelected = function(y, x) {
  //   return $scope.selectedTile.x === x && $scope.selectedTile.y === y;
  // }

  $scope.tiles = makeInitialTiles(NUM_ROWS, NUM_COLUMNS);

  $scope.units = makeInitialUnits();

  clearSelection();


}])