/* global AFRAME, THREE */
function generateCube (sceneEl, block, pos) {
  var el = document.createElement('a-entity');
  sceneEl.append(el);
  el.setAttribute('geometry', {
    primitive: 'box',
    height: block.x,
    width: block.y,
    depth: block.z
  });
  el.object3D.position.set(pos.x, pos.y, pos.z);
}

// Reflects an object over a defined axis and generates a cube at the reflected location
AFRAME.registerComponent('reflect', {
  schema: {
    axis: {type: 'vec3', default: '0 4 0'}
  },
  init: function () {
    // Convert axis into a unit vector
    this.axis = new THREE.Vector3();
    this.axis.copy(this.data.axis);
    this.axis.multiplyScalar(1 / this.axis.length());
    // console.log('axis_unit=', this.axis);

    // calculate a-p where a is (0,0,0) and p is position
    // of object
    var amp = new THREE.Vector3();
    amp.copy(this.el.object3D.position);
    amp.multiplyScalar(-1);
    // console.log('a-p=', amp);

    // calculate scalar component of positional vector on axis
    var compOnAxis = amp.dot(this.axis);
    // console.log('p comp on axis = ', compOnAxis);
    // calculate vector component of positional vector on axis
    this.posCompAxis = new THREE.Vector3();
    this.posCompAxis.copy(this.axis);
    this.posCompAxis.multiplyScalar(-1 * compOnAxis);
    // console.log('pos comp on axis=', this.posCompAxis);

    // Calculate shortest distance from axis to position of object
    this.r = new THREE.Vector3();
    this.r.copy(this.el.object3D.position);
    this.r.addScaledVector(this.posCompAxis, -1);
    // console.log('r=', this.r);
    // console.log('||r||=', this.r.length());

    var p1 = new THREE.Vector3();
    p1.copy(this.posCompAxis);
    p1.addScaledVector(this.r, -1);
    // console.log("pos1=", p1);

    var sceneEl = document.querySelector('a-scene');
    var blockDim = new THREE.Vector3(1.0, 1.0, 1.0);
    generateCube(sceneEl, blockDim, p1);
  }
});
