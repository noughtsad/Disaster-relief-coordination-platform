import { useEffect, useRef, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Sun, Moon, Menu, X, Home } from "lucide-react";
import { gsap } from "gsap";
import { ThemeContext } from "../context/ThemeContext";
import { logoutUser } from "../store/appSlice";
import "./PillNav.css";

const PillNavbar = ({ user, isAuthenticated }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const circleRefs = useRef([]);
  const tlRefs = useRef([]);
  const activeTweenRefs = useRef([]);
  const logoImgRef = useRef(null);
  const logoTweenRef = useRef(null);
  const hamburgerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const themeCircleRef = useRef(null);
  const themeTlRef = useRef(null);
  const themeTweenRef = useRef(null);
  const authCircleRefs = useRef([]);
  const authTlRefs = useRef([]);
  const authTweenRefs = useRef([]);

  const ease = "power3.easeOut";

  // Color scheme based on theme
  const baseColor = theme === "light" ? "#e4e9f2" : "#374151";
  const pillColor = theme === "light" ? "#2563eb" : "#3b82f6";
  const hoveredPillTextColor = theme === "light" ? "#111827" : "#111827";
  const pillTextColor = theme === "light" ? "#f9fafb" : "#f9fafb";

  console.log('PillNavbar rendering - isAuthenticated:', isAuthenticated, 'location:', location.pathname);

  // Build navigation items based on user state and location
  const getNavItems = () => {
    const items = [];

    if (location.pathname !== "/") {
      items.push({ href: "/", label: "Home", icon: <Home size={16} /> });
    }

    if (isAuthenticated && location.pathname !== "/") {
      if (user?.userType === "ngo") {
        items.push({ href: "/ngoDashboard", label: "Dashboard" });
      } else if (user?.userType === "survivor") {
        items.push({ href: "/survivorDashboard", label: "Dashboard" });
      } else if (user?.userType === "volunteer") {
        items.push({ href: "/volunteer", label: "Volunteer" });
      } else if (user?.userType === "Supplier") {
        items.push({ href: "/supplierDashboard", label: "Dashboard" });
      }
    }

    if (location.pathname !== "/volunteer") {
      items.push({ href: "/donate", label: "Donate" });
    }

    items.push({ href: "/about", label: "About" });

    return items;
  };

  const navItems = getNavItems();

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle) => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        const R = (w * w) / 4 / h + h / 2;
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`,
        });

        const label = pill.querySelector(".pill-label");
        const hoverLabel = pill.querySelector(".pill-label-hover");

        if (label) gsap.set(label, { y: 0 });
        if (hoverLabel) gsap.set(hoverLabel, { y: h + 12, opacity: 0 });

        const index = circleRefs.current.indexOf(circle);
        if (index === -1) return;

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });

        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 0.6, ease, overwrite: "auto" }, 0);

        if (label) {
          tl.to(label, { y: -(h + 8), duration: 0.6, ease, overwrite: "auto" }, 0);
        }

        if (hoverLabel) {
          gsap.set(hoverLabel, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(hoverLabel, { y: 0, opacity: 1, duration: 0.6, ease, overwrite: "auto" }, 0);
        }

        tlRefs.current[index] = tl;
      });

      // Setup theme toggle animation
      const themeCircle = themeCircleRef.current;
      if (themeCircle) {
        const btn = themeCircle.parentElement;
        const rect = btn.getBoundingClientRect();
        const { width: w, height: h } = rect;
        const R = (w * w) / 4 / h + h / 2;
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        themeCircle.style.width = `${D}px`;
        themeCircle.style.height = `${D}px`;
        themeCircle.style.bottom = `-${delta}px`;

        gsap.set(themeCircle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`,
        });

        themeTlRef.current?.kill();
        const tl = gsap.timeline({ paused: true });
        tl.to(themeCircle, { scale: 1.2, xPercent: -50, duration: 0.6, ease, overwrite: "auto" }, 0);
        themeTlRef.current = tl;
      }

      // Setup auth buttons animation
      authCircleRefs.current.forEach((circle, index) => {
        if (!circle?.parentElement) return;

        const btn = circle.parentElement;
        const rect = btn.getBoundingClientRect();
        const { width: w, height: h } = rect;
        const R = (w * w) / 4 / h + h / 2;
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`,
        });

        const label = btn.querySelector(".pill-label");
        const hoverLabel = btn.querySelector(".pill-label-hover");

        if (label) gsap.set(label, { y: 0 });
        if (hoverLabel) gsap.set(hoverLabel, { y: h + 12, opacity: 0 });

        authTlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });

        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 0.6, ease, overwrite: "auto" }, 0);

        if (label) {
          tl.to(label, { y: -(h + 8), duration: 0.6, ease, overwrite: "auto" }, 0);
        }

        if (hoverLabel) {
          gsap.set(hoverLabel, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(hoverLabel, { y: 0, opacity: 1, duration: 0.6, ease, overwrite: "auto" }, 0);
        }

        authTlRefs.current[index] = tl;
      });
    };

    layout();

    const onResize = () => layout();
    window.addEventListener("resize", onResize);

    if (document.fonts?.ready) {
      document.fonts.ready.then(layout).catch(() => {});
    }

    const menu = mobileMenuRef.current;
    if (menu) {
      gsap.set(menu, { visibility: "hidden", opacity: 0, scaleY: 1 });
    }

    return () => window.removeEventListener("resize", onResize);
  }, [navItems, theme, ease]);

  const handleEnter = (i) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease,
      overwrite: "auto",
    });
  };

  const handleLeave = (i) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.2,
      ease,
      overwrite: "auto",
    });
  };

//   const handleLogoEnter = () => {
//     const img = logoImgRef.current;
//     if (!img) return;
//     logoTweenRef.current?.kill();
//     gsap.set(img, { rotate: 0 });
//     logoTweenRef.current = gsap.to(img, {
//       rotate: 360,
//       duration: 0.5,
//       ease,
//       overwrite: "auto",
//     });
//   };

  const handleThemeEnter = () => {
    const tl = themeTlRef.current;
    if (!tl) return;
    themeTweenRef.current?.kill();
    themeTweenRef.current = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease,
      overwrite: "auto",
    });
    
    // Change icon color to dark on hover
    const icon = document.querySelector('.theme-toggle-icon');
    if (icon) {
      gsap.to(icon, { color: '#111827', duration: 0.3, ease });
    }
  };

  const handleThemeLeave = () => {
    const tl = themeTlRef.current;
    if (!tl) return;
    themeTweenRef.current?.kill();
    themeTweenRef.current = tl.tweenTo(0, {
      duration: 0.2,
      ease,
      overwrite: "auto",
    });
    
    // Change icon color back to white
    const icon = document.querySelector('.theme-toggle-icon');
    if (icon) {
      gsap.to(icon, { color: '#ffffff', duration: 0.2, ease });
    }
  };

  const handleAuthEnter = (i) => {
    const tl = authTlRefs.current[i];
    if (!tl) return;
    authTweenRefs.current[i]?.kill();
    authTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease,
      overwrite: "auto",
    });
  };

  const handleAuthLeave = (i) => {
    const tl = authTlRefs.current[i];
    if (!tl) return;
    authTweenRefs.current[i]?.kill();
    authTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.2,
      ease,
      overwrite: "auto",
    });
  };

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);

    const hamburger = hamburgerRef.current;
    const menu = mobileMenuRef.current;

    if (hamburger) {
      const lines = hamburger.querySelectorAll(".hamburger-line");
      if (newState) {
        gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease });
      } else {
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });
      }
    }

    if (menu) {
      if (newState) {
        gsap.set(menu, { visibility: "visible" });
        gsap.fromTo(
          menu,
          { opacity: 0, y: -10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease,
          }
        );
      } else {
        gsap.to(menu, {
          opacity: 0,
          y: -10,
          duration: 0.2,
          ease,
          onComplete: () => {
            gsap.set(menu, { visibility: "hidden" });
          },
        });
      }
    }
  };

  const cssVars = {
    ["--base"]: baseColor,
    ["--pill-bg"]: pillColor,
    ["--hover-text"]: hoveredPillTextColor,
    ["--pill-text"]: pillTextColor,
    ["--hover-bg"]: theme === "light" ? "#1e40af" : "#60a5fa",
  };

  return (
    <div className="pill-nav-container">
      <nav
        className={`pill-nav ${theme === "light" ? "bg-white" : "bg-gray-900"} shadow-sm`}
        aria-label="Primary"
        style={cssVars}
      >
        <div
          className="pill-logo"
          onClick={() => navigate("/")}
        //   onMouseEnter={handleLogoEnter}
          role="button"
          tabIndex={0}
        >
          <img src="/logo_name.png" alt="CrisisConnect Logo" ref={logoImgRef} />
        </div>

        <div className="pill-nav-items desktop-only">
          <ul className="pill-list" role="menubar">
            {navItems.map((item, i) => (
              <li key={item.href || `item-${i}`} role="none">
                <button
                  role="menuitem"
                  onClick={() => navigate(item.href)}
                  className={`pill${location.pathname === item.href ? " is-active" : ""}`}
                  aria-label={item.label}
                  onMouseEnter={() => handleEnter(i)}
                  onMouseLeave={() => handleLeave(i)}
                >
                  <span
                    className="hover-circle"
                    aria-hidden="true"
                    ref={(el) => {
                      circleRefs.current[i] = el;
                    }}
                  />
                  <span className="label-stack">
                    <span className="pill-label">{item.label}</span>
                    <span className="pill-label-hover" aria-hidden="true">
                      {item.label}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="auth-buttons desktop-only">
          {isAuthenticated ? (
            <button
              onClick={() => {
                dispatch(logoutUser());
                navigate("/");
              }}
              className="pill"
              onMouseEnter={() => handleAuthEnter(0)}
              onMouseLeave={() => handleAuthLeave(0)}
              style={{
                background: theme === "light" ? "#dc2626" : "#ef4444",
                color: "#ffffff",
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <span
                className="hover-circle"
                aria-hidden="true"
                ref={(el) => {
                  authCircleRefs.current[0] = el;
                }}
              />
              <span className="label-stack">
                <span className="pill-label">Logout</span>
                <span className="pill-label-hover" aria-hidden="true">
                  Logout
                </span>
              </span>
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate("/signup")}
                className="pill"
                onMouseEnter={() => handleAuthEnter(1)}
                onMouseLeave={() => handleAuthLeave(1)}
                style={{
                  background: pillColor,
                  color: "#ffffff",
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <span
                  className="hover-circle"
                  aria-hidden="true"
                  ref={(el) => {
                    authCircleRefs.current[1] = el;
                  }}
                />
                <span className="label-stack">
                  <span className="pill-label">Register</span>
                  <span className="pill-label-hover" aria-hidden="true">
                    Register
                  </span>
                </span>
              </button>
              <button
                onClick={() => navigate("/login")}
                className="pill"
                onMouseEnter={() => handleAuthEnter(2)}
                onMouseLeave={() => handleAuthLeave(2)}
                style={{
                  background: pillColor,
                  color: "#ffffff",
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <span
                  className="hover-circle"
                  aria-hidden="true"
                  ref={(el) => {
                    authCircleRefs.current[2] = el;
                  }}
                />
                <span className="label-stack">
                  <span className="pill-label">Login</span>
                  <span className="pill-label-hover" aria-hidden="true">
                    Login
                  </span>
                </span>
              </button>
            </>
          )}

          <button
            className="theme-toggle"
            onClick={toggleTheme}
            onMouseEnter={handleThemeEnter}
            onMouseLeave={handleThemeLeave}
            aria-label="Toggle theme"
            style={{
              background: pillColor,
            }}
          >
            <span className="hover-circle" aria-hidden="true" ref={themeCircleRef} style={{ background: '#ffffff' }} />
            <span className="theme-toggle-icon" style={{ color: '#ffffff' }}>
              {theme === "light" ? <Sun size={22} /> : <Moon size={22} />}
            </span>
          </button>
        </div>

        <button
          className="mobile-menu-button mobile-only"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          ref={hamburgerRef}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </nav>

      <div className="mobile-menu-popover mobile-only" ref={mobileMenuRef} style={cssVars}>
        <ul className="mobile-menu-list">
          {navItems.map((item, i) => (
            <li key={item.href || `mobile-item-${i}`}>
              <button
                onClick={() => {
                  navigate(item.href);
                  setIsMobileMenuOpen(false);
                }}
                className={`mobile-menu-link${location.pathname === item.href ? " is-active" : ""}`}
              >
                {item.icon && item.icon}
                {item.label}
              </button>
            </li>
          ))}

          {isAuthenticated ? (
            <li>
              <button
                onClick={() => {
                  dispatch(logoutUser());
                  navigate("/");
                  setIsMobileMenuOpen(false);
                }}
                className="mobile-menu-link"
                style={{
                  background: theme === "light" ? "#dc2626" : "#ef4444",
                  color: "#ffffff",
                }}
              >
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <button
                  onClick={() => {
                    navigate("/signup");
                    setIsMobileMenuOpen(false);
                  }}
                  className="mobile-menu-link"
                >
                  Register
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate("/login");
                    setIsMobileMenuOpen(false);
                  }}
                  className="mobile-menu-link"
                >
                  Login
                </button>
              </li>
            </>
          )}

          <li>
            <button
              onClick={() => {
                toggleTheme();
                setIsMobileMenuOpen(false);
              }}
              className="mobile-menu-link"
            >
              {theme === "light" ? (
                <>
                  <Sun size={20} />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon size={20} />
                  <span>Dark Mode</span>
                </>
              )}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PillNavbar;
