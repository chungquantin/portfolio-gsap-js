let scene, camera, renderer, starGeo;

function init() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(
		60,
		window.innerWidth / innerHeight,
		1,
		1000
	);
	camera.position.z = 1;
	camera.position.x = Math.PI / 2;

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.querySelector(".home-page").appendChild(renderer.domElement);

	starGeo = new THREE.Geometry();
	for (let i = 0; i < 6000; i++) {
		star = new THREE.Vector3(
			Math.random() * 700 - 300,
			Math.random() * 700 - 300,
			Math.random() * 700 - 300
		);
		star.velocity = 0;
		star.acceleration = 0.03;
		starGeo.vertices.push(star);
	}
	let sprite = new THREE.TextureLoader().load("../../gsapportfolio/img/star.png");
	let starMat = new THREE.PointsMaterial({
		color: 0xaaaaaa,
		size: 0.9,
		map: sprite,
	});

	stars = new THREE.Points(starGeo, starMat);
	scene.add(stars);

	window.addEventListener("resize", onWindowResize, false);

	animate();
}
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
	starGeo.vertices.forEach((p) => {
		p.velocity += p.acceleration;
		p.y -= p.velocity;
		if (p.y < -200) {
			p.y = 200;
			p.velocity = 0;
		}
	});
	starGeo.verticesNeedUpdate = true;
	stars.rotation.z += 0.002 * Math.random(0, 10);
	renderer.render(scene, camera);
	requestAnimationFrame(animate);
}

$(window).load(init());
