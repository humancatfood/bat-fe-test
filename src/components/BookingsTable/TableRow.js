import React from 'react';
import PropTypes from 'prop-types';

import MuiTableRow from '@material-ui/core/TableRow';
import MuiTableCell from '@material-ui/core/TableCell';
import { styled } from '@material-ui/styles';



function TableRow ({isSelected, isSeated, isCancelled, ...otherProps}) {
  return (
    <MuiTableRow
      hover
      selected={isSelected}
      // seated={ }
      // cancelled={isCancelled}
      {...otherProps}
    />
  );
}

TableRow.propTypes = {
  isSelected: PropTypes.bool,
  isSeated: PropTypes.bool,
  isCancelled: PropTypes.bool,
};


const styles = ({theme}) => window.console.log('theme:', theme)|| ({
  "&.Mui-selected": {
    backgroundColor: theme.palette.info.light,
  },
});

export default styled(TableRow)(styles);





export const TableCell = styled(MuiTableCell)(({theme}) => ({
  '.Mui-selected &': {
    color: theme.palette.info.contrastText,
  },
}));
