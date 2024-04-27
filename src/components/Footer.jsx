import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component='footer'
      sx={{
        padding: '20px',
        textAlign: 'center',
        marginTop: 'auto', // Push the footer to the bottom of the page
      }}
    >
      <Typography variant='body2' color='textSecondary'>
        © {currentYear} All Rights Reserved.
      </Typography>
      <Typography variant='body2' color='textSecondary' mt={1}>
        Made with ❤️ by Janexmgd
      </Typography>
    </Box>
  );
};

export default Footer;
