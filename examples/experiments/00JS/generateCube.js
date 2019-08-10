function generateCube (sceneEl, block, pos) {
  var el = document.createElement('a-entity');
  sceneEl.append(el);
  el.setAttribute('geometry', {
    primitive: 'box',
    height: block.x,
    width: block.y,
    depth: block.z
  });
  // el.setAttribute('translate', {
  // });
  el.setAttribute('rotate', {
  });
  // el.setAttribute('revolve', {});
  el.object3D.position.set(pos.x, pos.y, pos.z);
  console.log(block, pos);
}
