import CircularProgress from '@mui/material/CircularProgress';
import './spin.css';
const Spin = ({ size=20, color='black' }) => (
    <CircularProgress size={size} sx={{color:color}} />
);
export default Spin;