import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout';
import Parent from './components/parent';
import Training from './components/news';
import Coaches from './components/contact';
import Registration from './components/registration';
import Statistics from './components/counter';
import Schedule from './components/todo';
import CoachRegistration from './components/coachRegistration';
import Members from './components/members';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Parent />} />
          <Route path="training" element={<Training />} />
          <Route path="coaches" element={<Coaches />} />
          <Route path="join-team" element={<Registration />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="coach-registration" element={<CoachRegistration />} />
          <Route path="members" element={<Members />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
