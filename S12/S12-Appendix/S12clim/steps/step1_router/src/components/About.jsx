import { Link } from "react-router-dom";

const About = () => {
    return (
        <>
            <h2>About</h2>
            <p>
                This page exists to demonstrate client-side routing in React Router.
            </p>
            <Link to="/">Go to homepage</Link>
        </>
    );
};

export default About;
