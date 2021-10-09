import { VFC } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Typography } from '~/components/parts/commons/atoms';
import { TEXT_LIGHT_COLOR } from '~/constants/colors';

export const StoryListTable: VFC = () => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography color={TEXT_LIGHT_COLOR} variant="caption">
                ストーリー名
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography color={TEXT_LIGHT_COLOR} variant="caption">
                ステータス
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography color={TEXT_LIGHT_COLOR} variant="caption">
                応援者
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography color={TEXT_LIGHT_COLOR} variant="caption">
                最終更新日
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {rows.map((row) => (
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))} */}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
