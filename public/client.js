const socket = io();
const totalFrames=180;
const mixer = THREE.AnimationMixer();
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
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("div.container canvas#game"),
});
renderer.setSize(window.innerWidth, window.innerHeight);

// Create a loader for your OBJ file
const mtlLoader = new MTLLoader()
const objLoader = new THREE.OBJLoader();
let terrainObjects=[];
mtlLoader.load("misc/2x2_block.mtl", (unitMaterial)=> {
  unitMaterial.preload();
  objLoader.setMaterial(unitMaterial);
  objLoader.load("misc/2x2_block.obj", (unit) => {

    // Define the number of terrain units you want to generate
    const numTerrainUnits = 10; // Adjust as needed
  
    // Define the range for random adjustments
    const minOffsetX = -5;
    const maxOffsetX = 5;
    const minOffsetY = -1;
    const maxOffsetY = 1;
    const minOffsetZ = -5;
    const maxOffsetZ = 5;
  
    // Clone and position the objUnit to create an infinite terrain
    for (let i = 0; i < numTerrainUnits; i++) {
      const terrain = objUnit.clone();
      
      // Generate random offsets for X, Y, and Z positions
      const randomOffsetX = Math.random() * (maxOffsetX - minOffsetX) + minOffsetX;
      const randomOffsetY = Math.random() * (maxOffsetY - minOffsetY) + minOffsetY;
      const randomOffsetZ = Math.random() * (maxOffsetZ - minOffsetZ) + minOffsetZ;
      
      terrain.position.set(randomOffsetX, randomOffsetY, randomOffsetZ);
      scene.add(terrain);
      terrainObjects.push(terrain);
    }
  });  
});

// Load your animated OBJ file
let obj;
let plr = new THREE.Group();
const parentGroup = new THREE.Group();
scene.add(parentGroup);
// Loop through your frames (adjust the frame count as needed)
for (let frameNumber = 1; frameNumber <= totalFrames; frameNumber++) {
  // Load the OBJ and MTL files for the current frame
  const objLoader = new THREE.OBJLoader();
  const mtlLoader = new THREE.MTLLoader();

  // Load the MTL file (assuming it's named consistently with each frame)
  mtlLoader.load(`misc/Figurine/Figurine${frameNumber}.mtl`, (materials) => {
    materials.preload();

    // Set up the OBJ loader with the loaded materials
    objLoader.setMaterials(materials);

    // Load the OBJ file for the current frame
    objLoader.load(`misc/Figurine/Figurine${frameNumber}.obj`, (object) => {
      // You can apply any transformations or adjustments to the object here
      // Example: object.scale.set(0.1, 0.1, 0.1);

      // Add the loaded object to the parent group
      parentGroup.add(object);

      // Position each frame accordingly
      object.position.set(frameNumber * frameSpacing, 0, 0); // Adjust spacing as needed
    });
  });
}


const animate = () => {
  requestAnimationFrame(animate);
  mixer.update(1/24); // Adjust the time step as needed
  renderer.render(scene, camera);
};

animate();

