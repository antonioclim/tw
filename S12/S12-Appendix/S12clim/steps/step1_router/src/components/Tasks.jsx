import { useParams } from "react-router-dom";

const Tasks = () => {
    const { id } = useParams();
    return (
        <>
            <p>Tasks</p>
            <p>{id}</p>
        </>
    );
};

export default Tasks;
