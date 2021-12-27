import { Button } from '@mui/material';
import { green, red, blueGrey } from '@mui/material/colors';
import { styled } from '@mui/system';

export const ConnectButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  borderRadius: 30,
  fontSize: 18,
  fontWeight: 900,
  textTransform: "none",
  backgroundColor: green[600],
  padding: "3px 24px",
  position: "relative",
  zIndex: 15,
  '&:hover': {
    backgroundColor: green[800],
  },
  '&:disabled': {
    color: "#fff",
    backgroundColor: green[600],
  }
}));

export const MintButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  borderRadius: 0,
  fontSize: 22,
  fontWeight: 900,
  textTransform: "none",
  backgroundColor: green[600],
  width: 240,
  height: 60,
  position: "relative",
  zIndex: 2,
  '&:hover': {
    backgroundColor: green[800],
  },
  '&:disabled': {
    color: "#fff",
    backgroundColor: green[600],
  }
}));
export const BigStakeButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  borderRadius: 0,
  fontSize: 22,
  fontWeight: 700,
  textTransform: "uppercase",
  backgroundColor: green[600],
  width: 240,
  height: 50,
  position: "relative",
  fontFamily: "Raleway",
  zIndex: 2,
  '&:hover': {
    backgroundColor: green[800],
  },
  '&:disabled': {
    color: "#fff",
    backgroundColor: green[600],
  }
}));

export const DoActionButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  borderRadius: 3,
  fontSize: 12,
  fontWeight: 600,
  textTransform: "uppercase",
  backgroundColor: green[600],
  height: 30,
  position: "relative",
  zIndex: 2,
  fontFamily: "Raleway",
  borderColor: `${green[800]} !important`,
  '&:hover': {
    backgroundColor: green[800],
  },
  '&:disabled': {
    color: "#fff",
    backgroundColor: green[600],
  }
}));

export const UnstakeButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  borderRadius: 3,
  fontSize: 12,
  fontWeight: 600,
  textTransform: "uppercase",
  backgroundColor: red[600],
  fontFamily: "Raleway",
  height: 30,
  position: "relative",
  zIndex: 2,
  borderColor: `${red[800]} !important`,
  '&:hover': {
    backgroundColor: red[800],
  },
  '&:disabled': {
    color: "#fff",
    backgroundColor: red[600],
  }
}));
export const ClaimButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  borderRadius: 3,
  fontSize: 12,
  fontWeight: 600,
  fontFamily: "Raleway",
  textTransform: "uppercase",
  backgroundColor: blueGrey[600],
  height: 30,
  position: "relative",
  zIndex: 2,
  borderColor: `${blueGrey[800]} !important`,
  '&:hover': {
    backgroundColor: blueGrey[800],
  },
  '&:disabled': {
    color: "#fff",
    backgroundColor: blueGrey[600],
  }
}));

export const MenuButton = styled(Button)(({ theme }) => ({
  fontSize: 16,
  fontWeight: 900,
  textTransform: "uppercase",
  padding: "10px 24px",
  marginRight: 20,
  position: "relative",
  borderBottom: "1px solid #ccc",
}));

export const ActionButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  fontSize: 24,
  fontWeight: 700,
  letterSpacing: 12,
  fontWeight: 800,
  textTransform: "none",
  backgroundColor: pink[600],
  borderColor: `${pink[800]} !important`,
  zIndex: 2,
  '&:hover': {
    backgroundColor: pink[800],
  },
  '&:disabled': {
    color: "#fff",
    fontSize: 40,
    lineHeight: "45px",
  },
  '&:first-child': {
    '&:disabled': {
      backgroundColor: pink[700],
      borderColor: `${pink[800]} !important`,
    }
  },
  '&:last-child': {
    '&:disabled': {
      backgroundColor: pink[700],
      borderColor: `${pink[800]} !important`,
    }
  }
}));
