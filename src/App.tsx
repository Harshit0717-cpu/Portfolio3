import { Canvas, useFrame } from '@react-three/fiber'
import { Float, PerspectiveCamera } from '@react-three/drei'
import { motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Brain, Cloud, Code2, Database, Download, Mail } from 'lucide-react'
import { useRef } from 'react'
import * as THREE from 'three'

type Project = { title:string; type:string; description:string; tech:string[]; number:string }

const projects: Project[] = [
  { number:'01', title:'EchoSafe', type:'AI / FULL STACK', description:'An anonymous complaint platform with authentication, Firestore-backed reports and an admin dashboard designed around privacy and practical workflows.', tech:['React','Firebase','Firestore'] },
  { number:'02', title:'AI Attendance', type:'COMPUTER VISION', description:'A face-recognition attendance prototype in Python with automated notification flow through the Twilio WhatsApp Sandbox.', tech:['Python','Computer Vision','Twilio'] },
  { number:'03', title:'Delhi AQI Pipeline', type:'DATA ENGINEERING', description:'An ETL-oriented data engineering project focused on collecting, processing and preparing Delhi air-quality data for analysis.', tech:['Python','ETL','Data Processing'] },
  { number:'04', title:'Coming Soon', type:'NEXT BUILD', description:'The next experiment is loading. New projects can be added through the project data layer without rebuilding the UI.', tech:['Build','Experiment','Ship'] },
]

const skills = ['Python','React','Java','Node.js','Azure','SQL','Pandas','NumPy']

function FloatingObject({ position, scale=1, rotation=[0,0,0] as [number,number,number] }: {position:[number,number,number]; scale?:number; rotation?:[number,number,number]}) {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame((_, delta) => { ref.current.rotation.x += delta*.18; ref.current.rotation.y += delta*.25 })
  return <Float speed={1.4} rotationIntensity={.35} floatIntensity={.7}><mesh ref={ref} position={position} scale={scale} rotation={rotation}><boxGeometry args={[1,1,1]}/><meshBasicMaterial wireframe opacity={.28} transparent/></mesh></Float>
}

function World() {
  const ref = useRef<THREE.Group>(null!)
  useFrame(({ pointer }, delta) => {
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, pointer.x*.12, delta*2)
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, -pointer.y*.07, delta*2)
  })
  return <group ref={ref}>
    <FloatingObject position={[2.9,1.6,-1]} scale={1.4} />
    <FloatingObject position={[-3,-.8,-1.5]} scale={.9} rotation={[.3,.5,.2]} />
    <FloatingObject position={[3.5,-1.7,-2]} scale={.55} />
    <Float speed={1.1} rotationIntensity={.6} floatIntensity={1}><mesh position={[-2.1,1.8,-2]}><torusGeometry args={[.72,.018,12,80]}/><meshBasicMaterial transparent opacity={.5}/></mesh></Float>
  </group>
}

function Scene(){ return <div className="world"><Canvas dpr={[1,1.5]} gl={{antialias:true,alpha:true}}><PerspectiveCamera makeDefault position={[0,0,8]} fov={48}/><ambientLight intensity={1}/><World/></Canvas></div> }

function Label({children}:{children:string}){ return <div className="section-label"><span/> {children}</div> }

export default function App(){
  return <div className="app">
    <nav className="nav"><a className="brand" href="#top">HD<span>_</span></a><div className="nav-links"><a href="#about">About</a><a href="#skills">Skills</a><a href="#projects">Projects</a><a href="#contact">Contact</a></div><a className="nav-status" href="#contact"><i/> AVAILABLE</a></nav>

    <main id="top">
      <section className="hero">
        <Scene/><div className="hero-grid"/>
        <div className="hero-content">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.7}} className="eyebrow">COMPUTER SCIENCE <b>×</b> AI / ML</motion.div>
          <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:.8,delay:.1}}>HARSHIT<br/><em>DUBEY</em></motion.h1>
          <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.35}} className="hero-copy">Building intelligent systems that turn ideas into experiences.</motion.p>
          <div className="hero-actions"><a className="button primary" href="#projects">EXPLORE WORK <ArrowUpRight size={17}/></a><a className="button" href="/resume.pdf" download><Download size={16}/> RESUME</a></div>
        </div>
        <div className="hero-meta"><span>BASED IN INDIA</span><span>02° 10′ N / 78° 57′ E</span></div>
        <a className="scroll" href="#about"><span>SCROLL TO DISCOVER</span><ArrowDown size={16}/></a>
      </section>

      <section id="about" className="section about"><div><Label>01 / ABOUT</Label><h2>CURIOUS BY<br/><span>DEFAULT.</span></h2></div><div className="about-copy"><p className="lead">I'm a Computer Science & Engineering undergraduate focused on AI/ML, full-stack development, data engineering and cloud technologies.</p><p>I enjoy turning complex problems into practical software and learning by building — from hackathons and prototypes to systems that solve real problems.</p><div className="stats"><div><strong>8.5</strong><span>CGPA</span></div><div><strong>5+</strong><span>HACKATHONS</span></div><div><strong>942</strong><span>AZ-900 SCORE</span></div></div></div></section>

      <section id="skills" className="section skills"><div className="skills-head"><Label>02 / CAPABILITIES</Label><h2>TOOLS OF<br/><span>THE TRADE.</span></h2></div><div className="constellation"><div className="ring r1"/><div className="ring r2"/>{skills.map((s,i)=><motion.div key={s} className="skill-node" style={{'--x':`${50 + Math.cos(i*Math.PI/4)*37}%`,'--y':`${50 + Math.sin(i*Math.PI/4)*37}%`} as React.CSSProperties} whileHover={{scale:1.15}}>{s}</motion.div>)}</div><div className="skill-groups"><div><Code2/><h3>DEVELOPMENT</h3><p>React · Node.js · Java · REST APIs · Git</p></div><div><Brain/><h3>AI / DATA</h3><p>Python · Pandas · NumPy · EDA · ML foundations</p></div><div><Database/><h3>DATA</h3><p>SQL · MySQL · MongoDB · Firebase · ETL</p></div><div><Cloud/><h3>CLOUD</h3><p>Microsoft Azure · Docker · Vercel · Render · Supabase</p></div></div></section>

      <section id="projects" className="section projects"><div className="project-head"><div><Label>03 / SELECTED WORK</Label><h2>BUILT TO<br/><span>LEARN.</span></h2></div><p>Projects are where concepts become systems. Each build is an experiment in solving a real problem with clean engineering.</p></div><div className="project-list">{projects.map((p,i)=><motion.article className="project-card" key={p.title} whileHover={{y:-8,rotateX:2}} transition={{type:'spring',stiffness:240}}><div className="project-number">{p.number}</div><div className="project-main"><span className="project-type">{p.type}</span><h3>{p.title}</h3><p>{p.description}</p><div className="tags">{p.tech.map(t=><span key={t}>{t}</span>)}</div></div><ArrowUpRight className="project-arrow"/></motion.article>)}</div></section>

      <section className="section journey"><Label>04 / JOURNEY</Label><div className="timeline"><div><span>2025 — 2029</span><h3>B.Tech CSE (AI & ML)</h3><p>GLA University, Mathura · Current CGPA 8.5</p></div><div><span>ONGOING</span><h3>Building & Experimenting</h3><p>Full-stack products, AI prototypes, data engineering and cloud workflows.</p></div><div><span>RECENT</span><h3>Hackathons & Challenges</h3><p>5+ hackathons and selected participant at the IIT Kanpur Policy Hackathon.</p></div></div></section>

      <section className="section achievements"><Label>05 / SIGNALS</Label><h2>PROOF OF<br/><span>PROGRESS.</span></h2><div className="achievement-grid"><div><strong>942<span>/1000</span></strong><b>MICROSOFT AZ-900</b><small>Azure Fundamentals Certified</small></div><div><strong>5+</strong><b>HACKATHONS</b><small>Learning through competitive builds</small></div><div><strong>IITK</strong><b>POLICY HACKATHON</b><small>Selected participant</small></div></div></section>

      <section id="contact" className="contact"><div className="contact-inner"><Label>06 / CONTACT</Label><h2>LET'S BUILD<br/><em>SOMETHING.</em></h2><p>Got a problem worth solving, a product to build, or a team looking for an AI/ML-minded developer?</p><div className="contact-actions"><a className="button primary" href="mailto:dharshit099@gmail.com"><Mail size={17}/> GET IN TOUCH</a><a className="button" href="https://github.com/Harshit0717-cpu" target="_blank" rel="noreferrer"><GithubIcon/> GITHUB</a><a className="button" href="https://www.linkedin.com/in/harshit-dubey-02a637380/" target="_blank" rel="noreferrer"><LinkedinIcon/> LINKEDIN</a></div><a className="email" href="mailto:dharshit099@gmail.com">dharshit099@gmail.com</a></div></section>
    </main>
    <footer><span>HARSHIT DUBEY © 2026</span><span>DESIGNED / BUILT WITH CURIOSITY</span></footer>
  </div>
}

function GithubIcon(){return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .6a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.05c-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.33-1.77-1.33-1.77-1.09-.75.08-.74.08-.74 1.2.08 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.29-1.23 3.29-1.23.65 1.65.24 2.87.12 3.17.76.84 1.23 1.91 1.23 3.22 0 4.62-2.8 5.64-5.48 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .6Z"/></svg>}
function LinkedinIcon(){return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5.2 3.5A2.5 2.5 0 1 1 5.2 8a2.5 2.5 0 0 1 0-4.5ZM3.1 9.7h4.2V21H3.1V9.7Zm6.8 0h4v1.55h.06c.56-1.07 1.93-2.2 3.98-2.2 4.26 0 5.05 2.8 5.05 6.44V21h-4.16v-4.9c0-1.17-.02-2.68-1.63-2.68-1.63 0-1.88 1.27-1.88 2.59V21H9.9V9.7Z"/></svg>}
