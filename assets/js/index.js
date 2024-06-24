document.addEventListener("DOMContentLoaded", function () {
	let currentId = null;
	let currentTab = null;
	let tabContainerHeight = 70;
	let lastScrollTop = 0;
	const heroTabsContainer = document.getElementById("hero-tabs-container");

	// On tab click
	document.querySelectorAll(".hero-tab").forEach(function (tab) {
		tab.addEventListener("click", function (event) {
			event.preventDefault();
			let targetElement = document.querySelector(this.getAttribute("href"));
			if (targetElement) {
				let scrollTop = targetElement.offsetTop - tabContainerHeight + 1;
				window.scrollTo({
					top: scrollTop,
					behavior: "smooth",
				});
			}
		});
	});

	// On window scroll
	window.addEventListener("scroll", function () {
		checkTabContainerPosition();
		findCurrentTabSelector();
	});

	// On window resize
	window.addEventListener("resize", function () {
		if (currentId) {
			setSliderCss();
		}
	});

	// Check tab container position
	function checkTabContainerPosition() {
		let tabsOffset = document.querySelector(".hero-container").offsetTop;
		if (window.scrollY > tabsOffset - tabContainerHeight) {
			document
				.querySelector(".hero-container")
				.classList.add("hero-container--top");
		} else {
			document
				.querySelector(".hero-container")
				.classList.remove("hero-container--top");
		}
	}

	// Find current tab selector
	function findCurrentTabSelector() {
		let newCurrentId = null;
		let newCurrentTab = null;

		document.querySelectorAll(".hero-tab").forEach(function (tab) {
			let id = tab.getAttribute("href");
			let targetElement = document.querySelector(id);
			if (targetElement) {
				let offsetTop = targetElement.offsetTop - tabContainerHeight;
				let offsetBottom =
					targetElement.offsetTop +
					targetElement.offsetHeight -
					tabContainerHeight;
				if (window.scrollY > offsetTop && window.scrollY < offsetBottom) {
					newCurrentId = id;
					newCurrentTab = tab;
				}
			}
		});

		if (currentId != newCurrentId || currentId === null) {
			currentId = newCurrentId;
			currentTab = newCurrentTab;
			setSliderCss();
		}
	}

	// Set slider CSS
	function setSliderCss() {
		let width = 0;
		let left = 0;
		if (currentTab) {
			let rect = currentTab.getBoundingClientRect();
			width = rect.width;
			left =
				rect.left -
				document.querySelector(".hero-container").getBoundingClientRect().left;
		}
		document.querySelector(".hero-tab-slider").style.width = `${width}px`;
		document.querySelector(".hero-tab-slider").style.left = `${left}px`;
	}

	// Code to detect scroll direction and toggle the hero-container--top class
	window.addEventListener("scroll", function () {
		let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		if (scrollTop > lastScrollTop) {
			// Scrolling down
			heroTabsContainer.classList.add("hero-container--top");
		} else {
			// Scrolling up
			heroTabsContainer.classList.remove("hero-container--top");
		}
		// For Mobile or negative scrolling
		lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
	});

	// email

	let buttons = document.getElementsByClassName("contact-form-button");
	for (let button of buttons) {
		button.addEventListener("click", function () {
			alert(
				"Thank you for your message!  The page is still under development, so I will get back to you as soon as possible.  In the meantime, you can reach me at: lewisodero27@gmail.com"
			);
		});
	}

	// Generate 128 bubbles with random styles
	for (var i = 0; i < 128; i++) {
		const bubble = document.createElement("div");
		bubble.className = "bubble";
		bubble.style.setProperty("--size", `${2 + Math.random() * 4}rem`);
		bubble.style.setProperty("--distance", `${6 + Math.random() * 4}rem`);
		bubble.style.setProperty("--position", `${-5 + Math.random() * 110}%`);
		bubble.style.setProperty("--time", `${2 + Math.random() * 2}s`);
		bubble.style.setProperty("--delay", `${-1 * (2 + Math.random() * 2)}s`);
		document.querySelector(".bubbles").appendChild(bubble);
	}

	// Initial call to set the slider CSS
	setSliderCss();
	findCurrentTabSelector();
});
