import { RouterProvider } from "react-router";
import { router } from "./routes";
import { motion, AnimatePresence } from "motion/react";
import { useLocation } from "react-router";

function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
