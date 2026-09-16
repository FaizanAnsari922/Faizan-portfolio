function smoothScroll() {

    gsap.registerPlugin(ScrollTrigger);

    // ================= LOCOMOTIVE SCROLL =================

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true,
    });

    locoScroll.on("scroll", ScrollTrigger.update);


    // ================= NAVBAR HIDE / SHOW =================
const nav = document.querySelector("#nav");

let lastScroll = 0;
let navHidden = false;
let ignoreNavScroll = false;


// NAV CLICK
nav.addEventListener("click", function () {
    ignoreNavScroll = true;

    setTimeout(() => {
        ignoreNavScroll = false;
        lastScroll = locoScroll.scroll.instance.scroll.y;
    }, 4100);
});


// SCROLL
locoScroll.on("scroll", function (obj) {

    if (ignoreNavScroll) return;

    const currentScroll = obj.scroll.y;

    // SCROLL DOWN → HIDE
    if (currentScroll > lastScroll && currentScroll > 100 && !navHidden) {

        navHidden = true;

        nav.classList.remove("nav-visible");

        gsap.to(nav, {
            yPercent: -100,
            duration: 0.2,
            ease: "power3.out",
            overwrite: true
        });
    }

    // SCROLL UP → SHOW
    if (currentScroll < lastScroll && !navHidden) {
        return;
    }

    if (currentScroll < lastScroll && navHidden) {

        navHidden = false;

        nav.classList.add("nav-visible");

        gsap.to(nav, {
            yPercent: 0,
            duration: 0.2,
            ease: "power3.out",
            overwrite: true
        });
    }

    lastScroll = currentScroll;
});

    // ================= SCROLLTRIGGER =================

    ScrollTrigger.scrollerProxy("#main", {

        scrollTop(value) {

            return arguments.length
                ? locoScroll.scrollTo(value, 0, 0)
                : locoScroll.scroll.instance.scroll.y;

        },

        getBoundingClientRect() {

            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight
            };

        },

        pinType: document.querySelector("#main").style.transform
            ? "transform"
            : "fixed"

    });


    ScrollTrigger.addEventListener("refresh", () => {
        locoScroll.update();
    });

    ScrollTrigger.refresh();


    // ================= NAV LINKS =================

    const homeLink = document.querySelector("#homeLink");
    const worksLink = document.querySelector("#worksLink");
    const aboutLink = document.querySelector("#aboutLink");
    const contactLink = document.querySelector("#contactLink");

    const projects = document.querySelector("#projects");
    const home = document.querySelector("#page1");
    const about = document.querySelector("#page2");
    const contact = document.querySelector(".contact");


    // HOME
    if (homeLink && home) {

        homeLink.addEventListener("click", function (e) {

            e.preventDefault();

            locoScroll.scrollTo(home);

        });

    }


    // WORKS
    if (worksLink && projects) {

        worksLink.addEventListener("click", function (e) {

            e.preventDefault();

            locoScroll.scrollTo(projects);

        });

    }


    // ABOUT
    if (aboutLink && about) {

        aboutLink.addEventListener("click", function (e) {

            e.preventDefault();

            locoScroll.scrollTo(about);

        });

    }


    // CONTACT
    if (contactLink && contact) {

        contactLink.addEventListener("click", function (e) {

            e.preventDefault();

            locoScroll.scrollTo(contact);

        });

    }

    const footerHome = document.querySelector("#footerHome");
const footerWork = document.querySelector("#footerWork");
const footerAbout = document.querySelector("#footerAbout");
const footerContact = document.querySelector("#footerContact");

if (footerHome) {
    footerHome.addEventListener("click", function (e) {
        e.preventDefault();
        locoScroll.scrollTo(document.querySelector("#page1"));
    });
}

if (footerWork) {
    footerWork.addEventListener("click", function (e) {
        e.preventDefault();
        locoScroll.scrollTo(document.querySelector("#projects"));
    });
}

if (footerAbout) {
    footerAbout.addEventListener("click", function (e) {
        e.preventDefault();
        locoScroll.scrollTo(document.querySelector("#page2"));
    });
}

if (footerContact) {
    footerContact.addEventListener("click", function (e) {
        e.preventDefault();
        locoScroll.scrollTo(document.querySelector("#contact"));
    });
}

}

smoothScroll();

// <=======Loader=======>
function loader() {
  var count = 0;

  var percentage = document.querySelector("#percentage");

  var progress = document.querySelector("#progress");

  var lines = document.querySelectorAll(".terminal p");

  // Counter + Progress Bar

  var interval = setInterval(() => {
    percentage.textContent = count + "%";

    progress.style.width = count + "%";

    count++;

    if (count > 100) {
      clearInterval(interval);

      // Loader ko upar slide karna
      gsap.to("#loader", {
        y: -1000,

        duration: 1.5,

        ease: "power4.inOut",
      });
    }
  }, 30);

  // Terminal Lines

  var tl = gsap.timeline();

  tl.to(lines[0], {
    opacity: 1,

    duration: 1,

    ease: "power3.out",
  })

    .to(
      lines[1],
      {
        opacity: 1,

        duration: 1,

        ease: "power3.out",
      },
      "-=0.2",
    )

    .to(
      lines[2],
      {
        opacity: 1,

        duration: 1,

        ease: "power3.out",
      },
      "-=0.2",
    )

    .to(
      lines[3],
      {
        opacity: 1,

        duration: 1,

        ease: "power3.out",
      },
      "-=0.2",
    );

  tl.from("#nav #logo", {
    y: -100,
    opacity: 0,
    duration: 1,
    ease: "power4.out",
  })

    .from("#nav-part2 h4", {
      y: -50,
      opacity: 0,
      duration: 0.5,
      stagger: 0.15,
      ease: "power3.out",
    });

  tl.from(".hero h1", {
    y: 120,
    stagger: 0.2,
  });
}
loader();

// <======Cursor Animation======>
function cursorAnimation() {
  document.addEventListener("mousemove", function (dets) {
    gsap.to("#cursor", {
      left: dets.x,
      top: dets.y,
    });
  });

  Shery.makeMagnet("#nav-part2 h4");
}
cursorAnimation();

// <======Hero Text======>

function Herotext() {
  // ===============================
  // HERO HOVER LETTER ANIMATION
  // ===============================

  var headings = document.querySelectorAll(".hero h1");

  headings.forEach((heading) => {
    // Original text
    var text = heading.textContent;

    // Har letter ko span me convert karenge
    var splitText = "";

    text.split("").forEach((char) => {
      if (char === " ") {
        splitText += `<span>&nbsp;</span>`;
      } else {
        splitText += `<span>${char}</span>`;
      }
    });

    // Original text replace
    heading.innerHTML = splitText;

    // Hover hone par animation
    heading.addEventListener("mouseenter", () => {
      gsap.fromTo(
        heading.querySelectorAll("span"),
        {
          y: 80,
          opacity: 0,
          rotateX: -90,
          color: "#AD4B26",
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.7,
          stagger: 0.04,
          ease: "power4.out",
          color: "#ffff",
        },
      );
    });
  });
}
Herotext();

// <=============tech Stack=======>

function AboutMe() {

    var Allh1text = document.querySelectorAll("#page2 h1");

    // H1 ko letters me split karna
    Allh1text.forEach((elem) => {

        var clutter = "";
        var h1text = elem.textContent;

        var splittedText = h1text.split("");

        splittedText.forEach((e) => {
            clutter += `<span>${e}</span>`;
        });

        elem.innerHTML = clutter;

    });


    var h1 = document.querySelectorAll("#page2 h1 span");
    var paragraph = document.querySelector("#peragraph p");


    // Paragraph starting me hidden
    gsap.set(paragraph, {
        opacity: 0,
        y: 30,
        filter: "blur(10px)"
    });


    // MAIN TIMELINE
    var tl = gsap.timeline({
        scrollTrigger: {
            trigger: "#page2",
            scroller: "#main",
            start: "top 0",
            end: "+=1000",
            scrub: 1.5,
            pin: true,
            anticipatePin: 1
        }
    });


    // 1️⃣ Pehle H1 ke saare letters orange honge
    tl.to(h1, {
        color: "#F15303",
        stagger: 0.1,
        ease: "none"
    });


    // 2️⃣ H1 COMPLETE hone ke baad paragraph aayega
    tl.to(paragraph, {
        opacity: 1,
        color: "#F15303",
        y: 0,
        filter: "blur(0.5px)",
        duration: 1,
        ease: "power3.out"
    });


   

}

AboutMe();


// <=============page 4 text hover  animation =======>

function footerAnimation() {

  var clutter = "";
  var clutter2 = "";

  // H1 ke har character ko span ke andar daal rahe hain
  document.querySelector("#page3 h1").textContent.split("").forEach(function (elem) {
    clutter += `<span>${elem}</span>`;
  });

  document.querySelector("#page3 h1").innerHTML = clutter;


  // H2 ke har character ko span ke andar daal rahe hain
  document.querySelector("#page3 h2").textContent.split("").forEach(function (elem) {
    clutter2 += `<span>${elem}</span>`;
  });

  document.querySelector("#page3 h2").innerHTML = clutter2;


  // Mouse andar jaate hi H1 hide hoga aur H2 show hoga
  document.querySelector("#footer-text").addEventListener("mouseenter", function () {

    gsap.to("#page3 h1 span", {
      opacity: 0,
      stagger: 0.1
    });

    gsap.to("#page3 h2 span", {
      opacity: 1,
      stagger: 0.1
    });

  });


  // Mouse bahar jaate hi H1 wapas show hoga aur H2 hide hoga
  document.querySelector("#footer-text").addEventListener("mouseenter", function () {

  gsap.to("#page3 h1 span", {
    opacity: 0,
    stagger: 0.1
  });

  gsap.to("#page3 h2 span", {
    opacity: 1,
    stagger: 0.1
  });

  // Arrow right side shoot karega
  gsap.to("#footer-text svg", {
    x: 80,
    opacity: 0,
    duration: 0.4,
    ease: "power2.in"
  });

});

document.querySelector("#footer-text").addEventListener("mouseenter", function () {

  gsap.to("#page3 h1 span", {
    opacity: 0,
    stagger: 0.1
  });

  gsap.to("#page3 h2 span", {
    opacity: 1,
    stagger: 0.1
  });


});


document.querySelector("#footer-text").addEventListener("mouseleave", function () {

  gsap.to("#page3 h1 span", {
    opacity: 1,
    stagger: 0.1
  });

  gsap.to("#page3 h2 span", {
    opacity: 0,
    stagger: 0.1
  });

  // Mouse hatate hi arrow hide hoga
  gsap.to("#footer-text svg", {
    x: 80,
    opacity: 0,
    duration: 0.4,
    ease: "power2.in"
  });

});


}
footerAnimation();



// <=========page4 curve underline effect ========>


function underline() {

    const svg = document.querySelector(".underline");
    const path = svg.querySelector("path");

    svg.addEventListener("mousemove", (e) => {

        const rect = svg.getBoundingClientRect();

        const mouseX = ((e.clientX - rect.left) / rect.width) * 1000;

        // Mouse ke point par curve kitna neeche jayega
        const curve = 100;

        gsap.to(path, {
            attr: {
                d: `M 0 5 Q ${mouseX} ${curve} 1000 5`
            },
            duration: 0.25,
            ease: "power2.out"
        });

    });

    svg.addEventListener("mouseleave", () => {

        gsap.to(path, {
            attr: {
                d: "M 0 5 Q 500 5 1000 5"
            },
            duration: 0.8,
            ease: "elastic.out(1, 0.3)"
        });

    });

}

underline();

// <=========Project Section  ========>


function projectSection() {

    // =====================================================
    // PROJECT DATA
    // =====================================================

    const projects = [

        {
            number: "01",

            title: "OBYS-AGENCY",

            description:
                "Our agency is about people who love creating, designing and developing wow projects. In the same time we are a boutique agency that is more than the collective. We learn and grow, win and celebrate together.",

            image:
                "https://ik.imagekit.io/vb7pclpdt5/songs/Images/ChatGPT%20Image%20Sep%2015,%202026,%2001_11_36%20PM.png",

            link:
                "https://obys-agency-il7s.vercel.app/",

            tech: [
                "HTML",
                "CSS",
                "JAVASCRIPT",
                "GSAP",
                "OTHERS.."
            ]
        },


        {
            number: "02",

            title: "REFOKUS.",

            description:
                "A modern creative agency website featuring bold typography, smooth animations, and an immersive dark-themed UI.",

            image:
                "https://ik.imagekit.io/vb7pclpdt5/songs/Images/ChatGPT%20Image%20Sep%2015,%202026,%2001_04_12%20PM.png",

            link:
                "https://refocus-gamma-self.vercel.app/",

            tech: [
                "REACT",
                "TALWIND",
                "FRAMER_MOTION",
                "GSAP",
                "SCROLLTRIGGER"
            ]
        },


        {
            number: "03",

            title: "EXO APE",

            description:
                "Global digital design studio partnering with brands and businesses that create exceptional experiences where people, live, work, and unwind.",

            image:
                "https://ik.imagekit.io/vb7pclpdt5/songs/Images/ChatGPT%20Image%20Sep%2015,%202026,%2011_24_53%20AM.png",

            link:
                "https://gsapreact.vercel.app/",

            tech: [
                "REACT",
                "TALWIND",
                "FRAMER_MOTION",
                "GSAP"
            ]
        },


        {
            number: "04",

            title: "CYNTHIA UGWU®",

            description:
                "create digital experiences that feel simple, meaningful and alive.",

            image:
                "https://ik.imagekit.io/vb7pclpdt5/songs/Images/ChatGPT%20Image%20Sep%2015,%202026,%2003_48_36%20PM.png",

            link:
                "https://cynthia-ugwu-lemon.vercel.app/",

            tech: [
                "HTML",
                "CSS",
                "JAVASCRIPT",
                "GSAP"
            ]
        }

    ];


    // =====================================================
    // HTML ELEMENTS
    // =====================================================

    const title =
        document.querySelector("#project-title");

    const description =
        document.querySelector("#project-description");

    const number =
        document.querySelector(".project-number");

    const techContainer =
        document.querySelector("#project-tech");

    const projectLink =
        document.querySelector("#project-link");

    const projectRight =
        document.querySelector("#project-right");


    // =====================================================
    // DESKTOP IMAGES CREATE
    // =====================================================

    projects.forEach((project) => {

        projectRight.innerHTML += `

            <div class="project-image">

                <img
                    src="${project.image}"
                    alt="${project.title}"
                >

            </div>

        `;

    });


    // =====================================================
    // DESKTOP PROJECT IMAGES
    // =====================================================

    const projectImages =
        document.querySelectorAll(".project-image");


    // =====================================================
    // MOBILE PROJECT CARDS
    // =====================================================

    const mobileProjects =
        document.createElement("div");

    mobileProjects.classList.add("mobile-projects");


    projects.forEach((project) => {

        mobileProjects.innerHTML += `

            <div class="mobile-project-card">

                <div class="mobile-project-image">

                    <img
                        src="${project.image}"
                        alt="${project.title}"
                    >

                </div>


                <div class="mobile-project-content">

                    <div class="mobile-project-number">
                        ${project.number}
                    </div>


                    <h2>
                        ${project.title}
                    </h2>


                    <p>
                        ${project.description}
                    </p>


                    <div class="mobile-project-tech">

                        ${project.tech.map((item) => `

                            <span>
                                ${item}
                            </span>

                        `).join("")}

                    </div>


                    <a
                        href="${project.link}"
                        target="_blank"
                    >
                        Live Demo ↗
                    </a>

                </div>

            </div>

        `;

    });


    document
        .querySelector("#projects")
        .appendChild(mobileProjects);


    // =====================================================
    // CURRENT PROJECT
    // =====================================================

    let currentProject = 0;


    // =====================================================
    // DESKTOP PROJECT TEXT CHANGE
    // =====================================================

    function changeProject(index) {

        if (currentProject === index) return;

        currentProject = index;


        // =================================================
        // PURANA TEXT HIDE
        // =================================================

        gsap.to(
            [
                title,
                description,
                number,
                techContainer,
                projectLink
            ],
            {

                opacity: 0,

                y: 40,

                filter: "blur(10px)",

                duration: 0.3,

                stagger: 0.05,


                onComplete: () => {


                    // =====================================
                    // NEW PROJECT INFORMATION
                    // =====================================

                    number.textContent =
                        projects[index].number;


                    title.textContent =
                        projects[index].title;


                    description.textContent =
                        projects[index].description;


                    projectLink.href =
                        projects[index].link;


                    // =====================================
                    // TECHNOLOGIES UPDATE
                    // =====================================

                    techContainer.innerHTML = "";


                    projects[index].tech.forEach((item) => {

                        techContainer.innerHTML += `

                            <span>
                                ${item}
                            </span>

                        `;

                    });


                    // =====================================
                    // NEW TEXT ANIMATION
                    // =====================================

                    gsap.fromTo(

                        [
                            number,
                            title,
                            description,
                            techContainer,
                            projectLink
                        ],

                        {

                            opacity: 0,

                            y: 40,

                            filter: "blur(10px)"

                        },

                        {

                            opacity: 1,

                            y: 0,

                            filter: "blur(0px)",

                            duration: 0.7,

                            stagger: 0.08,

                            ease: "power3.out"

                        }

                    );

                }

            }
        );

    }


    // =====================================================
    // DESKTOP PROJECT IMAGES
    // =====================================================

    projectImages.forEach((image, index) => {


        // =================================================
        // VIEW PROJECT FOLLOWER
        // =================================================

        const hoverLink =
            document.createElement("div");


        hoverLink.classList.add(
            "project-hover-link"
        );


        hoverLink.innerText =
            "VIEW PROJECT ↗";


        image.appendChild(hoverLink);


        // =================================================
        // MOUSE IMAGE KE ANDAR
        // =================================================

        image.addEventListener("mousemove", (e) => {

            const rect =
                image.getBoundingClientRect();


            const x =
                e.clientX - rect.left;


            const y =
                e.clientY - rect.top;


            gsap.to(hoverLink, {

                left: x,

                top: y,

                duration: 0.3,

                ease: "power3.out"

            });

        });


        // =================================================
        // MOUSE ENTER
        // =================================================

        image.addEventListener("mouseenter", () => {

            gsap.to(hoverLink, {

                opacity: 1,

                duration: 0.3

            });

        });


        // =================================================
        // MOUSE LEAVE
        // =================================================

        image.addEventListener("mouseleave", () => {

            gsap.to(hoverLink, {

                opacity: 0,

                duration: 0.2

            });

        });


        // =================================================
        // BUTTON CLICK
        // =================================================

        hoverLink.addEventListener("click", () => {

            window.open(
                projects[index].link,
                "_blank"
            );

        });


        // =================================================
        // DESKTOP SCROLLTRIGGER
        // =================================================
        // Mobile par ye bilkul nahi chalega.
        // Isliye mobile cards ka text change nahi hoga.

        if (window.innerWidth > 600) {

            ScrollTrigger.create({

                trigger: image,

                scroller: "#main",

                start: "top center",

                end: "bottom center",


                onEnter: () => {

                    changeProject(index);

                },


                onEnterBack: () => {

                    changeProject(index);

                }

            });

        }

    });


    // =====================================================
    // DESKTOP PROJECT SECTION PIN
    // =====================================================
    // Sirf desktop par project-left PIN hoga.

    if (window.innerWidth > 600) {

        ScrollTrigger.create({

            trigger: "#projects",

            scroller: "#main",

            start: "top top",

            end: "bottom bottom",

            pin: ".project-left",

            pinSpacing: false

        });

    }


    // =====================================================
    // PURE BODY MOUSE FOLLOWER
    // =====================================================

    const mouseFollower =
        document.querySelector("#mouse-follower");


    if (mouseFollower) {

        window.addEventListener("mousemove", (e) => {

            gsap.to(mouseFollower, {

                x: e.clientX,

                y: e.clientY,

                duration: 0.25,

                ease: "power3.out"

            });

        });

    }


    // =====================================================
    // FINAL REFRESH
    // =====================================================

    ScrollTrigger.refresh();

}


projectSection();

// <=========page4 text animation ========>

function readyTextAnimation() {

    var heading = document.querySelector("#page4 .ready-section h1");

    if (heading) {

        // =====================================================
        // ORIGINAL TEXT
        // =====================================================

        var text = heading.textContent.trim();


        // =====================================================
        // MOBILE / DESKTOP
        // =====================================================

        var isMobile = window.innerWidth <= 600;


        // =====================================================
        // MOBILE
        // =====================================================

        if (isMobile) {

            // -------------------------------------------------
            // WORDS KO ALAG-ALAG LINE MEIN BANAYENGE
            // -------------------------------------------------

            var words = text.split(/\s+/);

            var mobileHTML = "";

            words.forEach(function (word) {

                mobileHTML += '<span class="mobile-word">';

                word.split("").forEach(function (char) {

                    mobileHTML +=
                        '<span class="mobile-letter">' +
                        char +
                        '</span>';

                });

                mobileHTML += "</span>";

            });

            heading.innerHTML = mobileHTML;


            // -------------------------------------------------
            // MOBILE WORDS
            // -------------------------------------------------

            var mobileWords =
                heading.querySelectorAll(".mobile-word");


            // -------------------------------------------------
            // MOBILE LETTERS
            // -------------------------------------------------

            var mobileLetters =
                heading.querySelectorAll(".mobile-letter");


            // =================================================
            // MOBILE HEADING
            // =================================================

            gsap.set(heading, {

                x: 0,

                fontSize: "25vw",

                width: "100%",

                textAlign: "center",

                whiteSpace: "normal",

                lineHeight: 0.82

            });


            // =================================================
            // WORDS KO FIXED LINE MEIN RAKHNA
            // =================================================

            mobileWords.forEach(function (word) {

                gsap.set(word, {

                    display: "block",

                    width: "100%",

                    textAlign: "center",

                    whiteSpace: "nowrap"

                });

            });


            // =================================================
            // LETTERS INITIAL POSITION
            // =================================================

            mobileLetters.forEach(function (letter) {

                gsap.set(letter, {

                    display: "inline-block",

                    x: gsap.utils.random(-45, 45) + "vw",

                    y: gsap.utils.random(-35, 35) + "vh",

                    rotation: gsap.utils.random(-20, 20),

                    opacity: 0

                });

            });


            // =================================================
            // MOBILE SCROLL TIMELINE
            // =================================================

            var mobileTl = gsap.timeline({

                scrollTrigger: {

                    trigger: "#page4",

                    scroller: "#main",

                    start: "top 0",

                    end: "+=900",

                    scrub: 1.5,

                    pin: true

                }

            });


            // =================================================
            // LETTERS ASSEMBLE
            // =================================================

            mobileTl.to(

                mobileLetters,

                {

                    x: 0,

                    y: 0,

                    rotation: 0,

                    opacity: 1,

                    duration: 2,

                    stagger: {

                        each: 0.06,

                        from: "random"

                    },

                    ease: "power3.out"

                },

                0

            );


            // =================================================
            // FINAL TEXT
            // =================================================

            mobileTl.to(

                heading,

                {

                    fontSize: "25vw",

                    duration: 2,

                    ease: "power2.out"

                },

                0

            );

        }


        // =====================================================
        // DESKTOP
        // =====================================================

        else {

            // -------------------------------------------------
            // TEXT SPLIT
            // -------------------------------------------------

            var splitText = "";

            text.split("").forEach(function (char) {

                if (char === " ") {

                    splitText += "<span>&nbsp;</span>";

                } else {

                    splitText += "<span>" + char + "</span>";

                }

            });

            heading.innerHTML = splitText;


            var letters =
                heading.querySelectorAll("span");


            // =================================================
            // INITIAL POSITION
            // =================================================

            gsap.set(heading, {

                x: 1400

            });


            // =================================================
            // LETTERS UP / DOWN
            // =================================================

            letters.forEach(function (letter, index) {

                if (index % 2 === 0) {

                    gsap.set(letter, {

                        y: "-10vw"

                    });

                } else {

                    gsap.set(letter, {

                        y: "10vh"

                    });

                }

            });


            // =================================================
            // DESKTOP SCROLL TIMELINE
            // =================================================

            var tl = gsap.timeline({

                scrollTrigger: {

                    trigger: "#page4",

                    scroller: "#main",

                    start: "top 0",

                    end: "+=1000",

                    scrub: 1.5,

                    pin: true

                }

            });


            // =================================================
            // LEFT → RIGHT
            // =================================================

            tl.to(

                heading,

                {

                    x: 0,

                    fontSize: "10vw",

                    duration: 2,

                    ease: "power2.out"

                },

                0

            );


            // =================================================
            // LETTERS → CENTER
            // =================================================

            tl.to(

                letters,

                {

                    y: 0,

                    duration: 2,

                    stagger: 0.08,

                    ease: "power2.out"

                },

                0

            );

        }

    }

}

readyTextAnimation();

// <=================Contact page ===============>
  const form = document.querySelector("#contactForm");

form.addEventListener("submit", function(e) {

    e.preventDefault();

    const button = document.querySelector(".submit");
    const originalText = button.innerHTML;

    button.innerHTML = `MESSAGE SENT <span>✓</span>`;

    setTimeout(() => {

        button.innerHTML = originalText;

        form.reset();

    }, 2500);

});


// Subtle mouse parallax

const contact = document.querySelector(".contact");
const orb = document.querySelector(".orb");

contact.addEventListener("mousemove", (e) => {

    const x = (window.innerWidth / 2 - e.clientX) / 35;
    const y = (window.innerHeight / 2 - e.clientY) / 35;

    orb.style.transform = `translate(${x}px, ${y}px)`;

});


// <=================Nav Link handel               @media (max-width: 767px)  mobile view===============>

/* =========================
   MOBILE MENU
========================= */

const menuIcon = document.querySelector("#mobile-menu-icon");
const mobileMenu = document.querySelector("#mobile-menu");
const menuClose = document.querySelector("#menu-close");


/* OPEN MENU */

if (menuIcon && mobileMenu) {

    menuIcon.addEventListener("click", function () {

        mobileMenu.classList.add("active");

    });

}


/* CLOSE MENU */

if (menuClose && mobileMenu) {

    menuClose.addEventListener("click", function () {

        mobileMenu.classList.remove("active");

    });

}


/* MOBILE MENU LINKS */

const mobileLinks =
    document.querySelectorAll(".mobile-menu-links h4");


mobileLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        const targetId =
            link.getAttribute("data-target");

        const target =
            document.querySelector("#" + targetId);


        if (target) {
            target.click();
        }


        mobileMenu.classList.remove("active");

    });

});
