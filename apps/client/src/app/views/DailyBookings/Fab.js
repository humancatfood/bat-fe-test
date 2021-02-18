import React from 'react';
import BaseFab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { styled  } from '@material-ui/core/styles';



const StyledFab = styled(BaseFab)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
}));

const Fab = props => (
  <StyledFab
    color="primary"
    aria-label="new booking"
    title="Create New Booking"
    {...props}
  >
    <AddIcon />
  </StyledFab>
);

export default Fab;
