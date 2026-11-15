import { Hero } from "@/components/hero";
import { InteractiveTerminal } from "@/components/terminal";
import { About } from "@/components/about";
import { Skills } from "@/components/skills";
import { Projects } from "@/components/projects";
import { GitHubActivity } from "@/components/github-activity";
import { SecurityLab } from "@/components/security-lab";
import { Experience } from "@/components/experience";
import { Blog } from "@/components/blog";
import { Contact } from "@/components/contact";
import { BackToTop } from "@/components/back-to-top";

export default function Home() {
  return (
    <>
      <Hero />
      <InteractiveTerminal />
      <About />
      <Skills />
      <Projects />
      <GitHubActivity />
      <SecurityLab />
      <Experience />
      <Blog />
      <Contact />
      <BackToTop />
    </>
  );
}
