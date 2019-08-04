/* global THREE */
function generateCube (sceneEl, block, pos) {
  var el = document.createElement('a-entity');
  sceneEl.append(el);
  el.setAttribute('geometry', {
    primitive: 'box',
    height: block.x,
    width: block.y,
    depth: block.z
  });
  // el.setAttribute('revolve', {});
  el.object3D.position.set(pos.x, pos.y, pos.z);
  console.log(block, pos);
}

document.addEventListener('DOMContentLoaded', function () {
  console.log('Entered tree');
  var sceneEl = document.querySelector('a-scene');
  var nBlocks = 5;
  var blockDim = new THREE.Vector3(0.5, 0.5, 0.5);
  var gridExtent = new THREE.Vector3(5, 5, 5);
  var blockExtent = blockDim.clone();
  blockExtent.multiplyScalar(nBlocks);
  var delta = gridExtent.clone();
  delta.addScaledVector(blockExtent, -1);
  delta.divideScalar(nBlocks - 1);
  console.log(delta);
  // var pos0 = new THREE.Vector3(-n*(h + delta)/2, 0, -3);
  var pos0 = new THREE.Vector3(0, 0, 0);

  for (var i = 0; i < nBlocks; i++) {
    for (var j = 0; j < nBlocks; j++) {
      for (var k = 0; k < nBlocks; k++) {
        var pos = new THREE.Vector3(0 + blockDim.x * i + delta.x * i, 0 + blockDim.y * j + delta.y * j, 0 - blockDim.z * k - delta.z * k);
        pos.add(pos0);
        generateCube(sceneEl, blockDim, pos);
      }
    }
  }
});
