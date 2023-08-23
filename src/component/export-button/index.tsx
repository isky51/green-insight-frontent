import Export from "../../assets/images/components/export.svg";

// ExportButton component to render an export button with an icon
const ExportButton: React.FC = () => {

    // Render the ExportButton component
    return (
        <>
            {/* Container for the export button */}
            <div className="pt-3 dropdown-comp opacity-1">
                {/* Export button with an icon */}
                <button type="button" className="export border-0 d-flex justify-content-end">
                    {/* Icon displayed before the text */}
                    <span className="me-2">
                        <img src={Export} alt="ico" /> {/* Display the Export icon */}
                    </span>
                    Export {/* Text displayed next to the icon */}
                </button>
            </div>
        </>
    );
}

export default ExportButton; // Export the ExportButton component
