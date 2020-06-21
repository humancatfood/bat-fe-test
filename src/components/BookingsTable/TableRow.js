import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';

import MuiTableRow from '@material-ui/core/TableRow';
import MuiTableCell from '@material-ui/core/TableCell';
import { styled } from '@material-ui/styles';



function TableRow ({isSelected, ...otherProps}) {
  return (
    <MuiTableRow
      hover
      selected={isSelected}
      {...omit(otherProps, 'isSeated', 'isCancelled')}
    />
  );
}

TableRow.propTypes = {
  isSelected: PropTypes.bool,
  isSeated: PropTypes.bool,
  isCancelled: PropTypes.bool,
};


const styles = ({theme, isCancelled}) => ({
  "&.Mui-selected": {
    backgroundColor: theme.palette.info.light,
  },

  ...(isCancelled && {
    textDecoration: 'line-through',
  }),

});

export default styled(TableRow)(styles);





export const TableCell = styled(MuiTableCell)(({theme}) => ({
  '.Mui-selected &': {
    color: theme.palette.info.contrastText,
  },
}));
