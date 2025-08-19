import {Calendar} from "./Calendar.tsx";
import {Box, Drawer} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import {useState} from "react";
import Button from "@mui/material/Button";

export const TopBar = () => {

  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  }

  return (
    <>
      <Box sx={{ glexGrow: 1}}>
       <AppBar position="static">
         <Toolbar>
           <IconButton
             size="large"
             edge="start"
             color="inherit"
             aria-label="menu"
             sx={{ mr: 2 }}
             onClick={toggleDrawer(true)}
           >
             <MenuIcon />
           </IconButton>
           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Training Records
           </Typography>
         </Toolbar>
       </AppBar>
      </Box>
      <Drawer open={open}>
        <Calendar />
        <Button
          variant="contained"
          color="primary"
          onClick={toggleDrawer(false)}
          sx={{ margin: 2, width: '90%' }}
        >閉じる</Button>
      </Drawer>
    </>
  )
}