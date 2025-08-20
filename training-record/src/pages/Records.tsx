import { useParams } from "react-router-dom";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

export const Records = () => {
  const { year, month, day } = useParams();
  return (
    <div>
      <p>This is the records page.</p>
      <p>Here you can view and manage your training records.</p>
      <hr />
      <div>
        <strong>選択された日付:</strong>
        <div>年: {year}</div>
        <div>月: {month}</div>
        <div>日: {day}</div>
      </div>


      <Paper>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="training records">
            <TableHead>
              <TableRow>
                <TableCell>種目</TableCell>
                <TableCell>重量</TableCell>
                <TableCell>セット数</TableCell>
                <TableCell>レップ数</TableCell>
                <TableCell>総レップ数</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>ベンチプレス</TableCell>
                <TableCell>60</TableCell>
                <TableCell>3</TableCell>
                <TableCell>15</TableCell>
                <TableCell>45</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}