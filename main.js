import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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

const pointLightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(100, 20);
scene.add(pointLightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  // generate random position coords
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

// fill scene with random positioned stars
Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load("space.jpeg");
scene.background = spaceTexture;

const moonTexture = new THREE.TextureLoader().load("moon.jpeg");
const normalTexture = new THREE.TextureLoader().load("normal.jpeg");
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

// to set position of geometry it is possible to use
// either assignment or setter
moon.position.z = 30;
moon.position.setX(-10);

scene.add(moon);

function animate() {
  requestAnimationFrame(animate);

  thorus.rotation.x += 0.01;
  thorus.rotation.y += 0.005;
  thorus.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate();
