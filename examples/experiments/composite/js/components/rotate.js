/* global AFRAME, THREE */
// function generateCube (sceneEl, block, pos) {
//   var el = document.createElement('a-entity');
//   sceneEl.append(el);
//   el.setAttribute('geometry', {
//     primitive: 'box',
//     height: block.x,
//     width: block.y,
//     depth: block.z
//   });
//   // el.setAttribute('revolve', {});
//   el.object3D.position.set(pos.x, pos.y, pos.z);
//   console.log(block, pos);
// }

AFRAME.registerComponent('rotate', {
  schema: {
    axis: {type: 'vec3', default: '0 4 -4'},
    theta: {type: 'number', default: '0.7853981633974483'}
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
    // Check that the original position of object is calculated; Do not leave uncommented
    // console.log("pos1=", (this.r.addScaledVector(this.posCompAxis, 1)));

    this.w = new THREE.Vector3();
    this.w.copy(this.posCompAxis);
    this.w.cross(this.r);
    // console.log('w=', this.w);

    this.theta0 = 0;
  },
  tick: function (time, timeDelta) {
    // console.log(time);
    // if (time < ((1 / this.data.theta) * 1000 * 2 * Math.PI)) {
      // var currPos = this.el.object3D.position;
    var thetaDiff = (timeDelta * (1 / 1000) * this.data.theta);
    this.theta0 = this.theta0 + thetaDiff;
      // console.log('thetaDiff = ', thetaDiff);

    var x1 = Math.cos(this.theta0) / this.r.length();
    var x2 = Math.sin(this.theta0) / this.w.length();
      // console.log("x1, x2 = ", x1, x2);

    this.p2 = new THREE.Vector3();
    this.p2.copy(this.r);
    this.p2.multiplyScalar(x1);
    this.p2.addScaledVector(this.w, x2);
    this.p2.multiplyScalar(this.r.length());
    this.p2.add(this.posCompAxis);
      // console.log(this.p2);

      // var sceneEl = document.querySelector('a-scene');
      // var blockDim = new THREE.Vector3(1.0, 1.0, 1.0);
      // generateCube(sceneEl, blockDim, this.p2);

    this.el.setAttribute('position', {
      x: this.p2.x,
      y: this.p2.y,
      z: this.p2.z
    });

      // console.log(this.el.object3D.position);
      // console.log('======iter complete=======');
    // }
  }
});
