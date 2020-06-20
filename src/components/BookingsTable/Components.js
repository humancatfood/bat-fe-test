import MuiTable from '@material-ui/core/Table';
import { styled } from '@material-ui/styles';

export { default as TableHead } from '@material-ui/core/TableHead';

export { default as TableContainer } from './TableContainer';
export { default as ColumnHeader } from './ColumnHeader';
export { default as TableBody } from './TableBody';
export { default as EmptyView } from './EmptyView';
export { default as TableRow, TableCell } from './TableRow';



export const Table = styled(MuiTable)({
  tableLayout: 'fixed',
});
