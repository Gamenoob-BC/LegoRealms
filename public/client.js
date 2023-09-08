const socket = io();

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

// In your client.js or game.js file

// Create a scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a loader for your OBJ file
const loader = new THREE.OBJLoader();

// Load your animated OBJ file
let obj;
loader.load('misc/figurine.obj', (object) => {
  obj = object;

  // Add the loaded object to the scene
  scene.add(obj);

  // Set the initial position, rotation, and scale if needed
  obj.position.set(0, 0, 0);
  obj.rotation.set(0, 0, 0);
  obj.scale.set(1, 1, 1);

  // Create an animation mixer for the loaded object
  const mixer = new THREE.AnimationMixer(obj);

  // Add your animation data (assuming you have an animation clip)
  const animationIdle = THREE.AnimationClip.findByName(object.animations, 'idle');
  const actionIdle = mixer.clipAction(animationIdle);
  const animationWalk = THREE.AnimationClip.findByName(object.animations, 'walk');
  const actionWalk = mixer.clipAction(animationWalk);
  const animationJump = THREE.AnimationClip.findByName(object.animations, 'jump');
  const actionJump = mixer.clipAction(animationJump);
  const animationFall = THREE.AnimationClip.findByName(object.animations, 'fall');
  const actionFall = mixer.clipAction(animationIdle);
  const animationClimb = THREE.AnimationClip.findByName(object.animations, 'climb');
  const actionClimb = mixer.clipAction(animationIdle);
  const animationSwim = THREE.AnimationClip.findByName(object.animations, 'swim');
  const actionSwim = mixer.clipAction(animationIdle);

  // Render the scene
  const animate = () => {
    requestAnimationFrame(animate);
    mixer.update(1/30); // Adjust the time step as needed
    renderer.render(scene, camera);
  };

  animate();
});

// Set up camera position
camera.position.z = 5;
