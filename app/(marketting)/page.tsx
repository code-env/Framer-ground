import { CallToAction, Hero } from "./_components";
import Testimonials from "./_components/testimonials";

async function getGitHubStars(): Promise<string | null> {
  try {
    const response = await fetch(
      "https://api.github.com/repos/code-env/framer-ground/collaborators",
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

    const data = await response.json();

    return data;
  } catch (error) {
    return null;
  }
}

const LandingPage = async () => {
  const data = await getGitHubStars();

  console.log(data);

  return (
    <div className="relative w-full container flex flex-col gap-40">
      <Hero />
      <Testimonials />
      {/* <Stack /> */}
      <CallToAction />
    </div>
  );
};

export default LandingPage;
