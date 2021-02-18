import React, { Fragment } from 'react';
import Box from '@material-ui/core/Box';
import BaseContainer from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { styled } from '@material-ui/styles';


export const Container = props => (
  <Box
    display="flex"
    flexDirection="column"
    height="100%"
    {...props}
  />
);

export const Header = Fragment;


const SpacedContainer = styled(BaseContainer)({
  height: '100%',
});

const SpacedPaper = styled(Paper)({
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
});

export const Main = props => (
  <Box
    component="main"
    flexGrow={1}
    paddingTop={2}
    paddingBottom={2}
    overflow="hidden"
  >
    <SpacedContainer>
      <SpacedPaper
        elevation={2}
        {...props}
      />
    </SpacedContainer>
  </Box>
);
