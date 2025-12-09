import { createBrowserRouter } from "react-router";

import App from "./App";
import { Home } from "./pages/Home/Home";
import { NewJournal } from "./pages/NewJournal/NewJournal";
import { AllJournals } from "./pages/AllJournals/AllJournals";
import { JournalCard } from "./pages/JournalCard/JournalCard";
import { NotFound } from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
        { index: true, Component: Home },
        { path: '/new', Component: NewJournal },
        { path: '/all', Component: AllJournals },
        { path: '/all/:id', Component: JournalCard }
    ]
  },
  { path: '*', Component: NotFound },
]);

export default router