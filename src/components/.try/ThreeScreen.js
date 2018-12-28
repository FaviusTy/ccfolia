import React, { useState, useCallback, useRef, useEffect } from 'react'
import Hammer from 'react-hammerjs'

const THREE = window.THREE = require('three')
require('three/examples/js/controls/OrbitControls.js')

const render = (canvas, w, h) => {
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
  var controls = new THREE.OrbitControls(camera);

  var geometry = new THREE.BoxGeometry(1, 1, 1);
  var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  var cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  camera.position.z = 5;
  controls.update()

  var renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(w, h);

  function animate() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    controls.update()
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  animate();
}

const ScreenTHREE = ({ w, h }) => {
  const ref = useRef()
  useEffect(() => {
    render(ref.current, w, h)
  }, [ref.current])
  return <div className="World">
    <canvas ref={ref}></canvas>
  </div>
}