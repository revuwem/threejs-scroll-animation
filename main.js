import "./style.css";

import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
  color: 0xff6376,
});
const thorus = new THREE.Mesh(geometry, material);

scene.add(thorus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xf5f5f5);

scene.add(pointLight, ambientLight);

function animate() {
  requestAnimationFrame(animate);

  thorus.rotation.x += 0.01;
  thorus.rotation.y += 0.005;
  thorus.rotation.z += 0.01;

  renderer.render(scene, camera);
}

animate();
