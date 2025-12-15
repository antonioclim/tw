import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
        <>
            <h2>Home</h2>

            <button onClick={() => navigate("tasks")}>
                Go to tasks
            </button>

            <button onClick={() => navigate("tasks/123")}>
                Go to tasks/123
            </button>

            <button onClick={() => navigate("about")}>
                Go to about
            </button>
        </>
    );
};

export default Home;
