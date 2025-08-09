import React, { useState, useEffect, useRef } from 'react';

// Define SVG icons as functions returning SVG strings.
// These strings will be injected into the DOM using dangerouslySetInnerHTML.
const Icons = {
  Link: ({ size = 24, className = '' }) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="${className}">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07L9.5 3.5" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07L14.5 20.5" />
    </svg>
  `,
  Cloud: ({ size = 24, className = '' }) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="${className}">
      <path d="M17.5 19H18a3 3 0 0 0 0-6h-.5a3 3 0 0 0-3-3h-1.5a3 3 0 0 0-3 3H9a3 3 0 0 0-3-3l-.1-.01A3 3 0 0 0 3 8v0a3 3 0 0 0 3 3h.5" />
    </svg>
  `,
  Award: ({ size = 24, className = '' }) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="${className}">
      <path d="M10 17V21" /><path d="M13.5 17L17 14L20.5 17" /><path d="M10 17L13.5 14L17 17" /><path d="M10 10L13.5 7L17 10" /><path d="M17 3V7" /><path d="M10 3V7" /><path d="M3 10L6.5 7L10 10" /><path d="M3 17L6.5 14L10 17" /><path d="M3 3L6.5 0L10 3" />
    </svg>
  `,
  Code: ({ size = 24, className = '' }) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="${className}">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  `,
  Mail: ({ size = 24, className = '' }) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="${className}">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
    </svg>
  `,
  Phone: ({ size = 24, className = '' }) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="${className}">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-3.1-8.63A2 2 0 0 1 4.11 2H7c.55 0 1.05.22 1.41.59L9.4 4c.36.36.58.86.58 1.41V7.9c0 .55-.22 1.05-.58 1.41L7.7 11.3c-.4.4-.62.9-.62 1.41 0 .55.22 1.05.62 1.41l2.6 2.6c.4.4.9.62 1.41.62.55 0 1.05-.22 1.41-.62l1.9-1.9c.36-.36.86-.58 1.41-.58h1.9c.55 0 1.05.22 1.41.58L21.4 15.5c.36.36.59.86.59 1.41z" />
    </svg>
  `,
  MapPin: ({ size = 24, className = '' }) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="${className}">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /><circle cx="12" cy="9" r="3" />
    </svg>
  `,
  Github: ({ size = 24, className = '' }) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="${className}">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2V10h-.5A2.5 2.5 0 0 1 11 7.5V7a.5.5 0 0 0-1 0v.5A2.5 2.5 0 0 1 7.5 10H7v3.8a4.8 4.8 0 0 0-1 3.2v4" /><path d="M10 2C4.5 2 2 4.5 2 10v4c0 5.5 2.5 8 8 8h4c5.5 0 8-2.5 8-8v-4c0-5.5-2.5-8-8-8H10z" />
    </svg>
  `,
  Linkedin: ({ size = 24, className = '' }) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="${className}">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
    </svg>
  `,
};


// Main App component
const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [sectionVisibility, setSectionVisibility] = useState({});

  const sectionRefs = {
    home: useRef(null),
    about: useRef(null),
    skills: useRef(null),
    projects: useRef(null),
    experience: useRef(null),
    education: useRef(null),
    contact: useRef(null),
  };

  // Smooth scrolling for navigation
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  // Effect to set up Intersection Observers for each section
  useEffect(() => {
    const observerOptions = {
      root: null, // viewport
      rootMargin: '0px',
      threshold: 0.5, // Trigger when 50% of the section is visible
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setSectionVisibility(prev => ({ ...prev, [entry.target.id]: true }));
        } else {
          // Optionally reset animation if section leaves viewport, but for load effect, usually keep true
          // setSectionVisibility(prev => ({ ...prev, [entry.target.id]: false }));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    Object.values(sectionRefs).forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    // Cleanup observer on component unmount
    return () => {
      Object.values(sectionRefs).forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []); // Run once on mount

  // Effect to update active section on scroll (for nav highlighting)
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'education', 'contact'];
      let currentActive = 'home';
      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            currentActive = sectionId;
            break;
          }
        }
      }
      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#f2f2f2] text-[#000000] font-madefor">
      {/* Define global CSS for line animation */}
      <style>
        {`
        @keyframes lineLoad {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
        .animate-line-load {
          animation: lineLoad 1s ease-out forwards;
        }
        `}
      </style>

      {/* Header */}
      <header className="relative z-20 bg-[#ededed] bg-opacity-90 fixed w-full top-0 py-4 px-6 md:px-12 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#000000]">Zaid.dev</h1>
        <nav>
          <ul className="flex space-x-4 md:space-x-8 font-semibold">
            {/* Only Home and Contact links */}
            {['home', 'contact'].map((section) => (
              <li key={section}>
                <button
                  onClick={() => scrollToSection(section)}
                  className={`capitalize text-lg transition-all duration-300 ${
                    activeSection === section ? 'text-[#000000] border-b-2 border-[#000000]' : 'text-gray-600 hover:text-[#000000]'
                  } focus:outline-none`}
                >
                  {section}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="relative z-10">
        {/* Hero Section - Split Layout (Left Content, Right Image) */}
        <section id="home" ref={sectionRefs.home} className="flex flex-col md:flex-row min-h-screen pt-16 md:pt-0">
          {/* Left Column: Text Content (Black Background) */}
          <div className="md:w-1/2 bg-[#000000] flex flex-col justify-center p-8 md:p-16 text-left text-[#ffffff]">
            <h2 className="text-6xl md:text-7xl font-normal mb-20 leading-tight">
              Mohammad Zaid Alam
            </h2>
            {/* Introduction Section */}
            <div className="">
              <h3 className="text-3xl font-semibold mb-[76px]">Introduction:</h3>
              <div className={`h-px bg-[#ffffff] ${sectionVisibility.home ? 'w-full animate-line-load' : 'w-0'}`} style={{ animationDelay: '0.1s' }}></div> {/* Thick line */}
              <p className="text-base leading-snug my-8 font-semibold">
                Welcome to my online profile, where ambition and technology go hand in hand. Dive into my journey in Cloud Computing and Artificial Intelligence, and see how I turn ideas into tangible results.
              </p>
            </div>
            {/* Summary Section */}
            <div>
              <div className={`h-1 bg-[#ffffff] ${sectionVisibility.home ? 'w-full animate-line-load' : 'w-0'}`} style={{ animationDelay: '1s' }}></div> {/* Thick top border */}
              <h3 className="text-3xl font-semibold mt-20 mb-[76px]">Summary:</h3>
              <div className={`h-px bg-[#ffffff] ${sectionVisibility.home ? 'w-full animate-line-load' : 'w-0'}`} style={{ animationDelay: '1.3s' }}></div> {/* Thin line */}
              <p className="text-base leading-snug font-semibold my-8">
                I am a passionate student in the field of Cloud Computing and Artificial Intelligence, eager to learn and grow. While I am still building my portfolio of achievements, I constantly explore new technologies, experiment with ideas, and develop skills that will help me create meaningful and impactful solutions in the future.
              </p>
              <div className={`h-1 bg-[#ffffff] ${sectionVisibility.home ? 'w-full animate-line-load' : 'w-0'}`} style={{ animationDelay: '1.5s' }}></div> {/* Thick bottom border */}
            </div>
          </div>

          {/* Right Column: Image (White Background) */}
          <div className="md:w-1/2 bg-[#ffffff] flex items-center justify-center overflow-hidden">
            <img
              src="https://raw.githubusercontent.com/zaidnfs/My-Portfolio/refs/heads/main/public/image/White%20desk%20with%20pen%2C%20notebook%20and%20laptop.jpg"
              alt="Zaid's Portrait"
              className="w-full h-full object-cover"
              Object-fit
            />
          </div>
        </section>

        {/* About Me Section - Alternating Layout (Left Heading, Right Content) */}
        <section id="about" ref={sectionRefs.about} className="flex flex-col md:flex-row min-h-screen pt-16 md:pt-0 bg-[#f2f2f2]">
          {/* Left Column: Background with Heading */}
          <div className="md:w-1/2 bg-[#ededed] flex flex-col justify-start p-8 md:p-16 text-left text-[#000000]">
            <h2 className="text-4xl md:text-5xl font-semibold mb-8 leading-tight">About Me</h2>
          </div>
          {/* Right Column: Text Content (Light Background) */}
          <div className="md:w-1/2 bg-[#f2f2f2] flex flex-col justify-start py-16 md:py-24 px-8 md:px-16 text-left text-[#000000]">
            <p className="text-base leading-snug mb-4">
              I am a 3rd-year Computer Science student specializing in <strong className="text-[#000000]">Cloud Computing</strong> and <strong className="text-[#000000]">Artificial Intelligence</strong>. My journey goes beyond academics — I actively explore new technologies, experiment with projects, and seek opportunities to expand my skills.
            </p>
            <p className="text-base leading-snug mb-4">
              Currently, I am focused on gaining real-world experience and am actively looking for internship opportunities where I can apply my knowledge, collaborate with experienced professionals, and grow as a developer. My passion lies in building scalable, intelligent solutions and embracing every opportunity to learn something new.
            </p>
            <p className="text-base leading-snug">
              Outside of my technical work, I enjoy exploring different cultures and languages, and I am currently studying Japanese to broaden my global career opportunities.            </p>
          </div>
        </section>

        {/* Skills Section - Alternating Layout (Left Content, Right Heading) */}
        <section id="skills" ref={sectionRefs.skills} className="flex flex-col md:flex-row min-h-screen pt-16 md:pt-0 bg-[#f2f2f2]">
          {/* Left Column: Text Content (Light Background) */}
          <div className="md:w-1/2 bg-[#f2f2f2] flex flex-col justify-start p-8 md:p-16 text-left text-[#000000]">
            {/* Skill Category: Cloud & DevOps */}
            <div className="mb-8">
              <div className={`h-1 bg-[#000000] ${sectionVisibility.skills ? 'w-full animate-line-load' : 'w-0'}`} style={{ animationDelay: '0.5s' }}></div> {/* Thick top border */}
              <h3 className="text-lg font-semibold py-4 flex items-center">
                <i className="fas fa-cloud mr-2"></i> Cloud & DevOps
              </h3>
              <div className={`h-px bg-[#000000] ${sectionVisibility.skills ? 'w-full animate-line-load' : 'w-0'}`} style={{ animationDelay: '0.7s' }}></div> {/* Thin bottom border */}
              <ul className="list-disc list-inside text-base leading-snug space-y-2 mt-4">
                <li>AWS (EC2, S3, IAM)</li>
                <li>Google Cloud Platform (Vertex AI Prompt Design)</li>
                <li>Vercel Deployment</li>
                <li>Nginx</li>
                <li>Git, Git Bash, GitHub</li>
                <li>Docker (Familiar)</li>
              </ul>
            </div>

            {/* Skill Category: Software Development & Programming */}
            <div className="mb-8">
              <div className={`h-1 bg-[#000000] ${sectionVisibility.skills ? 'w-full animate-line-load' : 'w-0'}`} style={{ animationDelay: '1s' }}></div> {/* Thick top border */}
              <h3 className="text-lg font-semibold py-4 flex items-center">
                <i className="fas fa-laptop-code mr-2"></i> Software Development & Programming
              </h3>
              <div className={`h-px bg-[#000000] ${sectionVisibility.skills ? 'w-full animate-line-load' : 'w-0'}`} style={{ animationDelay: '1.2s' }}></div> {/* Thin bottom border */}
              <ul className="list-disc list-inside text-base leading-snug space-y-2 mt-4">
                <li>Golang, Python, JavaScript, C, C++</li>
                <li>React.js, Node.js, Express.js</li>
                <li>HTML5, CSS3, Tailwind CSS</li>
                <li>MongoDB (NoSQL), SQL</li>
                <li>REST API Development</li>
              </ul>
            </div>

            {/* Skill Category: Artificial Intelligence & Emerging Tech */}
            <div className="mb-8">
              <div className={`h-1 bg-[#000000] ${sectionVisibility.skills ? 'w-full animate-line-load' : 'w-0'}`} style={{ animationDelay: '1.5s' }}></div> {/* Thick top border */}
              <h3 className="text-lg font-semibold py-4 flex items-center">
                <i className="fas fa-brain mr-2"></i> Artificial Intelligence & Emerging Tech
              </h3>
              <div className={`h-px bg-[#000000] ${sectionVisibility.skills ? 'w-full animate-line-load' : 'w-0'}`} style={{ animationDelay: '1.7s' }}></div> {/* Thin bottom border */}
              <ul className="list-disc list-inside text-base leading-snug space-y-2 mt-4">
                <li>Machine Learning (IBM Machine Learning Certificate)</li>
                <li>Prompt Design in Vertex AI (Google Cloud)</li>
                <li>Building Real-World AI Applications with Gemini & Imagen</li>
                <li>Chatbot Development (IBM Watson)</li>
                <li>Data Analysis (Pandas, NumPy)</li>
                <li>Prompt Engineering (In Progress)</li>
              </ul>
            </div>
          </div>
          {/* Right Column: Background with Heading */}
          <div className="md:w-1/2 bg-[#d7d7d7] flex flex-col justify-start p-8 md:p-16 text-left text-[#000000]">
            <h2 className="text-4xl md:text-5xl font-semibold mb-8 leading-tight">
              Skills
            </h2>
          </div>
        </section>

        {/* Projects Section - Alternating Layout (Left Heading, Right Content) */}
        <section id="projects" ref={sectionRefs.projects} className="flex flex-col md:flex-row min-h-screen pt-16 md:pt-0 bg-[#f2f2f2]">
          {/* Left Column: Background with Heading */}
          <div className="md:w-1/2 bg-[#000000] flex flex-col justify-start p-8 md:p-16 text-left text-[#ffffff]">
            <h2 className="text-4xl md:text-5xl font-semibold mb-8 leading-tight">Projects</h2>
          </div>
          {/* Right Column: Text Content (Light Background) */}
          <div className="md:w-1/2 bg-[#f2f2f2] flex flex-col justify-start p-8 md:p-16 text-left text-[#000000]">
            {/* Project Card 1 */}
            <div className="mb-8">
              <div className={`h-1 bg-[#000000] ${sectionVisibility.projects ? 'w-full animate-line-load' : 'w-0'}`} style={{ animationDelay: '0.5s' }}></div> {/* Thick top border */}
              <h3 className="text-lg font-semibold pt-2 pb-2">HTTP Server from Scratch <span className="font-normal text-base">[ Go, TCP Sockets ]</span></h3>  {/* Adjusted padding */}
              <div className={`h-px bg-[#000000] ${sectionVisibility.projects ? 'w-full animate-line-load' : 'w-0'}`} style={{ animationDelay: '0.7s' }}></div> {/* Thin bottom border */}
              <p className="text-base leading-snug mb-4 mt-4">
                Developed a custom HTTP server from scratch in Go, handling raw TCP connections without using the net/http package. Implemented manual HTTP request parsing, GET/POST handling, dynamic routing, and concurrency with goroutines to strengthen networking fundamentals.
              </p>
              <div className="flex space-x-4">
                <a href="https://github.com/zaidnfs/codecrafters-http-server-go" target="_blank" rel="noopener noreferrer" className="text-[#000000] hover:text-gray-700 transition-colors flex items-center">
                  <i className="fab fa-github mr-1"></i> GitHub
                </a>
              </div>
            </div>

            {/* Project Card 2 */}
            <div className="mb-8">
              <div className={`h-1 bg-[#000000] ${sectionVisibility.projects ? 'w-full animate-line-load' : 'w-0'}`} style={{ animationDelay: '1s' }}></div> {/* Thick top border */}
              <h3 className="text-lg font-semibold pt-2 pb-2">Simple Blog Web App <span className="font-normal text-base">[ React, Node.js, MongoDB, Vercel ]</span></h3> {/* Adjusted padding */}
              <div className={`h-px bg-[#000000] ${sectionVisibility.projects ? 'w-full animate-line-load' : 'w-0'}`} style={{ animationDelay: '0.7s' }}></div> {/* Thin bottom border */}
              <p className="text-base leading-snug mb-4 mt-4">
                Built a full-stack blog platform using React (frontend), Node.js and Express.js (backend). Implemented MongoDB as the primary database for storing blog posts and user data. Deployed the application on Vercel, ensuring seamless frontend and backend integration.
              </p>
              <div className="flex space-x-4">
                <a href="https://github.com/zaidnfs/simple-blog-frontend" target="_blank" rel="noopener noreferrer" className="text-[#000000] hover:text-gray-700 transition-colors flex items-center">
                  <i className="fab fa-github mr-1"></i> GitHub
                </a>
                <a href="https://simple-blog-frontend-2ujgq0jnz-md-zaid-alams-projects-d5d0e8eb.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-[#000000] hover:text-gray-700 transition-colors flex items-center">
                  <i className="fas fa-external-link-alt mr-1"></i> Live Demo
                </a>
              </div>
            </div>
            {/* Add more project cards as needed */}
            {/* Project Card 2 */}
            <div className="mb-8">
              <div className={`h-1 bg-[#000000] ${sectionVisibility.projects ? 'w-full animate-line-load' : 'w-0'}`} style={{ animationDelay: '1s' }}></div> {/* Thick top border */}
              <h3 className="text-lg font-semibold pt-2 pb-2">GoLang Mini Projects <span className="font-normal text-base">[Go]</span></h3> {/* Adjusted padding */}
              <div className={`h-px bg-[#000000] ${sectionVisibility.projects ? 'w-full animate-line-load' : 'w-0'}`} style={{ animationDelay: '0.7s' }}></div> {/* Thin bottom border */}
              <p className="text-base leading-snug mb-4 mt-4">
                 Created small-scale projects in Go demonstrating file I/O, structs, arrays, slices, and maps. Published code on GitHub as part of a self-learning initiative.
              </p>
              <div className="flex space-x-4">
                <a href="https://github.com/zaidnfs/Golang_Practice" target="_blank" rel="noopener noreferrer" className="text-[#000000] hover:text-gray-700 transition-colors flex items-center">
                  <i className="fab fa-github mr-1"></i> GitHub
                </a>
              </div>
            </div>
            {/* Project Card 4 */}
            <div className="mb-8">
              <div className={`h-1 bg-[#000000] ${sectionVisibility.projects ? 'w-full animate-line-load' : 'w-0'}`} style={{ animationDelay: '1s' }}></div> {/* Thick top border */}
              <h3 className="text-lg font-semibold pt-2 pb-2">AI-Powered Image Analysis App <span className="font-normal text-base">[Google Cloud, Vertex AI, Gemini, Imagen]</span></h3> {/* Adjusted padding */}
              <div className={`h-px bg-[#000000] ${sectionVisibility.projects ? 'w-full animate-line-load' : 'w-0'}`} style={{ animationDelay: '0.7s' }}></div> {/* Thin bottom border */}
              <p className="text-base leading-snug mb-4 mt-4">
                Experimented with Google Cloud’s Vertex AI, Gemini, and Imagen to build a proof-of-concept AI app that generates and interprets images based on natural language prompts.
              </p>
            </div>
          </div>
        </section>

        {/* Experience Section - Alternating Layout (Left Content, Right Heading) */}
        <section id="experience" ref={sectionRefs.experience} className="flex flex-col md:flex-row min-h-screen pt-16 md:pt-0 bg-[#f2f2f2]">
          {/* Left Column: Content */}
          <div className="md:w-1/2 bg-[#f2f2f2] flex flex-col justify-start p-8 md:p-16 text-left text-[#000000]">
            {/* Experience Entry 1 */}
            <div className="mb-6">
              <div className={`h-1 bg-[#000000] ${sectionVisibility.experience ? 'w-full animate-line-load' : 'w-0'}`} style={{ animationDelay: '0.5s' }}></div> {/* Thick top border */}
              <h4 className="text-lg font-semibold text-[#000000] pt-4 pb-4 flex justify-between items-baseline">
                Simple Blog Application
                <a href="https://simple-blog-frontend-2ujgq0jnz-md-zaid-alams-projects-d5d0e8eb.vercel.app/" target="_blank" rel="noopener noreferrer" class="text-[#000000] hover:text-gray-700 transition-colors flex items-center"><i class="fas fa-external-link-alt mr-1"></i> Live Demo</a>
              </h4>
              <div className={`h-px bg-[#000000] ${sectionVisibility.experience ? 'w-full animate-line-load' : 'w-0'}`} style={{ animationDelay: '0.7s' }}></div> {/* Thin bottom border */}
              <p className="text-base leading-snug mb-4 mt-4">
                Built a full-stack blog platform using React, Node.js, MongoDB, and PostgreSQL. Implemented authentication, post management, and responsive design.
              </p>
            </div>

            {/* Experience Entry 2 (Example) */}
            <div className="mb-6">
              <div className={`h-1 bg-[#000000] ${sectionVisibility.experience ? 'w-full animate-line-load' : 'w-0'}`} style={{ animationDelay: '1s' }}></div> {/* Thick top border */}
              <h4 className="text-lg font-semibold text-[#000000] pt-4 pb-4 flex justify-between items-baseline">
                AWS Web App Deployment
              </h4>
              <div className={`h-px bg-[#000000] ${sectionVisibility.experience ? 'w-full animate-line-load' : 'w-0'}`} style={{ animationDelay: '1.2s' }}></div> {/* Thin bottom border */}
              <p className="text-base leading-snug mb-4 mt-4">
                Deployed a simple web application on AWS EC2 with Nginx for reverse proxy and Vercel for frontend hosting. Configured IAM roles for secure access.
              </p>
            </div>

            {/* Experience Entry 3 (Example) */}
            <div className="mb-6">
              <div className={`h-1 bg-[#000000] ${sectionVisibility.experience ? 'w-full animate-line-load' : 'w-0'}`} style={{ animationDelay: '1.5s' }}></div> {/* Thick top border */}
              <h4 className="text-lg font-semibold text-[#000000] pt-4 pb-4 flex justify-between items-baseline">
                Personal Portfolio Website
                <a href="https://zaidnfs.github.io/My-Portfolio/" target="_blank" rel="noopener noreferrer" class="text-[#000000] hover:text-gray-700 transition-colors flex items-center"><i class="fas fa-external-link-alt mr-1"></i> Live Demo</a>
              </h4>
              <div className={`h-px bg-[#000000] ${sectionVisibility.experience ? 'w-full animate-line-load' : 'w-0'}`} style={{ animationDelay: '1.7s' }}></div> {/* Thin bottom border */}
              <p className="text-base leading-snug mb-4 mt-4">
                Designed and developed a personal portfolio website using React.js and Tailwind CSS to showcase projects, skills, and resume. Integrated Formspree for a fully functional contact form, and optimized the site for responsiveness, smooth navigation, and animated transitions.
              </p>
            </div>
          </div>
          {/* Right Column: Background with Heading */}
          <div className="md:w-1/2 bg-[#000000] flex flex-col justify-start p-8 md:p-16 text-left text-[#ffffff]">
            <h2 className="text-4xl md:text-5xl font-semibold mb-8 leading-tight">Experience</h2>
          </div>
        </section>

        {/* Education Section - Alternating Layout (Left Heading, Right Content) */}
        <section id="education" ref={sectionRefs.education} className="flex flex-col md:flex-row min-h-screen pt-16 md:pt-0 bg-[#f2f2f2]">
          {/* Left Column: Background with Heading */}
          <div className="md:w-1/2 bg-[#ededed] flex flex-col justify-start p-8 md:p-16 text-left text-[#000000]">
            <h2 className="text-4xl md:text-5xl font-semibold mb-8 leading-tight">Education</h2>
          </div>
          {/* Right Column: Text Content (Light Background) */}
          <div className="md:w-1/2 bg-[#ffffff] flex flex-col justify-start p-8 md:p-16 text-left text-[#000000]">
            {/* Education Entry 1 */}
            <div className="mb-6">
  <div
    className={`h-1 bg-[#000000] ${sectionVisibility.education ? 'w-full animate-line-load' : 'w-0'}`}
    style={{ animationDelay: '0.5s' }}
  ></div>
  <h4 className="text-lg font-semibold py-2">
    Bachelor of Technology – Computer Science & Engineering
  </h4>
  <div
    className={`h-px bg-[#000000] ${sectionVisibility.education ? 'w-full animate-line-load' : 'w-0'}`}
    style={{ animationDelay: '0.7s' }}
  ></div>
  <p className="text-base leading-snug mt-4 font-semibold">
    Integral University, Lucknow, Uttar Pradesh
  </p>
          <ul className="list-disc list-inside text-sm mt-2 space-y-2">
             <li>Specialization in Cloud Computing & Artificial Intelligence.</li>
             <li>
              Relevant Coursework: Data Structures, Software Methodology, Algorithm
              Analysis, Database Management, Artificial Intelligence, Internet
              Technology.
             </li>
             <li>Actively building projects and exploring emerging tech trends.</li>
           </ul>
        </div>
            {/* Education Entry 2 (Example - add more as needed) */}
            <div className="mb-6">
  <div
    className={`h-1 bg-[#000000] ${sectionVisibility.education ? 'w-full animate-line-load' : 'w-0'}`}
    style={{ animationDelay: '0.9s' }}
  ></div>
  <h4 className="text-lg font-semibold py-2">
    Professional Certifications & Online Courses
  </h4>
  <div
    className={`h-px bg-[#000000] ${sectionVisibility.education ? 'w-full animate-line-load' : 'w-0'}`}
    style={{ animationDelay: '1.1s' }}
  ></div>
  <ul className="list-disc list-inside text-sm mt-2 space-y-2">
    <li>Data Structures & Algorithms – Udemy</li>
    <li>Full-Stack Web Development – Udemy</li>
    <li>Prompt Engineering – Udemy</li>
  </ul>
</div>

            {/* Education Entry 3 (Example - add more as needed) */}
            
          </div>
        </section>

        {/* Contact Section - Alternating Layout (Left Image, Right Content) */}
        <section id="contact" ref={sectionRefs.contact} className="flex flex-col md:flex-row min-h-screen pt-16 md:pt-0 bg-[#000000]">
          {/* Left Column: Image */}
          <div className="md:w-1/2 bg-[#000000] flex items-center justify-center overflow-hidden">
            <img
              src="https://raw.githubusercontent.com/zaidnfs/My-Portfolio/refs/heads/main/public/image/download%20(1).jpg" // Placeholder for contact image
              alt="Contact Me"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Right Column: Text Content */}
          <div className="md:w-1/2 bg-[#000000] flex flex-col justify-start p-8 md:p-16 text-left text-[#ffffff]">
            <h2 className="text-4xl md:text-5xl font-semibold leading-tight mb-[200px]">Reach Out for Opportunities</h2>
            <form action="https://formspree.io/f/xyzpndly" method="POST" className="space-y-6 mb-8">
              <div>
                <label htmlFor="firstName" className="block text-[#ffffff] text-base font-medium mb-2">First name *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  className="w-full p-2 bg-transparent border-b border-[#ffffff] text-[#ffffff] focus:outline-none focus:border-b-2 focus:border-[#ffffff]"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-[#ffffff] text-base font-medium mb-2">Last name *</label>
                <input
                  type="type"
                  id="lastName"
                  name="lastName"
                  required
                  className="w-full p-2 bg-transparent border-b border-[#ffffff] text-[#ffffff] focus:outline-none focus:border-b-2 focus:border-[#ffffff]"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-[#ffffff] text-base font-medium mb-2">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full p-2 bg-transparent border-b border-[#ffffff] text-[#ffffff] focus:outline-none focus:border-b-2 focus:border-[#ffffff]"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-[#ffffff] text-base font-medium mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  className="w-full p-2 bg-transparent border-b border-[#ffffff] text-[#ffffff] focus:outline-none focus:border-b-2 focus:border-[#ffffff]"
                ></textarea>
              </div>
              <div className={`h-px bg-[#ffffff] ${sectionVisibility.contact ? 'w-full animate-line-load' : 'w-0'}`} style={{ animationDelay: '0.5s' }}></div> {/* Thin top border for submit button */}
              <button
                type="submit"
                className="w-full px-6 py-3 bg-[#ffffff] text-[#000000] rounded-lg hover:bg-gray-200 transition-transform transform hover:scale-105 font-semibold text-lg"
              >
                Submit
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-[#ffffff] py-8 px-6 md:px-16 text-[#000000]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Left - Name */}
          <div>
            <h2 className="text-2xl font-bold">Mohammad Zaid Alam</h2>
          </div>

          {/* Middle - Contact Info */}
          <div className="text-sm">
            <p className="font-medium">+91 89278-95633</p>
            <p className="font-medium">zaidlc319@gmail.com</p>
            <p className="mt-2">Kursi Rd, Lucknow, Uttar Pradesh, India</p>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center md:justify-start gap-4 mt-6 text-lg">
          <a href="https://www.linkedin.com/in/zaid107" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
          <a href="https://github.com/zaidnfs" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>
          {/* Add other social media links as needed, or remove if not applicable */}
          <a href="https://x.com/Akii_hello" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
        </div>

        {/* Copyright Notice */}
        <div className="text-center">
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Mohammad Zaid Alam. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
