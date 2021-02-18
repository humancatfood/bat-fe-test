import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';


import { sortBy } from '../../../data/actions';



const ColumnHeader = ({ sortValue, label, ...otherProps}) => {

  const { sortProp, sortOrder } = useSelector(state => state?.ui);
  const dispatch = useDispatch();

  const isActive = sortValue === sortProp;
  const direction = sortOrder > 0 ? 'asc' : 'desc';
  const onClick = sortValue ?
    () => dispatch(sortBy(sortValue)) :
    undefined;

  return (
    <TableCell
      onClick={onClick}
      {...otherProps}
    >
      <TableSortLabel
        active={ isActive }
        direction={ direction }
      >
        { label }
      </TableSortLabel>
    </TableCell>
  );
};

ColumnHeader.propTypes = {
  label: PropTypes.string,
  sortValue: PropTypes.string,
};

export default ColumnHeader;
