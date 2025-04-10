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
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@mui/material/styles';
import API from '../api';
import Navbar from '../components/Navbar';

const drawerWidth = 250;

export default function Library() {
  const [groups, setGroups] = useState([]);
  const [pdfsByGroup, setPdfsByGroup] = useState({});
  const [selectedPdfUrl, setSelectedPdfUrl] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchGroupsAndPdfs = async () => {
      const groupRes = await API.get('/groups');
      const groupList = groupRes.data;
      setGroups(groupList);

      const pdfData = {};
      for (const g of groupList) {
        const pdfRes = await API.get(`/pdfs/${g.group_name}`);
        pdfData[g.group_name] = pdfRes.data;
      }
      setPdfsByGroup(pdfData);
    };
    fetchGroupsAndPdfs();
  }, []);

  const viewPdf = (id) => {
    const token = localStorage.getItem('token');
    const url = `http://localhost:3001/api/pdf/${id}?token=${token}#toolbar=0&navpanes=0&scrollbar=0`;
    setSelectedPdfUrl(url);
  };
  

  return (
    <>
      <Navbar />

      <Box sx={{ display: 'flex',pt: { xs: 7, sm: 8 } }}>
        {/* Sidebar Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: 'border-box',
              top: isMobile ? 56 : 64,
              height: `calc(100% - ${isMobile ? 56 : 64}px)`,
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
    <Typography variant="h6" color="textSecondary">
      Please select a PDF from the left to view it.
    </Typography>
  )}
</Box>

      </Box>
    </>
  );
}
