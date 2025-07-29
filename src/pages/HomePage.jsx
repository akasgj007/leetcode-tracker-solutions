import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import ProblemTable from "../components/ProblemTable";
import { db } from "../firebase";

const HomePage = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "problems"), orderBy("problemNumber", "asc")),
      (snapshot) => {
        const problemsList = snapshot.docs.map((doc) => ({
          ...doc.data(),
          firebaseId: doc.id,
        }));
        setProblems(problemsList);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching problems:", error);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Leetcode Tracker</h2>
      {loading ? (
        <Loader />
      ) : (
        <ProblemTable problems={problems} isAdmin={false} />
      )}
    </div>
  );
};

export default HomePage;
