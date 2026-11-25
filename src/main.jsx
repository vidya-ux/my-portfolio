import React, { Suspense, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, MeshDistortMaterial, PresentationControls, Sparkles, Stars } from "@react-three/drei";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail, Menu, X, Copy, Check, Code2, Cpu, Layers3, Sparkles as SparkleIcon } from "lucide-react";
import * as THREE from "three";
import "./index.css";

const EMAIL = "vidyavinay1830@gmail.com"; // Replace with your real email.
const SOCIALS = { linkedin: "https://www.linkedin.com/in/vidyashree-p-667b73341/", github: "https://github.com/vidya-ux" };
const projects = [
 {id:"01",title:"VisionGuard",category:"AI · COMPUTER VISION",year:"2026 — 27",description:"A vision-based crowd monitoring system that analyzes video, estimates crowd density and movement, and highlights potential stampede-risk conditions through a dashboard and alerts.",stack:["Python","YOLOv8","OpenCV","NumPy","Streamlit"],visual:"vision",label:"VISION / GUARD"},
 {id:"02",title:"CareerConnect",category:"FULL-STACK APPLICATION",year:"2026",description:"A recruitment portal concept connecting students and recruiters, with role-based access and a foundation for managing opportunities and applications.",stack:["React","Node.js","Express","MongoDB","JWT"],visual:"career",label:"CAREER / CONNECT"},
 {id:"03",title:"Billing System",category:"BACKEND DEVELOPMENT",year:"2026",description:"A REST API-based billing application exploring authentication, user roles, database operations, and API testing workflows.",stack:["Node.js","Express","MongoDB","JWT","Postman"],visual:"billing",label:"BILLING / SYSTEM"},
 {id:"04",title:"Expense Tracker",category:"FRONTEND DEVELOPMENT",year:"2026",description:"A responsive interface for recording income and expenses, reviewing transaction history, and understanding spending through clear summaries.",stack:["React","JavaScript","Local Storage","Charts"],visual:"expense",label:"TRACK / BETTER"}
];
const skillGroups = [
 {title:"Frontend",icon:Code2,skills:["HTML","CSS","JavaScript","React","Vite"]},
 {title:"Backend",icon:Layers3,skills:["Node.js","Express.js","REST APIs","JWT"]},
 {title:"AI & Vision",icon:Cpu,skills:["Python","YOLOv8","OpenCV","NumPy","Streamlit"]},
 {title:"Tools",icon:SparkleIcon,skills:["Git","GitHub","VS Code","Postman","MongoDB Compass"]}
];

function Sculpture(){
 const group=useRef(); const mesh=useRef(); const {pointer}=useThree(); const [mobile,setMobile]=useState(false);
 useEffect(()=>{const f=()=>setMobile(innerWidth<700);f();addEventListener("resize",f);return()=>removeEventListener("resize",f)},[]);
 useFrame((_,dt)=>{
  if(!group.current)return;
  const max=Math.max(document.body.scrollHeight-innerHeight,1);
  const p=Math.min(scrollY/max,1);
  group.current.rotation.x=THREE.MathUtils.damp(group.current.rotation.x,pointer.y*.22+p*.55,2.2,dt);
  group.current.rotation.y=THREE.MathUtils.damp(group.current.rotation.y,pointer.x*.3+p*1.3,2.2,dt);
  group.current.position.x=THREE.MathUtils.damp(group.current.position.x,p*(mobile?.35:1.05),2,dt);
  group.current.position.y=THREE.MathUtils.damp(group.current.position.y,p*-.28,2,dt);
  group.current.scale.setScalar((mobile?.72:1)*(1-p*.12));
  if(mesh.current)mesh.current.rotation.z+=dt*.12;
 });
 return <group ref={group}><Float speed={1.25} rotationIntensity={.22} floatIntensity={.42}><mesh ref={mesh}><torusKnotGeometry args={[1.12,.34,220,32,2,5]}/><MeshDistortMaterial color="#9a9aff" roughness={.12} metalness={.82} clearcoat={1} clearcoatRoughness={.08} distort={.28} speed={1.7}/></mesh></Float><mesh scale={1.75}><icosahedronGeometry args={[1,1]}/><meshBasicMaterial color="#67e8f9" wireframe transparent opacity={.12}/></mesh></group>;
}
function Scene(){
 const [mobile,setMobile]=useState(false);
 useEffect(()=>{const f=()=>setMobile(innerWidth<700);f();addEventListener("resize",f);return()=>removeEventListener("resize",f)},[]);
 return <div className="scene-wrap" aria-hidden="true"><Canvas camera={{position:[0,0,5.2],fov:44}} dpr={[1,1.6]} gl={{antialias:true,alpha:true,powerPreference:"high-performance"}}><Suspense fallback={null}><ambientLight intensity={.75}/><pointLight position={[4,3,4]} intensity={22} color="#7dd3fc"/><pointLight position={[-4,-2,2]} intensity={16} color="#a78bfa"/><pointLight position={[0,4,-3]} intensity={9}/><PresentationControls global config={{mass:2,tension:180}} snap={{mass:3,tension:180}} rotation={[0,0,0]} polar={[-.35,.35]} azimuth={[-.55,.55]}><Sculpture/></PresentationControls><Sparkles count={mobile?38:95} scale={mobile?7:11} size={2.1} speed={.22} opacity={.62} color="#b7c7ff"/><Stars radius={45} depth={25} count={mobile?350:850} factor={2.2} saturation={.25} fade speed={.35}/><Environment preset="city"/></Suspense></Canvas></div>;
}
function Reveal({children,className="",delay=0}){return <motion.div className={className} initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.18}} transition={{duration:.7,delay,ease:[.22,1,.36,1]}}>{children}</motion.div>}
function ProjectCard({project,index}){
 const ref=useRef(null);
 function move(e){if(!ref.current||matchMedia("(pointer: coarse)").matches)return;const r=ref.current.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;ref.current.style.setProperty("--rx",`${(.5-y)*8}deg`);ref.current.style.setProperty("--ry",`${(x-.5)*10}deg`);ref.current.style.setProperty("--mx",`${x*100}%`);ref.current.style.setProperty("--my",`${y*100}%`)}
 function reset(){if(!ref.current)return;ref.current.style.setProperty("--rx","0deg");ref.current.style.setProperty("--ry","0deg");ref.current.style.setProperty("--mx","50%");ref.current.style.setProperty("--my","50%")}
 return <Reveal delay={index*.08}><article ref={ref} className="project-card glass-card" onMouseMove={move} onMouseLeave={reset}><div className={`project-visual ${project.visual}`}><div className="visual-orbit orbit-a"/><div className="visual-orbit orbit-b"/><span className="visual-index">{project.id} / SELECTED WORK</span><div className="visual-word">{project.label.split(" / ").map((s,i)=><React.Fragment key={s}>{s}{i===0&&<br/>}</React.Fragment>)}</div><span className="visual-year">{project.year}</span></div><div className="project-info"><div className="project-category">{project.category}<span>{project.year}</span></div><h3>{project.title}</h3><p>{project.description}</p><div className="tag-list">{project.stack.map(s=><span key={s}>{s}</span>)}</div><a className="project-link" href="#contact">Discuss project <ArrowUpRight size={15}/></a></div></article></Reveal>;
}
function App(){
 const [menu,setMenu]=useState(false),[copied,setCopied]=useState(false),[toast,setToast]=useState(false);
 async function copyEmail(){try{await navigator.clipboard.writeText(EMAIL);setCopied(true);setToast(true);setTimeout(()=>{setCopied(false);setToast(false)},2400)}catch{location.href=`mailto:${EMAIL}`}}
 const nav=[["Work","#work"],["About","#about"],["Contact","#contact"]];
 return <div className="app-shell"><div className="ambient ambient-one"/><div className="ambient ambient-two"/>
 <nav className="navbar glass-nav"><a className="brand" href="#home" onClick={()=>setMenu(false)}>Vidyashree<span>.</span></a><button className="mobile-menu" aria-label="Toggle menu" aria-expanded={menu} onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button><div className={`nav-items ${menu?"open":""}`}>{nav.map(([t,h])=><a key={t} href={h} onClick={()=>setMenu(false)}>{t}</a>)}<a className="nav-contact" href="#contact" onClick={()=>setMenu(false)}>Let's talk <ArrowUpRight size={14}/></a></div></nav>
 <header className="hero" id="home"><Scene/><div className="hero-vignette"/><div className="hero-content">
 <motion.div className="hero-kicker" initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{delay:.2}}><span className="availability-dot"/> COMPUTER SCIENCE ENGINEERING · MYSURU, INDIA</motion.div>
 <motion.h1 initial="hidden" animate="show" variants={{hidden:{},show:{transition:{staggerChildren:.13,delayChildren:.35}}}}>{["Ideas into","digital reality."].map((line,i)=><motion.span key={line} className={i?"gradient-text":""} variants={{hidden:{opacity:0,y:48,filter:"blur(10px)"},show:{opacity:1,y:0,filter:"blur(0px)",transition:{duration:.8,ease:[.22,1,.36,1]}}}}>{line}</motion.span>)}</motion.h1>
 <motion.p className="hero-description" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.9}}>I'm Vidyashree — a developer in the making, exploring full-stack engineering and applied AI. I build practical digital experiences with curiosity, care, and a focus on solving real problems.</motion.p>
 <motion.div className="hero-buttons" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:1.05}}><a className="primary-cta" href="#work">Explore work <ArrowDown size={16}/></a><a className="text-cta" href="#about">More about me <ArrowUpRight size={16}/></a></motion.div></div>
 <div className="hero-bottomline"><span>SCROLL TO EXPLORE</span><span>FULL-STACK · AI · CREATIVE TECHNOLOGY</span><span>01 — 04</span></div><div className="hero-side-note">DESIGNING / BUILDING / LEARNING</div></header>
 <main>
 <section className="section work-section" id="work"><div className="section-container"><Reveal className="section-intro"><div><div className="eyebrow">01 / SELECTED WORK</div><h2>Curiosity, turned<br/><span>into projects.</span></h2></div><p>A selection of academic and practice projects where I explore real problems, learn new tools, and turn concepts into working experiences.</p></Reveal><div className="projects-grid">{projects.map((p,i)=><ProjectCard key={p.id} project={p} index={i}/>)}</div></div></section>
 <section className="section about-section" id="about"><div className="section-container"><Reveal className="section-intro"><div><div className="eyebrow">02 / ABOUT & SKILLS</div><h2>Curious by nature.<br/><span>Practical by approach.</span></h2></div><p>I enjoy understanding how technology works and using it to create things that are genuinely useful.</p></Reveal>
 <div className="about-grid"><Reveal className="bio-panel glass-card"><div className="bio-top"><span className="mini-mark">VP.</span><span className="eyebrow">A LITTLE ABOUT ME</span></div><p>I'm Vidyashree, a final-year Computer Science Engineering student with an interest in <strong>full-stack development and applied AI</strong>. My learning journey includes building web applications, working with APIs and databases, and exploring computer vision.</p><p>I learn best by building: understanding a concept, applying it in a project, finding what can improve, and iterating. I value clear communication, thoughtful teamwork, and technology that makes a meaningful difference.</p><div className="bio-footer"><span>BASED IN MYSURU, INDIA</span><span>OPEN TO INTERNSHIPS & ENTRY-LEVEL ROLES</span></div></Reveal>
 <div className="skill-cloud">{skillGroups.map((g,i)=>{const Icon=g.icon;return <Reveal key={g.title} delay={i*.06} className="skill-panel glass-card"><div className="skill-heading"><span className="skill-icon"><Icon size={17}/></span><h3>{g.title}</h3><span className="skill-count">0{i+1}</span></div><div className="tag-list">{g.skills.map(s=><span key={s}>{s}</span>)}</div></Reveal>})}</div></div>
 <Reveal className="experience-strip glass-card"><div><span className="eyebrow">EDUCATION</span><strong>B.E. — Computer Science & Engineering</strong><small>Maharaja Institute of Technology · Expected 2027</small></div><div><span className="eyebrow">TRAINING</span><strong>Full-Stack Development</strong><small>TVS Training & Services · 2026</small></div><div><span className="eyebrow">FOUNDATION</span><strong>Diploma — Civil Engineering</strong><small>Completed 2024</small></div></Reveal></div></section>
 <section className="contact-section" id="contact"><div className="contact-glow"/><div className="section-container contact-content"><Reveal><div className="eyebrow">03 / GET IN TOUCH</div><h2>Have an idea?<br/><span>Let's make it real.</span></h2><p>I'm looking for opportunities to contribute, learn from experienced teams, and grow as a developer. If you have an opportunity or simply want to connect, my inbox is open.</p><div className="contact-actions"><button className="copy-button" onClick={copyEmail}>{copied?<Check size={17}/>:<Copy size={17}/>} {copied?"Email copied":"Copy email address"}</button><a className="social-link" href={SOCIALS.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17}/> LinkedIn <ArrowUpRight size={14}/></a><a className="social-link" href={SOCIALS.github} target="_blank" rel="noreferrer"><Github size={17}/> GitHub <ArrowUpRight size={14}/></a></div><div className="email-placeholder"><Mail size={14}/> Replace the sample email and social profile URLs in src/main.jsx before publishing.</div></Reveal></div></section>
 </main><footer className="footer"><div className="section-container footer-inner"><a className="brand" href="#home">Vidyashree<span>.</span></a><span>© {new Date().getFullYear()} VIDYASHREE P. — BUILT WITH CURIOSITY</span><a href="#home">BACK TO TOP ↑</a></div></footer>
 <AnimatePresence>{toast&&<motion.div className="toast" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0,y:16}}><Check size={16}/> Email address copied</motion.div>}</AnimatePresence></div>;
}
createRoot(document.getElementById("root")).render(<App/>);
