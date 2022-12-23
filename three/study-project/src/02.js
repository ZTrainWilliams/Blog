/*
 * @Author: ZtrainWilliams ztrain1224@163.com
 * @Date: 2022-12-20 17:38:00
 * @Description:
 */
import * as THREE from 'three';

const renderer = new THREE.WebGLRenderer(); // 渲染器
renderer.setSize(window.innerWidth, window.innerHeight); // 设置尺寸
document.body.appendChild(renderer.domElement);

// 相机-透视摄像机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.set(0, 0, 100);
camera.position.z = 100
camera.lookAt(0, 0, 0);

// 创建场景
const scene = new THREE.Scene();

const material = new THREE.LineBasicMaterial({ color: 0x0000ff });

// 三角形
const points = [];
points.push(new THREE.Vector3(-1, 0, 0));
points.push(new THREE.Vector3(0, 10, 0));
points.push(new THREE.Vector3(10, 0, 0));
points.push(new THREE.Vector3(-1, 0, 0));

const geometry = new THREE.BufferGeometry().setFromPoints(points);

const line = new THREE.Line(geometry, material);

// scene.add(line);
// renderer.render(scene, camera);

function animate() {
    requestAnimationFrame(animate);
    
	line.rotation.x += 0.01;
	line.rotation.y += 0.01;
    
	scene.add(line);
    renderer.render(scene, camera);
}
animate()