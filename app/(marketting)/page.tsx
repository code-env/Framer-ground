import React from "react";
import { CallToAction, Stack, Hero } from "./_components";

async function getGitHubStars(): Promise<string | null> {
  try {
    const response = await fetch(
      "https://api.github.com/repos/code-env/framer-ground",
      {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
        },
        next: {
          revalidate: 60,
        },
      }
    );

    if (!response?.ok) {
      return null;
    }

    const json = await response.json();

    return parseInt(json["stargazers_count"]).toLocaleString();
  } catch (error) {
    return null;
  }
}

const LandingPage = async () => {
  const stars = await getGitHubStars();
  console.log(stars);

  return (
    <div className="relative w-full">
      <Hero stars={stars || "0"} />
      <Stack />
      <CallToAction />
    </div>
  );
};

export default LandingPage;
