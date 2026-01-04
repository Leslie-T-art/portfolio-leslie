"use client";

import { useEffect, useRef, useState, useCallback, FormEvent } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { 
  ArrowDown, 
  Github, 
  Linkedin, 
  Mail, 
  Code2, 
  Cpu,
  Zap,
  Globe,
  Layers,
  Terminal,
  Send,
  ArrowUpRight,
  Rocket,
  Volume2,
  VolumeX,
  Shield,
  CheckCircle,
  Loader2
} from "lucide-react";
import Script from "next/script";

// Cursor Glow Effect
function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div 
      className="cursor-glow hide-mobile"
      style={{ left: position.x, top: position.y }}
    />
  );
}

// Audio Player Hook
function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    audioRef.current.src = "https://cdn.pixabay.com/audio/2024/11/04/audio_4956b4edd1.mp3";
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleAudio = useCallback(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {
        console.log("Audio autoplay blocked");
      });
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  return { isPlaying, toggleAudio };
}

// Bottom Navigation - Centered with Logo and Audio inline
function BottomNavigation() {
  const { isPlaying, toggleAudio } = useAudioPlayer();

  return (
    <div className="bottom-nav-container">
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="bottom-nav"
      >
        {/* Logo */}
        <a href="#" className="nav-logo">
          <span className="logo-icon">LC</span>
          <span className="hide-mobile">LESLIE</span>
        </a>
        
        {/* Nav Links */}
        <div className="nav-links">
          <a href="#" className="bottom-nav-link active">Home</a>
          <a href="#projects" className="bottom-nav-link">Projects</a>
          <a href="#skills" className="bottom-nav-link">Skills</a>
          <a href="#about" className="bottom-nav-link">About</a>
        </div>
        
        {/* Audio Toggle */}
        <button 
          className={`audio-toggle ${isPlaying ? 'playing' : ''}`}
          onClick={toggleAudio}
          aria-label={isPlaying ? 'Mute audio' : 'Play audio'}
        >
          {isPlaying ? <Volume2 /> : <VolumeX />}
        </button>
      </motion.nav>
    </div>
  );
}

// Hero Section with Native Spline Viewer
function HeroSection() {
  const { scrollY } = useScroll();
  
  // Transform based on window scroll position
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const y = useTransform(scrollY, [0, 800], [0, 240]);

  return (
    <section className="hero">
      <div className="hero-spline">
        <spline-viewer 
          url="https://prod.spline.design/9ULHNzmv8iyfhWlX/scene.splinecode"
          loading-anim-type="spinner-small-dark"
        />
      </div>

      <motion.div className="hero-content" style={{ y, opacity }}>
        <div className="hero-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hero-badge"
          >
            <span>SOFTWARE ENGINEER</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hero-title"
          >
            <span className="title-line">Crafting</span>
            <span className="title-line title-italic">the Digital</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="hero-cta"
          >
            <a href="#projects" className="btn-glass">
              <Rocket size={18} />
              View Projects
            </a>
            <a href="#contact" className="btn-primary">
              <Mail size={18} />
              Get In Touch
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="hero-right"
        >
          <div className="hero-tagline">
            on the
            <br />
            <span className="tagline-gradient">Code.</span>
            <span className="tagline-small">
              I help clients build extraordinary digital experiences through innovative engineering solutions.
            </span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="hero-scroll"
      >
        Scroll to explore
        <ArrowDown size={14} />
      </motion.div>
    </section>
  );
}

// About Section
function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { number: "5+", label: "Years Experience" },
    { number: "50+", label: "Projects Completed" },
    { number: "30+", label: "Happy Clients" },
    { number: "99%", label: "Code Quality" }
  ];

  return (
    <section id="about" className="section about-section" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="about-header"
        >
          <span className="section-label">About Me</span>
          <h2 className="section-title">
            Passionate About <span className="italic accent">Innovation</span>
          </h2>
          <p className="section-subtitle">
            Building tomorrow&apos;s technology today with precision and creativity
          </p>
        </motion.div>

        <div className="about-content">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="about-text"
          >
            <div className="glass-card">
              <div className="about-icon-wrapper">
                <Code2 size={28} />
              </div>
              <h3>Full-Stack Engineer</h3>
              <p>
                I specialize in creating high-performance web applications using 
                cutting-edge technologies. From concept to deployment, I ensure 
                every line of code is crafted with purpose and precision.
              </p>
              <p>
                My expertise spans the entire development lifecycle, from 
                architecting scalable systems to building intuitive user interfaces 
                that delight and engage.
              </p>
              <div className="about-tags">
                <span className="tag">React</span>
                <span className="tag">Next.js</span>
                <span className="tag">Node.js</span>
                <span className="tag">TypeScript</span>
                <span className="tag">Python</span>
                <span className="tag">AWS</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="about-stats"
          >
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="stat-card glass-card"
                >
                  <span className="stat-number">{stat.number}</span>
                  <span className="stat-label">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Projects Section - Updated with real projects
function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = [
    {
      name: "Verix CyberPal",
      url: "https://verixcyberpal.co.zw/",
      description: "Comprehensive cybersecurity platform providing advanced threat detection, security monitoring, and digital protection solutions for businesses.",
      tags: ["React", "Node.js", "Cybersecurity", "AI"],
      gradient: "linear-gradient(135deg, #0f172a 0%, #1e40af 50%, #3b82f6 100%)",
      logo: "🛡️",
      accent: "#fff"
    },
    {
      name: "Security Dashboard",
      url: "https://verixcyberpal.co.zw/",
      description: "Real-time security monitoring dashboard with threat analytics, vulnerability scanning, and automated incident response capabilities.",
      tags: ["TypeScript", "Next.js", "Analytics", "API"],
      gradient: "linear-gradient(135deg, #0c4a6e 0%, #0891b2 50%, #06b6d4 100%)",
      logo: "📊",
      accent: "#fff"
    },
    {
      name: "Threat Intelligence",
      url: "https://verixcyberpal.co.zw/",
      description: "AI-powered threat intelligence system that analyzes patterns, predicts vulnerabilities, and provides actionable security insights.",
      tags: ["Python", "Machine Learning", "Cloud", "API"],
      gradient: "linear-gradient(135deg, #581c87 0%, #7c3aed 50%, #a855f7 100%)",
      logo: "🔍",
      accent: "#fff"
    },
    {
      name: "Secure Solutions",
      url: "https://verixcyberpal.co.zw/",
      description: "Enterprise-grade security solutions including encryption, access control, and compliance management for modern organizations.",
      tags: ["Enterprise", "Compliance", "Encryption", "IAM"],
      gradient: "linear-gradient(135deg, #065f46 0%, #059669 50%, #10b981 100%)",
      logo: "🔐",
      accent: "#fff"
    }
  ];

  return (
    <section id="projects" className="section projects-section" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="projects-header"
        >
          <span className="section-label">Portfolio</span>
          <h2 className="section-title">
            Featured <span className="italic accent">Projects</span>
          </h2>
          <p className="section-subtitle">
            Showcase of my cybersecurity and software engineering work
          </p>
        </motion.div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="project-card"
            >
              <div className="project-preview" style={{ background: project.gradient }}>
                <div className="project-brand">
                  <span className="brand-logo" style={{ color: project.accent }}>{project.logo}</span>
                  <span className="brand-name" style={{ color: project.accent }}>{project.name}</span>
                </div>
                <div className="project-dots">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="dot" style={{ animationDelay: `${i * 0.1}s` }} />
                  ))}
                </div>
                <div className="project-preview-overlay">
                  <a 
                    href={project.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="preview-btn"
                  >
                    <span>Visit Site</span>
                    <ArrowUpRight size={18} />
                  </a>
                </div>
              </div>
              
              <div className="project-info">
                <h3 className="project-name">{project.name}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="project-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="floating-icons">
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="floating-icon icon-1"
        >
          <Shield size={48} />
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 7, repeat: Infinity, delay: 1 }}
          className="floating-icon icon-2"
        >
          <Layers size={48} />
        </motion.div>
      </div>
    </section>
  );
}

// Skills Section
function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skills = [
    { name: "Frontend Development", icon: <Globe />, items: ["React", "Next.js", "Vue.js", "TypeScript", "Tailwind CSS"] },
    { name: "Backend Development", icon: <Terminal />, items: ["Node.js", "Python", "Go", "PostgreSQL", "MongoDB"] },
    { name: "Cloud & DevOps", icon: <Cpu />, items: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform"] },
    { name: "Tools & Methods", icon: <Zap />, items: ["Git", "Agile", "Testing", "Performance", "Security"] }
  ];

  return (
    <section id="skills" className="section skills-section" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="skills-header"
        >
          <span className="section-label">Expertise</span>
          <h2 className="section-title">
            Technical <span className="italic accent">Skills</span>
          </h2>
          <p className="section-subtitle">
            A comprehensive toolkit for building exceptional software
          </p>
        </motion.div>

        <div className="skills-grid">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="skill-card glass-card"
            >
              <div className="skill-icon">{skill.icon}</div>
              <h3 className="skill-title">{skill.name}</h3>
              <ul className="skill-list">
                {skill.items.map((item, itemIndex) => (
                  <motion.li
                    key={itemIndex}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.3 + itemIndex * 0.05 }}
                  >
                    <span className="skill-bullet" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Contact Section with Web3Forms Email Integration
function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formMessage, setFormMessage] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('loading');

    const form = e.currentTarget;
    
    // Create clean form data with only required fields
    const formData = new FormData();
    formData.append('access_key', 'YOUR_WEB3FORMS_ACCESS_KEY'); // Get free key at https://web3forms.com
    formData.append('name', form.querySelector<HTMLInputElement>('#name')?.value || '');
    formData.append('email', form.querySelector<HTMLInputElement>('#email')?.value || '');
    formData.append('subject', form.querySelector<HTMLInputElement>('#subject')?.value || '');
    formData.append('message', form.querySelector<HTMLTextAreaElement>('#message')?.value || '');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setFormStatus('success');
        setFormMessage('Message sent successfully! I\'ll get back to you soon.');
        form.reset();
      } else {
        throw new Error(data.message || 'Something went wrong');
      }
    } catch {
      setFormStatus('error');
      setFormMessage('Failed to send message. Please try emailing me directly.');
    }

    // Reset status after 5 seconds
    setTimeout(() => {
      setFormStatus('idle');
      setFormMessage('');
    }, 5000);
  };

  return (
    <section id="contact" className="section contact-section" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="contact-content"
        >
          <span className="section-label">Get In Touch</span>
          <h2 className="section-title">
            Let&apos;s Build Something <span className="italic accent">Amazing</span>
          </h2>
          <p className="section-subtitle" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            Have a project in mind? I&apos;d love to hear about it.
          </p>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="contact-form glass-card"
            onSubmit={handleSubmit}
          >
            {/* Honeypot for spam protection */}
            <input type="checkbox" name="botcheck" style={{ display: 'none' }} />
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  placeholder="Your name" 
                  required 
                  disabled={formStatus === 'loading'}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="your@email.com" 
                  required 
                  disabled={formStatus === 'loading'}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input 
                type="text" 
                id="subject" 
                name="subject" 
                placeholder="Project inquiry" 
                required 
                disabled={formStatus === 'loading'}
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea 
                id="message" 
                name="message" 
                rows={4} 
                placeholder="Tell me about your project..." 
                required 
                disabled={formStatus === 'loading'}
              />
            </div>

            {/* Form Status Message */}
            {formMessage && (
              <div className={`form-message ${formStatus}`}>
                {formStatus === 'success' && <CheckCircle size={18} />}
                {formMessage}
              </div>
            )}

            <button 
              type="submit" 
              className="submit-btn"
              disabled={formStatus === 'loading'}
            >
              {formStatus === 'loading' ? (
                <>
                  <Loader2 size={18} className="spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Message
                </>
              )}
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="contact-social"
          >
            <p>Or connect with me on</p>
            <div className="social-links">
              <a 
                href="https://github.com/Leslie-T-art" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-link"
                aria-label="GitHub"
              >
                <Github />
              </a>
              <a 
                href="https://www.linkedin.com/in/leslie-chihwai-284515170/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-link"
                aria-label="LinkedIn"
              >
                <Linkedin />
              </a>
              <a 
                href="mailto:chihwaileslie@gmail.com" 
                className="social-link"
                aria-label="Email"
              >
                <Mail />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="contact-bg">
        <div className="gradient-orb orb-1" />
        <div className="gradient-orb orb-2" />
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <a href="#" className="footer-logo">
            <span className="logo-icon" style={{ width: 24, height: 24, fontSize: '0.6rem' }}>LC</span>
            LESLIE
          </a>
          <p className="footer-text">
            Designed & Built with 💙 using Next.js
          </p>
          <p className="footer-copyright">
            © {new Date().getFullYear()} Leslie Chihwai. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// Declare spline-viewer as a valid JSX element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        url?: string;
        'loading-anim-type'?: string;
      }, HTMLElement>;
    }
  }
}

// Main Page Component
export default function Home() {
  return (
    <main>
      <Script 
        src="https://unpkg.com/@splinetool/viewer@1.12.28/build/spline-viewer.js"
        type="module"
        strategy="lazyOnload"
      />
      
      <div className="grid-bg" />
      <CursorGlow />
      <BottomNavigation />

      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
