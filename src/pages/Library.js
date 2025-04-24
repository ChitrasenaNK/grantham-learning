import { useEffect, useState } from 'react';
import {
  Box,
  Drawer,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  IconButton,
  AppBar,
  Toolbar,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import API from '../api';
import Navbar from '../components/Navbar';

const drawerWidth = 250;

export default function Library() {
  const [groups, setGroups] = useState([]);
  const [pdfsByGroup, setPdfsByGroup] = useState({});
  const [selectedPdfUrl, setSelectedPdfUrl] = useState(null);
  const [openSidebar, setOpenSidebar] = useState(false); // State for sidebar visibility

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchGroupsAndPdfs = async () => {
      try {
        const groupRes = await API.get('/groups');
        const groupList = groupRes.data;
        setGroups(groupList);

        const pdfData = {};
        for (const g of groupList) {
          const pdfRes = await API.get(`/pdfs/${g.group_name}`);
          pdfData[g.group_name] = pdfRes.data;
        }
        setPdfsByGroup(pdfData);
      } catch (err) {
        console.error('Error fetching data', err);
      }
    };
    fetchGroupsAndPdfs();
  }, []);

  const viewPdf = async (id) => {
    const token = localStorage.getItem('token');

    try {
      const res = await API.get(`/pdf/${id}?token=${token}`);
      const { url } = res.data;

      const fullUrl = `${url}#toolbar=0&navpanes=0&scrollbar=0`;
      setSelectedPdfUrl(fullUrl);
    } catch (err) {
      console.error('Failed to load PDF:', err);
    }
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  return (
    <>
      <Navbar />

      {/* Small screen AppBar with title */}
      {isMobile && (
        <AppBar position="static" sx={{ backgroundColor: '#fff5ee', mt: '70px' }}>
          <Toolbar>
            <IconButton edge="start" color="lightpink" onClick={toggleSidebar}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ ml: 1, fontFamily: 'Noto Sans Grantha', color: 'lightpink' }}>
            Pustakālaya 𑌪𑍁𑌸𑍍𑌥𑌕𑌾𑌲𑌯𑌾
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      <Box sx={{ display: 'flex', pt: { xs: 2, sm: 8 } }}>
        {/* Sidebar Drawer */}
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'} // Use temporary drawer on mobile
          open={openSidebar}
          onClose={toggleSidebar}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: 'border-box',
              top: isMobile ? 56 : 64,
              height: `calc(100% - ${isMobile ? 56 : 64}px)`,
              backgroundColor: '#fff5ee', // Set the background color to #fff5ee
            },
          }}
        >
          <Box sx={{ p: 2 }}>
            {groups.map((g) => (
              <Accordion key={g.group_name}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>{g.group_name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    {pdfsByGroup[g.group_name]?.map((pdf) => (
                      <ListItem disablePadding key={pdf.id}>
                        <ListItemButton onClick={() => viewPdf(pdf.id)}>
                          <ListItemText primary={pdf.name} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Drawer>

        {/* Main content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            mt: isMobile ? '56px' : '64px',
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          {selectedPdfUrl ? (
            <iframe
              src={selectedPdfUrl}
              title="PDF Viewer"
              width="100%"
              height="100%"
              style={{
                border: 'none',
                minHeight: 'calc(100vh - 100px)', // Make it full height under navbar
              }}
            />
          ) : (
            <Typography variant="h6" color="textSecondary" sx={{mt:5}}>
              Please select a PDF from the left to view it.
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
}
