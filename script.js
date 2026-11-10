document.getElementById("year").textContent = new Date().getFullYear();
const root = document.documentElement;
let saved = null;
try { saved = localStorage.getItem("theme"); } catch (e) {}
root.dataset.theme = saved || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
document.getElementById("theme").onclick = () => {
  const n = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = n;
  try { localStorage.setItem("theme", n); } catch (e) {}
};
document.getElementById("filters").onclick = (e) => {
  const f = e.target.dataset.f; if (!f) return;
  document.querySelectorAll("#filters button").forEach((b) => b.classList.toggle("on", b === e.target));
  document.querySelectorAll(".proj").forEach((p) => p.classList.toggle("hide", f !== "all" && !p.dataset.tags.split(" ").includes(f)));
};
const links = [...document.querySelectorAll("#nav a")];
const spy = new IntersectionObserver((es) => es.forEach((e) => {
  if (e.isIntersecting) links.forEach((a) => a.classList.toggle("on", a.getAttribute("href") === "#" + e.target.id));
}), { rootMargin: "-30% 0px -60% 0px" });
document.querySelectorAll("main section").forEach((s) => spy.observe(s));
