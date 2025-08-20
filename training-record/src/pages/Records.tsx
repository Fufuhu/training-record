import { useParams } from "react-router-dom";
import {FormControl, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

export const Records = () => {
  const { year, month, day } = useParams();

  const movements = [
    { label: 'ベンチプレス', value: 'bench_press' },
  ]

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

      <Box component="form" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Autocomplete
          disablePortal
          options={movements}
          renderInput={(params) => <TextField {...params} label="種目" id="movement"/>}
          sx={{ width: 300, marginTop: 2 }}
        />
        <TextField label="重量[kg]" id="weight" type="number" sx={{ width: 100, marginTop: 2 }} defaultValue={5} slotProps={{
          htmlInput: { min: 0 }
        }} />
        <TextField label="レップ数" id="reps" type="number" sx={{ width: 100, marginTop: 2 }} defaultValue={10} slotProps={{
          htmlInput: { min: 1 }
        }}/>
        <TextField label="セット数" id="sets" type="number" sx={{ width: 100, marginTop: 2 }} defaultValue={3} slotProps={{
          htmlInput: { min: 1 }
        }}/>
      </Box>


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