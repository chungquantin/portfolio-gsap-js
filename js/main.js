const animeTl = anime.timeline({
	duration: 750
});
const gsapTl = gsap.timeline({});
function mainTimeline() {
	animeTl
		.add({
			targets: ".square",
			opacity: 1,
			duration: 700,
			delay: anime.stagger(300, { grid: [5, 3], from: "center" }),
		})
		.add(
			{
				targets: ".square",
				translateX: anime.stagger(800, {
					grid: [5, 3],
					from: "center",
					axis: "x",
				}),
				translateY: anime.stagger(800, {
					grid: [5, 3],
					from: "center",
					axis: "y",
				}),
				rotateZ: anime.stagger([0, 60], {
					grid: [5, 3],
					from: "center",
					axis: "x",
				}),
				scale: anime.stagger(2, {
					grid: [5, 3],
					from: "center",
					axis: "y",
				}),
				delay: anime.stagger(300, { grid: [5, 3], from: "center" }),
				easing: "easeInOutQuad",
				loop: true,
				direction: "alternate",
			},
			"-=600"
		)
		.add(
			{
				targets: ".middle",
				opacity: 0,
			},
			"-=200"
		)
		.add(
			{
				targets: ".loading-page",
				translateY: "-103vh",
				duration: 1000,
				complete: () => {
					document.querySelector(".loading-page").style.display = "none";
				},
			},
			"-=1000"
		)
		.add({
			targets: ".loading-page",
			begin: () => {
				gsapTl.fromTo(
					"h1",
					{
						y: 100,
						opacity: 0,
					},
					{
						y: 0,
						opacity: 1,
					}
				);
				document.getElementById("heading-span").className = "typewritingEffect";
			},
		})
		.add({
			targets: ".svg-path path",
			strokeDashoffset: [anime.setDashoffset, 0],
			easing: "easeInOutSine",
			duration: 5500,
		});
}

gsap.set(".widget-area", { y: -100 });
function openSection(e) {
	let displayMode = "block";
	const tl = gsap.timeline({});
	switch (e.id) {
	  	case "contact":
			openContact(tl, e.id);
			break;
		case "project":
			displayMode = "flex";
			openProject(tl,e.id);
		  	break;
	  	default:
			break;
	}
	tl.to(`.${e.id}-page`, { display: displayMode }, "open")
		.to(".widget-area", { y: 0 }, "open").to([".heading",".nav-area"],{opacity: 0},"open").to([".heading",".nav-area"],{display: "none"},"open");
	document.querySelector(".back-btn").id = e.id;
	document.querySelector(".nav-btn").id = e.id;
}

function openContact(timeline, id){
	timeline.fromTo(
		[`#${id}-ul li`],
		{ y: 0 },
		{ y: "-100vh", stagger: 0.3, duration: 1, ease: "power1.out" },
		"open"
	)
}
function openProject(timeline, id){
	timeline.to(`.${id}-display`,{y:"-100vh", duration:1.5, ease: "power1.out"},"open").fromTo(`.${id}-card`,{opacity: 0},{delay:0.7,opacity: 1, stagger: 0.2, duration: 0.5, ease: "linear"},"open");
}

function closeSection(e) {
	const tl = gsap.timeline({});
	switch (e.id) {
	  	case "contact":
			closeContact(tl,e.id);
			break;
		case "project":
		  	closeProject(tl,e.id);
		 	break;
	  	default:
			break;
	}
	tl
		.to(".widget-area", { y: -100 }, "close").to(".nav-area",{display: "flex"},"close").to(".heading",{display: "block"},"close").to([".heading",".nav-area"],{opacity: 1},"close");
}

function closeContact(timeline, id){
	timeline.fromTo(
		[`#${id}-ul li`],
		{ y: "-100vh" },
		{ y: "0vh", stagger: 0.3, duration: 1, ease: "power1.out" },
		"close"
	).to(`.${id}-page`, { display: "none" });
}
function closeProject(timeline,id){
	timeline.to(`.${id}-display`,{y:"100vh", duration: 1.5, ease: "power2.out"},"close");
}

mainTimeline();

//TODO 3d cube
