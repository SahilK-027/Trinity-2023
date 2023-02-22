import './styles/style1.css'
import './styles/style2.css'
import './styles/style3.css'
import './styles/style4.css'
import './styles/style5.css'
import './styles/style6.css'
import './styles/style7.css'
import './styles/style8.css'

import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

console.log("Welcome to TRINITY 🚀");

/*
=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=
        Audio context
=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*= 
*/

const ctx = new (window.AudioContext)();

/*
=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=
        Plane Animation Path
=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*= 
*/

const mobile = window.matchMedia("(max-width: 985px)").matches;
const flightPath1 = {
    curviness: 1.25,
    autoRotate: true,
    values: [
        { x: 100, y: -20 },
        { x: 300, y: 10 },
        { x: 500, y: 100 },
        { x: 750, y: -100 },
        { x: 350, y: -50 },
        { x: 600, y: 100 },
        { x: 800, y: 0 },
        { x: 900, y: -300 },
        { x: 800, y: -450 },
        { x: 300, y: -500 },
        { x: 60, y: -300 },
        { x: 40, y: -200 },
        { x: 100, y: -20 },
        { x: 700, y: -40 },
        { x: window.innerWidth + 300, y: -500 },
    ]
}
const flightPath2 = {
    curviness: 1.5,
    autoRotate: true,
    values: [
        { x: 100, y: 10 },
        { x: 150, y: 40 },
        { x: 200, y: 100 },
        { x: 250, y: 400 },
        { x: 150, y: 450 },
        { x: 60, y: 450 },
        { x: 10, y: 380 },
        { x: 8, y: 200 },
        { x: 100, y: 30 },
        { x: window.innerWidth + 300, y: 10},
    ]
}
/*
=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=
        Loading Manager
=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*= 
*/
const LoadingPage = document.getElementById('loader')
const MainPage = document.querySelector('.main-page')
const progressBar = document.querySelector('.loading-progress')
const percentage = document.querySelector('.loading-percentage')

const musicBarsDiv = document.querySelector('.music-bars')
const musicBars = document.querySelectorAll('.stroke');


if (mobile) {
    musicBarsDiv.style.display = 'none';
}

let SoundPlaying = false;
musicBarsDiv.addEventListener('click', () => {
     ctx.resume();
    if (!SoundPlaying) {
        for (let i = 0; i < 5; i++) {
            musicBars[i].style.animationPlayState = 'running'
        }
        helicopterSound.play();
        background.play();
        SoundPlaying = true;
    }
    else {
        for (let i = 0; i < 5; i++) {
            musicBars[i].style.animationPlayState = 'paused';
        }
        helicopterSound.pause();
        background.pause();
        SoundPlaying = false;
    }
})


const loadingManager = new THREE.LoadingManager(
    // Loaded
    () => {
        // Wait a little
        window.setTimeout(() => {
            // Update loadingBarElement
            LoadingPage.style.display = 'none'
            MainPage.style.display = 'block'

            // Once loading done start plane animation
            const tween = new TimelineLite();
            if (!mobile) {
                tween.add(
                    TweenLite.to('.rocket', 8, {
                        bezier: flightPath1,
                        ease: Power1.easeInOut
                    })
                )
            }
            const PopUpContainer = document.querySelector('.pop-up-container');
            const closePopUp = document.querySelector('.close-popup-btn');

            if (mobile) {
                setTimeout(
                    () => {
                        PopUpContainer.style.display = 'flex';
                    },
                    1500
                )
            }
            
            closePopUp.addEventListener('click', () => {
                PopUpContainer.style.display = 'none';
                tween.add(
                    TweenLite.to('.rocket', 8, {
                        bezier: flightPath2,
                        ease: Power1.easeInOut
                    })
                )
            })
        }, 500)
    },

    // Progress
    (itemUrl, itemsLoaded, itemsTotal) => {
        // Calculate the progress and update the loadingBarElement
        const progressRatio = (itemsLoaded / itemsTotal) * 250;
        progressBar.style.width = `${progressRatio}px`
        percentage.innerHTML = Math.round(progressRatio / 2.5) + ' %';
    }
)

/*
=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=
        Asset Loader
=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*= 
*/
const textureLoader = new THREE.TextureLoader(loadingManager);
textureLoader.load('/assets/images/abhishek.png')
textureLoader.load('/assets/images/computer-model.png')
textureLoader.load('/assets/images/design-model.png')
textureLoader.load('/assets/images/Dipali.png')
textureLoader.load('/assets/images/git-model.png')
textureLoader.load('/assets/images/js-model.png')
textureLoader.load('/assets/images/rocket1.png')
textureLoader.load('/assets/images/sahil.png')
textureLoader.load('/assets/images/web-model.png')
textureLoader.load('/assets/logos/acm-rscoe-logo.png')
textureLoader.load('/assets/logos/nav-bar-logo.png')
textureLoader.load('/assets/logos/pink-trinity-logo.png')
/*
=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=
        Cursor
=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*= 
*/
const cursor = {}
cursor.x = 0
cursor.y = 0

window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = event.clientY / sizes.height - 0.5
})

/*
=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=
        Canvas
=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*= 
*/
const canvas = document.querySelector('canvas.webgl')
const canvas2 = document.querySelector('.webgl-2')
const canvas3 = document.querySelector('.webgl-3')

/*
=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=
        Scene
=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*= 
*/
const scene = new THREE.Scene()
const scene2 = new THREE.Scene()
const scene3 = new THREE.Scene()

/*
=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=
        Light
=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*= 
*/

const ambientLight = new THREE.AmbientLight()
ambientLight.color = new THREE.Color(0xffffff)
ambientLight.intensity = 0.5
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3)
scene.add(directionalLight)

const spotLight = new THREE.SpotLight(0xfff, 0.5, 10000, 0.25, 100)
spotLight.position.set(0.6, 0.4, 1.9)
spotLight.intensity = 0.2
scene.add(spotLight)

const spotLight2 = new THREE.SpotLight(0xfff, 0.5, 10000, 0.25, 100)
spotLight2.position.set(0, 1, 0.8)
spotLight2.intensity = 0.8
scene.add(spotLight2)



/*
=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=
        MODELS
=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*= 
*/
// Texture
const dracoLoader = new DRACOLoader(loadingManager);
dracoLoader.setDecoderPath('/draco/')

const gltfLoader = new GLTFLoader(loadingManager);
gltfLoader.setDRACOLoader(dracoLoader)

let mixer1 = null
if (!mobile) {
    gltfLoader.load(
        '/models/trinity-anim.glb',
        (gltf) => {
            gltf.scene.scale.set(0.0015, 0.0015, 0.0015)
            gltf.scene.rotation.x = Math.PI / 2;

            mixer1 = new THREE.AnimationMixer(gltf.scene)
            const action = mixer1.clipAction(gltf.animations[0])
            action.play();

            scene2.add(gltf.scene)
        }
    )
}


let mixer = null

let gun1 = null
let gun2 = null
let gun3 = null
let gun4 = null
let bullet1 = null
let bullet2 = null
gltfLoader.load(
    '/models/Bot.glb',
    (gltf) => {
        if (!mobile) {
            gltf.scene.scale.set(0.5, 0.55, 0.5);
            gltf.scene.position.x = 1.65;
            gltf.scene.position.y = -0.1;
            gltf.scene.rotation.y = -0.8;
            gltf.scene.rotation.x = 0.3;
        }
        else {
            gltf.scene.scale.set(0.2, 0.23, 0.2);
            gltf.scene.position.x = 0.5;
            gltf.scene.position.y = 0.8;
            gltf.scene.rotation.x = 0.3;
        }
        mixer = new THREE.AnimationMixer(gltf.scene)
        const floating = mixer.clipAction(gltf.animations[0]);
        const handAnim1 = mixer.clipAction(gltf.animations[11]);
        const handAnim2 = mixer.clipAction(gltf.animations[15]);
        const blades1 = mixer.clipAction(gltf.animations[14]);
        const blades2 = mixer.clipAction(gltf.animations[18]);
        gun1 = mixer.clipAction(gltf.animations[4]);
        gun2 = mixer.clipAction(gltf.animations[6]);
        gun3 = mixer.clipAction(gltf.animations[8]);
        gun4 = mixer.clipAction(gltf.animations[10]);
        bullet1 = mixer.clipAction(gltf.animations[5]);
        bullet2 = mixer.clipAction(gltf.animations[9]);
        floating.play();
        handAnim1.play();
        handAnim2.play();
        blades1.play();
        blades2.play();
        scene.add(gltf.scene)
    }
)

if (!mobile) {
    gltfLoader.load(
        '/models/pad9.glb',
        (gltf) => {
            gltf.scene.scale.set(0.4, 0.4, 0.4);
            gltf.scene.rotation.x = 0.6
            gltf.scene.position.x = 1.5
            gltf.scene.position.y = -0.3
            if (!mobile) {
                scene.add(gltf.scene)
            }
        }
    )
}


/*
=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=
        Keyboard Events
=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*= 
*/

window.addEventListener('keydown', ({ key }) => {
    // We want toperform movement logic for each key
    switch (key) {
        case 'Shift':
            gun1.setLoop(THREE.LoopOnce);
            gun1.play();
            gun2.setLoop(THREE.LoopOnce);
            gun2.play();
            gun3.setLoop(THREE.LoopOnce);
            gun3.play();
            gun4.setLoop(THREE.LoopOnce);
            gun4.play();

            bullet1.setLoop(THREE.LoopOnce);
            bullet1.play();
            bullet2.setLoop(THREE.LoopOnce);
            bullet2.play();

            gun1.reset();
            gun2.reset();
            gun3.reset();
            gun4.reset();
            bullet1.reset();
            bullet2.reset();
            lazerSound.play();
            break;
    }
})


/*
=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=
        Objects for canvas 2
=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*= 
*/
const objectsDistance = 4

const mesh = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.4, 1),
    new THREE.MeshBasicMaterial({ color: '#7444ff', wireframe: true })
)
mesh.scale.set(0.3, 0.3, 0.3)
if (!mobile) {
    scene2.add(mesh)
}


/*
=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=
        Objects for canvas 3
=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*= 
*/const sphereTexture = textureLoader.load('/texture/matcaps/34.png')

const geo = new THREE.SphereGeometry(0.15, 32, 16);
const mat = new THREE.MeshMatcapMaterial({ matcap: sphereTexture })

const object = new THREE.Mesh(
    geo,
    mat
)
const object2 = new THREE.Mesh(
    geo,
    mat
)
const object3 = new THREE.Mesh(
    geo,
    mat
)
object.position.x = -0.3;
object3.position.x = 0.3;
scene3.add(object, object2, object3);

/*
=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=
        Font loader
=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*= 
*/
const fontloader = new FontLoader(loadingManager);
if (!mobile) {
    fontloader.load(
        '/fonts/helvetiker_regular.typeface.json',
        (font) => {
            const textGeometry = new TextGeometry(
                'TRINITY',
                {
                    font: font,
                    size: 0.5,
                    height: 0.2,
                    curveSegments: 4,
                    bevelEnabled: true,
                    bevelThickness: 0.03,
                    bevelSize: 0.02,
                    bevelOffset: 0,
                    bevelSegments: 4
                }
            )
            textGeometry.center();
            /**
             * Texture for matcap 
             */
            const texture = textureLoader.load('/texture/matcaps/21.jpg')
            const textMaterial = new THREE.MeshMatcapMaterial({ matcap: texture })

            const text = new THREE.Mesh(textGeometry, textMaterial)
            text.scale.set(1.08, 1.08, 1.08)
            scene3.add(text)
        }
    );
}


/*
=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=
       Particles
=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*= 
*/
const particlesCount = 900
const positions = new Float32Array(particlesCount * 3)

for (let i = 0; i < particlesCount; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * 10
    positions[i * 3 + 1] = objectsDistance * 0.5 - (Math.random()) * objectsDistance * 8
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10
}

const particlesGeometry = new THREE.BufferGeometry()
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))


// Material
let particlesize  = 0.05
if(mobile){
    particlesize = 0.07
}
let img_num = Math.round(Math.random() * 4)
const pointTexture = textureLoader.load('/texture/particle-texture/' + `${img_num}` + '.png')
const particlesMaterial = new THREE.PointsMaterial({
    // color: "#5d2ec2",
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    map: pointTexture,
    size: particlesize
})

// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)

/*
=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=
        Resizing
=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*= 
*/
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
const sizes2 = {
    width: 450,
    height: 600
}
const sizes3 = {
    width: 450,
    height: 600
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    sizes2.width = 450
    sizes2.height = 600
    sizes3.width = 450
    sizes3.height = 600

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    camera2.aspect = sizes2.width / sizes2.height
    camera2.updateProjectionMatrix()
    camera3.aspect = sizes3.width / sizes3.height
    camera3.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer2.setSize(sizes2.width, sizes2.height)
    renderer2.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer3.setSize(sizes3.width, sizes3.height)
    renderer3.setPixelRatio(Math.min(window.devicePixelRatio, 2))

})


/*
=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=
        Cameras
=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*= 
*/

/**
 * Main camera
 */
// Group
const cameraGroup = new THREE.Group()
scene.add(cameraGroup)
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 6
cameraGroup.add(camera)

// Small camera 1
const camera2 = new THREE.PerspectiveCamera(75, sizes2.width / sizes2.height, 0.1, 100)
camera2.position.x = 0
camera2.position.y = 0.02
camera2.position.z = 0.3
scene2.add(camera2)

// Small camera 2
const camera3 = new THREE.PerspectiveCamera(75, sizes3.width / sizes3.height, 0.1, 100)
camera3.position.x = 0
camera3.position.y = -0.5
camera3.position.z = 2.4
scene3.add(camera3)

/*
=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=
        Renderes
=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*= 
*/

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
const renderer2 = new THREE.WebGLRenderer({
    canvas: canvas2,
    alpha: true
})
const renderer3 = new THREE.WebGLRenderer({
    canvas: canvas3,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

renderer2.setSize(sizes2.width, sizes2.height)
renderer2.setPixelRatio(Math.min(window.devicePixelRatio, 2))

renderer3.setSize(sizes3.width, sizes3.height)
renderer3.setPixelRatio(Math.min(window.devicePixelRatio, 2))


/*
=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=
        Audio
=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*= 
*/
// instantiate a listener
const audioListener = new THREE.AudioListener();
camera.add(audioListener);

// instantiate audio object
const hoverSound = new THREE.Audio(audioListener);
const clickSound = new THREE.Audio(audioListener);
const lazerSound = new THREE.Audio(audioListener);
const helicopterSound = new THREE.Audio(audioListener);
const background = new THREE.Audio(audioListener);
scene.add(hoverSound);
scene.add(clickSound);
scene.add(lazerSound);
scene.add(helicopterSound);
scene.add(background);

// instantiate a loader
const loader = new THREE.AudioLoader(loadingManager);
loader.load(
    // resource URL
    '/audio/hover.mp3',
    // onLoad callback
    function (audioBuffer) {
        // set the audio object buffer to the loaded object
        hoverSound.setBuffer(audioBuffer);
        hoverSound.setVolume(0.5);
    }
);
loader.load(
    // resource URL
    '/audio/rclick.mp3',
    // onLoad callback
    function (audioBuffer) {
        // set the audio object buffer to the loaded object
        clickSound.setBuffer(audioBuffer);
        clickSound.setVolume(1);
    }
);
loader.load(
    // resource URL
    '/audio/lazer.mp3',
    // onLoad callback
    function (audioBuffer) {
        // set the audio object buffer to the loaded object
        lazerSound.setBuffer(audioBuffer);
        lazerSound.setVolume(1);
    }
);
loader.load(
    // resource URL
    '/audio/helicopter.mp3',
    // onLoad callback
    function (audioBuffer) {
        // set the audio object buffer to the loaded object
        helicopterSound.setBuffer(audioBuffer);
        helicopterSound.setLoop(true);
    }
);
loader.load(
    // resource URL
    '/audio/background.mp3',
    // onLoad callback
    function (audioBuffer) {
        // set the audio object buffer to the loaded object
        background.setBuffer(audioBuffer);
        background.setLoop(true);
    }
);


let obj1 = document.getElementById('click-1');
let obj2 = document.getElementById('click-2');
let obj3 = document.getElementById('click-3');
let obj4 = document.getElementById('click-4');
let obj5 = document.getElementById('click-5');
let obj6 = document.getElementById('click-6');
let obj7 = document.getElementById('click-7');
let obj8 = document.getElementById('click-8');
let obj9 = document.getElementById('click-9');
let obj10 = document.getElementById('click-10');
let obj11 = document.getElementById('click-11');
let obj12 = document.getElementById('click-12');
let obj13 = document.getElementById('click-13');
let obj14 = document.getElementById('click-14');
let obj15 = document.getElementById('click-15');
let obj16 = document.getElementById('click-16');
let obj17 = document.getElementById('click-17');
let obj18 = document.getElementById('plus_btn');
let obj19 = document.getElementById('minus_btn');
let obj20 = document.getElementById('plus_btn2');
let obj21 = document.getElementById('minus_btn2');
let obj22 = document.getElementById('plus_btn3');
let obj23 = document.getElementById('minus_btn3');
let obj24 = document.getElementById('plus_btn4');
let obj25 = document.getElementById('minus_btn4');
let obj26 = document.getElementById('plus_btn5');
let obj27 = document.getElementById('minus_btn5');
let obj28 = document.getElementById('click-28');
let obj29 = document.getElementById('click-29');
let obj30 = document.getElementById('click-30');
let obj31 = document.getElementById('click-31');
let obj32 = document.getElementById('click-32');
let obj33 = document.getElementById('click-33');
let obj35 = document.getElementById('click-35');
let obj36 = document.getElementById('click-36');
let obj37 = document.getElementById('click-pop-up-close')
let obj38 = document.getElementById('click-38')

if (!mobile) {
    obj1.addEventListener('mouseenter', () => {  ctx.resume(); hoverSound.play() })
    obj2.addEventListener('mouseenter', () => {  ctx.resume(); hoverSound.play() })
    obj3.addEventListener('mouseenter', () => { ctx.resume(); hoverSound.play() })
    // obj4.addEventListener('mouseenter', () => { hoverSound.play() })
    // obj5.addEventListener('mouseenter', () => { hoverSound.play() })
    // obj6.addEventListener('mouseenter', () => { hoverSound.play() })
    obj7.addEventListener('mouseenter', () => {  ctx.resume(); hoverSound.play() })
    // obj8.addEventListener('mouseenter', () => { hoverSound.play() })
    // obj9.addEventListener('mouseenter', () => { hoverSound.play() })
    obj10.addEventListener('mouseenter', () => {  ctx.resume(); hoverSound.play() })
    // obj11.addEventListener('mouseenter', () => { hoverSound.play() })
    // obj12.addEventListener('mouseenter', () => { hoverSound.play() })
    // obj13.addEventListener('mouseenter', () => { hoverSound.play() })
    obj14.addEventListener('mouseenter', () => {  ctx.resume(); hoverSound.play() })
    // obj15.addEventListener('mouseenter', () => { hoverSound.play() })
    // obj16.addEventListener('mouseenter', () => { hoverSound.play() })
    // obj17.addEventListener('mouseenter', () => { hoverSound.play() })
    // obj28.addEventListener('mouseenter', () => { hoverSound.play() })
    // obj29.addEventListener('mouseenter', () => { hoverSound.play() })
    // obj30.addEventListener('mouseenter', () => { hoverSound.play() })
    // obj31.addEventListener('mouseenter', () => { hoverSound.play() })
    // obj32.addEventListener('mouseenter', () => { hoverSound.play() })
    // obj33.addEventListener('mouseenter', () => { hoverSound.play() })
    // obj34.addEventListener('mouseenter', () => { hoverSound.play() })
    obj35.addEventListener('mouseenter', () => {  ctx.resume(); hoverSound.play() })
    obj36.addEventListener('mouseenter', () => {  ctx.resume(); hoverSound.play() })
}
obj1.addEventListener('click', () => {  ctx.resume(); clickSound.play() })
obj2.addEventListener('click', () => {  ctx.resume(); clickSound.play() })
obj3.addEventListener('click', () => {  ctx.resume(); clickSound.play() })
obj4.addEventListener('click', () => {  ctx.resume(); clickSound.play() })
obj5.addEventListener('click', () => {  ctx.resume(); clickSound.play() })
obj6.addEventListener('click', () => {  ctx.resume(); clickSound.play() })
obj7.addEventListener('click', () => {  ctx.resume(); clickSound.play() })
obj8.addEventListener('click', () => {  ctx.resume(); clickSound.play() })
obj9.addEventListener('click', () => {  ctx.resume(); clickSound.play() })
obj10.addEventListener('click', () => {  ctx.resume(); clickSound.play() })
obj11.addEventListener('click', () => {  ctx.resume(); clickSound.play() })
obj12.addEventListener('click', () => {  ctx.resume(); clickSound.play() })
obj13.addEventListener('click', () => {  ctx.resume(); clickSound.play() })
obj14.addEventListener('click', () => {  ctx.resume(); clickSound.play() })
obj15.addEventListener('click', () => {  ctx.resume(); clickSound.play() })
obj16.addEventListener('click', () => {  ctx.resume(); clickSound.play() })
obj17.addEventListener('click', () => {  ctx.resume(); clickSound.play() })
obj18.addEventListener('click', () => {  ctx.resume(); clickSound.play() })
obj19.addEventListener('click', () => {  ctx.resume(); clickSound.play() })
obj20.addEventListener('click', () => {  ctx.resume(); clickSound.play() })
obj21.addEventListener('click', () => {  ctx.resume(); clickSound.play() })
obj22.addEventListener('click', () => {  ctx.resume(); clickSound.play() })
obj23.addEventListener('click', () => {  ctx.resume(); clickSound.play() })
obj24.addEventListener('click', () => {  ctx.resume(); clickSound.play() })
obj25.addEventListener('click', () => {  ctx.resume(); clickSound.play() })
obj26.addEventListener('click', () => {  ctx.resume(); clickSound.play() })
obj27.addEventListener('click', () => {  ctx.resume(); clickSound.play() })
obj28.addEventListener('click', () => {  ctx.resume(); clickSound.play() })
obj29.addEventListener('click', () => {  ctx.resume(); clickSound.play() })
obj30.addEventListener('click', () => {  ctx.resume(); clickSound.play() })
obj31.addEventListener('click', () => {  ctx.resume(); clickSound.play() })
obj32.addEventListener('click', () => {  ctx.resume(); clickSound.play() })
obj33.addEventListener('click', () => {  ctx.resume(); clickSound.play() })
obj35.addEventListener('click', () => {  ctx.resume(); clickSound.play() })
obj36.addEventListener('click', () => {  ctx.resume(); clickSound.play() })
obj37.addEventListener('click', () => {  ctx.resume(); clickSound.play() })
obj38.addEventListener('click', () => {  ctx.resume(); clickSound.play() })


/*
=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=
        Animation Frame
=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*= 
*/
const clock = new THREE.Clock()
let previousTime = 0

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // Sound Reduce
    let volume = 0.8 - (scrollY / 900) + 0.2;
    if (volume < 0) {
        volume = 0;
    }
    helicopterSound.setVolume(volume);
    if (scrollY < 800 && SoundPlaying) {
        background.setVolume(0.2);
    }
    if (scrollY >= 800 && SoundPlaying) {
        background.setVolume(0.5);
    }

    // Model animation
    if (mixer) {
        mixer.update(deltaTime)
    }
    if (mixer1) {
        mixer1.update(deltaTime)
    }

    // Animate camera
    camera.position.y = - scrollY / sizes.height * objectsDistance

    const parallaxX = cursor.x * 0.5
    const parallaxY = - cursor.y * 0.5
    cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 5 * deltaTime
    cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 5 * deltaTime

    mesh.rotation.z = scrollY / 100 * 2

    particles.rotation.y += deltaTime * 0.1


    // Object1 animation
    object.position.y = Math.sin(elapsedTime) * 0.7
    object.position.x = Math.cos(elapsedTime) * 1.3
    object.rotation.x = elapsedTime
    object.rotation.y = elapsedTime
    object.rotation.z = elapsedTime


    // Object2 animation
    object2.position.z = Math.sin(elapsedTime) * 0.7
    object2.position.y = Math.cos(elapsedTime) * 0.5
    object2.rotation.x = elapsedTime
    object2.rotation.y = elapsedTime
    object2.rotation.z = elapsedTime

    // Object1 animation
    object3.position.y = -1 * Math.sin(elapsedTime) * 0.7
    object3.position.x = -1 * Math.cos(elapsedTime) * 1.3
    object3.rotation.x = elapsedTime
    object3.rotation.y = elapsedTime
    object3.rotation.z = elapsedTime

    // Render
    renderer.render(scene, camera)
    renderer2.render(scene2, camera2)
    renderer3.render(scene3, camera3)


    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

