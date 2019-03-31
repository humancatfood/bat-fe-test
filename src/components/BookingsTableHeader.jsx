import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';

import { sortBy } from './../data/actions';



class BookingsTableHeader extends React.Component
{
  render ()
  {
    const { value, label, sortBy, sortProp, sortOrder } = this.props;
    const className = classnames({
      'sorter--asc': sortProp === value && sortOrder > 0,
      'sorter--desc': sortProp === value && sortOrder < 0,
    });

    return (
      <th onClick={ () => sortBy(value) } className={ className } >{ label }</th>
    );
  }
}

const mapStateToProps = ({ui: {sortProp, sortOrder}}, ownProps) => ({
  ...ownProps,
  sortProp,
  sortOrder
});

const mapDispatchToProps = {
  sortBy
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingsTableHeader);