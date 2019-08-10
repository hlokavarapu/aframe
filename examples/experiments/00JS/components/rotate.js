/* global AFRAME, THREE */
AFRAME.registerComponent('rotate', {
  schema: {
    axis: {type: 'vec3', default: '0 0 -4'},
    theta: {type: 'number', default: '0.19634954084936207'}
  },
  init: function () {
    // Convert axis into a unit vector
    this.axis = new THREE.Vector3();
    this.axis.copy(this.data.axis);
    this.axis.multiplyScalar(1 / this.axis.length());
    // console.log('axis_unit=', this.axis);

    this.theta0 = 0;
  },
  tick: function (time, timeDelta) {
    var thetaDiff = (timeDelta * (1 / 1000) * this.data.theta);
    this.theta0 = this.theta0 + thetaDiff;
    // console.log('thetaDiff = ', thetaDiff);

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
    var posCompAxis = new THREE.Vector3();
    posCompAxis.copy(this.axis);
    posCompAxis.multiplyScalar(-1 * compOnAxis);
    // console.log('pos comp on axis=', this.posCompAxis);

    // Calculate shortest distance from axis to position of object
    var r = new THREE.Vector3();
    r.copy(this.el.object3D.position);
    r.addScaledVector(posCompAxis, -1);
    // console.log('r=', this.r);
    // console.log('||r||=', this.r.length());
    // Check that the original position of object is calculated; Do not leave uncommented
    // console.log("pos1=", (this.r.addScaledVector(this.posCompAxis, 1)));

    var w = new THREE.Vector3();
    w.copy(posCompAxis);
    w.cross(r);
    // console.log('w=', this.w);

    var x1 = Math.cos(this.theta0) / r.length();
    var x2 = Math.sin(this.theta0) / w.length();
    // console.log("x1, x2 = ", x1, x2);

    var p2 = new THREE.Vector3();
    p2.copy(r);
    p2.multiplyScalar(x1);
    p2.addScaledVector(w, x2);
    p2.multiplyScalar(r.length());
    p2.add(posCompAxis);
    // console.log(this.p2);

    this.el.setAttribute('position', {
      x: p2.x,
      y: p2.y,
      z: p2.z
    });
  }
});
