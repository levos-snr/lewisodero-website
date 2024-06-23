$(document).ready(function () {
	let currentId = null;
	let currentTab = null;
	let tabContainerHeight = 70;

	let lastScrollTop = 0;
	const heroTabsContainer = document.getElementById("hero-tabs-container");

	// On tab click
	$(".hero-tab").click(function (event) {
		event.preventDefault();
		let targetElement = $($(this).attr("href"));
		if (targetElement.length) {
			let scrollTop = targetElement.offset().top - tabContainerHeight + 1;
			$("html, body").animate({ scrollTop: scrollTop }, 600);
		}
	});

	// On window scroll
	$(window).scroll(function () {
		checkTabContainerPosition();
		findCurrentTabSelector();
	});

	// On window resize
	$(window).resize(function () {
		if (currentId) {
			setSliderCss();
		}
	});

	// Check tab container position
	function checkTabContainerPosition() {
		let tabsOffset = $(".hero-container").offset();
		if (!tabsOffset) return;

		let offset = tabsOffset.top - tabContainerHeight;
		if ($(window).scrollTop() > offset) {
			$(".hero-container").addClass("hero-container--top");
		} else {
			$(".hero-container").removeClass("hero-container--top");
		}
	}

	// Find current tab selector
	function findCurrentTabSelector() {
		let newCurrentId = null;
		let newCurrentTab = null;

		$(".hero-tab").each(function () {
			let id = $(this).attr("href");
			let targetElement = $(id);
			if (targetElement.length) {
				let offsetTop = targetElement.offset().top - tabContainerHeight;
				let offsetBottom =
					targetElement.offset().top +
					targetElement.height() -
					tabContainerHeight;
				if (
					$(window).scrollTop() > offsetTop &&
					$(window).scrollTop() < offsetBottom
				) {
					newCurrentId = id;
					newCurrentTab = $(this);
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
			width = currentTab.outerWidth(); // Use outerWidth to include padding/borders if any
			left = currentTab.offset().left - $(".hero-container").offset().left;
		}
		$(".hero-tab-slider").css("width", width);
		$(".hero-tab-slider").css("left", left);
	}

	// Code to detect scroll direction and toggle the hero-container--top class
	window.addEventListener("scroll", () => {
		let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		if (scrollTop > lastScrollTop) {
			// Scrolling down
			heroTabsContainer.classList.add("hero-container--top");
		} else {
			// Scrolling up
			heroTabsContainer.classList.remove("hero-container--top");
		}
		lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
	});

	// email

	let message;

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
