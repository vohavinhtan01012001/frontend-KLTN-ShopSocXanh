import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ViewOrder from '../ViewOrder';
import ViewOrderStatus from '../ViewOrderStatus';
import API from '../../../../API';
import Swal from 'sweetalert2';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function TabsList() {
  const [value, setValue] = React.useState(0);
  const [orders, setOrders] = React.useState([]);
  const [orders1, setOrders1] = React.useState([]);
  const [orders2, setOrders2] = React.useState([]);
  const [orders3, setOrders3] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [refersh, setRefersh] = React.useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  //show list order
  React.useEffect(() => {
    API({
      method: 'get',
      url: `/admin-order/show-status`,
    }).then((res) => {
      if (res.status === 200) {
        setOrders(res.data.orders)
        setLoading(false);
      }
      else {
        Swal.fire({
          text: 'Do you want to continue',
          icon: 'warning',
          confirmButtonText: 'Cool'
        })
      }
    })

  }, [refersh]);

  //show list order
  React.useEffect(() => {
    API({
      method: 'get',
      url: `/admin-order/show-transport`,
    }).then((res) => {
      if (res.status === 200) {
        setOrders1(res.data.orders)
        setLoading(false);
      }
      else {
        Swal.fire({
          text: 'Do you want to continue',
          icon: 'warning',
          confirmButtonText: 'Cool'
        })
      }
    })

  }, [refersh]);


  React.useEffect(() => {
    API({
      method: 'get',
      url: `/admin-order/show-delivery`,
    }).then((res) => {
      if (res.status === 200) {
        setOrders2(res.data.orders)
        setLoading(false);
      }
      else {
        Swal.fire({
          text: 'Do you want to continue',
          icon: 'warning',
          confirmButtonText: 'Cool'
        })
      }
    })

  }, [refersh]);

  React.useEffect(() => {
    API({
      method: 'get',
      url: `/admin-order/show-cancel`,
    }).then((res) => {
      if (res.status === 200) {
        setOrders3(res.data.orders)
        setLoading(false);
      }
      else {
        Swal.fire({
          text: 'Do you want to continue',
          icon: 'warning',
          confirmButtonText: 'Cool'
        })
      }
    })

  }, [refersh]);



  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab sx={{ fontSize: "16px" }}
            label="Tất cả đơn hàng" {...a11yProps(0)} />
          <Tab sx={{ fontSize: "16px" }}
            label="Chờ xác nhận" {...a11yProps(1)} />
          <Tab sx={{ fontSize: "16px" }}
            label="Đang vận chuyển" {...a11yProps(2)} />
          <Tab sx={{ fontSize: "16px" }}
            label="Đã giao hàng" {...a11yProps(3)} />
          <Tab sx={{ fontSize: "16px" }}
            label="Đã hủy" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <ViewOrder />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ViewOrderStatus orders={orders}
          setRefersh={setRefersh}
          refersh={refersh}
          loading={loading}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <ViewOrderStatus orders={orders1}
          setRefersh={setRefersh}
          refersh={refersh}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <ViewOrderStatus orders={orders2}
          setRefersh={setRefersh}
          refersh={refersh}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <ViewOrderStatus orders={orders3}
          setRefersh={setRefersh}
          refersh={refersh}
        />
      </CustomTabPanel>
    </Box>
  );
}