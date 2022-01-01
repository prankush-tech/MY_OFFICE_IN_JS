import './style.css'
import * as dat from 'dat.gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

/**
 * Base
 */
// Debug
const gui = new dat.GUI({
    width: 200
})


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color("rgb(5, 0, 23)");
/**
 * Loaders
 */
// Texture loader
const textureLoader = new THREE.TextureLoader()

// Draco loader
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('draco/')

// GLTF loader
const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)



const bakedTexture= textureLoader.load('text_baked.jpg')
/**
 * Object
 */
 bakedTexture.flipY =false
 bakedTexture.encoding =THREE.sRGBEncoding

//materials
const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture})




//
gltfLoader.load(
    'office_model.glb',
    (gltf)=>
    {
        gltf.scene.traverse((child)=>
        {
            child.material= bakedMaterial
            
        })
        gltf.scene.position.y-=1;
        scene.add(gltf.scene)
       
    }
)


const texturecolorloader = new THREE.TextureLoader();

const doorcolortexture = texturecolorloader.load('/textures/door/color.jpg')
const doorslphatexture = texturecolorloader.load('/textures/door/alpha.jpg')
const doorambientOcclusiontexture = texturecolorloader.load('/textures/door/ambientOcclusion.jpg')
const doorheighttexture = texturecolorloader.load('/textures/door/height.jpg')
const doormetalnesstexture = texturecolorloader.load('/textures/door/metalness.jpg')
const doornormaltexture = texturecolorloader.load('/textures/door/normal.jpg')
const doorroughnesstexture = texturecolorloader.load('/textures/door/roughness.jpg')
const matcaptexture = texturecolorloader.load('/textures/matcaps/8.png')
const gradienttexture = texturecolorloader.load('/textures/gradients/3.jpg')


const material = new THREE.MeshStandardMaterial()

// material.metalness = 0
material.side= THREE.DoubleSide
// material.shininess=100
// material.roughness= 1
material.map = doorcolortexture;
// material.aoMap=doorambientOcclusiontexture;
// material.aoMapIntensity = 1.14;
// material.displacementMap = doorheighttexture;
// material.displacementScale=0.05
// material.normalMap=doornormaltexture;
// material.roughnessMap=doorroughnesstexture;
// material.metalnessMap=doormetalnesstexture;





const plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(1,1,3),material)
plane.geometry.setAttribute(
    'uv2',
    new THREE.BufferAttribute(plane.geometry.attributes.uv.array,2)
)

// const ambientlight= new THREE.AmbientLight(0xffffff,0.7)
// scene.add(ambientlight)
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.4)
gui.add(ambientLight, 'intensity').min(0.3).max(0.8).step(0.001)
scene.add(ambientLight)

const pointlight = new THREE.PointLight('#fffff',0.01)
scene.add(pointlight)
pointlight.position.y=1


const pointlight2 = new THREE.PointLight('#ffff00',0.011)
scene.add(pointlight2)
pointlight2.position.z=-5



plane.scale.x=5
plane.scale.y=2.8

plane.position.y=3.46;
plane.position.z=1.12;
plane.position.x=-4.55;
plane.rotation.y=(Math.PI)/2;

scene.add(plane)

















/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(36, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 13
camera.position.y = 11
camera.position.z = 13

scene.add(camera)



// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.dampingFactor = 0.05;
controls.target.set(0,3,0)
controls.minPolarAngle = 0; // radians
controls.maxPolarAngle = (Math.PI)/2;
controls.minAzimuthAngle = 0 // radians
controls.maxAzimuthAngle = (Math.PI)/2; // radians


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha : true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.outputEncoding =THREE.sRGBEncoding


/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
