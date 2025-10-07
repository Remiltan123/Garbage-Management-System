import { Sidebar } from "../Sidebar/Sidebar";
import { ClassifierBackground } from "../ClassifierBackground/ClassifierBackground";
import './DashBoard.css';

export function DashBoard() {
    return (
        <div className="dash-board">
            <Sidebar />
            <ClassifierBackground/>
        </div>
    );
}
