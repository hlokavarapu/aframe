/* global AFRAME, THREE */
AFRAME.registerComponent('door', {
  schema: {
    width: {type: 'number', default: 1},
    height: {type: 'number', default: 1},
    depth: {type: 'number', default: 1},
    color: {type: 'color', default: '#AAA'}
  },

  /**
   * Initial creation and setting of the mesh.
   */
  init: function () {
    var data = this.data;
    var el = this.el;

    this.timer = 0;

    // Create geometry.
    this.geometry = new THREE.BoxBufferGeometry(data.width, data.height, data.depth);

    // Create material.
    this.material = new THREE.MeshStandardMaterial({color: data.color});

    // Create mesh.
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    // Set mesh on entity.
    el.setObject3D('mesh', this.mesh);
  },

  tick: function (time, timeDelta) {
    var el = this.el;
    this.timer += timeDelta;

    if (this.timer > 1000) {
      console.log('second has passed');
      el.getObject3D('mesh').material.color = new THREE.Color(Math.random() * 0xffffff);
      this.timer = 0;
    }
  },

  /**
   * Update the mesh in response to property updates.
   */
  update: function (oldData) {
    var data = this.data;
    var el = this.el;

    // If `oldData` is empty, then this means we're in the initialization process.
    // No need to update.
    if (Object.keys(oldData).length === 0) { return; }

    // Geometry-related properties changed. Update the geometry.
    if (data.width !== oldData.width ||
        data.height !== oldData.height ||
        data.depth !== oldData.depth) {
      el.getObject3D('mesh').geometry = new THREE.BoxBufferGeometry(data.width, data.height,
          data.depth);
    }

    // Material-related properties changed. Update the material.
    if (data.color !== oldData.color) {
      el.getObject3D('mesh').material.color = new THREE.Color(data.color);
    }
  },

  remove: function () {
    this.el.removeObject3D('mesh');
  }
});
