import {useState,useEffect} from 'react'
import { faker } from '@faker-js/faker';
import { sentenceCase } from 'change-case';
import axios from 'axios';
// @mui
import { filter } from 'lodash';
import { useTheme } from '@mui/material/styles';
import BarChart from 'react-bar-chart';
import queryString from 'query-string';
import { Grid, Container, Typography,Card,Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,TableHead,
  TableCell,
  TableContainer,
  TablePagination,TextField} from '@mui/material';
  // components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
// import USERLIST from '../_mock/user';
import Scrollbar from '../components/Scrollbar';
import Label from '../components/Label';
import SearchNotFound from '../components/SearchNotFound';

// ----------------------------------------------------------------------

export default function CarDetails() {
  const theme = useTheme();
  const [companyCars, setCompanyCars] = useState([]);
  const SERVER_ADDRESS = "https://carwiz-enagage.herokuapp.com"
  const margin = {top: 20, right: 20, bottom: 30, left: 40};

  const [carId,setCarId] = useState();
  useEffect(()=>{
    getCarsList();
  },[])

  const getCarsList = async() =>{
    const params = queryString.parse(window.location.search)
    setCarId(params.id);
    await axios.get(`${SERVER_ADDRESS}/cars/single_car_details?car_id=${params.id}`).then((res)=>{
      setCompanyCars(res.data);
      console.log(res.data);
    }).catch((err)=>console.log(err));
  }


  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Car Details
        </Typography>
        <Grid>
          <Grid item xs={12} md={12} lg={12}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Car Feature</TableCell>
                <TableCell align="left">Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  Airbags
                </TableCell>
                <TableCell align="left">{companyCars.Airbags}</TableCell>
              </TableRow>

              

              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                Boot Space (litres)
                </TableCell>
                <TableCell align="left">{companyCars.Boot_Space}</TableCell>
              </TableRow>


              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                Ex-Showroom Price (in Rs.)
                </TableCell>
                <TableCell align="left">{companyCars["Ex-Showroom_Price"]}</TableCell>
              </TableRow>

              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                Cylinders
                </TableCell>
                <TableCell align="left">{companyCars.Cylinders}</TableCell>
              </TableRow>

              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                Valves Per Cylinder
                </TableCell>
                <TableCell align="left">{companyCars.Valves_Per_Cylinder}</TableCell>
              </TableRow>

              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                Engine Location
                </TableCell>
                <TableCell align="left">{companyCars.Engine_Location}</TableCell>
              </TableRow>

              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                Fuel System
                </TableCell>
                <TableCell align="left">{companyCars.Fuel_System}</TableCell>
              </TableRow>

              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                Fuel Tank Capacity (litres)
                </TableCell>
                <TableCell align="left">{companyCars.Fuel_Tank_Capacity}</TableCell>
              </TableRow>

              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                Fuel Type
                </TableCell>
                <TableCell align="left">{companyCars.Fuel_Type}</TableCell>
              </TableRow>

              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                Height (in mm)
                </TableCell>
                <TableCell align="left">{companyCars.Height}</TableCell>
              </TableRow>

              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                Length (in mm)
                </TableCell>
                <TableCell align="left">{companyCars.Length}</TableCell>
              </TableRow>

              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                Width (in mm)
                </TableCell>
                <TableCell align="left">{companyCars.Width}</TableCell>
              </TableRow>

              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                Body Type
                </TableCell>
                <TableCell align="left">{companyCars.Body_Type}</TableCell>
              </TableRow>

              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                Doors
                </TableCell>
                <TableCell align="left">{companyCars.Doors}</TableCell>
              </TableRow>

              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                City Mileage (km/litre)
                </TableCell>
                <TableCell align="left">{companyCars.City_Mileage}</TableCell>
              </TableRow>

              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                Highway_Mileage (km/litre)
                </TableCell>
                <TableCell align="left">{companyCars.Highway_Mileage}</TableCell>
              </TableRow>

              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                Gears
                </TableCell>
                <TableCell align="left">{companyCars.Gears}</TableCell>
              </TableRow>

              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                Ground Clearance (in mm)
                </TableCell>
                <TableCell align="left">{companyCars.Ground_Clearance}</TableCell>
              </TableRow>

              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                Front_Brakes
                </TableCell>
                <TableCell align="left">{companyCars.Front_Brakes}</TableCell>
              </TableRow>

              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                Rear_Brakes
                </TableCell>
                <TableCell align="left">{companyCars.Rear_Brakes}</TableCell>
              </TableRow>

              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                Power Steering
                </TableCell>
                <TableCell align="left">{companyCars.Power_Steering}</TableCell>
              </TableRow>

              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                Power Windows
                </TableCell>
                <TableCell align="left">{companyCars.Power_Windows}</TableCell>
              </TableRow>

              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                Type
                </TableCell>
                <TableCell align="left">{companyCars.Type}</TableCell>
              </TableRow>

              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                Basic Warranty
                </TableCell>
                <TableCell align="left">{companyCars.Basic_Warranty}</TableCell>
              </TableRow>

              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                Extended Warranty
                </TableCell>
                <TableCell align="left">{companyCars.Extended_Warranty}</TableCell>
              </TableRow>

              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                Number of Airbags
                </TableCell>
                <TableCell align="left">{companyCars.Number_of_Airbags}</TableCell>
              </TableRow>

              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                Turbocharger
                </TableCell>
                <TableCell align="left">{companyCars.Turbocharger}</TableCell>
              </TableRow>

              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                Rain Sensing Wipers
                </TableCell>
                <TableCell align="left">{companyCars.Rain_Sensing_Wipers}</TableCell>
              </TableRow>

              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                Ventilation_System
                </TableCell>
                <TableCell align="left">{companyCars.Ventilation_System}</TableCell>
              </TableRow>

              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                Child Safety Locks
                </TableCell>
                <TableCell align="left">{companyCars.Child_Safety_Locks}</TableCell>
              </TableRow>

              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                Seats Material
                </TableCell>
                <TableCell align="left">{companyCars.Seats_Material}</TableCell>
              </TableRow>

              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                Seating Capacity
                </TableCell>
                <TableCell align="left">{companyCars.Seating_Capacity}</TableCell>
              </TableRow>

              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                Power
                </TableCell>
                <TableCell align="left">{companyCars.Power}</TableCell>
              </TableRow>

              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                Torque
                </TableCell>
                <TableCell align="left">{companyCars.Torque}</TableCell>
              </TableRow>



            </TableBody>
          </Table>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
