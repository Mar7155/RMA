import { Viewer } from '@react-pdf-viewer/core';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/zoom/lib/styles/index.css';
import '@react-pdf-viewer/page-navigation/lib/styles/index.css';
import { Worker } from '@react-pdf-viewer/core';

const PdfViewer = () => {
    const zoomPluginInstance = zoomPlugin();
    const pageNavigationPluginInstance = pageNavigationPlugin();

    const { ZoomInButton, ZoomOutButton, ZoomPopover } = zoomPluginInstance;
    const {
        CurrentPageInput,
        GoToFirstPageButton,
        GoToLastPageButton,
        GoToNextPageButton,
        GoToPreviousPageButton,
        NumberOfPages,
    } = pageNavigationPluginInstance;

    return (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <div
                style={{
                    display: 'flex',
                    height: '550px',
                    width: '700px',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                }}
            >
                <div
                    style={{
                        flex: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        border: '1px solid rgba(0, 0, 0, 0.3)',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', 
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: '#eeeeee',
                            borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                            padding: '4px',
                        }}
                    >
                        <div style={{ marginRight: 'auto', display: 'flex', gap: '5px' }}>
                            <ZoomOutButton />
                            <ZoomInButton />
                            <ZoomPopover />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <GoToFirstPageButton />
                            <GoToPreviousPageButton />
                            <CurrentPageInput /> / <NumberOfPages />
                            <GoToNextPageButton />
                            <GoToLastPageButton />
                        </div>
                    </div>

                    <div
                        style={{
                            flex: 1,
                            overflow: 'hidden',
                        }}
                    >
                        <Viewer
                            fileUrl="/Presentación.pdf"
                            plugins={[zoomPluginInstance, pageNavigationPluginInstance]}
                        />
                    </div>
                </div>
            </div>
        </Worker>
    );
};

export default PdfViewer;
