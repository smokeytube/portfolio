import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';
// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper)

// Background

const bgTexture = new THREE.TextureLoader().load('assets/images/bg.jpg');
scene.background = bgTexture;

// Avatar

const zachsaxTexture = new THREE.TextureLoader().load('assets/images/zachsax.png');

const zachsax = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: zachsaxTexture }));

scene.add(zachsax);

zachsax.position.z = -5;
zachsax.position.x = 2;

// Planes

const htmlTexture = new THREE.TextureLoader().load('assets/images/html5.png');

const htmlplane = new THREE.Mesh(new THREE.PlaneGeometry( 5, 5, 5 ), 
                             new THREE.MeshBasicMaterial( { map: htmlTexture, side: THREE.DoubleSide } ));

scene.add( htmlplane );

htmlplane.position.z = -7;
htmlplane.position.x = -7;
htmlplane.position.y = 9;
htmlplane.rotation.y = 20;

const jsTexture = new THREE.TextureLoader().load('assets/images/js5.png');

const jsplane = new THREE.Mesh(new THREE.PlaneGeometry( 5, 5, 5 ), 
                             new THREE.MeshBasicMaterial( { map: jsTexture, side: THREE.DoubleSide } ));

scene.add( jsplane );

jsplane.position.z = 3;
jsplane.position.x = -10;
jsplane.position.y = 15;
jsplane.rotation.y = 1.6;


// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  zachsax.rotation.y += 0.01;
  zachsax.rotation.z += 0.01;

  camera.position.z = t * -0.001;
  camera.position.x = t * -0.0005;
  camera.position.y = t * -0.01;
  camera.rotation.y = t * -0.0015;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);
  //pass...

  renderer.render(scene, camera);
}

animate();
