import React from "react";
import { Grid } from "semantic-ui-react";

export const GridTest = () => {
  return (
    <Grid columns={2}>
      <Grid.Column only="tablet" width={12}>
        DASDASDSAD
      </Grid.Column>
      <Grid.Column width={5}>asdsadasdsadsa</Grid.Column>
    </Grid>
  );
};
