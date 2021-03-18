import React from "react";
import { __DATA__ } from "../barchart/data";
import {
  MainContainer,
  Container,
  BarChartContainer,
  Number,
  BlackLine,
  MakeBar
} from "../barchart/styles";

export default function Dashboard() {
  return (
    <Container>
      <MainContainer>
        {__DATA__.map(({ NumOfStd, colors }, i) => {
          return (
            <BarChartContainer key={i}>
              <Number color={colors[1]}>{NumOfStd} students</Number>
              <MakeBar height={NumOfStd * 2} colors={colors} />
            </BarChartContainer>
          );
        })}
      </MainContainer>
      <BlackLine />
    </Container>
  );
}
