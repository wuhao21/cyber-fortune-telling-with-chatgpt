import { Roboto } from "next/font/google";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import useSWR from "swr";

import type { Data as CardsData } from "../pages/api/drawThreeTarotCards";
import type { Data as FortuneData } from "../pages/api/tellFortuneWithThreeTarotCards";
import CircularProgress from "@mui/material/CircularProgress";
import { Container } from "@mui/material";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

enum STEPS {
  INDEX,
  CARDS,
  FORTUNE,
}

export default function Home({ data }: { data: CardsData }) {
  const [currentStep, setCurrentStep] = useState<STEPS>(STEPS.INDEX);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fortuneData, setFortuneData] = useState<FortuneData | null>(null);
  let content = null;

  const onClickStart = () => setCurrentStep(STEPS.CARDS);
  const fetcher = () =>
    fetch("/api/tellFortuneWithThreeTarotCards", {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data: FortuneData) => {
        setFortuneData(data);
        setIsLoading(false);
      });
  const onClickTell = () => {
    setCurrentStep(STEPS.FORTUNE);
    setIsLoading(true);
    fetcher();
  };

  switch (currentStep) {
    case STEPS.INDEX:
      content = (
        <Grid sx={{ mt: 12 }} container direction="column">
          <Grid display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h1" align="center">
              赛博塔罗
            </Typography>
          </Grid>
          <Grid
            sx={{ mt: 12 }}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Button variant="text" size="large" onClick={onClickStart}>
              开始
            </Button>
          </Grid>
        </Grid>
      );
      break;
    case STEPS.CARDS:
      content = (
        <Grid sx={{ mt: 12 }} container direction="column">
          <Grid display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h1" align="center">
              赛博塔罗
            </Typography>
          </Grid>
          <Grid
            sx={{ mt: 12 }}
            display="flex"
            justifyContent="center"
            alignItems="center"
            direction="column"
          >
            <Container maxWidth="sm">
              <Typography variant="subtitle1" align="center">
                {data.card1}
              </Typography>
              <Typography variant="subtitle1" align="center">
                {data.card2}
              </Typography>
              <Typography variant="subtitle1" align="center">
                {data.card3}
              </Typography>
            </Container>
            <Button
              sx={{ mt: 8 }}
              variant="text"
              size="large"
              onClick={onClickTell}
            >
              看运势
            </Button>
          </Grid>
        </Grid>
      );
      break;
    case STEPS.FORTUNE:
      content = (
        <Grid sx={{ mt: 12 }} container direction="column">
          <Grid display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h1" align="center">
              赛博塔罗
            </Typography>
          </Grid>
          <Grid
            sx={{ mt: 12 }}
            display="flex"
            justifyContent="center"
            alignItems="center"
            direction="column"
          >
            {isLoading ? (
              <CircularProgress color="inherit" />
            ) : (
              <Container maxWidth="sm">
                <Typography variant="subtitle1" align="center">
                  {data.card1}
                </Typography>
                <Typography variant="body1" align="center">
                  {fortuneData?.cards[0].meaning}
                </Typography>
                <Typography variant="subtitle1" align="center">
                  {data.card2}
                </Typography>
                <Typography variant="body1" align="center">
                  {fortuneData?.cards[1].meaning}
                </Typography>
                <Typography variant="subtitle1" align="center">
                  {data.card3}
                </Typography>
                <Typography variant="body1" align="center">
                  {fortuneData?.cards[2].meaning}
                </Typography>
                <Typography sx={{ mt: 8 }} variant="subtitle1" align="center">
                  {fortuneData?.fortune}
                </Typography>
              </Container>
            )}
          </Grid>
        </Grid>
      );
      break;
    default:
      content = null;
  }
  return (
    <>
      <main className={roboto.className}>{content}</main>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:3000/api/drawThreeTarotCards`);
  const data = await res.json();
  return {
    props: { data },
  };
}
