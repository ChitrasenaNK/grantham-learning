import { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import * as pdfjsLib from 'pdfjs-dist';

// Set the worker source from the public folder
pdfjsLib.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.min.js`;

export default function PDFViewer({ pdfUrl }) {
  const canvasRef = useRef();
  const [pdf, setPdf] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loadingError, setLoadingError] = useState(null);

  // Function to render a specific page of the PDF
  const renderPage = async (num) => {
    if (!pdf || !canvasRef.current) return;

    try {
      const page = await pdf.getPage(num);
      const viewport = page.getViewport({ scale: 1.5 });

      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport,
      };

      // Render the page
      await page.render(renderContext).promise;
    } catch (err) {
      console.error('Error rendering page:', err);
      setLoadingError('Error rendering PDF page');
    }
  };

  // Load the PDF document when the component mounts
  useEffect(() => {
    console.log("Loading PDF from URL: ", pdfUrl); // Ensure URL is correct

    const loadPdf = async () => {
      try {
        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        const loadedPdf = await loadingTask.promise;
        setPdf(loadedPdf);
        setPageNumber(1); // Reset page number when a new PDF is loaded
      } catch (err) {
        console.error('Error loading PDF:', err);
        setLoadingError('Error loading PDF. Make sure the URL is valid.');
      }
    };

    if (pdfUrl) {
      loadPdf();
    } else {
      setLoadingError('No PDF URL provided');
    }
  }, [pdfUrl]);

  // Render the current page of the loaded PDF whenever page number or PDF changes
  useEffect(() => {
    if (pdf) {
      renderPage(pageNumber);
    }
  }, [pdf, pageNumber]);

  return (
    <Box>
      {/* Show loading or error message if there is any issue */}
      {loadingError ? (
        <Typography color="error">{loadingError}</Typography>
      ) : (
        <Box mb={2} display="flex" flexDirection="column" alignItems="center">
          <Typography variant="body2">Page {pageNumber}</Typography>
        </Box>
      )}
      
      {/* Canvas to render PDF */}
      <canvas ref={canvasRef} style={{ width: '100%', height: 'auto' }} />
    </Box>
  );
}
