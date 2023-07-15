import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import API from '../../../API';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '0px solid #000',
  boxShadow: 24,
  fontWeight: 'bold',
  fontSize: '16px',
  textAlign: 'center',
  p: 4,
};

export default function Filter({ iconButton, setValue, value }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [material, setMaterial] = React.useState([]);
  const [color, setColor] = React.useState([]);
  const [styleList, setStyle] = React.useState([]);
  const [category, setCategory] = React.useState('');
  const handleChange = (e) => {
    setValue([...value, { [e.target.name]: e.target.value }])
  };

  React.useEffect(() => {
    API({
      method: 'get',
      url: `category`,
    }).then((res) => {
      setCategory(res.data)
    })
  }, []);



  React.useEffect(() => {
    API({
      method: 'get',
      url: 'marterial/show-all',
    }).then((res) => {
      setMaterial(res.data.materials);
    })
  }, [])

  React.useEffect(() => {
    API({
      method: 'get',
      url: 'color/show-all',
    }).then((res) => {
      setColor(res.data.colors);
    })
  }, [])

  React.useEffect(() => {
    API({
      method: 'get',
      url: 'style/show-all',
    }).then((res) => {
      setStyle(res.data.styles);
    })
  }, [])
  console.log(value)
  return (
    <div>
      <Button onClick={handleOpen}>{iconButton}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 style={{ fontWeight: "bold", fontSize: "30px", textAlign: "center" }}>Lọc sản phẩm</h1>
          <div style={{ marginTop: "20px" }}>
            <TextField
              label={
                <label style={{ fontSize: '16px' }}>
                  Tên sản phẩm
                </label>
              }
              sx={{ 'input': { fontSize: '16px', padding: "12px" }, width: '70%' }}
              variant="outlined"
            />

            <div style={{ marginTop: "20px" }}>
              <InputLabel id="demo-simple-select-label" style={{ fontSize: "16px", marginTop: "20px" }}>Thể loại</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={handleChange}
                sx={{ width: '70%', fontSize: '16px' }}
                name='theloai'
              >
                {
                  category && category.map((item) => {
                    return <MenuItem style={{ fontSize: "16px" }} value={item.id}>{item.ten}</MenuItem>
                  })
                }
              </Select>
            </div>
            <div style={{ marginTop: "20px" }}>
              <InputLabel id="demo-simple-select-label" style={{ fontSize: "16px", marginTop: "20px" }}>Thương hiệu</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name='thuonghieu'
                onChange={handleChange}
                sx={{ width: '70%', fontSize: '16px' }}
              >
                {
                  material && material.map((item) => {
                    return <MenuItem style={{ fontSize: "16px" }} value={item.id}>{item.ten}</MenuItem>
                  })
                }
              </Select>
            </div>
            <div style={{ marginTop: "20px" }}>
              <InputLabel id="demo-simple-select-label" style={{ fontSize: "16px", marginTop: "20px" }}>Màu sắc</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name='mausac'
                onChange={handleChange}
                sx={{ width: '70%', fontSize: '16px' }}
              >
                {
                  color && color.map((item) => {
                    return <MenuItem style={{ fontSize: "16px" }} value={item.id}>{item.ten}</MenuItem>
                  })
                }
              </Select>
            </div>
            <div style={{ marginTop: "20px" }}>
              <InputLabel id="demo-simple-select-label" style={{ fontSize: "16px", marginTop: "20px" }}>Giới tính</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name='gioitinh'
                onChange={handleChange}
                sx={{ width: '70%', fontSize: '16px' }}
              >
                <MenuItem style={{ fontSize: "16px" }} value={0}>Nam</MenuItem>
                <MenuItem style={{ fontSize: "16px" }} value={1}>Nữ</MenuItem>
                <MenuItem style={{ fontSize: "16px" }} value={2}>Cả hai</MenuItem>
              </Select>
            </div>
            <div style={{ marginTop: "20px" }}>
              <InputLabel id="demo-simple-select-label" style={{ fontSize: "16px", marginTop: "20px" }}>Kiểu dáng</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name='kieudang'
                onChange={handleChange}
                sx={{ width: '70%', fontSize: '16px' }}
              >
                {
                  styleList && styleList.map((item) => {
                    return <MenuItem style={{ fontSize: "16px" }} value={item.id}>{item.ten}</MenuItem>
                  })
                }
              </Select>
            </div>
            <Button style={{ fontSize: "16px", background: "#0d6efd", marginTop: "20px", padding: "10px 20px", color: "white" }}>Tìm kiếm</Button>
          </div>
        </Box>
      </Modal>
    </div >
  );
}