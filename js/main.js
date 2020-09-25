const animeTl = anime.timeline({
	duration: 750,
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

gsap.set(".widget-area", { y: -130 });
function openSection(e) {
	let displayMode = "block";
	const tl = gsap.timeline({});
	switch (e.id) {
		case "tech":
			displayMode = "flex";
			openTech(tl, e.id);
			break;
		case "project":
			displayMode = "flex";
			openProject(tl, e.id);
			break;
		case "about":
			displayMode = "flex";
			openAbout(tl, e.id);
			break;
		default:
			break;
	}
	tl.to(`.${e.id}-page`, { display: displayMode }, "open")
		.to(".widget-area", { y: 0 }, "open")
		.to([".heading", ".nav-area"], { opacity: 0 }, "open")
		.to([".heading", ".nav-area"], { display: "none" }, "open");

	$(`.back-btn`)[0].id = e.id;
	$(".nav-btn")[0].id = e.id;
}

function openContact(timeline, id) {
	timeline.fromTo(
		[`#${id}-ul li`],
		{ y: 0 },
		{ y: "-100vh", stagger: 0.3, duration: 1, ease: "power1.out" },
		"open"
	);
}
function openAbout(timeline, id) {
	timeline
		.to(".about-page", {
			y: "-97vh",
			opacity: 1,
			onBegin: () => {
				counterIncrement($(".number")[0], 30)("87%");
				counterIncrement($(".number")[1], 30)("92%");
				counterIncrement($(".number")[2], 30)("85%");
			},
		})
		.fromTo(
			[`.profile-image`, ".profile-description"],
			{ opacity: 0 },
			{ opacity: 1, delay: 1, duration: 2 },
			"open"
		);
	anime.timeline({ loop: false }).add({
		targets: ".profile-greeting .letters",
		translateY: ["1.1em", 0],
		translateX: ["0.55em", 0],
		translateZ: 0,
		rotateZ: [180, 0],
		duration: 1000,
		easing: "easeOutExpo",
		delay: function (el, i) {
			return 1000 + 50 * i;
		},
	});
}
function openTech(timeline, id) {
	timeline.to(
		".tech-page",
		{ y: "-100vh", display: "flex", duration: 1 },
		"open"
	);
}
function closeTech(timeline, id) {
	timeline.to(".tech-page", { y: "0", display: "none", duration: 1 }, "open");
}
function openProject(timeline, id) {
	timeline
		.to(
			`.${id}-display`,
			{ y: "-100vh", duration: 1.5, ease: "power1.out" },
			"open"
		)
		.fromTo(
			`.${id}-card`,
			{ opacity: 0 },
			{ delay: 0.7, opacity: 1, stagger: 0.2, duration: 0.5, ease: "linear" },
			"open"
		);
}

function closeSection(e) {
	const tl = gsap.timeline({});
	switch (e.id) {
		case "project":
			closeProject(tl, e.id);
			break;
		case "about":
			closeAbout(tl, e.id);
			break;
		case "tech":
			closeTech(tl, e.id);
			break;
		default:
			break;
	}
	tl.to(".widget-area", { y: -130 }, "close")
		.to(".nav-area", { display: "flex" }, "close")
		.to(".heading", { display: "block" }, "close")
		.to([".heading", ".nav-area"], { opacity: 1 }, "close");
}
function closeAbout(timeline, id) {
	timeline.fromTo(
		[".about-page"],
		{ opacity: 1, y: "-100vh" },
		{
			opacity: 0,
			y: "0",
			duration: 1,
			onComplete: () => {
				$(".about-page")[0].style.display = "none";
			},
		},
		"open"
	);
}

function closeProject(timeline, id) {
	timeline.to(
		`.${id}-display`,
		{ y: "0", duration: 1.5, ease: "power2.out" },
		"open"
	);
}

mainTimeline();

function counterIncrement(item, duration) {
	return (goal) => {
		console.log(item.textContent.trim());
		let counter = 0;
		setInterval(() => {
			if (counter + "%" === goal) {
				clearInterval();
			} else {
				counter++;
				item.innerHTML = `<h2>${counter}<span>%</span></h2>`;
			}
		}, duration);
	};
}

function openTechArea(e) {
	const total = 3;
	const techAreas = $(".tech-area");
	const techButtons = $(".tech-button");
	for (let i = 0; i < total; i++) {
		console.log(techAreas[i]);
		console.log(techButtons[i + 1]);
		if (techAreas[i].id && techButtons[i + 1].id == e.id) {
			techAreas[i].style.display = "flex";
			techButtons[0].classList.remove("is-selected");
			techButtons[i + 1].classList.add("is-selected");
		} else if (e.id == "all") {
			techAreas[i].style.display = "flex";
			techButtons[0].classList.add("is-selected");
			for (let j = 1; j <= 3; j++) {
				techButtons[j].classList.remove("is-selected");
			}
		} else {
			techAreas[i].style.display = "none";
			techButtons[i + 1].classList.remove("is-selected");
		}
	}
}
//TODO 3d cube
