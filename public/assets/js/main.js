$(document).ready(function () {
    const $sections = $("section");
    const $navLinks = $(".nav-link");
    const $header = $("header#home");
    const $navbar = $("#navigation");

    $(window).on("scroll", function () {
        let currentSection = "";
        const scrollPos = $(window).scrollTop() + ($(window).width() < 991.9 ? 70 : 65);

        const headerBottom = $header.offset().top + $header.outerHeight() + ($(window).width() < 991.9 ? 0 : 65);

        if (scrollPos <= headerBottom) {
            currentSection = "home";
            if($navbar.hasClass("navigation-shadow")) {
                $navbar.removeClass("navigation-shadow");
            }
        } else {
            $navbar.addClass("navigation-shadow");
            $sections.each(function () {
                const $section = $(this);
                const id = $section.attr("id");
                const sectionTop = $section.offset().top;
                const sectionHeight = $section.outerHeight();

                const $about = $("#about");
                const aboutBottom = $about.offset().top + $about.outerHeight();

                if (scrollPos > headerBottom && scrollPos < aboutBottom) {
                    currentSection = "about";
                }
                else if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    if (
                        id === "resume" ||
                        id === "soft-skills" ||
                        id === "technologic-knowledge"
                    ) {
                        currentSection = "resume";
                    } else {
                        currentSection = id;
                    }
                }
            });
        }

        $navLinks.removeClass("active");
        $navLinks.each(function () {
            const href = $(this).attr("href").substring(1);
            if (href === currentSection) {
                $(this).addClass("active");
            }
        });
    });

    function smoothScroll($target, duration) {
        const targetPosition = $target.offset().top - ($(window).width() < 991.9 ? 69 : 64);
        const startPosition = $(window).scrollTop();
        const distance = targetPosition - startPosition;
        const startTime = performance.now();

        function animation(currentTime) {
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);

            const ease = progress < 0.5
                ? 4 * Math.pow(progress, 3)
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;

            const scrollAmount = startPosition + distance * ease;
            window.scrollTo(0, scrollAmount);

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }

        requestAnimationFrame(animation);
    }

    $(".nav-link, .about-me, #to-top-button").on("click", function (event) {
        event.preventDefault();
        const targetId = $(this).attr("href").substring(1);
        const $targetSection = $("#" + targetId);
        smoothScroll($targetSection, 1000);

        const $navbarCollapse = $("#navbarSupportedContentBottom");
    
        if ($navbarCollapse.hasClass("show")) {
            $navbarCollapse.collapse("hide");
        }
    });
});