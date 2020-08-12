import React from "react";
import styled from "styled-components";
import { GithubContext } from "../context/context";
import { ExampleChart, Pie2D, Column2D, Bar2D, Doughnut2D } from "./Charts";
const Repos = () => {
  const { repos } = React.useContext(GithubContext);
  // <Languages Data for Pie 2D Chart>
  const chartData = repos.reduce(
    (acc, { language, stargazers_count: star }) => {
      let stars = star || 3;
      if (!language) return acc;
      if (!acc[language]) {
        acc[language] = {
          label: language,
          value: 1,
          stars,
        };
      } else {
        acc[language] = {
          label: language,
          value: acc[language].value + 1,
          stars: acc[language].stars + stars,
        };
      }
      return acc;
    },
    {}
  );

  const mostUsed = Object.values(chartData).slice(0, 5);
  // most stars per language
  const mostPopular = Object.values(chartData)
    .map(({ label, stars }) => {
      return { label, value: stars };
    })
    .slice(0, 5);
  // </Languages Data for Pie 2D Chart>

  // starts, forks
  let { stars, forks } = repos.reduce(
    (total, item) => {
      const { stargazers_count: star, name, fork } = item;
      total.stars[name] = { label: name, value: star };
      total.forks[name] = { label: name, value: fork };

      return total;
    },
    { stars: {}, forks: {} }
  );
  stars = Object.values(stars)
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);
  forks = Object.values(forks)
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);
  return (
    <section className="section">
      <Wrapper className="section-center">
        <Pie2D data={mostUsed} />
        <Column2D data={stars} />
        <Doughnut2D data={mostPopular} />
        <Bar2D data={forks} />
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
