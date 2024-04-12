import { TableHead, TableRow, TableCell, TableContainer } from '@mui/material';
import styled from 'styled-components';

export const StyledTableRow = styled(TableRow)`
  &:hover {
    background-color: #f2f2f2;
  }
`
export const StyledTableHead = styled(TableHead)`
    background-color: #fafafa;
    border-top: 2px solid #e2e2e2;
`
export const StyledHeadTableCell = styled(TableCell)`
    font-size: 16px!important;
    &:not(:last-child){
        border-right: 1px solid #e2e2e2
    }
`
export const StyledTableCell = styled(TableCell)`
        &:not(:last-child){
        border-right: 1px solid #e2e2e2
    }
`

export const ScrollContainer = styled(TableContainer)`
    max-height: 400px; 
    overflow-y: auto; 
    `