// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.6, 3);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Lighting
const light = new THREE.HemisphereLight(0xffffff, 0x444444);
light.position.set(0, 2, 0);
scene.add(light);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(1, 3, 2);
scene.add(dirLight);

// Ground
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshStandardMaterial({ color: 0xe0e0e0 })
);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Loaders
const loader = new THREE.GLTFLoader();
let model, shirt;

loader.load('models/character.glb', (gltf) => {
  model = gltf.scene;
  scene.add(model);
  model.position.y = 0;
  
  loader.load('models/shirt1.glb', (gltf2) => {
    shirt = gltf2.scene;
    shirt.visible = false;
    model.add(shirt); // Parent shirt to character
  });
});

// GUI button logic
function wearShirt() {
  if (shirt) {
    shirt.visible = !shirt.visible;
  }
}

// Render loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Responsive
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
