/* global AFRAME, THREE */

AFRAME.registerComponent('translate', {
  schema: {
    axis: {type: 'vec3', default: '10 0 -10'},
    length: {type: 'number', default: '100'}
  },
  init: function () {
    this.p0 = new THREE.Vector3();
    this.p0.copy(this.el.object3D.position);
    // Convert axis into a unit vector

    this.axis = new THREE.Vector3();
    this.axis.copy(this.data.axis);
    this.speed = this.axis.length();
    this.axis.multiplyScalar(1 / this.axis.length());
  },
  tick: function (time, timeDelta) {
    var translationVec = new THREE.Vector3();
    translationVec.copy(this.el.object3D.position);
    translationVec.addScaledVector(this.p0, -1);
    var distanceTranslated = translationVec.length();

    // console.log("distance translated = ", distanceTranslated);
    // console.log(("requested travel distance = ", this.data.length));
    if (distanceTranslated < this.data.length) {
      var posUpdate = new THREE.Vector3();
      posUpdate.copy(this.axis);
      var t = (timeDelta * this.speed / 1000);
      posUpdate.multiplyScalar(t);
      posUpdate.add(this.el.object3D.position);
      // console.log("Pos update=", posUpdate);
      this.el.setAttribute('position', {
        x: posUpdate.x,
        y: posUpdate.y,
        z: posUpdate.z
      });
    }
  }
});
