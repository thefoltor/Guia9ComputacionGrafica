import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js";
import Stats from "https://cdn.jsdelivr.net/npm/stats-js@1.0.1/src/Stats.js";
import { OrbitControls } from "./modules/OrbitControls.js";
import {GUI} from "https://unpkg.com/dat.gui@0.7.7/build/dat.gui.module.js";

//escena
const scene = new THREE.Scene();
scene.background= new THREE.Color(0xDEBFE6);
//niebla
scene.fog = new THREE.Fog(0x90B7F8, 20, 100);

//camara
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 60; 
camera.position.y = 30;

//renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


//luces
const light1 = new THREE.DirectionalLight( 0xffffff, 0.5 );
scene.add( light1 );

//plano
const planeGeometry = new THREE.PlaneGeometry(100, 100, 1, 1);
const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xA1EB92 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -0.5 * Math.PI;
scene.add(plane);


//edificios
const controls = new (function () {
    this.newBuilding = function () {
        const geometry = new THREE.BoxGeometry( randomizer(1,4), randomizer(2, 30), randomizer(1,3) );
        const material = new THREE.MeshPhongMaterial( {color: colorHEX()} );
        const cube = new THREE.Mesh( geometry, material );
        cube.position.x = randomizer(-40, 40);
        cube.position.z = randomizer(-40, 40);
        scene.add( cube );
    };
});

//stats
const stats = new Stats();
function statsFunction() {
    stats.setMode(2);
    stats.domElement.style.position = "absolute";
    stats.domElement.style.left = "100px";
    stats.domElement.style.top = "10px";
    document.getElementById("statsId").appendChild(stats.domElement);
    return stats;
}

//Orbit control
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.update();

//dat.gui
function Buildings() {
    const gui = new GUI();
    gui.add(controls, 'newBuilding');
}

//random
function randomizer(num1, num2){
    return Math.floor(Math.random() * (num2 - num1) ) + num1;
}

//random color
function generarLetra(){
	var letras = ["a","b","c","d","e","f","0","1","2","3","4","5","6","7","8","9"];
	var numero = (Math.random()*15).toFixed(0);
	return letras[numero];
}
	
function colorHEX(){
	var coolor = "";
	for(var i=0;i<6;i++){
		coolor = coolor + generarLetra() ;
	}
	return "#" + coolor;
}


function animacion() {
    requestAnimationFrame(animacion);
    stats.update();
    renderer.render(scene, camera);
}


statsFunction();
Buildings();
animacion();