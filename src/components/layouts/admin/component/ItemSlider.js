import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGauge } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function ItemSlider({ text, icon, link }) {
    const history = useNavigate();
    return (
        <ListItem key={text} sx={{ padding: "15px 0" }} onClick={() => history(link)} >
            <ListItemButton>
                <ListItemIcon >
                    {icon}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ 'span': { fontSize: '16px', fontWeight: "bold" } }} />
            </ListItemButton>
        </ListItem>
    )
}

export default ItemSlider