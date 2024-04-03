import { Button } from '@mui/material';
import { green, red, blueGrey, blue, grey } from '@mui/material/colors';
import { styled } from '@mui/system';

export const ConnectButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  borderRadius: 30,
  fontSize: 18,
  fontWeight: 900,
  textTransform: "none",
  backgroundColor: blue[600],
  padding: "3px 24px",
  position: "relative",
  fontFamily: "Open Sans",
  zIndex: 15,
  '&:hover': {
    backgroundColor: blue[800],
  },
  '&:disabled': {
    color: "#fff",
    backgroundColor: blue[600],
  }
}));

export const GotoButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  borderRadius: 0,
  fontSize: 22,
  fontWeight: 900,
  textTransform: "none",
  backgroundColor: "transparent",
  width: 240,
  height: 60,
  position: "relative",
  zIndex: 2,
  border: "1px solid #fff",
  fontFamily: "Open Sans",
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
  fontFamily: "Open Sans",
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
  fontFamily: "Open Sans",
  borderColor: `${green[800]} !important`,
  '&:hover': {
    backgroundColor: green[800],
  },
  '&:disabled': {
    color: "#fff",
    backgroundColor: green[600],
  }
}));

export const CancelButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  borderRadius: 3,
  fontSize: 12,
  fontWeight: 600,
  textTransform: "uppercase",
  backgroundColor: grey[600],
  height: 30,
  position: "relative",
  zIndex: 2,
  fontFamily: "Open Sans",
  borderColor: `${grey[800]} !important`,
  '&:hover': {
    backgroundColor: grey[800],
  },
  '&:disabled': {
    color: "#fff",
    backgroundColor: grey[600],
  }
}));

export const UnstakeButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  borderRadius: 3,
  fontSize: 12,
  fontWeight: 600,
  textTransform: "uppercase",
  backgroundColor: red[600],
  height: 30,
  fontFamily: "Open Sans",
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
  fontFamily: "Open Sans",
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
  position: "relative",
  borderBottom: "1px solid #ccc",
  fontFamily: "Open Sans",
}));

export const MoreMenuButton = styled(Button)(({ theme }) => ({
  fontSize: 14,
  fontWeight: 900,
  textTransform: "capitalize",
  padding: "5px 24px",
  marginRight: 0,
  position: "relative",
  fontFamily: "Open Sans",
  borderRadius: 0,
  display: "flex",
  justifyContent: "left",
  color: "#333",
  marginTop: 5,
  marginBottom: 5
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
  fontFamily: "Open Sans",
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

export const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: 3,
  width: 12,
  height: 12,
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 0 0 1px rgb(16 22 26 / 40%)'
      : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
  backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
  backgroundImage:
    theme.palette.mode === 'dark'
      ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
      : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
  '.Mui-focusVisible &': {
    outline: '2px auto rgba(19,124,189,.6)',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5',
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background:
      theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)',
  },
}))

export const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: '#52af77',
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  '&:before': {
    display: 'block',
    width: 12,
    height: 12,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: '#52af77',
  },
});

export const MulCheckIcon = styled('span')(({ theme }) => ({
  borderRadius: 0,
  width: 20,
  height: 20,
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 0 0 1px rgb(16 22 26 / 40%)'
      : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
  backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
  backgroundImage:
    theme.palette.mode === 'dark'
      ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
      : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
  '.Mui-focusVisible &': {
    outline: '2px auto rgba(19,124,189,.6)',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5',
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background:
      theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)',
  },
}))

export const MulCheckedIcon = styled(BpIcon)({
  backgroundColor: '#52af77',
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  '&:before': {
    display: 'block',
    width: 20,
    height: 20,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: '#52af77',
  },
});

export const SidebarButton = styled(Button)(({ theme }) => ({
  fontSize: 16,
  fontWeight: 900,
  borderRadius: 0,
  textTransform: "uppercase",
  padding: "10px 24px",
  color: "#fff",
  position: "relative",
  fontFamily: "Open Sans",
  borderBottom: "1px solid #00000052",
  justifyContent: "flex-start",
  "& svg": {
    marginRight: 10
  }
}));