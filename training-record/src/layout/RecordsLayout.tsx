import {Outlet} from "react-router";
import {Calendar} from "../component/Calendar.tsx";
import {Grid} from "@mui/material";
import Button from "@mui/material/Button";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {useState} from "react";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

export const RecordsLayout = () => {

  const [isOpen, setIsOpen] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div>
      <Grid container spacing={2}>
        <Grid size={isOpen ? 2 : 0}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => toggleMenu()}
          >{isOpen ? <ArrowLeftIcon/> : <ArrowRightIcon/>}</Button>
          <div style={{
            display: isOpen ? 'block' : 'none',
          }}>
            <Calendar />
          </div>
        </Grid>
        <Grid  size={10}>
          <div style={{
            marginTop: '2em',
          }}>
            <Outlet />
          </div>
        </Grid>
      </Grid>
    </div>
  )
}