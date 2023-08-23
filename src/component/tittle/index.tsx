import { Helmet } from "react-helmet";

const TitleComponent = ({ title }: any) => {
    return (<Helmet><title>{`GreenSight | ${title}`}</title></Helmet>)
}

TitleComponent.defaultProps = {
    title: "GreenSight",
}

export default TitleComponent