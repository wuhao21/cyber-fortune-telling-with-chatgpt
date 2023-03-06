import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useState } from "react";

import type { Data as CardsData } from "../pages/api/drawTarotCards";
import type { Data as FortuneData } from "../pages/api/tellFortuneWithTarotCards";
import CircularProgress from "@mui/material/CircularProgress";
import { Alert, Box, Container } from "@mui/material";
import React from "react";

enum STEPS {
  INDEX,
  CARDS,
  FORTUNE,
  ERROR,
}

export default function Home({ data }: { data: CardsData }) {
  const [currentStep, setCurrentStep] = useState<STEPS>(STEPS.INDEX);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fortuneData, setFortuneData] = useState<FortuneData | null>(null);
  let content = null;

  const onClickStart = () => setCurrentStep(STEPS.CARDS);
  const fetcher = () =>
    fetch("/api/tellFortuneWithTarotCards", {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res?.json())
      .then((data: FortuneData) => {
        if (data == null) {
          setCurrentStep(STEPS.ERROR);
        } else {
          setFortuneData(data);
          setIsLoading(false);
        }
      });
  const onClickTell = () => {
    setCurrentStep(STEPS.FORTUNE);
    setIsLoading(true);
    fetcher();
  };
  const cardsList = (
    <Container maxWidth="sm">
      {data.map((cardName, index) => (
        <Typography key={index} variant="subtitle1" align="center">
          {cardName}
        </Typography>
      ))}
    </Container>
  );

  switch (currentStep) {
    case STEPS.INDEX:
      content = (
        <Button variant="text" size="large" onClick={onClickStart}>
          开始
        </Button>
      );
      break;
    case STEPS.CARDS:
      content = (
        <>
          {cardsList}
          <Button
            sx={{ mt: 8 }}
            variant="text"
            size="large"
            onClick={onClickTell}
          >
            看运势
          </Button>
        </>
      );
      break;
    case STEPS.FORTUNE:
      content =
        isLoading || fortuneData == null ? (
          <>
            {cardsList}
            <CircularProgress sx={{ mt: 8 }} color="inherit" />
          </>
        ) : (
          <Container maxWidth="sm">
            {fortuneData.cards.map((card, index) => (
              <React.Fragment key={index}>
                <Typography sx={{ mt: 4 }} variant="h5" align="center">
                  {card.name}
                </Typography>
                <Typography sx={{ mt: 2 }} variant="body1" align="center">
                  {card.meaning}
                </Typography>
              </React.Fragment>
            ))}
            <Typography sx={{ mt: 4 }} variant="h5" align="center">
              今日运势
            </Typography>
            <Typography sx={{ mt: 8 }} variant="subtitle1" align="center">
              {fortuneData?.fortune}
            </Typography>
          </Container>
        );
      break;
    case STEPS.ERROR:
      content = (
        <Alert severity="error">Something went wrong! Please try again.</Alert>
      );
    default:
      content = null;
  }
  return (
    <main>
      <Grid sx={{ mt: 12 }} container direction="column" alignItems="center">
        <Typography variant="h1" align="center">
          赛博塔罗
        </Typography>
        <Grid
          sx={{
            mt: 12,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
          item
        >
          {content}
        </Grid>
      </Grid>
    </main>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:3000/api/drawTarotCards`);
  const data = await res.json();
  return {
    props: { data },
  };
}
