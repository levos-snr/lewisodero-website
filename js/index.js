$(document).ready(function () {
	let currentId = null;
	let currentTab = null;
	let tabContainerHeight = 70;

	let lastScrollTop = 0;
	const heroTabsContainer = document.getElementById("hero-tabs-container");

	// On tab click
	$(".et-hero-tab").click(function (event) {
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
		let tabsOffset = $(".et-hero-tabs-container").offset();
		if (!tabsOffset) return;

		let offset = tabsOffset.top - tabContainerHeight;
		if ($(window).scrollTop() > offset) {
			$(".et-hero-tabs-container").addClass("et-hero-tabs-container--top");
		} else {
			$(".et-hero-tabs-container").removeClass("et-hero-tabs-container--top");
		}
	}

	// Find current tab selector
	function findCurrentTabSelector() {
		let newCurrentId = null;
		let newCurrentTab = null;

		$(".et-hero-tab").each(function () {
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
			left =
				currentTab.offset().left - $(".et-hero-tabs-container").offset().left;
		}
		$(".et-hero-tab-slider").css("width", width);
		$(".et-hero-tab-slider").css("left", left);
	}

	// Code to detect scroll direction and toggle the et-hero-tabs-container--top class
	window.addEventListener("scroll", () => {
		let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		if (scrollTop > lastScrollTop) {
			// Scrolling down
			heroTabsContainer.classList.add("et-hero-tabs-container--top");
		} else {
			// Scrolling up
			heroTabsContainer.classList.remove("et-hero-tabs-container--top");
		}
		lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
	});

	// Initial call to set the slider CSS
	setSliderCss();
	findCurrentTabSelector();
});
