import { useUser } from '@supabase/auth-helpers-react'
import TaskScroller from '../components/TaskScroller'
import TaskInput from '../components/TaskInput'
import Header from "../components/Header";

const Dashboard = () => {
    const user = useUser()

    return (
        <div>
            <Header />
            <section className="grid justify-items-center gap-20 pt-4 text-center">
                <div>
                    <h1 className="text-4xl font-bold">Hey {user?.user_metadata.display_name}, welcome to One A Day</h1>
                    <h2 className="text-lg">Your daily accountability companion.</h2>
                </div>
                <TaskScroller />
                <TaskInput />
            </section>
        </div>
    );
    };

export default Dashboard;