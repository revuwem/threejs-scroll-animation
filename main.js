import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Setup

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

const textureLoader = new THREE.TextureLoader();

// Torus

const torusGeometry = new THREE.TorusGeometry(10, 3, 16, 100);
const torusMaterial = new THREE.MeshStandardMaterial({
  color: 0xff6376,
});
const thorus = new THREE.Mesh(torusGeometry, torusMaterial);

scene.add(thorus);

// Light

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xf5f5f5);

scene.add(pointLight, ambientLight);

// Helpers

// const pointLightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(100, 20);
// scene.add(pointLightHelper, gridHelper);

// const controls = new OrbitControls(camera, renderer.domElement);

// Stars

const starGeometry = new THREE.SphereGeometry(0.25, 24, 24);
const starMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });

function addStar() {
  const star = new THREE.Mesh(starGeometry, starMaterial);
  // generate random position coords
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

// fill scene with random positioned stars
Array(200).fill().forEach(addStar);

// Background

const spaceTexture = textureLoader.load("space.jpeg");
scene.background = spaceTexture;

// Moon

const moonTexture = textureLoader.load("moon.jpeg");
const normalTexture = textureLoader.load("normal.jpeg");

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

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  moon.rotation.x += 0.01;
  moon.rotation.y += 0.005;
  moon.rotation.z += 0.01;

  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
  camera.position.z = t * -0.01;
}

document.body.onscroll = moveCamera;

function animate() {
  requestAnimationFrame(animate);

  thorus.rotation.x += 0.01;
  thorus.rotation.y += 0.005;
  thorus.rotation.z += 0.01;

  // controls.update();

  renderer.render(scene, camera);
}

animate();
