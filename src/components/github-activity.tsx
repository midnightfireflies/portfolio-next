"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  verifiedProfileData,
  verifiedFallbackRepos,
  VerifiedGitHubRepo,
} from "@/data/github";
import {
  Github,
  Star,
  GitFork,
  ExternalLink,
  FolderGit2,
  CheckCircle,
} from "lucide-react";

export function GitHubActivity() {
  const [repos, setRepos] = useState<VerifiedGitHubRepo[]>(verifiedFallbackRepos);
  const [repoCount, setRepoCount] = useState<number>(verifiedProfileData.publicRepos);
  const [isLive, setIsLive] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    async function fetchGitHubData() {
      try {
        const userRes = await fetch(
          `https://api.github.com/users/${verifiedProfileData.username}`
        );
        if (userRes.ok) {
          const userData = await userRes.json();
          if (isMounted && typeof userData.public_repos === "number") {
            setRepoCount(userData.public_repos);
          }
        }

        const reposRes = await fetch(
          `https://api.github.com/users/${verifiedProfileData.username}/repos?sort=updated&per_page=6`
        );
        if (reposRes.ok) {
          const rawRepos = await reposRes.json();
          if (isMounted && Array.isArray(rawRepos) && rawRepos.length > 0) {
            const mappedRepos: VerifiedGitHubRepo[] = rawRepos.map((r: any) => ({
              name: r.name,
              description: r.description || "Portfolio & systems development project.",
              htmlUrl: r.html_url,
              language: r.language || "TypeScript",
              stars: r.stargazers_count ?? 0,
              forks: r.forks_count ?? 0,
              updatedAt: new Date(r.updated_at).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              }),
            }));
            setRepos(mappedRepos);
            setIsLive(true);
          }
        }
      } catch {
        // Fallback already preloaded
      }
    }

    fetchGitHubData();
    return () => {
      isMounted = false;
    };
  }, []);

  const getLanguageColor = (lang: string) => {
    switch (lang.toLowerCase()) {
      case "c":
      case "c++":
        return "bg-blue-400";
      case "python":
        return "bg-amber-400";
      case "javascript":
      case "typescript":
        return "bg-[var(--accent)]";
      case "html":
        return "bg-orange-400";
      case "css":
        return "bg-cyan-400";
      case "shell":
        return "bg-emerald-400";
      default:
        return "bg-[var(--accent)]";
    }
  };

  return (
    <section
      id="github"
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-t border-[var(--border)] bg-[var(--surface)]/20"
      aria-label="GitHub Activity and Repositories"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Github className="w-4 h-4 text-[var(--accent)]" />
          <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] font-semibold">
            GitHub Activity &amp; Repositories
          </h2>
        </div>

        {/* Profile Card Header */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)] shadow-lg mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border border-[var(--border-accent)] bg-[var(--surface)] shrink-0">
                <Image
                  src={verifiedProfileData.avatarUrl}
                  alt="Sadman Siam GitHub Avatar"
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-bold font-display text-[var(--text-primary)]">
                    {verifiedProfileData.name}
                  </h3>
                  <span className="inline-flex items-center gap-1 font-mono text-[10px] text-[var(--accent)] bg-[var(--accent-muted)] px-2 py-0.5 rounded-full border border-[var(--border-accent)]">
                    <CheckCircle className="w-3 h-3" />
                    Verified
                  </span>
                </div>
                <p className="font-mono text-xs text-[var(--text-secondary)]">
                  @{verifiedProfileData.username} · {verifiedProfileData.location}
                </p>
                <p className="text-xs text-[var(--text-secondary)] mt-1 max-w-md hidden sm:block">
                  {verifiedProfileData.bio}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="px-3.5 py-1.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] font-mono text-xs">
                <span className="text-[var(--text-secondary)]">Repositories: </span>
                <strong className="text-[var(--text-primary)]">{repoCount}</strong>
              </div>

              <a
                href={verifiedProfileData.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--accent)] text-[var(--bg-primary)] font-mono text-xs font-bold hover:opacity-90 transition-colors shadow-sm focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Visit GitHub Profile</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Status strip */}
          <div className="mt-6 pt-4 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[var(--text-secondary)]">
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  isLive ? "bg-[var(--accent)] animate-pulse" : "bg-amber-400"
                }`}
              />
              <span>
                {isLive
                  ? "Live sync with GitHub REST API"
                  : "Verified offline archive (graceful fallback active)"}
              </span>
            </div>
            <span className="text-[11px] opacity-50">
              No private tokens exposed · Zero API hard dependencies
            </span>
          </div>
        </div>

        {/* Public Repositories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {repos.map((repo) => (
            <div
              key={repo.name}
              className="p-5 sm:p-6 rounded-xl bg-[var(--card-bg)] border border-[var(--border)] hover:border-[var(--border-accent)] transition-all flex flex-col justify-between group shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <FolderGit2 className="w-4 h-4 text-[var(--accent)] shrink-0" />
                    <h4 className="font-mono text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors truncate">
                      {repo.name}
                    </h4>
                  </div>
                  <a
                    href={repo.htmlUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 rounded text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                    aria-label={`View ${repo.name} repository on GitHub`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <p className="text-xs text-[var(--text-secondary)] line-clamp-3 leading-relaxed mb-4">
                  {repo.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between font-mono text-xs text-[var(--text-secondary)]">
                <div className="flex items-center gap-1.5">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${getLanguageColor(
                      repo.language
                    )}`}
                  />
                  <span className="text-[11px] font-medium text-[var(--text-primary)]">
                    {repo.language}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-[11px]">
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-500" />
                    <span>{repo.stars}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="w-3 h-3 text-blue-500" />
                    <span>{repo.forks}</span>
                  </span>
                  <span className="opacity-50 hidden xs:inline">
                    {repo.updatedAt}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
