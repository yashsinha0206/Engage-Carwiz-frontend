import {useState,useEffect} from 'react'
import { faker } from '@faker-js/faker';
import { sentenceCase } from 'change-case';
import axios from 'axios';
// @mui
import { filter } from 'lodash';
import { useTheme } from '@mui/material/styles';
import BarChart from 'react-bar-chart';
import { Grid, Container, Typography,Card,Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
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

export default function DashboardApp() {
  const theme = useTheme();
  const [companyCars, setCompanyCars] = useState([]);
  const [totalCars, setTotalCars] = useState(0);
  const SERVER_ADDRESS = "https://carwiz-enagage.herokuapp.com"
  const margin = {top: 20, right: 20, bottom: 30, left: 40};
  useEffect(()=>{
    getCarsList();
  },[])

  const getCarsList = async() =>{
    await axios.get(`${SERVER_ADDRESS}/cars/companies_no`).then((res)=>{
      const data = res.data;
      const refinedData = []
      let total = 0;
      data.map((d)=>refinedData.push({label:d._id, value:d.count}));
      for(let i=0; i<data.length; i+=1){
        total += data[i].count;
      }
      setCompanyCars(refinedData);
      setTotalCars(total);
    }).catch((err)=>console.log(err));
  }

  console.log(totalCars)

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Overview
        </Typography>
        <Grid container spacing={3} sx={{mb:4}}>
          {/* <Grid item xs={12} sm={6} md={3}> */}
            {/* <AppWidgetSummary title="Item Orders" total={1723315} color="warning" icon={'ant-design:windows-filled'} /> */}
          {/* </Grid> */}
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Number Of Companies" total={companyCars.length} color="info" icon={'ant-design:home-filled'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Number of Cars" total={totalCars} icon={'ant-design:car-filled'} />
          </Grid>
          {/* <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Number of Car Types" total={ocarTypes.length} icon={'ant-design:menu-outlined'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Number of Body types" total={obodyTypes.length} icon={'ant-design:car-outlined'} />
          </Grid> */}
        </Grid>
        {/* <BarChart ylabel='Total Cars'
          width={1000}
          height={500}
          margin={margin}
          data={companyCars}
          // onBarClick={handleBarClick}
          /> */}
          <Grid>
            <Grid item xs={12} md={12} lg={12}>
              <AppConversionRates
                height = {850}
                title="Total Cars"
                chartData={companyCars}
              />
            </Grid>
          </Grid>
      </Container>
    </Page>
  );
}
