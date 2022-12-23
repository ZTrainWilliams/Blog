/*
 * @Author: ZtrainWilliams ztrain1224@163.com
 * @Date: 2022-12-21 15:31:26
 * @Description: 
 */
import * as THREE from 'three';

const renderer = new THREE.WebGLRenderer(); // 渲染器
renderer.setSize(window.innerWidth, window.innerHeight); // 设置尺寸
document.body.appendChild(renderer.domElement);

// 创建场景
const scene = new THREE.Scene();
// 相机-透视摄像机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.set(0, 0, 100);
camera.position.z = 4
const geometry = new THREE.BoxGeometry(1, 1, 1); // 立方体大小

const loader = new THREE.TextureLoader();
const texture = loader.load('https://r105.threejsfundamentals.org/threejs/resources/images/wall.jpg');
texture.wrapS = THREE.RepeatWrapping; // 水平方向上
texture.wrapT = THREE.RepeatWrapping; // 垂直方向上
texture.repeat.set( 2, 3 );

const material = new THREE.MeshBasicMaterial({ map: texture });
const cube = new THREE.Mesh(geometry, material); // 实例化立方体
scene.add(cube); // 立方体添加到场景

function animate() {
    requestAnimationFrame(animate);
    
	cube.rotation.x += 0.005;
	cube.rotation.y += 0.005;

    renderer.render(scene, camera);
}
animate()