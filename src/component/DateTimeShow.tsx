import moment from "moment";
import LatestUpdate from "../assets/images/components/latest-update.svg";

// DateTimeShow component to display the last update date and time
export default function DateTimeShow() {
    return (
        // Paragraph to display the last update date and time
        <p className=" font-12 mb-1 d-flex align-items-center justify-content-end">
            {/* Display the last updated time in "hh:mm A" format */}
            Last updated at {moment().format("hh:mm A")} on{" "}
            {/* Display the last updated date in "DD MMM YY" format */}
            {moment().format("DD MMM YY")}
            {/* Display the LatestUpdate icon */}
            <span className="ms-2 d-flex justify-content-center align-items-center">
                <img src={LatestUpdate} alt="Current Time" />
            </span>
        </p>
    );
}
