// Import necessary assets
import moment from 'moment';
import disabledArrow from "../assets/images/common/disabledArrow.svg";
import decArrow from "../assets/images/common/downactiveArrow.svg";
import incArrow from "../assets/images/common/topactiveArrow.svg";

// Helper function to get token header
export const getTokenHeader = () => {
    const userdata: any = localStorage.getItem("loginDetails") && JSON.parse(localStorage.getItem("loginDetails") || '');

    let token: string = process.env.REACT_APP_IS_DEV ? process.env.REACT_APP_TEST_TOKEN : userdata?.token

    let tokenDetails = {
        headers: { Authorization: `Bearer ${token}` }
    }
    return tokenDetails
}

// Function to generate a list of years based on date range
export const yearList = (dto: { start_date?: Date; end_date?: Date }) => {
    let a: number[] = [];

    const startDate = dto?.start_date ? moment(dto.start_date) : moment();
    const endDate = dto?.end_date ? moment(dto.end_date) : moment();

    for (let i = startDate.year(); i <= endDate.year(); i++) {
        a.push(i);
    }
    return a;
};

// Function to generate a list of quarters based on the current year and selected year
export const getQuarters = (yearlyData: string | number) => {
    const latestYear = new Date().getFullYear();
    const quarter = Math.floor((new Date().getMonth() + 3) / 3);

    let list: { value: string | number; name: string }[] = [
        { value: "", name: quarter <= 4 ? "YTD" : "All" },
        { value: 1, name: "Q1" }
    ];

    // Add quarters based on current year and selected year
    if (Number.parseInt(yearlyData.toString(), 10) >= latestYear) {
        if (quarter >= 2) {
            list.push({ value: 2, name: "Q2" });
        }
        if (quarter >= 3) {
            list.push({ value: 3, name: "Q3" });
        }
        if (quarter >= 4) {
            list.push({ value: 4, name: "Q4" });
        }
    } else {
        list = [
            { value: "", name: "All" },
            { value: 1, name: "Q1" },
            { value: 2, name: "Q2" },
            { value: 3, name: "Q3" },
            { value: 4, name: "Q4" }
        ];
    }
    return list;
};

// Function to get the name of a quarter based on its numeric value and year
export const getQuarterName = (data: string | number, year: string | number): string => {
    const latestYear = new Date().getFullYear();
    let quarterName: string | number = Number.parseInt(data.toString(), 10);

    if (!isNaN(quarterName)) {
        // Convert quarter number to its name
        if (quarterName === 1) {
            quarterName = "Q1";
        } else if (quarterName === 2) {
            quarterName = "Q2";
        } else if (quarterName === 3) {
            quarterName = "Q3";
        } else if (quarterName === 4) {
            quarterName = "Q4";
        }
    } else {
        // Handle cases where quarter is not provided
        if (latestYear === Number.parseInt(year.toString(), 10)) {
            quarterName = "";
        } else {
            quarterName = "All Quarters of";
        }
    }

    return quarterName as string;
};

export const isCompanyEnable = (userDetail: any): boolean => {
    if (userDetail?.Company?.name === "General mills") {
        return true;
    } else if (userDetail?.Company?.name === "Lowes") {
        return false;
    } else {
        return false;
    }
};

// Function to determine which sort icon to display
export const sortIcon = (key: string, col_name: string, order: string): string => {
    if (col_name === key) {
        return order === "asc" ? incArrow : decArrow;
    } else {
        return disabledArrow;
    }
};

// Function to get the quarter and year from a given date
export const getQuarterYear = (date: string): string => {
    // Calculate the quarter based on the month of the given date
    const quarter = Math.ceil(Number(moment.utc(date).format("MM")) / 3);
    
    // Get the year from the given date
    const year = Number(moment.utc(date).format("YYYY"));

    // Return the formatted quarter and year
    return `Q${quarter} ${year}`;
};

// Define interfaces for Contributor and Detractor data
interface ContributorItem {
    name: string;
    value: number;
    color: string;
}

interface DetractorItem {
    name: string;
    value: number;
    color: string;
}

// Define a union type for GraphDataItem
type GraphDataItem = ContributorItem | DetractorItem;

// Function to process graph data and return an array of GraphDataItems
export const getGraphDataHorizontal = (res: { data: { contributor?: ContributorItem[]; detractor?: DetractorItem[] } }, key: string): GraphDataItem[] => {
    let regionPageArr: GraphDataItem[] = [];
    let regionPageArrMerge: GraphDataItem[] = [];

    // Process contributor data
    if (res?.data?.contributor) {
        regionPageArr = res.data.contributor
            .filter(i => i.name !== key)
            .map(i => ({
                ...i,
                name: i.name,
                y: i.value,
                color: i.color,
                yAxis: 1,
                dataLabels: [
                    {
                        inside: false,
                        enabled: true,
                        rotation: 0,
                        x: 32,
                        overflow: "none",
                        allowOverlap: false,
                        color: "#212121",
                        align: "center",
                        crop: false,
                        formatter() {
                            return "";
                        },
                    }
                ],
                type: "column",
            }));
    }

    // Process detractor data
    if (res?.data?.detractor) {
        const detractorData = res.data.detractor;
        regionPageArrMerge = res?.data?.detractor
            .filter(i => i.name !== key)
            .map(i => {
                const yValue = -Number(i.value) - ((detractorData[2]?.value || 0) - (detractorData[0]?.value || 0));
                return {
                    ...i,
                    name: i.name,
                    y: yValue,
                    yValue: -Number(i.value),
                    color: i.color,
                    yAxis: 0,
                    type: "column",
                    dataLabels: [
                        {
                            inside: false,
                            enabled: true,
                            rotation: 0,
                            x: -30,
                            overflow: "none",
                            allowOverlap: false,
                            color: "#212121",
                            align: "center",
                            crop: false,
                            formatter() {
                                return "";
                            },
                        }
                    ],
                };
            });
    }

    // Return merged array of contributor and detractor data
    return [...regionPageArr, ...regionPageArrMerge];
};
