import { useTestStore } from '@/stores/test';
import {
  BufferGeometry,
  SphereGeometry,
  Scene,
  PointsMaterial,
  Mesh,
  Points,
  DirectionalLight,
  PerspectiveCamera,
  TextureLoader,
  MeshStandardMaterial,
  WebGLRenderer,
  BufferAttribute,
  LoadingManager,
  NearestFilter,
  Texture
} from 'three';
import { isClient } from '@vueuse/shared';
import { tick, sizes } from './threeUtils';

// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import { GUI } from 'dat.gui'

// Debug
// const gui = new GUI()

const particlesCount = 300;
let galaxyGeometry: BufferGeometry | null = null;
let planetGeometry: SphereGeometry | null = null;
let starMaterial: PointsMaterial | null = null
let planetMaterial: MeshStandardMaterial | null = null
let starFieldPositions: Float32Array | null = null
let renderer: WebGLRenderer | null = null

//Materials
let planetColorMap: Texture
let planetDisplacementMap: Texture
let planetBumpMap: Texture
let planetNormalMap: Texture

let scene: Scene;
const manager = new LoadingManager()
const textureLoader = new TextureLoader(manager);



export function configureScene(element: HTMLElement) {
    const testStore = useTestStore()
    //Load Materials
    planetColorMap = textureLoader.load('/planets/mars/color.jpeg')
    planetDisplacementMap = textureLoader.load('/planets/mars/displacement.jpeg')
    planetBumpMap = textureLoader.load('/planets/mars/bump.jpeg')
    planetNormalMap = textureLoader.load('/planets/mars/normal.jpeg')
    
    if (scene) scene = null
    scene = new Scene()
  
    //Loading Manager
  manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
    console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
    
  };
  
  manager.onLoad = function ( ) {
    console.log('Loading complete!');
    render(element)
  };
  
  manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
    console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
    testStore.setLoading((itemsLoaded/itemsTotal) * 100)
  };
  
  manager.onError = function ( url ) {
    console.log( 'There was an error loading ' + url );
  };
}

function render(element: HTMLElement) {
  // Canvas
  console.log("MAIN_CALL")
  const canvas = element;

  planetColorMap.generateMipmaps = false
  planetColorMap.minFilter = NearestFilter
  planetColorMap.magFilter = NearestFilter

  // Geometries
  if (!planetGeometry) planetGeometry = new SphereGeometry(1, 60, 60);
  if (!galaxyGeometry) galaxyGeometry = new BufferGeometry();

  if (!starFieldPositions) {
    starFieldPositions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i++) {
      const x = (Math.random() - 0.5) * 5;
      const y = (Math.random() - 0.5) * 4;
      const z = (Math.random() - 0.5) * 4;
      starFieldPositions[i * 3] = x;
      starFieldPositions[i * 3 + 1] = y;
      starFieldPositions[i * 3 + 2] = z;
    }

    console.log("Creating points")
  }
    
  galaxyGeometry.setAttribute(
    'position',
    new BufferAttribute(starFieldPositions, 3)
  );

  // Materials

  if (!starMaterial) starMaterial = new PointsMaterial({
    size: 0.008,
    sizeAttenuation: true,
    depthWrite: false
  });

  if (!planetMaterial) planetMaterial = new MeshStandardMaterial({
    map: planetColorMap,
    bumpMap: planetBumpMap,
    bumpScale: 0.02,
    displacementMap: planetDisplacementMap,
    displacementScale: 0.01
  });

  // Mesh
  const planet = new Mesh(planetGeometry, planetMaterial);
  const starFieldMesh = new Points(galaxyGeometry, starMaterial);
  starFieldMesh.position.z = -1

  planet.castShadow = true;
  planet.receiveShadow = true;
  scene.add(planet, starFieldMesh);

  // Lights
  const sunLight = new DirectionalLight(0xffee66, 0.4);
  sunLight.position.set(-0.4, 0.8, 0.2)
  sunLight.castShadow = true;

  const sunLight2 = new DirectionalLight(0xffee44, 0.18);
  sunLight2.position.set(1, -1, 0.4)
  sunLight2.castShadow = true;

  const rimLight = new DirectionalLight(0xffffff, 1.5);
  rimLight.position.set(-0.4, 0.6, -0.5)
  rimLight.castShadow = true;


  scene.add(rimLight);
  scene.add(sunLight);
  scene.add(sunLight2);

  /**
   * Camera
   */
  // Base camera
  const camera = new PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    50
  );
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 2;
  scene.add(camera);

  // Controls
  // const controls = new OrbitControls(camera, canvas)
  // controls.enableDamping = true

  /**
   * Renderer
   */

  renderer = new WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
  });
  renderer.setSize(sizes.width, sizes.height);
  if (isClient) {
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }
  console.log("New Renderer")

  /**
   * Events & Animations
   */

    const cursor = {
      x: 0,
      y: 0
    }

   if (isClient) {
    window.addEventListener('resize', () => {
      // Update sizes
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      // Update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    });
     
     window.addEventListener('mousemove', (event) => {
       cursor.x = Math.cos((event.clientX/window.innerWidth) * Math.PI)
       cursor.y = Math.cos(event.clientY / window.innerHeight * Math.PI)
       planet.position.x = cursor.x * 0.01
       planet.rotation.x = -cursor.y * 0.05
     })

     renderer.render(scene, camera);
  }

  tick((elapsedTime: number) => {
    planet.rotation.y = 0.05 * elapsedTime;
    starFieldMesh.rotation.y = Math.sin(elapsedTime % 180) * 0.005;
    renderer.render(scene, camera);
  });
}
