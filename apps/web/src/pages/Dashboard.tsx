import { useAuth } from '../context/AuthContext'
import Header from "../components/Header";

const Dashboard = () => {
    const { user } = useAuth()

    return (
        <div>
        <Header />
        <section className="text-center py-20">
            <h1 className="text-4xl font-bold">Hey {user?.display_name}, welcome to One A Day</h1>
            <h2 className="mt-4 text-lg">Your daily accountability companion.</h2>
        </section>
        </div>
    );
    };

export default Dashboard;