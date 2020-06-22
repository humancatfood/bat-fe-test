import React from 'react';
import PropTypes from 'prop-types';

import MuiTableRow from '@material-ui/core/TableRow';



function TableRow ({isSelected, ...otherProps}) {
  return (
    <MuiTableRow
      hover
      selected={isSelected}
      {...otherProps}
    />
  );
}

TableRow.propTypes = {
  isSelected: PropTypes.bool,
};

export default TableRow;
