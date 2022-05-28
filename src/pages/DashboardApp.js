import {useState,useEffect} from 'react'
import {Link} from 'react-router-dom';
import { faker } from '@faker-js/faker';
import { sentenceCase } from 'change-case';
import axios from 'axios';
// @mui
import { filter } from 'lodash';
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography,Card,Table,Slider,
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

const SERVER_ADDRESS = "https://carwiz-enagage.herokuapp.com"

const TABLE_HEAD = [
  { id: 'Model', label: 'Model', alignRight: false },
  { id: 'Make', label: 'Make', alignRight: false },
  { id: 'Variant', label: 'Variant', alignRight: false },
  { id: 'Price', label: 'Ex-Showroom Price', alignRight: false },
  {},
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    console.log(query);
    return filter(array, (_user) => _user.Model.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function DashboardApp() {
  const theme = useTheme();

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('Model');

  const [filterName, setFilterName] = useState('');
  const [searchName, setSearchName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [companyCars, setCompanyCars] = useState([]);


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    // console.log(event.target.value)
    // setSearchName(event.target.value)
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - companyCars.length) : 0;
  const [filteredUsers,setFilteredUsers] = useState(companyCars);
  const [isUserNotFound,setIsUserNotFound] = useState(companyCars.length === 0);
  const search = () =>{
    setSearchName(filterName);
    setFilteredUsers(filterName!=="" ? companyCars.filter((d)=>d.Model === filterName) : companyCars);
    setIsUserNotFound(filteredUsers.length === 0);
  }

  // useEffect(()=>{
  //   getFuelOfCompany();
  // },[])
  const [fuelOfCompany, setFuelOfCompany] = useState([]);
  const [ofuelOfCompany, setoFuelOfCompany] = useState([]);
  const [bodyTypes, setBodyTypes] = useState([]);
  const [parking, setParking] = useState([]);
  const [obodyTypes, setoBodyTypes] = useState([]);
  const [carTypes, setCarTypes] = useState([]);
  const [ocarTypes, setoCarTypes] = useState([]);
  const [mileage, setMileage] = useState([]);
  const [mileage1, setMileage1] = useState([]);
  const [mileage2, setMileage2] = useState([]);
  const [carProperties, setCarProperties] = useState([]);
  const [power, setPower] = useState([]);

  const [currentCompany,setCurrentCompany] = useState("");
  const [displayCompany,setDisplayCompany] = useState("");

  const getFuelOfCompany = async() =>{
    await axios.get(`${SERVER_ADDRESS}/cars/fuel_type?company_name=${currentCompany}`).then((res)=>{
      const data = res.data;
      const refinedData = []
      data.map((d)=>refinedData.push({label:d._id, value:d.count}))
      setFuelOfCompany(refinedData);
      setoFuelOfCompany(refinedData);
    }).catch((err)=>console.log(err));
  }
  const getBodyTypesOfCompany = async() =>{
    await axios.get(`${SERVER_ADDRESS}/cars/body_type?company_name=${currentCompany}`).then((res)=>{
      const data = res.data;
      const refinedData = []
      data.map((d)=>refinedData.push({label:d._id, value:d.count}))
      setBodyTypes(refinedData);
      setoBodyTypes(refinedData);
    }).catch((err)=>console.log(err));
  }
  const getParkingTypesOfCompany = async() =>{
    await axios.get(`${SERVER_ADDRESS}/cars/parking_assistance?company_name=${currentCompany}&min_price=0&max_price=1200000000`).then((res)=>{
      const data = res.data;
      const refinedData = []
      data.map((d)=>d._id!==null&&refinedData.push({label:d._id, value:d.count}))
      setParking(refinedData);
    }).catch((err)=>console.log(err));
  }
  
  const getCarTypesOfCompany = async() =>{
    await axios.get(`${SERVER_ADDRESS}/cars/car_type?company_name=${currentCompany}`).then((res)=>{
      const data = res.data;
      const refinedData = []
      data.map((d)=>refinedData.push({label:d._id, value:d.count}))
      setCarTypes(refinedData);
      setoCarTypes(refinedData);
    }).catch((err)=>console.log(err));
  }
  
  const getCarsList = async() =>{
    await axios.get(`${SERVER_ADDRESS}/cars/companies_cars_list?company_name=${currentCompany}`).then((res)=>{
      setCompanyCars(res.data);
      setFilteredUsers(res.data);
      setIsUserNotFound(res.data.length === 0)
    }).catch((err)=>console.log(err));
  }
  
  const getCityMileage = async() =>{
    await axios.get(`${SERVER_ADDRESS}/cars/model_vs_city_mileage?company_name=${currentCompany}`).then((res)=>{
      const data = res.data;
      const refinedData = []
      data.map((d)=>refinedData.push({label:d._id, value:d.avgMileage}))
      setMileage(refinedData);
      const m1=[];
      refinedData.map((e)=>m1.push(e.label));
      setMileage1(m1);
      const m2=[];
      refinedData.map((e)=>m2.push(e.value));
      setMileage2(m2);
    }).catch((err)=>console.log(err));
  }
  const getCarProperties = async() =>{
    await axios.get(`${SERVER_ADDRESS}/cars/car_properties?company_name=${currentCompany}`).then((res)=>{
      const data = res.data[0];
      const refinedData = [];
      const newObj = Object.assign({}, ...Object.entries(data).map((key) => refinedData.push({label:key[0], value:key[1][0].count})));
      console.log(res.data);
      console.log(refinedData);
      setCarProperties(refinedData);
    }).catch((err)=>console.log(err));
  }
  const getPower = async() =>{
    await axios.get(`${SERVER_ADDRESS}/cars/power_vs_price?company_name=${currentCompany}`).then((res)=>{
      const data = res.data;
      const refinedData = []
      data.map((d)=>refinedData.push({label:d._id, value:d.avgPrice}))
      setPower(refinedData);
  
    }).catch((err)=>console.log(err));
  }

  const valuetext1 = (value)=> {
    return `Rs. ${value}`;
  }
  const valuetext2 = (value)=> {
    return `Rs. ${value}`;
  }
  
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const handleChangeMinPrice = (event, newValue) => {
    setMinPrice(newValue);
  };
  const handleChangeMaxPrice = (event, newValue) => {
    setMaxPrice(newValue);
  };
  const [applyFilter,setApplyFilter] = useState(false);


  const searchFilters = async () => {
    await axios.get(`${SERVER_ADDRESS}/cars/fuel_type?company_name=${displayCompany}&max_price=${maxPrice}&min_price=${minPrice}`).then((res)=>{
      const data = res.data;
      const refinedData = []
      data.map((d)=>refinedData.push({label:d._id, value:d.count}))
      setFuelOfCompany(refinedData);
    }).catch((err)=>console.log(err));
    
   
    await axios.get(`${SERVER_ADDRESS}/cars/body_type?company_name=${displayCompany}&max_price=${maxPrice}&min_price=${minPrice}`).then((res)=>{
      const data = res.data;
      const refinedData = []
      data.map((d)=>refinedData.push({label:d._id, value:d.count}))
      setBodyTypes(refinedData);
    }).catch((err)=>console.log(err));
    
    await axios.get(`${SERVER_ADDRESS}/cars/parking_assistance?company_name=${displayCompany}&max_price=${maxPrice}&min_price=${minPrice}`).then((res)=>{
      const data = res.data;
      const refinedData = []
      data.map((d)=>refinedData.push({label:d._id, value:d.count}))
      setParking(refinedData);
    }).catch((err)=>console.log(err));
    
    await axios.get(`${SERVER_ADDRESS}/cars/car_type?company_name=${displayCompany}&max_price=${maxPrice}&min_price=${minPrice}`).then((res)=>{
      const data = res.data;
      const refinedData = []
      data.map((d)=>refinedData.push({label:d._id, value:d.count}))
      setCarTypes(refinedData);
    }).catch((err)=>console.log(err));
    
    await axios.get(`${SERVER_ADDRESS}/cars/car_type?car_properties=${displayCompany}&max_price=${maxPrice}&min_price=${minPrice}`).then((res)=>{
      const data = res.data[0];
      const refinedData = []
      const newObj = Object.assign({}, ...Object.entries(data).map((key) => refinedData.push({label:key[0], value:key[1][0].count})));
      setCarTypes(refinedData);
    }).catch((err)=>console.log(err));
  }

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Search
        </Typography>
        <TextField label="Company Name" value={currentCompany} onChange={(e)=>setCurrentCompany(e.target.value)} fullWidth sx={{mb:2}}/>
        <div style={{display:"flex", justifyContent:"center", marginBottom:"20px"}}>
          <Button variant="contained" sx={{width:"50%"}} onClick={()=>{
            getFuelOfCompany();
            getBodyTypesOfCompany();
            getParkingTypesOfCompany();
            getCarTypesOfCompany();
            getCarsList();
            getCityMileage();
            getCarProperties();
            getPower();
            setDisplayCompany(currentCompany);
            setCurrentCompany("");
            setApplyFilter(false);
            setMaxPrice(0);
            setMinPrice(0);
          }}>Search</Button>
        </div>

        {
          companyCars.length>0?(
            <>
              {displayCompany!==""&&(
        <Grid container spacing={3}>
          {/* <Grid item xs={12} sm={6} md={3}> */}
            {/* <AppWidgetSummary title="Item Orders" total={1723315} color="warning" icon={'ant-design:windows-filled'} /> */}
          {/* </Grid> */}
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Number Of Cars" total={companyCars.length} color="info" icon={'ant-design:car-filled'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Number of Fuel Types" total={ofuelOfCompany.length} icon={'ant-design:api-filled'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Number of Car Types" total={ocarTypes.length} icon={'ant-design:menu-outlined'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Number of Body types" total={obodyTypes.length} icon={'ant-design:car-outlined'} />
          </Grid>
 

          <Grid item xs={12}>
              <Card>
              <UserListToolbar  filterName={filterName} onFilterName={handleFilterByName} search={search}/>

              <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                  <Table>
                    <UserListHead
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={filteredUsers.length}
                      numSelected={selected.length}
                      // onRequestSort={handleRequestSort}
                      // onSelectAllClick={handleSelectAllClick}
                    />
                    <TableBody>
                      {filteredUsers?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                        const { _id, Make, Model, Variant,Price } = row;
                        const isItemSelected = selected.indexOf(Model) !== -1;
                        return (
                          <TableRow
                            hover
                            key={_id}
                            tabIndex={-1}
                            aria-checked={isItemSelected}
                          >
                            {/* <TableCell padding="checkbox">
                              <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, Model)} />
                            </TableCell> */}
                            <TableCell align="left">{Model}</TableCell>
                            <TableCell align="left">{Make}</TableCell>
                            <TableCell align="left">{Variant}</TableCell>
                            <TableCell align="left">{Price}</TableCell>
                            <TableCell align="left">
                              <Link to={`/dashboard/app/car?id=${row._id}`} target="_blank" rel="noopener noreferrer">
                              <Button variant="contained">View Details</Button>
                              </Link>
                            </TableCell>
                            {/* <TableCell align="left">{Ex-Showroom_Price}</TableCell> */}

                          </TableRow>
                        );
                      })}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>

                    {isUserNotFound && (
                      <TableBody>
                        <TableRow>
                          <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                            <SearchNotFound searchQuery={searchName} />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    )}
                  </Table>
                </TableContainer>
              </Scrollbar>

              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredUsers.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Card>
          </Grid>



        {applyFilter?(
          <>
          <Grid item xs={12} md={12} lg={2} />
          <Grid item xs={12} md={12} lg={8}>
            <div>
              <div>
                <Typography>Minimum Price</Typography>
                <div style={{display:"flex", flexDirection:"column", alignItems:"flex-end"}}>
                  <Slider
                    sx={{width:"90%"}}
                    defaultValue={0}
                    getAriaValueText={valuetext1}
                    valueLabelDisplay="auto"
                    step={50000}
                    marks
                    min={0}
                    max={10000000}
                    value={minPrice}
                    onChange={handleChangeMinPrice}
                    />
                </div>
              </div>
              <div>
                <Typography>Maximum Price</Typography>
                <div style={{display:"flex", flexDirection:"column", alignItems:"flex-end"}}>
                  <Slider
                    sx={{width:"90%"}}
                    defaultValue={0}
                    getAriaValueText={valuetext2}
                    valueLabelDisplay="auto"
                    step={50000}
                    marks
                    min={0}
                    max={10000000}
                    value={maxPrice}
                    onChange={handleChangeMaxPrice}
                    />
                  </div>
              </div>
            </div>
            <div style={{display:"flex", justifyContent:"flex-end"}}>
                <Button variant="contained" onClick={searchFilters}>Apply</Button>
              </div>
          </Grid>
          </>):(
            <Grid item xs={12} md={12} lg={12}>
              <div style={{display:"flex", justifyContent:"flex-end"}}>
                <Button variant="contained" onClick={()=>{setApplyFilter(true)}}>Apply Fitlers</Button>
              </div>
            </Grid>
          )}
          
         
          <Grid item xs={12} md={6} lg={6}>          
            <AppCurrentVisits
              title={`Body Types of ${displayCompany}`}
              chartData={bodyTypes!==[]?bodyTypes:[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.chart.blue[0],
                theme.palette.chart.violet[0],
                theme.palette.chart.yellow[0],
              ]}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>          
            <AppCurrentVisits
              title={`Car Types of ${displayCompany}`}
              chartData={carTypes!==[]?carTypes:[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.chart.blue[0],
                theme.palette.chart.violet[0],
                theme.palette.chart.yellow[0],
              ]}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>          
            <AppCurrentVisits
              title={`Fuels Types of ${displayCompany}`}
              chartData={fuelOfCompany!==[]?fuelOfCompany:[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.chart.blue[0],
                theme.palette.chart.violet[0],
                theme.palette.chart.yellow[0],
              ]}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>          
            <AppCurrentVisits
              title={`Parking Assistance by ${displayCompany}`}
              chartData={parking!==[]?parking:[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.chart.blue[0],
                theme.palette.chart.violet[0],
                theme.palette.chart.yellow[0],
              ]}
            />
          </Grid>



          <Grid item xs={12} md={12} lg={12}>
            <AppConversionRates
              title="Average Price vs Power"
              subheader={displayCompany}
              chartData={power}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <AppConversionRates
              title="City Mileage vs Model"
              subheader={displayCompany}
              chartData={mileage}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <AppConversionRates
              title="Car Properties"
              subheader={displayCompany}
              chartData={carProperties}
            />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
                { name: 'Series 4', data: [1, 0, 1, 0, 1, 0] }
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="City Mileage vs Model"
              subheader={displayCompany}
              chartLabels={mileage1}
              chartData={[
                // {
                //   name: 'Team A',
                //   type: 'column',
                //   fill: 'solid',
                //   data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                // },
                // {
                //   name: 'Team B',
                //   type: 'area',
                //   fill: 'gradient',
                //   data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                // },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid> */}
        </Grid>
        )}
            </>
          ):displayCompany!==""&&"No Company Found"
        }


        
      </Container>
    </Page>
  );
}
