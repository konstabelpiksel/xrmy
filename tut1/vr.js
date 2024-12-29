import * as THREE from 'three';
import { VRButton } from 'three/addons/webxr/VRButton.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

//enable xr rendering
renderer.xr.enabled = true;
document.body.appendChild(renderer.domElement);

//vr button
document.body.appendChild( VRButton.createButton( renderer ) );

const geometry = new THREE.BoxGeometry(1, 1, 1).toNonIndexed();
const material = new THREE.MeshBasicMaterial({ vertexColors: true });
const positionAttribute = geometry.getAttribute('position');
const colors = [];

const color = new THREE.Color();

for (let i = 0; i < positionAttribute.count; i += 6) {

    color.setHex(0xffffff * Math.random());

    colors.push(color.r, color.g, color.b);
    colors.push(color.r, color.g, color.b);
    colors.push(color.r, color.g, color.b);

    colors.push(color.r, color.g, color.b);
    colors.push(color.r, color.g, color.b);
    colors.push(color.r, color.g, color.b);
}

geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

function animate() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

